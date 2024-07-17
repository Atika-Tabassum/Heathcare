const pool = require("../../db");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single("image");

const getMedicalCamp = async (req, res, next) => {
  
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: "File upload failed", error: err.message });
    }
  try {
    const id = req.params.userId;
    console.log("at post");
    console.log(id);
    const { division, 
      district, 
      upazila, 
      unionName, 
      wardName, 
      villageName, 
      streetAddress, 
      postalCode, date, description} = req.body;
    const selectedDoctors = JSON.parse(req.body.selectedDoctors);
    console.log(date);
    const imageBuffer = req.file ? req.file.buffer : null;
    const newLocation = await pool.query(
      `INSERT INTO location (division_id, district_id, upazila_id, union_name, ward_name, village_name, street_address, postal_code)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING location_id`,
      [division, district, upazila, unionName, wardName, villageName, streetAddress, postalCode]
    );

    console.log('division '+division);
    console.log('district '+district);
    console.log('upazila '+upazila);
    console.log('unionName '+unionName);
    console.log('wardName '+wardName);
    console.log('villageName '+req.body.villageName);
    console.log('streetAddress '+streetAddress);
    console.log('postalCode '+postalCode);
    console.log('date '+date);
    console.log('description '+description);

    const locationId = newLocation.rows[0].location_id;
    const newcamp = await pool.query(
      "INSERT INTO medical_camps ( doctor_user_id,location,camp_date,description,image) VALUES($1, $2, $3, $4 , $5) RETURNING *",
      [id, locationId, date, description, imageBuffer]
    );

    console.log(selectedDoctors);

    const notificationPromises = selectedDoctors.map((selectedDoctorIds) => {
      const camp_id = newcamp.rows[0].camp_id;
      const message = newcamp.rows[0].camp_id;
      console.log(message);
      console.log(selectedDoctorIds);
      return pool.query(
        "INSERT INTO notifications (user_id ,camp_id, message,type) VALUES($1, $2 ,$3 ,'invitation') RETURNING *",
        [selectedDoctorIds, camp_id, message]
      );
    });

    res.status(200).json({ message: "Camp is added", data: newcamp.rows[0] });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
})
};

module.exports = { getMedicalCamp };
