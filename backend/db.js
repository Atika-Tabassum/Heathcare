const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Tahseen2003",
  host: "localhost",
  port: 5432,
  database: "healthcare",
});
module.exports = pool ;