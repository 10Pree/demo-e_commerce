require("dotenv").config();
const mysql = require('mysql2/promise');

let conn = null;
const connectDB = async () => {
  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
      waitForConnections: true,
  connectionLimit: 10
  });
  
  try{
  await pool.query('SELECT 1')
  conn = pool
  
  }catch(error){
    await pool.end().catch(()=>{})
    console.log("DB Not Connect");
  }
};

const getDB = () => {
  if (!conn) {
    throw new Error("DB Not Connect");
  }
  return conn;
};
module.exports = { connectDB, getDB };
