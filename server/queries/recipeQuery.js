import Recipes from '../models/recipeSchema.js';

const recipeQueries = {
  getAllRecipes: async function (groupID) {
    try {
      const recipes = await Recipes.find({ groupID });
      return recipes;
    } catch (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
  },
  postRecipe: async function (recipeData) {
    try {
      const newRecipe = new Recipes(recipeData);
      const savedRecipe = await newRecipe.save();
      return savedRecipe;
    } catch (error) {
      console.error('Error saving new recipe:', error);
      throw error;
    }
  },
  deleteRecipe: async function (id) {
    try {
      const result = await Recipes.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.error(`Error deleting recipe with id ${id}:`, error);
      throw error;
    }
  } 
};

export default recipeQueries;