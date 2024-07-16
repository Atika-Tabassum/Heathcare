const pool = require("../../db");
// const { get } = require("../routers/bloodDonationRouter");

const getBloodDonors = async (req, res, next) => {
  try {
    
    donors = await pool.query(
      `SELECT 
    users.name,
    users.email,
    users.contact_no,
    users.address,
    patients.medical_history,
    patients.blood_group,
    patients.will_donate_blood
FROM 
    users
INNER JOIN 
    patients ON users.user_id = patients.patient_user_id;
`
    );

    console.log(" from backend controller:", donors.rows);

    if (donors.rows.length === 0) {
      res.status(404).json({ message: "No donor found" });
    } else {
      res.status(200).json({
        message: "Donors loaded successfully",
        data: donors.rows,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getBloodDonors};
