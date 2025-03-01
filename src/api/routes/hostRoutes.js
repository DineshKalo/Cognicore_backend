const express = require("express");
const router = express.Router();
const { Host } = require("../../models");
const asyncHandler = require("express-async-handler");

// Create a new host
router.post("/", asyncHandler(async (req, res) => {
    const host = await Host.create(req.body);
    res.status(201).json(host);
}));

// Get all hosts
router.get("/", asyncHandler(async (req, res) => {
  const hosts = await Host.findAll();
  res.json(hosts);
}));

// Get a host by ID
router.get("/:id", asyncHandler(async (req, res) => {
  const host = await Host.findByPk(req.params.id);
  host ? res.json(host) : res.status(404).json({ error: "Host not found" });
}));

module.exports = router;
