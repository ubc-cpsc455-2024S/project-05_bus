import { Schema, model } from 'mongoose';

const grocerySchema = new Schema({
    name: { type: String, required: true },
    locationId: { type: Schema.Types.ObjectId, required: true, ref: 'GroceryLocation' },
    categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'GroceryCategory' },
    expiryDate: { type: String, required: false },
    quantity: { type: Number, required: true },
    expiryNotificationDate: { type: String, required: false },
    restockNotificationDate: { type: String, required: false },
    restockThreshold: { type: String, required: false },
    restockerId: { type: Schema.Types.ObjectId, required: false },
    favourite: { type: Boolean, default: false, required: false },
    selectMeal: { type: Boolean, default: false, required: false },
    groupID: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
});

const groceryLocationSchema = new Schema({
    name: { type: String, required: true },
    groupID: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
});

const groceryCategorySchema = new Schema({
    name: { type: String, required: true },
    groupID: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
});

const Groceries = model('Groceries', grocerySchema);
const GroceryLocations = model('GroceryLocation', groceryLocationSchema);
const GroceryCategories = model('GroceryCategory', groceryCategorySchema);

export { Groceries, GroceryLocations, GroceryCategories };