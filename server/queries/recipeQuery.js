import Recipes from "../models/recipeSchema.js";

const recipeQueries = {
    getAllMeals: async function () {
        try {
            const meals = await Recipes.find();
            return meals;
        } catch (error) {
            console.error("Error fetching meals:", error);
            throw error;
        }
    },
    postMeal: async function (mealData) {
        try {
            const newMeal = new Recipes(mealData);
            const savedMeal = await newMeal.save();
            return savedMeal;
        } catch (error) {
            console.error("Error saving new meal:", error);
            throw error;
        }
    },
    deleteMeal: async function (id) {
        try {
            const result = await Recipes.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error(`Error deleting meal with id ${id}:`, error);
            throw error;
        }
    } 
}

export default recipeQueries;