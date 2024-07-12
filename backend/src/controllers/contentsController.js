const pool = require("../../db");

const getContents = async (req, res, next) => {
  try {
    const contents = await pool.query(`SELECT * FROM content`);
    console.log("contents:", contents.rows[0]);

    if (contents.rows.length === 0) {
      res.status(404).json({ message: "No content found" });
    } else {
      res.status(200).json({
        message: "Contents loaded successfully",
        data: contents.rows,
      });
    }
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getContents };
