import bcrypt from "bcryptjs";
import { db } from "../db.js";

const authController = async (req, res) => {
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
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "sunucu hatası." });
  }
};

export default authController;
