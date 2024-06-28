import { Schema, model } from 'mongoose';

// create schema
const recipeSchema = new Schema({
    id: { type: String, required: true, unique: true },
    groceryItems: { type: [String], required: true },
    recipe: { type: String, required: true },
    groupID: { type: String, required: true, ref: 'Group' },
});

// create model
const Recipes = model('Recipes', recipeSchema);

export default Recipes;