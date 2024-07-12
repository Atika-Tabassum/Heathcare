const express = require('express');
const app = express();
const port = 3001;
const pool = require('./db');
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());

const myprofileRouter = require("./src/routers/myprofileRouter");
app.use("/users", myprofileRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



