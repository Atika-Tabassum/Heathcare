const pool = require("../../db");
// const { get } = require("../routers/ambulanceRouter");

const getAmbulance = async (req, res, next) => {
  try {
    console.log("at ambulance controller");
    const name = req.body.name;
    const location = req.body.location;
    const mobile = req.body.mobile;
    const type = req.body.type;
    const selectedHospital = req.body.selectedHospital;

    const newBooking = await pool.query(
      'INSERT INTO book_ambulance (name, location, mobile, type, selectedHospital) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, location, mobile, type, selectedHospital]
    );

    res.status(200)
       .json({success: true, message: "booked", data : name, location, mobile, type, selectedHospital});
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getAmbulance};
