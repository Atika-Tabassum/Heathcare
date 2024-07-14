const express = require('express');
const app = express();
const port = 3001;
const pool = require('./db');
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

const patientRouter = require("./src/routers/patientRouter");
app.use("/patient",patientRouter);
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

const ambulanceRouter = require("./src/routers/ambulanceRouter");
app.use("/ambulance", ambulanceRouter);

const hospitalRouter = require("./src/routers/hospitalRouter");
app.use("/hospital", hospitalRouter);
// app.use('/', (req, res) => {
//     res.send('Welcome to Home Page');
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



