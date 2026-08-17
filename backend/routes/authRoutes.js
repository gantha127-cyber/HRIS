const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Username dan password wajib diisi",
            });
        }

        const [users] = await db.query(
            "SELECT * FROM users WHERE username = ?",
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({
                success: false,
                message: "Username atau password salah",
            });
        }

        const user = users[0];

        console.log("Password dari request :", password);
        console.log("Hash di database      :", user.password);

        const isMatch = await bcrypt.compare(password, user.password);

        console.log("Hasil compare :", isMatch);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Username atau password salah",
            });
        }

        const token = jwt.sign(
            {
                id_user: user.id_user,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.json({
            success: true,
            message: "Login berhasil",
            token,
            user: {
                id_user: user.id_user,
                username: user.username,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
});

module.exports = router;