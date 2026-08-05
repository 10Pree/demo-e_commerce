require("dotenv").config();
const mysql = require('mysql2/promise');

let pool = null;
const connectDB = async () => {
  const newPool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
      waitForConnections: true,
  connectionLimit: 10
  });
  
  try{
    await newPool.query('SELECT 1')
    pool = newPool
  
  }catch(error){
    await newPool.end().catch(()=>{})
    console.log("DB Not Connect");
  }
};

const getDB = () => {
  if (!pool) {
    throw new Error("DB Not Connect");
  }
  return pool;
};

const getConnection = async () => {
  if(!pool){
    throw new Error("DB Not Connect");
  }
  return await pool.getConnection();
}
module.exports = { connectDB, getDB };
