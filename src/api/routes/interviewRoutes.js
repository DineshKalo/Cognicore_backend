const express = require("express");
const router = express.Router();
const { Interview } = require("../../models");
const asyncHandler = require("express-async-handler");

// Create a new interview
router.post("/", asyncHandler(async (req, res) => {
    const interview = await Interview.create(req.body);
    res.status(201).json(interview);
}));

// Get all interviews
router.get("/", asyncHandler(async (req, res) => {
  const interviews = await Interview.findAll();
  res.json(interviews);
}));

// Get an interview by ID
router.get("/:id", asyncHandler(async (req, res) => {
  const interview = await Interview.findByPk(req.params.id);
  interview ? res.json(interview) : res.status(404).json({ error: "Interview not found" });
}));

module.exports = router;
