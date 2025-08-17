require("dotenv").config;
let mysql = require("mysql");

let conn = null;
const connectDB = async () => {
  conn = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  });
  console.log("Connect to DB");
};

const getDB = () => {
  if (!conn) {
    throw new Error("DB Not Connect");
  }
  return conn;
};
module.exports = { connectDB, getDB };
