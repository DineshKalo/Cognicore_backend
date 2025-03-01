const express = require("express");
const router = express.Router();
const { VideoLink } = require("../../models");
const asyncHandler = require("express-async-handler");

// Create a new video link
router.post("/", asyncHandler(async (req, res) => {
    const videoLink = await VideoLink.create(req.body);
    res.status(201).json(videoLink);
}));

// Get all video links
router.get("/", asyncHandler(async (req, res) => {
  const videoLinks = await VideoLink.findAll();
  res.json(videoLinks);
}));

// Get a video link by ID
router.get("/:id", asyncHandler(async (req, res) => {
  const videoLink = await VideoLink.findByPk(req.params.id);
  videoLink ? res.json(videoLink) : res.status(404).json({ error: "Video link not found" });
}));

module.exports = router;
