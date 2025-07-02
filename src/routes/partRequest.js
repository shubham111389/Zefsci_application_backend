const express = require("express");
const partRequestRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const PartRequest = require("../models/partRequest");

partRequestRouter.post("/api/part-request", userAuth, async (req, res) => {
  try {
    const newPartRequest = new PartRequest(req.body);
    await newPartRequest.save();
    res.status(201).json(newPartRequest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = partRequestRouter;