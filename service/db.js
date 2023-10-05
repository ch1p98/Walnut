/* eslint-disable no-param-reassign */
const mysql = require("mysql2/promise");
require("dotenv").config();

const config = {
  db: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "walnut",
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0,
  },
};

const pool = mysql.createPool(config.db);

async function execute(sql, params) {
  // check array
  if (typeof params === "object" && params[0]) {
    params = params.map((param) => String(param));
  }

  // check number
  if (typeof params === "number") {
    params = String(params);
  }

  // check string
  if (typeof params === "string") {
    params = [params];
  }

  const [results] = await pool.execute(sql, params);
  console.log("results at db.js is: ", results);
  return results;
}

module.exports = { execute, pool };
