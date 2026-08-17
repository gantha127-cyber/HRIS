const db = require("../config/db");

// ======================
// GET ALL POSITION
// ======================
const getPositions = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT *
      FROM positions
      ORDER BY id_position DESC
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

// ======================
// GET POSITION BY ID
// ======================
const getPositionById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM positions WHERE id_position=?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Position tidak ditemukan",
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

// ======================
// CREATE POSITION
// ======================
const createPosition = async (req, res) => {
  try {
    const { nama_position } = req.body;

    if (!nama_position) {
      return res.status(400).json({
        success: false,
        message: "Nama Position wajib diisi",
      });
    }

    await db.query(
      "INSERT INTO positions(nama_position) VALUES(?)",
      [nama_position]
    );

    res.json({
      success: true,
      message: "Position berhasil ditambahkan",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================
// UPDATE POSITION
// ======================
const updatePosition = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_position } = req.body;

    await db.query(
      `
      UPDATE positions
      SET nama_position=?
      WHERE id_position=?
      `,
      [nama_position, id]
    );

    res.json({
      success: true,
      message: "Position berhasil diupdate",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================
// DELETE POSITION
// ======================
const deletePosition = async (req, res) => {
  try {
    const { id } = req.params;

    await db.query(
      "DELETE FROM positions WHERE id_position=?",
      [id]
    );

    res.json({
      success: true,
      message: "Position berhasil dihapus",
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
  getPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition,
};