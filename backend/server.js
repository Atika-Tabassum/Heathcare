const express = require('express');
const app = express();
const port = 3001;
const pool = require('./db');
const cors = require('cors');
const path = require('path');

//middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const myprofileRouter = require("./src/routers/myprofileRouter"); 
const patientRouter = require("./src/routers/patientRouter");
const hospitalRouter=require("./src/routers/hospitalRouter");
app.use("/patient",patientRouter);
app.use("/users", myprofileRouter);
app.use("/hospital",hospitalRouter);
app.use('/', (req, res) => {
    res.send('Welcome to Home Page');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });



