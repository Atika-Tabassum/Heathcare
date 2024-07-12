const express = require('express');
const app = express();
const port = 3001;
const pool = require('./db');
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

const myprofileRouter = require("./src/routers/myprofileRouter"); 
const patientRouter = require("./src/routers/patientRouter");
app.use("/patient",patientRouter);
app.use("/users", myprofileRouter);

const contentsRouter = require("./src/routers/contentsRouter");
app.use("/contents", contentsRouter);

const orgmedicalcampRouter = require("./src/routers/orgmedicalcampRouter");
app.use("/org", orgmedicalcampRouter);

const viewCampRouter = require("./src/routers/viewCampsRouter");
app.use("/view", viewCampRouter);

const doctorsRouter = require("./src/routers/doctorsRouter");
app.use("/doctors", doctorsRouter);

// app.use('/', (req, res) => {
//     res.send('Welcome to Home Page');
// });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    });



