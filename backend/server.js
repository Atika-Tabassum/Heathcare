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
        // if (isNaN(hospitalId)) {
        //     return res.status(400).json({
        //         status: "fail",
        //         message: "Invalid hospital ID",
        //     });
        // }
        console.log(hospitalId);
        const hospitalInfo = await pool.query("SELECT * FROM users WHERE user_type = 'hospital' and user_id = $1", [hospitalId]);
        console.log('llllll');
        const doctorsInfo = await pool.query("SELECT u.*, d.specialisation from users u join doctors d on u.user_id = d.doctor_user_id where d.hospital_user_id=$1", [hospitalId]);
        console.log('llllll');
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



