const express = require("express");
const router = express.Router();

const {
  getDashboard,
  getDashboardCharts,
} = require("../controllers/dashboardController");

// Dashboard Card
router.get("/", getDashboard);

// Dashboard Chart
router.get("/charts", getDashboardCharts);

module.exports = router;