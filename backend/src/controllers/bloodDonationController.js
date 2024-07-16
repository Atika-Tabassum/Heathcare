const pool = require("../../db");

const getBloodDonors = async (req, res, next) => {
  try {
    const donors = await pool.query(
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
        p.will_donate_blood = True;
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

const updateDonationStatus = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { will_donate_blood } = req.body;

    const result = await pool.query(
      `UPDATE patients 
      SET will_donate_blood = $1
      WHERE patient_user_id = $2
      RETURNING *`,
      [will_donate_blood, userId]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.status(200).json({
        message: "Donation status updated successfully",
        data: result.rows[0],
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getBloodDonors, updateDonationStatus };
