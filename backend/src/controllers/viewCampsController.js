const pool = require("../../db");

const getCamps = async (req, res, next) => {
  try {
    const userId  = req.params.userId;
    console.log("userId:", userId);
    const camps = await pool.query(`SELECT m.*
FROM medical_camps m
LEFT JOIN medical_camp_doctors md ON m.camp_id = md.camp_id
WHERE m.doctor_user_id = $1 OR md.doctor_user_id = $1;
`, [userId]);
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

module.exports = { getCamps };
