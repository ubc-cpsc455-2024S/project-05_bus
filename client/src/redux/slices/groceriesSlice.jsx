import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const initialState = {
  groceries: [
    {
      id: "1",
      name: "Apple",
      locationId: "1",
      categoryId: "1",
      expiryDate: "2024-06-10T00:00:00.000",
      quantity: 10,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
    {
      id: "2",
      name: "Loaf of sliced bread",
      locationId: "2",
      categoryId: "2",
      expiryDate: "2024-06-10T00:00:00.000",
      quantity: 2,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
    {
      id: "3",
      name: "2L Homogenized Milk",
      locationId: "3",
      categoryId: "3",
      expiryDate: "2024-06-10T00:00:00.000",
      quantity: 1,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
    {
      id: "4",
      name: "Banana",
      locationId: "1",
      categoryId: "1",
      expiryDate: "2024-06-12T00:00:00.000",
      quantity: 6,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
    {
      id: "5",
      name: "Whole Wheat Bread",
      locationId: "2",
      categoryId: "2",
      expiryDate: "2024-06-15T00:00:00.000",
      quantity: 1,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
    {
      id: "6",
      name: "Cheddar Cheese",
      locationId: "3",
      categoryId: "3",
      expiryDate: "2024-07-01T00:00:00.000",
      quantity: 1,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
    {
      id: "7",
      name: "Orange Juice",
      locationId: "3",
      categoryId: "6",
      expiryDate: "2024-06-20T00:00:00.000",
      quantity: 2,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
    {
      id: "8",
      name: "Strawberries",
      locationId: "3",
      categoryId: "1",
      expiryDate: "2024-06-13T00:00:00.000",
      quantity: 1,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
    {
      id: "9",
      name: "Pasta",
      locationId: "2",
      categoryId: "2",
      expiryDate: "2025-06-10T00:00:00.000",
      quantity: 5,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
    {
      id: "10",
      name: "Yogurt",
      locationId: "3",
      categoryId: "3",
      expiryDate: "2024-06-25T00:00:00.000",
      quantity: 6,
      expiryNotificationDate: "",
      restockNotificationDate: "",
      restockThreshold: "",
      restockerId: "",
      favourite: false,
    },
  ],
  categories: [
    { id: "1", name: "Fruit" },
    { id: "2", name: "Grain" },
    { id: "3", name: "Dairy" },
    { id: "4", name: "Vegetables" },
    { id: "5", name: "Meat" },
    { id: "6", name: "Beverages" },
    { id: "7", name: "Snacks" },
    { id: "8", name: "Condiments" },
    { id: "9", name: "Seafood" },
    { id: "10", name: "Frozen Foods" },
  ],
  locations: [
    { id: "1", name: "Fruit Basket" },
    { id: "2", name: "Pantry" },
    { id: "3", name: "Fridge" },
    { id: "4", name: "Freezer" },
    { id: "5", name: "Cupboard" },
    { id: "6", name: "Vegetable Crisper" },
    { id: "7", name: "Wine Rack" },
    { id: "8", name: "Snack Drawer" },
  ],
};

const groceriesSlice = createSlice({
  name: "groceries",
  initialState,
  reducers: {
    addGrocery: (state, action) => {
      state.groceries.push({
        id: nanoid(),
        ...action.payload,
        expiryNotificationDate: "",
        restockNotificationDate: "",
        restockThreshold: "",
        restockerId: "",
      });
    },
    removeGrocery: (state, action) => {
      state.groceries = state.groceries.filter(
        (grocery) => grocery.id !== action.payload
      );
    },
    updateGrocery: (state, action) => {
      const index = state.groceries.findIndex(
        (grocery) => grocery.id === action.payload.id
      );
      if (index !== -1) {
        if (action.payload.expiryDate) {
          state.groceries[index].expiryNotificationDate = "";
        }
        state.groceries[index] = {
          ...state.groceries[index],
          ...action.payload,
        };
      }
    },
    addCategory: (state, action) => {
      state.categories.push({ id: nanoid(), name: action.payload });
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category.id !== action.payload
      );
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category.id === action.payload.id
      );
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...action.payload,
        };
      }
    },
    addLocation: (state, action) => {
      state.locations.push({ id: nanoid(), name: action.payload });
    },
    removeLocation: (state, action) => {
      state.locations = state.locations.filter(
        (location) => location.id !== action.payload
      );
    },
    updateLocation: (state, action) => {
      const index = state.locations.findIndex(
        (location) => location.id === action.payload.id
      );
      if (index !== -1) {
        state.locations[index] = {
          ...state.locations[index],
          ...action.payload,
        };
      }
    }
  },
});

export const {
  addGrocery,
  removeGrocery,
  updateGrocery,
  addCategory,
  removeCategory,
  updateCategory,
  addLocation,
  removeLocation,
  updateLocation,
} = groceriesSlice.actions;

export default groceriesSlice.reducer;
