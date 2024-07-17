const pool = require("../../db");

const registerHospital = async (req, res, next) => {
  try {
    const { name, email, contact_no, description, division_id, 
      district_id, 
      upazila_id, 
      union_name, 
      ward_name, 
      village_name, 
      street_address, 
      postal_code, password,user_type } = req.body;
      const image = req.file ? req.file.filename : null;
      // Extract filename of the uploaded image

    // Insert into users table
    const newLocation = await pool.query(
      `INSERT INTO locations (division_id, district_id, upazila_id, union_name, ward_name, village_name, street_address, postal_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING location_id`,
      [division_id, district_id, upazila_id, union_name, ward_name, village_name, street_address, postal_code]
    );

    const locationId = newLocation.rows[0].location_id;

    // Insert into users table
    const newUser = await pool.query(
      `INSERT INTO users (name, email, contact_no, location_id, user_type, password)
       VALUES ($1, $2, $3, $4, 'hospital', $5) RETURNING user_id`,
      [name, email, contact_no, locationId, password]
    );

    const userId = newUser.rows[0].user_id;

    // Insert into hospitals table
    await pool.query(
      `INSERT INTO hospitals (hospital_user_id, description, image)
       VALUES ($1, $2, $3)`,
      [userId, description, image]
    );

    res.status(201).json({ message: "Hospital registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

module.exports = { registerHospital };
