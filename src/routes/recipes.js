const express = require("express");
const mongoose = require("mongoose");
const RecipeModel = require("../models/Recipes");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});
    return res.status(200).json({ recipes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);

  try {
    const result = await recipe.save();
    return res.status(201).json({ recipe: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
