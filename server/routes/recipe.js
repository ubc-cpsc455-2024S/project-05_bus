import express from "express";
import recipeQueries from "../queries/recipeQuery.js";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

// set up client key
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

const router = express.Router();

// Grocery Meal Planning Routes
router.get("/", async (req, res) => {
    try {
      const recipes = await recipeQueries.getAllRecipes();
      return res.json(recipes);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      const newRecipe = await recipeQueries.postRecipe(req.body);
      return res.status(201).json(newRecipe);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      await recipeQueries.deleteRecipe(req.params.id);
      return res.status(200).send({ message: "Recipe deleted successfully" });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
  
  router.post("/generateRecipe", async (req, res) => {
    try {
      let foodItemsList = req.body.map(item => `${item.name}: ${item.quantity}`).join(', ');
      const user_message = `Given the food items and their quantity in the list ${foodItemsList}, give me a recipe with the format recipe name, ingredients, and instructions that uses all or most of the food items listed specified without needing to use more than their specified quantity. You can incorporate other food items not in this list like salt, sugar, butter, etc. Do no include any small talk or Here is a recipe, just give the recipe on its own. List ingredients and instructions out in a list. Can you give the recipe as an object in the form {"Recipe": "Apple pie", "Ingredients": ["1 onion", "2 bell peppers"], "Instructions": ["1. Prepare all the vegetables", "2. Heat olive oil in large pan"]}`;
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: user_message },
        ],
      });
      console.log(response.choices[0].message.content);
      const recipeObject = JSON.parse(response.choices[0].message.content);
      return res.status(200).json(recipeObject);
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  })
  
  export default router;