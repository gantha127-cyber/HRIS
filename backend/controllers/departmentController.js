const db = require("../config/db");

// ================= GET ALL =================
const getDepartments = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM departments ORDER BY id_department DESC"
    );

    res.json({
      success: true,
      data: rows,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= GET BY ID =================
const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM departments WHERE id_department=?",
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
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= CREATE =================
const createDepartment = async (req, res) => {
  try {
    const { nama_department } = req.body;

    await db.query(
      "INSERT INTO departments(nama_department) VALUES(?)",
      [nama_department]
    );

    res.json({
      success: true,
      message: "Department berhasil ditambahkan",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= UPDATE =================
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_department } = req.body;

    await db.query(
      "UPDATE departments SET nama_department=? WHERE id_department=?",
      [nama_department, id]
    );

    res.json({
      success: true,
      message: "Department berhasil diupdate",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ================= DELETE =================
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM departments WHERE id_department=?",
      [id]
    );

    res.json({
      success: true,
      message: "Department berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDepartments,
  getDepartmentById,
  createDepartment,
  updateDepartment,
  deleteDepartment,
};