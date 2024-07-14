const pool = require("../../db");
const { get } = require("../routers/hospitalRouter");

const getAllHospital = async (req, res, next) => {
  try {
    
    hospitals = await pool.query(
      `SELECT * FROM users WHERE user_type = 'hospital';`
    );

    console.log("hospitals from backend controller:", hospitals.rows);

    if (hospitals.rows.length === 0) {
      res.status(404).json({ message: "No hospital found" });
    } else {
      res.status(200).json({
        message: "Hospitals loaded successfully",
        data: hospitals.rows,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getAllHospital};
