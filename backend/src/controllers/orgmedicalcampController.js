const pool = require("../../db");

const getMedicalCamp = async (req, res, next) => {
    try {
        const id = req.params.userId;
        console.log("at post");
        console.log(id);
        const { location,date,description,selectedDoctor } = req.body;
        console.log(date);

        const newcamp = await pool.query("INSERT INTO medical_camps ( doctor_user_id,location,camp_date,description) VALUES($1, $2, $3, $4) RETURNING *",
            [id,location,date,description]
        );

        const notificationPromises = selectedDoctor.map((user_id) => {
            const message = newcamp.rows[0].camp_id;
            console.log(user_id);
            return pool.query(
                "INSERT INTO notifications (user_id, message) VALUES($1, $2)",
                [user_id, message]
            );
        });

        res.status(200).json({ message: "Camp is added" , data:newcamp.rows[0] });

    } catch (error) {
        console.log(error.message);
        next(error);
    }
};

module.exports = { getMedicalCamp };
