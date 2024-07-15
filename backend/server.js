const express = require('express');
const app = express();
const port = 3001;
const pool = require('./db');
const cors = require('cors');
const path = require('path');

//const bodyParser = require("body-parser");
//middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const locationRouter = require("./src/routers/locationRouter");
app.use("/location",locationRouter);

const hospitalRouter=require("./src/routers/hospitalRouter");
app.use("/hospital",hospitalRouter);

const contentsRouter = require("./src/routers/contentsRouter");
app.use("/contents", contentsRouter);

const orgmedicalcampRouter = require("./src/routers/orgmedicalcampRouter");
app.use("/org", orgmedicalcampRouter);


const doctorsRouter = require("./src/routers/doctorsRouter");
app.use("/doctors", doctorsRouter);

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

//login
app.post('/login',async (req, res) => {
    const { email, password, userType } = req.body;
    
    try {
        // Check if the user exists and get the stored password
        const query = `
            SELECT user_id, password FROM users WHERE email = $1 AND user_type = $2
        `;
        const result = await pool.query(query, [email, userType]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email, password, or user type.' });
        }
        
        const user = result.rows[0];
        res.status(200).json({ message: 'Login successful!', userId: user.user_id });
    } catch (error) {
        console.error('Error logging in user:', error.message);
        res.status(500).json({ message: 'An error occurred during login.' });
    }
});


const viewRouter = require("./src/routers/viewRouter");
app.use("/view", viewRouter);


const ambulanceRouter = require("./src/routers/ambulanceRouter");
app.use("/ambulance", ambulanceRouter);

// app.use('/', (req, res) => {
//     res.send('Welcome to Home Page');
// });


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
        const arr = [];
        allAmbulences.rows.forEach(row => {
            arr.push(row.booking_id);
        });
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
        const availableAmbulances = await pool.query("SELECT * FROM ambulance_bookings WHERE is_booked = 'true'");
        const availableAmbulanceArray = [];
        availableAmbulances.rows.forEach(row => {
            availableAmbulanceArray.push(row.booking_id);
        });
        // for(let i = 0; i < availableAmbulanceArray.length; i++) {
        //     console.log(availableAmbulanceArray[i]);
        // }
        const totalAvailable = await pool.query("SELECT COUNT(*) FROM ambulance_bookings WHERE is_booked = 'true'");
        console.log(totalAvailable.rows[0].count);
        res.status(200).json({
            status: "success",
            data: arr,
            ambulance_hospital_map: ambulance_hospital_map,
            availableAmbulances: availableAmbulanceArray,
            totalAvailable: totalAvailable.rows[0].count
        });
        // console.log(allAmbulences.rows);
    } catch (err) {
        console.error(err.message);
    }


    app.put('/bookambulance/:id', async (req, res) => {
        try {
            console.log(`Received PUT request to /bookambulance/${req.params.id}`);
            const { id } = req.params;
            const bookingId = parseInt(id, 10);
            console.log(bookingId + 'server');
            const response = await pool.query("UPDATE ambulance_bookings SET is_booked = 'true' WHERE booking_id = $1", [bookingId]);
            console.log('Database response:', response);

            if (response.rows.length === 0) {
                res.status(404).json({ error: "Booking ID not found" });
            } else {
                res.status(200).json({
                    status: "success",
                    data: response.rows[0]
                });
                console.log(response.rows[0]);
            }
        } catch (err) {
            console.error(err.message);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

