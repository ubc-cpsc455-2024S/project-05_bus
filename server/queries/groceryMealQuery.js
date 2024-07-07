import { GroceryMeals } from "../models/grocerySchema";

const groceryMealQueries = {
    getAllMeals: async function (groupID) {
        try {
            const meals = await GroceryMeals.find({ groupID });
            return meals;
        } catch (error) {
            console.error("Error fetching meals:", error);
            throw error;
        }
    },
    postMeal: async function (mealData) {
        try {
            const newMeal = new GroceryMeals(mealData);
            const savedMeal = await newMeal.save();
            return savedMeal;
        } catch (error) {
            console.error("Error saving new meal:", error);
            throw error;
        }
    },
    deleteMeal: async function (id) {
        try {
            const result = await GroceryMeals.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.error(`Error deleting meal with id ${id}:`, error);
            throw error;
        }
    } 
}

export default groceryMealQueries;