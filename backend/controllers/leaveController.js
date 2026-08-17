const db = require("../config/db");

// ==========================
// GET ALL LEAVE
// ==========================
const getLeaves = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        l.id_leave,
        l.jenis_cuti,
        l.tanggal_mulai,
        l.tanggal_selesai,
        l.alasan,
        l.status,

        e.id_employee,
        e.nik,
        e.nama_lengkap

      FROM leave_requests l

      LEFT JOIN employees e
      ON l.id_employee = e.id_employee

      ORDER BY l.id_leave DESC
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
const getLeaveById = async (req, res) => {

  try {

    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM leave_requests WHERE id_leave=?",
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
const createLeave = async (req, res) => {

  try {

    const {
      id_employee,
      jenis_cuti,
      tanggal_mulai,
      tanggal_selesai,
      alasan,
      status,
    } = req.body;

    await db.query(
      `
      INSERT INTO leave_requests
      (
        id_employee,
        jenis_cuti,
        tanggal_mulai,
        tanggal_selesai,
        alasan,
        status
      )
      VALUES (?,?,?,?,?,?)
      `,
      [
        id_employee,
        jenis_cuti,
        tanggal_mulai,
        tanggal_selesai,
        alasan,
        status,
      ]
    );

    res.json({
      success: true,
      message: "Pengajuan cuti berhasil ditambahkan",
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
const updateLeave = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      id_employee,
      jenis_cuti,
      tanggal_mulai,
      tanggal_selesai,
      alasan,
      status,
    } = req.body;

    await db.query(
      `
      UPDATE leave_requests
      SET
      id_employee=?,
      jenis_cuti=?,
      tanggal_mulai=?,
      tanggal_selesai=?,
      alasan=?,
      status=?
      WHERE id_leave=?
      `,
      [
        id_employee,
        jenis_cuti,
        tanggal_mulai,
        tanggal_selesai,
        alasan,
        status,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Data cuti berhasil diupdate",
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
const deleteLeave = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM leave_requests WHERE id_leave=?",
      [id]
    );

    res.json({
      success: true,
      message: "Data cuti berhasil dihapus",
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
  getLeaves,
  getLeaveById,
  createLeave,
  updateLeave,
  deleteLeave,
};