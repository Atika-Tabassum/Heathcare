const pool = require("../../db");
// const { get } = require("../routers/locationRouter");

const getUser = async (req, res, next) => {
  try {
    console.log("get user");
    const id = req.params.userId;
// query change korsi
    console.log(id);
    const user = await pool.query(
      `select u.name, u.email, u.password,u.contact_no, u.user_type, p.medical_history, l.*
      from  users u join patients p on u.user_id = p.patient_user_id
      join location l on u.location_id = l.location_id
      where user_id = $1`,
      [id]
    );
    console.log(user.rows[0]);
    res.status(200).json({ message: "user is returned", data: user.rows });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getChats = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const receiver = req.params.receiverId;
    const chats = await pool.query(
      `SELECT C.SENDER_ID,C.MESSAGE,C.SENT_AT,U.NAME AS CHAT_NAME
FROM CHATS C JOIN USERS U 
ON C.SENDER_ID=U.USER_ID 
WHERE C.RECEIVER_ID=$1 AND C.SENDER_ID=$2
UNION
SELECT C.SENDER_ID,C.MESSAGE,C.SENT_AT,U.NAME AS CHAT_NAME
FROM CHATS C JOIN USERS U
ON C.RECEIVER_ID=U.USER_ID
WHERE C.RECEIVER_ID=$2 AND C.SENDER_ID=$1
  ORDER BY 
      SENT_AT ASC;
  `,
      [userId, receiver]
    );

    if (chats.rows.length === 0) {
      return res.status(404).json({ message: "no chats found" });
    }
    console.log(chats.rows.length);
    res.status(200).json({ message: "chats are returned", data: chats.rows });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getAllChats = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const chats = await pool.query(
      `WITH S AS (
    SELECT 
        C.MESSAGE,
        C.SENT_AT,
        C.SENDER_ID AS USER1,
        C.SENDER_ID AS SENDER_ID,
        U.NAME AS CHAT_NAME
    FROM 
        CHATS C
    JOIN 
        USERS U ON C.SENDER_ID = U.USER_ID
    WHERE 
        C.RECEIVER_ID = $1  
),
T AS (
    SELECT 
        C.MESSAGE,
        C.SENT_AT,
        C.SENDER_ID AS SENDER_ID,
        C.RECEIVER_ID AS USER1,
        U.NAME AS CHAT_NAME
    FROM 
        CHATS C
    JOIN 
        USERS U ON C.RECEIVER_ID = U.USER_ID
    WHERE 
        C.SENDER_ID = $1  
)

SELECT 
    MESSAGE,
    SENT_AT,
    USER1,
    SENDER_ID,
    CHAT_NAME
FROM 
    (
        SELECT 
            MESSAGE,
            SENT_AT,
            SENDER_ID,
            USER1,
            CHAT_NAME
        FROM 
            S

        UNION ALL

        SELECT 
            MESSAGE,
            SENT_AT,
            SENDER_ID,
            USER1,
            CHAT_NAME
        FROM 
            T
    ) AS CombinedChats
ORDER BY 
    SENT_AT DESC;
`,
      [userId]
    );

    if (chats.rows.length === 0) {
      return res.status(404).json({ message: "no chats found" });
    }

    console.log(chats.rows);
    res.status(200).json({ message: "chats are returned", data: chats.rows });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

const getOtherUsers = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const otherUsers = await pool.query(
      `SELECT USER_ID, NAME, EMAIL
       FROM USERS
       WHERE USER_ID != $1 AND LOWER(USER_TYPE) <> 'hospital';
      ;`,
      [userId]
    );

    if (otherUsers.rows.length === 0) {
      return res.status(404).json({ message: "no other users found" });
    }

    res
      .status(200)
      .json({ message: "other users are returned", data: otherUsers.rows });
  } catch (error) {
    console.log(error.message);
    next(error);
  }
};

module.exports = { getUser, getChats, getAllChats, getOtherUsers };
