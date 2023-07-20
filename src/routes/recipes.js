const express = require("express");
const {
  getAllRecipes,
  createRecipe,
} = require("../controllers/RecipeController");

const router = express.Router();

router.get("/", getAllRecipes);

router.post("/", createRecipe);

module.exports = router;
