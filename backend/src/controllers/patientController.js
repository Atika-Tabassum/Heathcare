const pool = require("../../db");
// const bcrypt = require("bcrypt");

const registerPatient = async (req, res, next) => {
  try {
    const { name, email, contact_no, address, password, user_type, medical_history } = req.body;
    console.log("jirg");
    console.log(req.body);

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into users table
    const newUser = await pool.query(
      `INSERT INTO users (name, email, contact_no, address, user_type, password)
       VALUES ($1, $2, $3, $4, 'patient', $5) RETURNING user_id`,
      [name, email, contact_no, address, password]
    );

    const userId = newUser.rows[0].user_id;

    // Insert into patients table
    await pool.query(
      `INSERT INTO patients (patient_user_id, medical_history)
       VALUES ($1, $2)`,
      [userId, medical_history]
    );
console.log(newUser);
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

module.exports = { registerPatient };
