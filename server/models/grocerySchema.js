import { Schema, model } from 'mongoose';

const grocerySchema = new Schema({
  name: { type: String, required: true },
  locationId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'GroceryLocation',
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: 'GroceryCategory',
  },
  expiryDate: { type: Date, required: false, default: null },
  quantity: { type: Number, required: true },
  quantityUnit: { type: String, required: false, default: '' }, 
  ownerId: { type: Schema.Types.ObjectId, required: false, ref: 'User' },
  note: { type: String, required: false },
  expiryNotificationDate: { type: Date, required: false, default: null },
  restockNotificationDate: { type: Date, required: false, default: null },
  restockThreshold: { type: Number, required: false },
  restockerId: { type: Schema.Types.ObjectId, required: false, default: null },
  favourite: { type: Boolean, default: false, required: false },
  selectMeal: { type: Boolean, default: false, required: false },
  groupID: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
});

const groceryLocationSchema = new Schema({
  name: { type: String, required: true },
  colour: { type: String, required: true, default:'#c8c8c8' },
  groupID: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
});

const groceryCategorySchema = new Schema({
  name: { type: String, required: true },
  colour: { type: String, required: true, default:'#c8c8c8' },
  groupID: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
});

const Groceries = model('Groceries', grocerySchema);
const GroceryLocations = model('GroceryLocation', groceryLocationSchema);
const GroceryCategories = model('GroceryCategory', groceryCategorySchema);

export { Groceries, GroceryLocations, GroceryCategories };