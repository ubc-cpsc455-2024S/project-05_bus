import { Schema, model } from 'mongoose';

const recipeSchema = new Schema({
  recipe: { type: String, required: true },
  estimatedtime: { type: String, required: true },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  groupID: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
});

const Recipes = model('Recipes', recipeSchema);

export default Recipes;