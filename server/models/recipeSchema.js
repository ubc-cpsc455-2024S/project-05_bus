const mongoose = require('mongoose');

// create schema
const recipeSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    groceryItems: { type: [String], required: true },
    recipe: { type: String, required: true },
});

// create model
const Recipes = mongoose.model('Recipes', recipeSchema);

module.exports = Recipes;