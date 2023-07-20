const express = require("express");
const {
  getAllRecipes,
  createRecipe,
  saveRecipe,
} = require("../controllers/RecipeController");
const UserModel = require("../models/Users");
const RecipeModel = require("../models/Recipes");

const router = express.Router();

router.get("/", getAllRecipes);

router.post("/", createRecipe);

router.put("/", saveRecipe);

router.get("/savedRecipes/ids", async (req, res) => {
  try {
    const user = await UserModel.findById(req?.user?._id);
    return res.status(200).json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/savedRecipes", async (req, res) => {
  try {
    const user = await UserModel.findById(req?.user?._id);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user?.savedRecipes },
    });
    return res.status(200).json({ savedRecipes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
