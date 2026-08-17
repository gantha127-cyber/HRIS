const db = require("../config/db");

// ==========================
// GET ALL ATTENDANCE
// ==========================
const getAttendance = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        a.id_attendance,
        a.tanggal,
        a.jam_masuk,
        a.jam_keluar,
        a.status,
        e.id_employee,
        e.nama_lengkap,
        e.nik
      FROM attendance a
      LEFT JOIN employees e
      ON a.id_employee = e.id_employee
      ORDER BY a.id_attendance DESC
    `);

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================
// GET BY ID
// ==========================
const getAttendanceById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM attendance WHERE id_attendance = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
      });
    }

    res.json({
      success: true,
      data: rows[0],
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================
// CREATE
// ==========================
const createAttendance = async (req, res) => {
  try {
    const {
      id_employee,
      tanggal,
      jam_masuk,
      jam_keluar,
      status,
    } = req.body;

    await db.query(
      `
      INSERT INTO attendance
      (
        id_employee,
        tanggal,
        jam_masuk,
        jam_keluar,
        status
      )
      VALUES (?,?,?,?,?)
      `,
      [
        id_employee,
        tanggal,
        jam_masuk,
        jam_keluar,
        status,
      ]
    );

    res.json({
      success: true,
      message: "Absensi berhasil ditambahkan",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================
// UPDATE
// ==========================
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      id_employee,
      tanggal,
      jam_masuk,
      jam_keluar,
      status,
    } = req.body;

    await db.query(
      `
      UPDATE attendance
      SET
        id_employee = ?,
        tanggal = ?,
        jam_masuk = ?,
        jam_keluar = ?,
        status = ?
      WHERE id_attendance = ?
      `,
      [
        id_employee,
        tanggal,
        jam_masuk,
        jam_keluar,
        status,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Absensi berhasil diupdate",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ==========================
// DELETE
// ==========================
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM attendance WHERE id_attendance = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Absensi berhasil dihapus",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};