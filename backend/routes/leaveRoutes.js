const express = require("express");
const router = express.Router();

const {
  getLeaves,
  getLeaveById,
  createLeave,
  updateLeave,
  deleteLeave,
} = require("../controllers/leaveController");

// GET ALL
router.get("/", getLeaves);

// GET BY ID
router.get("/:id", getLeaveById);

// CREATE
router.post("/", createLeave);

// UPDATE
router.put("/:id", updateLeave);

// DELETE
router.delete("/:id", deleteLeave);

module.exports = router;