const pool = require("../../db");
// const { get } = require("../routers/bloodDonationRouter");

const getBloodDonors = async (req, res, next) => {
  try {
    
    donors = await pool.query(
      `SELECT 
    u.name,
    u.email,
    u.contact_no,
    d.division_name,
    dis.district_name,
    up.upazila_name,
    loc.union_name,
    loc.ward_name,
    loc.village_name,
    loc.street_address,
    loc.postal_code,
    p.blood_group,
    p.will_donate_blood
FROM 
    users u
JOIN 
    patients p ON u.user_id = p.patient_user_id
JOIN 
    location loc ON u.location_id = loc.location_id
JOIN 
    upazilas up ON loc.upazila_id = up.upazila_id
JOIN 
    districts dis ON up.district_id = dis.district_id
JOIN 
    divisions d ON dis.division_id = d.division_id
WHERE 
    p.will_donate_blood = False;

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










