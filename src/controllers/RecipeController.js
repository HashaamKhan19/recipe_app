const mongoose = require("mongoose");
const RecipeModel = require("../models/Recipes");
const UserModel = require("../models/Users");

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await RecipeModel.find({});
    return res.status(200).json({ recipes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createRecipe = async (req, res) => {
  const recipe = new RecipeModel(req.body);

  try {
    const result = await recipe.save();
    return res.status(201).json({ recipe: result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const saveRecipe = async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req?.body?.id);
    const user = await UserModel.findById(req?.body?.userID);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedRecipes.push(recipe);

    await user.save();

    return res
      .status(200)
      .json({ message: "Recipe saved", savedRecipes: user.savedRecipes });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllRecipes,
  createRecipe,
  saveRecipe,
};
