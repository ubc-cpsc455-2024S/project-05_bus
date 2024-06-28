import { Schema, model } from 'mongoose';

const grocerySchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    locationId: { type: String, required: true, ref: 'GroceryLocation' },
    categoryId: { type: String, required: true, ref: 'GroceryCategory' },
    expiryDate: { type: String, required: false },
    quantity: { type: Number, required: true },
    expiryNotificationDate: { type: String, required: false },
    restockNotificationDate: { type: String, required: false },
    restockThreshold: { type: String, required: false },
    restockerId: { type: String, required: false },
    favourite: { type: Boolean, required: false },
    selectMeal: { type: Boolean, required: false },
    groupID: { type: String, required: true, ref: 'Group' },
});

const groceryLocationSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    groupID: { type: String, required: true, ref: 'Group' },
});

const groceryCategorySchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    groupID: { type: String, required: true, ref: 'Group' },
});

const Groceries = model('Groceries', grocerySchema);
const GroceryLocations = model('GroceryLocation', groceryLocationSchema);
const GroceryCategories = model('GroceryCategory', groceryCategorySchema);

export default { Groceries, GroceryLocations, GroceryCategories };