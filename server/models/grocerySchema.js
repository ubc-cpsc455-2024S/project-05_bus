const mongoose = require('mongoose');

// create schema
const grocerySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    locationId: { type: String, required: true },
    categoryId: { type: String, required: true },
    expiryDate: { type: String, required: true },
    quantity: { type: Number, required: true },
    expiryNotificationDate: { type: String, required: true },
    restockNotificationDate: { type: String, required: true },
    restockThreshold: { type: String, required: true },
    restockerId: { type: String, required: true },
    favourite: { type: Boolean, required: true },
    selectMeal: { type: Boolean, required: true },
});

// create model
const Groceries = mongoose.model('Groceries', grocerySchema);

module.exports = Groceries;