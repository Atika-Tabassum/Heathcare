const pool = require("../../db");
// const bcrypt = require("bcrypt");

const registerPatient = async (req, res, next) => {
  try {
    const { 
      name, 
      email, 
      contact_no, 
      division_id, 
      district_id, 
      upazila_id, 
      union_name, 
      ward_name, 
      village_name, 
      street_address, 
      postal_code, 
      password, 
      user_type, 
      medical_history,
      blood_group ,
      will_donate_blood, 
    } = req.body;
    
    console.log("Request Body:", req.body);

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into location table
    const newLocation = await pool.query(
      `INSERT INTO location (division_id, district_id, upazila_id, union_name, ward_name, village_name, street_address, postal_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING location_id`,
      [division_id, district_id, upazila_id, union_name, ward_name, village_name, street_address, postal_code]
    );

    const locationId = newLocation.rows[0].location_id;

    // Insert into users table
    const newUser = await pool.query(
      `INSERT INTO users (name, email, contact_no, location_id, user_type, password)
       VALUES ($1, $2, $3, $4, 'patient', $5) RETURNING user_id`,
      [name, email, contact_no, locationId, password]
    );

    const userId = newUser.rows[0].user_id;

    // Insert into patients table
    await pool.query(
      `INSERT INTO patients (patient_user_id, medical_history, blood_group ,will_donate_blood)
       VALUES ($1, $2,$3,$4)`,
      [userId, medical_history, blood_group,will_donate_blood,]
    );

    console.log("New User:", newUser);
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};



module.exports = { registerPatient };
