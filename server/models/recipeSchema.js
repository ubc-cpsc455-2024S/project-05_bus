import { Schema, model } from "mongoose";

// create schema
const recipeSchema = new Schema({
    groceryItems: { type: [String], required: true },
    recipe: { type: String, required: true },
    groupID: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
});

// create model
const Recipes = model("Recipes", recipeSchema);

export default Recipes;