import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createConnection({
  host: "localhost",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("veritabanı bağlantı hatası;".err);
  } else {
    console.log("MySql veritabanına bağlanıldı");
  }
});

export default db;
