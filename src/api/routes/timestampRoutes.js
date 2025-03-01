const express = require("express");
const router = express.Router();
const { Timestamp } = require("../../models");
const asyncHandler = require("express-async-handler");

// Create a new timestamp
router.post("/", asyncHandler(async (req, res) => {
    const timestamp = await Timestamp.create(req.body);
    res.status(201).json(timestamp);
}));

// Get all timestamps
router.get("/", asyncHandler(async (req, res) => {
  const timestamps = await Timestamp.findAll();
  res.json(timestamps);
}));

// Get a timestamp by ID
router.get("/:id", asyncHandler(async (req, res) => {
  const timestamp = await Timestamp.findByPk(req.params.id);
  timestamp ? res.json(timestamp) : res.status(404).json({ error: "Timestamp not found" });
}));

module.exports = router;
