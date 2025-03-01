const express = require("express");
const router = express.Router();
const { Analysis } = require("../../models");
const asyncHandler = require("express-async-handler");

// Create a new analysis record
router.post("/", asyncHandler(async (req, res) => {
    const analysis = await Analysis.create(req.body);
    res.status(201).json(analysis);
}));

// Get all analysis records
router.get("/", asyncHandler(async (req, res) => {
  const analyses = await Analysis.findAll();
  res.json(analyses);
}));

// Get an analysis record by ID
router.get("/:id", asyncHandler(async (req, res) => {
  const analysis = await Analysis.findByPk(req.params.id);
  analysis ? res.json(analysis) : res.status(404).json({ error: "Analysis not found" });
}));

module.exports = router;
