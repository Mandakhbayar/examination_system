import mysql from "mysql2/promise";

const pool = mysql.createPool(process.env.DATABASE_URL as string);

export default pool;
