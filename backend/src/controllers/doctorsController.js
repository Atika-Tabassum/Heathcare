const pool = require("../../db");

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await pool.query(`select u.*,d.specialisation,d.hospital_user_id,d.description from users u join doctors d on u.user_id=d.doctor_user_id where u.user_type='Doctor' AND u.user_id<>$1`,[req.params.userId]);
    console.log("doctors:", doctors.rows);

    if (doctors.rows.length === 0) {
      res.status(404).json({ message: "No doctor found" });
    } else {
      res.status(200).json({
        message: " doctors loaded successfully",
        data: doctors.rows,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getDoctors };
