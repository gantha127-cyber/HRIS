const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { findUserByUsername } = require("../models/userModel");

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await findUserByUsername(username);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Username tidak ditemukan",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Password salah",
            });
        }

        const token = jwt.sign(
            {
                id: user.id_user,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "8h",
            }
        );

        res.json({
            success: true,
            message: "Login berhasil",
            token,
            user: {
                id: user.id_user,
                username: user.username,
                role: user.role,
            },
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};

module.exports = {
    login,
};