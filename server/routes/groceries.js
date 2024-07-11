import express from "express";
import eventQueries from "../queries/eventQuery.js";
import groceryQueries from "../queries/groceryQuery.js";
import groceryLocationQueries from "../queries/groceryLocationQuery.js";
import groceryCategoryQueries from "../queries/groceryCategoryQuery.js";
import groceryMealQueries from "../queries/groceryMealQuery.js";
import dotenv from "dotenv";
import { OpenAI } from "openai";

dotenv.config();

// set up client key
const openai = new OpenAI({apiKey: process.env.API_KEY});

const router = express.Router();

// Grocery routes
router.get("/group/:groupID", async (req, res) => {
  try {
    const groceries = await groceryQueries.getAllGroceries(req.params.groupID);
    return res.json(groceries);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const grocery = await groceryQueries.getOneGrocery(req.params.id);
    return res.json(grocery);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newGrocery = await groceryQueries.postGrocery(req.body);
    return res.status(201).json(newGrocery);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const updatedGrocery = await groceryQueries.updateGrocery(req.body);
    return res.json(updatedGrocery);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await groceryQueries.deleteGrocery(req.params.id);
    await eventQueries.deleteGroceryEvents(req.params.id);
    return res.status(200).send({ message: "Grocery and related events deleted successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Grocery Location Routes
router.get("/locations/group/:groupID", async (req, res) => {
  try {
    const locations = await groceryLocationQueries.getAllLocations(req.params.groupID);
    return res.json(locations);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/locations/:id", async (req, res) => {
  try {
    const location = await groceryLocationQueries.getOneLocation(req.params.id);
    return res.json(location);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/locations", async (req, res) => {
  try {
    const newLocation = await groceryLocationQueries.postLocation(req.body);
    return res.status(201).json(newLocation);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch("/locations/:id", async (req, res) => {
  try {
    const updatedLocation = await groceryLocationQueries.updateLocation(req.body);
    return res.json(updatedLocation);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/locations/:id", async (req, res) => {
  const locationId = req.params.id;
  try {
    await groceryLocationQueries.deleteLocation(locationId);
    await groceryQueries.deleteManyGroceries({ locationId });
    return res.status(200).send({ message: "Location and related groceries deleted successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Grocery Category Routes
router.get("/categories/group/:groupID", async (req, res) => {
  try {
    const categories = await groceryCategoryQueries.getAllCategories(req.params.groupID);
    return res.json(categories);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/categories/:id", async (req, res) => {
  try {
    const category = await groceryCategoryQueries.getOneCategory(req.params.id);
    return res.json(category);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/categories", async (req, res) => {
  try {
    const newCategory = await groceryCategoryQueries.postCategory(req.body);
    return res.status(201).json(newCategory);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch("/categories/:id", async (req, res) => {
  try {
    const updatedCategory = await groceryCategoryQueries.updateCategory(req.body);
    return res.json(updatedCategory);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/categories/:id", async (req, res) => {
  const categoryId = req.params.id;
  try {
    await groceryCategoryQueries.deleteCategory(categoryId);
    await groceryQueries.deleteMany({ categoryId });
    return res.status(200).send({ message: "Category and related groceries deleted successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

// Grocery Meal Planning Routes
router.get("/meals", async (req, res) => {
  try {
    const meals = await groceryMealQueries.getAllMeals();
    return res.json(meals);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/meals", async (req, res) => {
  try {
    const newMeal = await groceryMealQueries.postMeal(req.body);
    return res.status(201).json(newMeal);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/meals/:id", async (req, res) => {
  try {
    await groceryMealQueries.deleteMeal(req.params.id);
    return res.status(200).send({ message: "Meal deleted successfully" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/generateMeal", async (req, res) => {
  try {
    let foodItemsList = req.body.map(item => `${item.name}: ${item.quantity}`).join(', ');
    const user_message = `Given the food items and their quantity in the list ${foodItemsList}, give me a recipe with the format recipe name, ingredients, and instructions that uses all or most of the food items listed specified without needing to use more than their specified quantity. Do no include any small talk or Here is a recipe, just give the recipe on its own. List ingredients and instructions out in a list. Can you give the recipe as an object in the form {"Recipe": "Apple pie", "Ingredients": ["1 onion", "2 bell peppers"], "Instructions": ["1. Prepare all the vegetables", "2. Heat olive oil in large pan"]}`;
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: user_message },
      ],
    });
    console.log(response.choices[0].message.content);
    const recipeObject = JSON.parse(response.choices[0].message.content);
    return res.status(200).json(recipeObject);;
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
})

export default router;
