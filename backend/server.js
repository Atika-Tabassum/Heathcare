const express = require('express');
const app = express();
const port = 3001;
const pool = require('./db');
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

const patientRouter = require("./src/routers/patientRouter");
app.use("/patient", patientRouter);
const myprofileRouter = require("./src/routers/myprofileRouter");
app.use("/users", myprofileRouter);

app.get('/healthcare/hospitals', async (req, res) => {
    try {
        const allHospitals = await pool.query("SELECT * FROM users WHERE user_type = 'hospital'");
        res.json(allHospitals.rows);
        console.log(allHospitals.rows);
    } catch (err) {
        console.error(err.message);
    }
});

const contentsRouter = require("./src/routers/contentsRouter");
app.use("/contents", contentsRouter);

const orgmedicalcampRouter = require("./src/routers/orgmedicalcampRouter");
app.use("/org", orgmedicalcampRouter);

const viewRouter = require("./src/routers/viewRouter");
app.use("/view", viewRouter);

const doctorsRouter = require("./src/routers/doctorsRouter");
app.use("/doctors", doctorsRouter);



app.get('/healthcare/getHospitalInfo/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const hospitalId = parseInt(id, 10);
        console.log(hospitalId);
        const hospitalInfo = await pool.query("SELECT * FROM users WHERE user_type = 'hospital' and user_id = $1", [hospitalId]);
        console.log('hello');
        const doctorsInfo = await pool.query("SELECT u.*, d.specialisation from users u join doctors d on u.user_id = d.doctor_user_id where d.hospital_user_id=$1", [hospitalId]);
        console.log('hello');
        console.log(hospitalInfo.rows);
        console.log(doctorsInfo.rows);
        res.status(200).json({
            status: "success",
            data: {
                hospital: hospitalInfo.rows[0],
                doctors: doctorsInfo.rows
            },
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/healthcare/doctors/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const doctorId = parseInt(id, 10);
        console.log(doctorId);
        const doctorInfo = await pool.query(`SELECT u.*, d.specialisation, h.name as hospital_name 
                FROM users u 
                JOIN doctors d ON u.user_id = d.doctor_user_id 
                JOIN users h ON d.hospital_user_id = h.user_id 
                WHERE u.user_type = 'doctor' AND u.user_id =  $1`
            , [doctorId]);
        console.log(doctorInfo.rows);
        res.status(200).json({
            status: "success",
            data: doctorInfo.rows[0]
        });
    }
    catch (err) {
        console.error(err.message);
    }
});

app.get('/healthcare/doctors', async (req, res) => {
    try {
        console.log('hello');
        const allDoctors = await pool.query("SELECT u.*, d.specialisation from users u join doctors d on u.user_id = d.doctor_user_id where u.user_type = 'doctor'");
        console.log(allDoctors.rows);
        res.status(200).json({
            status: "success",
            data: allDoctors.rows,
        });
    } catch (err) {
        console.error(err.message);
    }
});


app.get('/getambulance', async (req, res) => {
    try {
        const allAmbulences = await pool.query("SELECT * FROM ambulance_bookings");
        const query = await pool.query("SELECT * FROM ambulance_bookings a join users u on a.hospital_user_id = u.user_id");
        let ambulance_hospital_map = {};
        query.rows.forEach(row => {
            if (ambulance_hospital_map[row.booking_id] === undefined) {
                ambulance_hospital_map[row.booking_id] = [];
            }
            ambulance_hospital_map[row.booking_id].push(row.name);
        });
        // for (const booking_id in ambulance_hospital_map) {
        //     if (ambulance_hospital_map.hasOwnProperty(booking_id)) {
        //         ambulance_hospital_map[booking_id].forEach(name => {
        //             console.log(`Booking ID: ${booking_id}, Hospital Name: ${name}`);
        //         });
        //     }
        // }
        res.status(200).json({
            status: "success",
            data: allAmbulences.rows,
            ambulance_hospital_map: ambulance_hospital_map
        });
        console.log(allAmbulences.rows);
    } catch (err) {
        console.error(err.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



