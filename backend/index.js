import express from "express";
import db from "./db.js";

const app = express();

app.get("/", (req, res) => {
  res.send("veritabanı bağlantı testi");
});

app.listen(5000, () => {
  console.log("sunucu 5000 portunda çalışıyor...");
});
