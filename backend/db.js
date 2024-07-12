const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "carrot",
  host: "localhost",
  port: 5432,
  database: "healthcare",
});
module.exports = pool ;