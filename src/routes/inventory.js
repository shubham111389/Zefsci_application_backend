const express = require("express");
const inventoryRouter = express.Router();

const { userAuth } = require("../middlewares/auth");

const Inventory = require("../models/inventory");

inventoryRouter.post("/api/inventory", userAuth, async (req, res) => {
  try {
    const newInventoryItem = new Inventory(req.body);
    await newInventoryItem.save();
    res.status(201).json(newInventoryItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

inventoryRouter.get("/api/inventory", userAuth, async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = inventoryRouter;
