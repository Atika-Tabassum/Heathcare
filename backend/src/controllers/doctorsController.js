const pool = require("../../db");

const getDoctors = async (req, res, next) => {
  try {
    const doctors = await pool.query(
      `SELECT
        u.*,                                       
        s.name AS specialization
      FROM
        users u                       
      JOIN
        doctors d                    
      ON
        u.user_id = d.doctor_user_id  
      JOIN
        doctor_specializations ds    
      ON
        d.doctor_user_id = ds.doctor_user_id  
      JOIN
        specializations s             
      ON
        ds.specialization_id = s.specialization_id  
      WHERE
        Lower(u.user_type) = 'doctor'       
        AND u.user_id <> $1`,
      [req.params.userId]
    );
    console.log("doctors:", doctors.rows);

    const specializationMap = {};

    doctors.rows.forEach((row) => {
      const userId = row.user_id;
      const specialization = row.specialization; // Correct field name

      if (!specializationMap[userId]) {
        specializationMap[userId] = {
          doctor_user_id: userId,
          specializations: [],
        };
      }

      specializationMap[userId].specializations.push(specialization);
    });

    const specializationArray = Object.values(specializationMap);

    if (doctors.rows.length === 0) {
      res.status(404).json({ message: "No doctor found" });
    } else {
      res.status(200).json({
        message: "Doctors loaded successfully",
        data: doctors.rows,
        specializationArray: specializationArray,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const registerDoctor = async (req, res, next) => {
  try {
    console.log("registering doctor");
    const {
      name,
      email,
      phoneNumber: contact_no,
      division,
      district,
      upazila,
      unionName,
      wardName,
      villageName,
      streetAddress,
      postalCode,
      password,
      description,
      image,
      reg_no,
      specializations,
      hospital,
    } = req.body;

    console.log("Request body:", req.body);

    // Check for missing required fields
    if (
      !name ||
      !email ||
      !contact_no ||
      !division ||
      !district ||
      !upazila ||
      !unionName ||
      !wardName ||
      !villageName ||
      !streetAddress ||
      !postalCode ||
      !password
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Insert into locations table
    const newLocation = await pool.query(
      `INSERT INTO location (division_id, district_id, upazila_id, union_name, ward_name, village_name, street_address, postal_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING location_id`,
      [
        division,
        district,
        upazila,
        unionName,
        wardName,
        villageName,
        streetAddress,
        postalCode,
      ]
    );

    const locationId = newLocation.rows[0].location_id;

    // Insert into users table
    const newUser = await pool.query(
      `INSERT INTO users (name, email, contact_no, location_id, user_type, password)
       VALUES ($1, $2, $3, $4, 'doctor', $5) RETURNING user_id`,
      [name, email, contact_no, locationId, password]
    );
    const hospital1 = await pool.query(
      `SELECT user_id from users where name=$1`,
      [hospital]
    );
    const hospital_id = hospital1.rows[0].user_id;

    const userId = newUser.rows[0].user_id;

    // Insert into doctors table
    await pool.query(
      `INSERT INTO doctors (doctor_user_id, description, reg_no,hospital_user_id)
       VALUES ($1, $2, $3,$4)`,
      [userId, description, reg_no, hospital_id]
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
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

const getSpecializations = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM specializations`);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching specializations:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
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
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
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
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

const updatestatus = async (req, res) => {
  try {
    const appointment_id = req.body.appointment_id;
    const appointments = await pool.query(
      `update appointments set status='Accepted' where appointment_id=$1`,
      [appointment_id]
    );
    res.status(200).json({
      message: "Appointment status updated successfully",
    });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
};

module.exports = {
  getDoctors,
  registerDoctor,
  getSpecializations,
  addSpecialization,
  getAppointments,
  updatestatus,
};
