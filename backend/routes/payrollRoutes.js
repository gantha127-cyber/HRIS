const express = require("express");
const router = express.Router();

const {
  getPayroll,
  getPayrollById,
  createPayroll,
  updatePayroll,
  deletePayroll,
} = require("../controllers/payrollController");

// GET ALL
router.get("/", getPayroll);

// GET BY ID
router.get("/:id", getPayrollById);

// CREATE
router.post("/", createPayroll);

// UPDATE
router.put("/:id", updatePayroll);

// DELETE
router.delete("/:id", deletePayroll);

module.exports = router;