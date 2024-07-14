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

const myprofileRouter = require("./src/routers/myprofileRouter");
const patientRouter = require("./src/routers/patientRouter");
const hospitalRouter=require("./src/routers/hospitalRouter");
app.use("/patient",patientRouter);
app.use("/users", myprofileRouter);
app.use("/hospital",hospitalRouter);

const contentsRouter = require("./src/routers/contentsRouter");
app.use("/contents", contentsRouter);

const orgmedicalcampRouter = require("./src/routers/orgmedicalcampRouter");
app.use("/org", orgmedicalcampRouter);

const viewCampRouter = require("./src/routers/viewCampsRouter");
app.use("/view", viewCampRouter);

const doctorsRouter = require("./src/routers/doctorsRouter");
app.use("/doctors", doctorsRouter);


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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

