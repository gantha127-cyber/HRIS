const express = require("express");
const router = express.Router();

const {
  getAttendance,
  getAttendanceById,
  createAttendance,
  updateAttendance,
  deleteAttendance,
} = require("../controllers/attendanceController");

// GET ALL
router.get("/", getAttendance);

// GET BY ID
router.get("/:id", getAttendanceById);

// CREATE
router.post("/", createAttendance);

// UPDATE
router.put("/:id", updateAttendance);

// DELETE
router.delete("/:id", deleteAttendance);

module.exports = router;