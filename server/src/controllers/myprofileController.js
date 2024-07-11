const pool = require("../../db");

const getUser = async (req, res, next) => {
  try {
    const id = req.params.userId;
    console.log(id);
    const user = await pool.query(
      `select u.name, u.email, u.user_type 
      from  "User" u
      where id = $1`,
      [id]
    );
    console.log(user.rows[0].user_type);
    res.status(200).json({ message: "user is returned", data: user.rows });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getUser };
