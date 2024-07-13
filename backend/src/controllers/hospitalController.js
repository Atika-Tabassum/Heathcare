const pool = require("../../db");

const registerHospital = async (req, res, next) => {
  try {
    const { name, email, contact_no, address, password, user_type, medical_history } = req.body;
    const image = req.file.filename; // Extract filename of the uploaded image

    // Insert into users table
    const newUser = await pool.query(
      `INSERT INTO users (name, email, contact_no, address, user_type, password)
       VALUES ($1, $2, $3, $4, 'hospital', $5) RETURNING user_id`,
      [name, email, contact_no, address, password]
    );

    const userId = newUser.rows[0].user_id;

    // Insert into hospitals table
    await pool.query(
      `INSERT INTO hospitals (hospital_user_id, description, image)
       VALUES ($1, $2, $3)`,
      [userId, "Hospital description", image]
    );

    res.status(201).json({ message: "Hospital registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

module.exports = { registerHospital };
