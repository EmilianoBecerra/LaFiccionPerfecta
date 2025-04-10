import mysql, { PoolOptions } from "mysql2/promise";

const access: PoolOptions = {
  host: "localhost",
  user: "root",
  password: "1Mysql1_",
  database: "discussions",
  waitForConnections: true,
  connectionLimit: 10,
}

const pool = mysql.createPool(access);

export default pool;
