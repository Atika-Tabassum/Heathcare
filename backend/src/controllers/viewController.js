const pool = require("../../db");
// const { get } = require("../routers/patientRouter");

const getCamps = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("userId:", userId);
    const camps = await pool.query(
      `SELECT m.*
FROM medical_camps m
LEFT JOIN medical_camp_doctors md ON m.camp_id = md.camp_id
WHERE m.doctor_user_id = $1 OR md.doctor_user_id = $1;
`,
      [userId]
    );
    console.log("camps:", camps.rows);

    if (camps.rows.length === 0) {
      res.status(404).json({ message: "No camp found" });
    } else {
      res.status(200).json({
        message: "Camps loaded successfully",
        data: camps.rows,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getNotifications = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    console.log("userId:", userId);
    const notifications = await pool.query(
      `SELECT 
    CASE 
        WHEN n.type = 'invitation' THEN 'You are invited to join the free medical camp ' || n.message
        ELSE n.message
    END AS description,
    n.camp_id,n.type
FROM notifications n 
JOIN users u ON n.user_id = u.user_id 
WHERE n.user_id = $1
AND n.is_read = FALSE
`,
      [userId]
    );
    console.log("notifications:", notifications.rows);

    if (notifications.rows.length === 0) {
      res.status(404).json({ message: "No notification found" });
    } else {
      res.status(200).json({
        message: "Notifications loaded successfully",
        data: notifications.rows,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getCampDetails = async (req, res, next) => {
  try {
    const campId = req.params.campId;
    console.log("campId:", campId);
    const camp = await pool.query(
      `SELECT m.*,u.name,u.email,u.contact_no ,encode(m.image, 'base64') AS img FROM medical_camps m 
       join users u on m.doctor_user_id=u.user_id
       WHERE m.camp_id = $1`,
      [campId]
    );

    const doctors=await pool.query(`SELECT u.name,u.email,u.contact_no 
      FROM users u JOIN medical_camp_doctors md ON u.user_id=md.doctor_user_id WHERE md.camp_id=$1 `,[campId]);

    // console.log("camp:", camp.rows);
    // console.log("doctors:",doctors.rows);

    if (camp.rows.length === 0 ) {
      res.status(404).json({ message: "No camp found" });
    } else {
      res.status(200).json({
        message: "Camp loaded successfully",
        data: camp.rows,
        doctors:doctors.rows
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getResponse = async (req, res, next) => {
  try {
    const { userId, campId, select } = req.params;
    console.log("at getResponse");
    console.log("userId:", userId, "campId:", campId, "select:", select);

    const userResult = await pool.query(
      `SELECT name FROM users WHERE user_id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const userName = userResult.rows[0].name;
    const message =
      select === "1"
        ? `${userName} accepted your invitation to join`
        : `${userName} rejected your invitation to join`;

    const receiverResult = await pool.query(
      `SELECT doctor_user_id FROM medical_camps WHERE camp_id = $1`,
      [campId]
    );

    if (receiverResult.rows.length === 0) {
      return res.status(404).json({ message: "Medical camp not found" });
    }

    const receiverId = receiverResult.rows[0].doctor_user_id;

    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      const response = await client.query(
        `INSERT INTO notifications (user_id, camp_id, message, type) VALUES ($1, $2, $3, $4) RETURNING *`,
        [receiverId, campId, message, select === "1" ? "accept" : "deny"]
      );
      console.log("response:", response.rows);

      await client.query(
        `UPDATE notifications SET is_read = TRUE WHERE user_id = $1 AND is_read = FALSE AND type = 'invitation' AND camp_id = $2`,
        [userId, campId]
      );

      if (select === "1") {
        await client.query(
          `INSERT INTO medical_camp_doctors (camp_id, doctor_user_id) VALUES ($1, $2)`,
          [campId, userId]
        );
      }

      await client.query("COMMIT");
      res.status(200).json({ message: "Response sent successfully" });
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getCamps, getNotifications, getCampDetails, getResponse };
