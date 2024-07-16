const pool = require("../../db");
// const { get } = require("../routers/ambulanceRouter");

const getAmbulance = async (req, res, next) => {
  try {
    const patientUserId = req.params.patientUserId;
    const hospitalUserId = req.params.hospitalUserId;
    console.log("patientUserId:", patientUserId);
    console.log("hospitalUserId:", hospitalUserId);
    const ambulances = await pool.query(
      `SELECT * from ambulance_bookings where patient_user_id = $1;
`,
      [patientUserId]
    );
    console.log("ambulances:", ambulances.rows);

    if (ambulances.rows.length === 0) {
      res.status(404).json({ message: "No ambulance found" });
    } else {
      res.status(200).json({
        message: "Ambulances loaded successfully",
        data: ambulances.rows,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getAmbulance};
