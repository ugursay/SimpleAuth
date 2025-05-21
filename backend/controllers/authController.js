import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db.js";
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const [existingUser] = await db.execute(
      "SELECT * FROM users WHERE email=? OR username=?",
      [email, username]
    );
    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ message: "Bu kullanıcı adı veya email zaten kayıtlı" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.execute(
      "INSERT INTO users (username, email, password) VALUES (?,?,?)",
      [username, email, hashedPassword]
    );
    res.status(201).json({ message: "Kullanıcı başarıyla oluşturuldu." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "sunucu hatası." });
  }
};
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.execute("SELECT * FROM users WHERE email=?", [
      email,
    ]);
    if (rows.length === 0) {
      return res
        .status(400)
        .json({ message: "Bu email ile kayıtlı kullanıcı bulunamadı." });
    }
    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "şifre yanlış" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Giriş başarılı", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
