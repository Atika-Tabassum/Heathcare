const express = require("express");
const app = express();
const port = 3001;
const pool = require("./db");
const cors = require("cors");
const path = require("path");
const http = require("http");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("joinChat", (userId) => {
        socket.join(userId);
    });

    socket.on("sendMessage", async (message) => {
        const { sender_id, receiver_id, message: text, sent_at } = message;
        const query =
            "INSERT INTO chats (sender_id, receiver_id, message, sent_at) VALUES ($1, $2, $3, $4) RETURNING *";
        try {
            const result = await pool.query(query, [
                sender_id,
                receiver_id,
                text,
                sent_at,
            ]);
            const savedMessage = result.rows[0];
            io.to(receiver_id).emit("newMessage", savedMessage);
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

//const bodyParser = require("body-parser");
//middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const locationRouter = require("./src/routers/locationRouter");
app.use("/location", locationRouter);

const hospitalRouter = require("./src/routers/hospitalRouter");
app.use("/hospital", hospitalRouter);

const hospitalForAmbRouter = require("./src/routers/hospitalForAmbRouter");
app.use("/hospitalForAmb", hospitalForAmbRouter);

const bloodDonationRouter = require("./src/routers/bloodDonationRouter");
app.use("/bloodDonation", bloodDonationRouter);

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

app.get("/healthcare/hospitals", async (req, res) => {
    try {
        const allHospitals = await pool.query(
            "SELECT * FROM users WHERE user_type = 'hospital'"
        );
        res.json(allHospitals.rows);
        console.log(allHospitals.rows);
    } catch (err) {
        console.error(err.message);
    }
});

//login
app.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;
    try {
        const query = `
            SELECT user_id, password, user_type FROM users WHERE email = $1 AND lower(user_type) = $2
        `;
        const result = await pool.query(query, [email, userType.toLowerCase()]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ message: 'Invalid email, password, or user type.' });
        }

        const user = result.rows[0];
        
        res.status(200).json({ message: 'Login successful!', userId: user.user_id, userType: user.user_type });
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

app.get("/healthcare/getHospitalInfo/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const hospitalId = parseInt(id, 10);
        console.log(hospitalId);
        const hospitalInfo = await pool.query(
            "SELECT * FROM users WHERE user_type = 'hospital' and user_id = $1",
            [hospitalId]
        );
        console.log("hello");
        const doctorsInfo = await pool.query(
            "SELECT u.*, s.name as specialisation from users u join doctors d on u.user_id = d.doctor_user_id join doctor_specializations ds on ds.doctor_user_id=d.doctor_user_id JOIN specializations s ON s.specialization_id = ds.specialization_id where d.hospital_user_id=$1",
            [hospitalId]
        );
        console.log("hello");
        console.log(hospitalInfo.rows);
        console.log(doctorsInfo.rows);
        res.status(200).json({
            status: "success",
            data: {
                hospital: hospitalInfo.rows[0],
                doctors: doctorsInfo.rows,
            },
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.get("/healthcare/doctors/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const doctorId = parseInt(id, 10);
        console.log(doctorId);
        const doctorInfo = await pool.query(
            `SELECT u.*, s.specialization, h.name as hospital_name 
                FROM users u 
                JOIN doctors d ON u.user_id = d.doctor_user_id 
                JOIN users h ON d.hospital_user_id = h.user_id 
                JOIN doctor_specializations ds ON ds.doctor_user_id = d.doctor_user_id
                WHERE u.user_type = 'doctor' AND u.user_id =  $1`,
            [doctorId]
        );
        console.log(doctorInfo.rows);
        res.status(200).json({
            status: "success",
            data: doctorInfo.rows[0],
        });
    } catch (err) {
        console.error(err.message);
    }
});

app.get('/healthcare/doctors', async (req, res) => {
    try {
        console.log('hello////////////////////');
        const allDoctors1 = await pool.query(`SELECT u.*, s.name as specialisation 
            FROM users u
            JOIN doctors d ON u.user_id = d.doctor_user_id
            JOIN users h ON d.hospital_user_id = h.user_id
            JOIN doctor_specializations ds ON ds.doctor_user_id = d.doctor_user_id
            JOIN specializations s ON s.specialization_id = ds.specialization_id
            WHERE u.user_type = 'doctor'`
        );

        console.log(allDoctors1.rows);

        const allDoctors2 = await pool.query(`SELECT DISTINCT u.*,h.name as hospital_name
            FROM users u
            JOIN doctors d ON u.user_id = d.doctor_user_id
            JOIN users h ON d.hospital_user_id = h.user_id
            JOIN doctor_specializations ds ON ds.doctor_user_id = d.doctor_user_id
            JOIN specializations s ON s.specialization_id = ds.specialization_id
            WHERE u.user_type = 'doctor'`
        );

        console.log('heloooo', allDoctors2.rows);




        // console.log(req.query.patient_id+'......');

        const pid = req.query.patient_id;

        const appointment = await pool.query("SELECT * FROM appointments WHERE patient_user_id = $1", [pid]);
        console.log(appointment.rows);

        // 
        const specializationMap = {};

        // Step 1: Group specializations by doctor_user_id
        allDoctors1.rows.forEach(row => {
            const userId = row.user_id;
            const specialization = row.specialisation;

            if (!specializationMap[userId]) {
                specializationMap[userId] = {
                    doctor_user_id: userId,
                    specializations: []
                };
            }

            specializationMap[userId].specializations.push(specialization);
        });

        // Step 2: Convert the object back to an array if needed
        const specializationArray = Object.values(specializationMap);

        console.log(specializationArray);
        console.log(specializationArray);



        res.status(200).json({
            status: "success",
            data: allDoctors2.rows,
            appointment: appointment.rows,
            specializationArray: specializationArray
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
        const availableAmbulances = await pool.query("SELECT * FROM ambulance_bookings WHERE is_booked = 'false'");
        const availableAmbulanceArray = [];
        availableAmbulances.rows.forEach(row => {
            availableAmbulanceArray.push(row.booking_id);
        });
        // for(let i = 0; i < availableAmbulanceArray.length; i++) {
        //     console.log(availableAmbulanceArray[i]);
        // }
        const totalAvailable = await pool.query("SELECT COUNT(*) FROM ambulance_bookings WHERE is_booked = 'false'");
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
});



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



app.get('/camps', async (req, res) => {
    try {
        console.log('hello');
        const allCamps = await pool.query("SELECT mc.*, h.name as hospital_name FROM medical_camps mc join users u on mc.doctor_user_id = u.user_id join users d on mc.doctor_user_id = d.doctor_user_id join doctors doc on d.doctor_user_id = doc.doctor_user_id join users h on doc.hospital_user_id = h.user_id ");
        console.log(allCamps.rows);
        const campDoctors = await pool.query(`SELECT u.*, s.specialization, mc.camp_id from users u join doctors d on u.user_id = d.doctor_user_id join medical_camp_doctors mcd on d.doctor_user_id = mcd.doctor_user_id join medical_camps mc on mcd.camp_id = mc.camp_id JOIN doctor_specializations ds ON ds.doctor_user_id = d.doctor_user_id JOIN specializations s ON s.specialization_id = doc.specialization_id WHERE u.user_type = 'doctor'`);
        let campsWithDoctors = {};
        campDoctors.rows.forEach(row => {
            if (campsWithDoctors[row.camp_id] === undefined) {
                campsWithDoctors[row.camp_id] = [];
            }
            let doctor = {
                camp_id: row.camp_id,
                doctor_name: row.name,
                specialiation: row.specialization
            };

            campsWithDoctors[row.camp_id].push(doctor);
        });

        // for (let camp_id in campsWithDoctors) {
        //     if (campsWithDoctors.hasOwnProperty(camp_id)) {
        //         console.log(`Camp ID: ${camp_id}`);
        //         campsWithDoctors[camp_id].forEach(doctor => {
        //             console.log(`Doctor Name: ${doctor.doctor_name}, Specialisation: ${doctor.specialisation}`);
        //         });
        //     }
        // }
        console.log(campsWithDoctors);


        res.status(200).json({
            status: "success",
            data: allCamps.rows,
            campsWithDoctors: campsWithDoctors
        });
    } catch (err) {
        console.error(err.message);
    }
});


app.post('/healthcare/appointment', async (req, res) => {
    try {
        const did = req.body.doctor_id;
        const pid = req.body.patient_id;
        const currentDate = new Date();
        const response = await pool.query("INSERT INTO appointments (patient_user_id, doctor_user_id, status,  appointment_date) VALUES ($1, $2, $3, $4) RETURNING *", [pid, did, 'pending', currentDate]);
        console.log(response.rows);

        res.status(200).json({
            status: "success",
            data: response.rows[0],
        });
    } catch (err) {
        console.error(err.message);
    }
});

//blog
// Get all blog posts
app.get('/blog/posts', async (req, res) => {
    const query = 'SELECT * FROM blog_posts';
    const result = await pool.query(query);
    res.json(result.rows);
});

// Get a single blog post
app.get('/blog/posts/:id', async (req, res) => {
    const query = 'SELECT * FROM blog_posts WHERE post_id = $1';
    const result = await pool.query(query, [req.params.id]);
    res.json(result.rows[0]);
});

// Create a new blog post
app.post('/blog/posts/:id', async (req, res) => {
    const { title, content, author_id, category_id } = req.body;
    const query = 'INSERT INTO blog_posts (title, content, author_id, category_id) VALUES ($1, $2, $3, $4) RETURNING *';
    const result = await pool.query(query, [title, content, author_id, category_id]);
    res.json(result.rows[0]);
});

// Update a blog post
app.put('/blog/posts/:id', async (req, res) => {
    const { title, content, category_id } = req.body;
    const query = 'UPDATE blog_posts SET title = $1, content = $2, category_id = $3 WHERE post_id = $4 RETURNING *';
    const result = await pool.query(query, [title, content, category_id, req.params.id]);
    res.json(result.rows[0]);
});

// Delete a blog post
app.delete('/blog/posts/:id', async (req, res) => {
    const query = 'DELETE FROM blog_posts WHERE post_id = $1';
    await pool.query(query, [req.params.id]);
    res.json({ message: 'Post deleted' });
});
//get all hospitals
app.get('/hospitals', async (req, res) => {
    const result = await pool.query(`SELECT * FROM users where user_type='hospital'`);
    res.json(result.rows);
  });


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
