const pool = require("../../db");

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await pool.query(`SELECT u.*, d.specialisation, d.hospital_user_id, d.description 
                                      FROM users u 
                                      JOIN doctors d ON u.user_id = d.doctor_user_id 
                                      WHERE u.user_type = 'Doctor' AND u.user_id <> $1`, [req.params.userId]);
    console.log("doctors:", doctors.rows);

    if (doctors.rows.length === 0) {
      res.status(404).json({ message: "No doctor found" });
    } else {
      res.status(200).json({
        message: "Doctors loaded successfully",
        data: doctors.rows,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const registerDoctor = async (req, res, next) => {
  try {
    const { name, email, contact_no, address, password, description, image, specializations } = req.body;

    // Insert into users table
    const newUser = await pool.query(
      `INSERT INTO users (name, email, contact_no, address, user_type, password)
       VALUES ($1, $2, $3, $4, 'doctor', $5) RETURNING user_id`,
      [name, email, contact_no, address, password]
    );

    const userId = newUser.rows[0].user_id;

    // Insert into doctors table
    await pool.query(
      `INSERT INTO doctors (doctor_user_id, description, image)
       VALUES ($1, $2, $3)`,
      [userId, description, image]
    );

    // Insert specializations
    for (const specialization of specializations) {
      const specializationResult = await pool.query(
        `SELECT specialization_id FROM specializations WHERE name = $1`,
        [specialization]
      );

      if (specializationResult.rows.length > 0) {
        const specializationId = specializationResult.rows[0].specialization_id;

        await pool.query(
          `INSERT INTO doctor_specializations (doctor_user_id, specialization_id)
           VALUES ($1, $2)`,
          [userId, specializationId]
        );
      }
    }

    res.status(201).json({ message: "Doctor registered successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

const getSpecializations = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM specializations`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching specializations:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

const addSpecialization = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      `INSERT INTO specializations (name) VALUES ($1) RETURNING *`,
      [name]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding specialization:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await pool.query(
      `SELECT a.*, u.name AS patient_name, u.contact_no AS patient_contact_no
       FROM appointments a
       JOIN users u ON a.patient_user_id = u.user_id
       WHERE a.doctor_user_id = $1`,
      [req.params.userId]
    );

    if (appointments.rows.length === 0) {
      res.status(404).json({ message: "No appointments found" });
    } else {
      res.status(200).json({
        message: "Appointments loaded successfully",
        data: appointments.rows,
      });
    }
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

module.exports = { getDoctors, registerDoctor, getSpecializations, addSpecialization, getAppointments };
