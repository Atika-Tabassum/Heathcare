const pool = require("../../db");

const getCamps = async (req, res, next) => {
    try {
        const camps = await pool.query(`SELECT * FROM medical_camps mc join users u on mc.doctor_user_id=u.user_id`);
        console.log("camps:", camps.rows[0]);

        if (camps.rows.length === 0) {
            res.status(404).json({ message: "No camp found" });
        } else {
            res.status(200).json({
                message: "Camps loaded successfully",
                data: camps.rows
            });
        }
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}