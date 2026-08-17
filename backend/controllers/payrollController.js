const db = require("../config/db");

// ==========================
// GET ALL PAYROLL
// ==========================
const getPayroll = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        p.id_payroll,
        p.bulan,
        p.tahun,
        p.gaji_pokok,
        p.tunjangan,
        p.bonus,
        p.potongan,
        p.total_gaji,

        e.id_employee,
        e.nik,
        e.nama_lengkap

      FROM payroll p

      LEFT JOIN employees e
      ON p.id_employee = e.id_employee

      ORDER BY p.id_payroll DESC
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
const getPayrollById = async (req, res) => {

  try {

    const { id } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM payroll WHERE id_payroll=?",
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
const createPayroll = async (req, res) => {

  try {

    let {
      id_employee,
      bulan,
      tahun,
      gaji_pokok,
      tunjangan,
      bonus,
      potongan,
    } = req.body;

    gaji_pokok = Number(gaji_pokok);
    tunjangan = Number(tunjangan);
    bonus = Number(bonus);
    potongan = Number(potongan);

    const total_gaji =
      gaji_pokok +
      tunjangan +
      bonus -
      potongan;

    await db.query(
      `
      INSERT INTO payroll
      (
        id_employee,
        bulan,
        tahun,
        gaji_pokok,
        tunjangan,
        bonus,
        potongan,
        total_gaji
      )
      VALUES (?,?,?,?,?,?,?,?)
      `,
      [
        id_employee,
        bulan,
        tahun,
        gaji_pokok,
        tunjangan,
        bonus,
        potongan,
        total_gaji,
      ]
    );

    res.json({
      success: true,
      message: "Payroll berhasil ditambahkan",
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
const updatePayroll = async (req, res) => {

  try {

    const { id } = req.params;

    let {
      id_employee,
      bulan,
      tahun,
      gaji_pokok,
      tunjangan,
      bonus,
      potongan,
    } = req.body;

    gaji_pokok = Number(gaji_pokok);
    tunjangan = Number(tunjangan);
    bonus = Number(bonus);
    potongan = Number(potongan);

    const total_gaji =
      gaji_pokok +
      tunjangan +
      bonus -
      potongan;

    await db.query(
      `
      UPDATE payroll
      SET
        id_employee=?,
        bulan=?,
        tahun=?,
        gaji_pokok=?,
        tunjangan=?,
        bonus=?,
        potongan=?,
        total_gaji=?
      WHERE id_payroll=?
      `,
      [
        id_employee,
        bulan,
        tahun,
        gaji_pokok,
        tunjangan,
        bonus,
        potongan,
        total_gaji,
        id,
      ]
    );

    res.json({
      success: true,
      message: "Payroll berhasil diupdate",
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
const deletePayroll = async (req, res) => {

  try {

    const { id } = req.params;

    await db.query(
      "DELETE FROM payroll WHERE id_payroll=?",
      [id]
    );

    res.json({
      success: true,
      message: "Payroll berhasil dihapus",
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
  getPayroll,
  getPayrollById,
  createPayroll,
  updatePayroll,
  deletePayroll,
};