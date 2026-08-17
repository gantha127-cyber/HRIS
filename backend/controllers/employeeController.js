const db = require("../config/db");

// =======================
// GET ALL EMPLOYEES
// =======================
const getEmployees = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        e.id_employee,
        e.id_user,
        e.nik,
        e.nama_lengkap,
        e.email,
        e.no_hp,
        e.alamat,
        e.jenis_kelamin,
        e.tanggal_lahir,
        e.tanggal_masuk,
        e.id_department,
        e.id_position,
        e.status,
        d.nama_department,
        p.nama_position
      FROM employees e
      LEFT JOIN departments d
        ON e.id_department = d.id_department
      LEFT JOIN positions p
        ON e.id_position = p.id_position
      ORDER BY e.id_employee DESC
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

// =======================
// GET EMPLOYEE BY ID
// =======================
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      `
      SELECT *
      FROM employees
      WHERE id_employee = ?
      `,
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

// =======================
// CREATE EMPLOYEE
// =======================
const createEmployee = async (req, res) => {
  try {
    const {
      id_user,
      nik,
      nama_lengkap,
      email,
      no_hp,
      alamat,
      jenis_kelamin,
      tanggal_lahir,
      tanggal_masuk,
      id_department,
      id_position,
      status,
    } = req.body;

    await db.query(
      `
      INSERT INTO employees
      (
        id_user,
        nik,
        nama_lengkap,
        email,
        no_hp,
        alamat,
        jenis_kelamin,
        tanggal_lahir,
        tanggal_masuk,
        id_department,
        id_position,
        status
      )
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
      `,
      [
        id_user,
        nik,
        nama_lengkap,
        email,
        no_hp,
        alamat,
        jenis_kelamin,
        tanggal_lahir,
        tanggal_masuk,
        id_department,
        id_position,
        status,
      ]
    );

    res.json({
      success: true,
      message: "Data karyawan berhasil ditambahkan",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// UPDATE EMPLOYEE
// =======================
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      nik,
      nama_lengkap,
      email,
      no_hp,
      alamat,
      jenis_kelamin,
      tanggal_lahir,
      tanggal_masuk,
      id_department,
      id_position,
      status,
    } = req.body;

    await db.query(
      `
      UPDATE employees
      SET
        nik=?,
        nama_lengkap=?,
        email=?,
        no_hp=?,
        alamat=?,
        jenis_kelamin=?,
        tanggal_lahir=?,
        tanggal_masuk=?,
        id_department=?,
        id_position=?,
        status=?
      WHERE id_employee=?
      `,
      [
        nik,
        nama_lengkap,
        email,
        no_hp,
        alamat,
        jenis_kelamin,
        tanggal_lahir,
        tanggal_masuk,
        id_department,
        id_position,
        status,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Data berhasil diupdate",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =======================
// DELETE EMPLOYEE
// =======================
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM employees WHERE id_employee = ?",
      [id]
    );

    res.json({
      success: true,
      message: "Data karyawan berhasil dihapus",
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
  getEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};