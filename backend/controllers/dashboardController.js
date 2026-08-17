const db = require("../config/db");

// ==========================
// DASHBOARD CARD
// ==========================
const getDashboard = async (req, res) => {
  try {

    const [[employee]] = await db.query(
      "SELECT COUNT(*) AS total FROM employees"
    );

    const [[department]] = await db.query(
      "SELECT COUNT(*) AS total FROM departments"
    );

    const [[position]] = await db.query(
      "SELECT COUNT(*) AS total FROM positions"
    );

    const [[attendance]] = await db.query(
      "SELECT COUNT(*) AS total FROM attendance"
    );

    const [[leave]] = await db.query(
      "SELECT COUNT(*) AS total FROM leave_requests"
    );

    const [[payroll]] = await db.query(
      "SELECT COUNT(*) AS total FROM payroll"
    );

    const [[salary]] = await db.query(
      "SELECT IFNULL(SUM(total_gaji),0) AS total FROM payroll"
    );

    res.json({
      success: true,
      data: {
        employees: employee.total,
        departments: department.total,
        positions: position.total,
        attendance: attendance.total,
        leave: leave.total,
        payroll: payroll.total,
        totalSalary: salary.total,
      },
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
// DASHBOARD CHART
// ==========================
const getDashboardCharts = async (req, res) => {
  try {

    const [attendanceChart] = await db.query(`
      SELECT
        status,
        COUNT(*) AS total
      FROM attendance
      GROUP BY status
    `);

    res.json({
      success: true,
      data: {
        attendanceChart,
      },
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
  getDashboard,
  getDashboardCharts,
};