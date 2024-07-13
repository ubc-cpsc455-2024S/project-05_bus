import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import {
  getGroceriesAsync,
  getGroceryAsync,
  addGroceryAsync,
  addGroceriesAsync,
  updateGroceryAsync,
  deleteGroceryAsync,
  getCategoriesAsync,
  getCategoryAsync,
  addCategoryAsync,
  updateCategoryAsync,
  deleteCategoryAsync,
  getLocationsAsync,
  getLocationAsync,
  addLocationAsync,
  updateLocationAsync,
  deleteLocationAsync,
} from "./thunks";

const initialState = {
  groceries: [],
  categories: [],
  locations: [],
  getGroceries: REQUEST_STATE.IDLE,
  getGrocery: REQUEST_STATE.IDLE,
  addGrocery: REQUEST_STATE.IDLE,
  addGroceries: REQUEST_STATE.IDLE,
  updateGrocery: REQUEST_STATE.IDLE,
  deleteGrocery: REQUEST_STATE.IDLE,
  getCategories: REQUEST_STATE.IDLE,
  getCategory: REQUEST_STATE.IDLE,
  addCategory: REQUEST_STATE.IDLE,
  updateCategory: REQUEST_STATE.IDLE,
  deleteCategory: REQUEST_STATE.IDLE,
  getLocations: REQUEST_STATE.IDLE,
  getLocation: REQUEST_STATE.IDLE,
  addLocation: REQUEST_STATE.IDLE,
  updateLocation: REQUEST_STATE.IDLE,
  deleteLocation: REQUEST_STATE.IDLE,
};

const groceriesSlice = createSlice({
  name: "groceries",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    handleGroceriesCases(builder);
    handleCategoriesCases(builder);
    handleLocationsCases(builder);
  },
});

const handleGroceriesCases = (builder) => {
  builder
    .addCase(getGroceriesAsync.pending, (state) => {
      state.getGroceries = REQUEST_STATE.PENDING;
    })
    .addCase(getGroceriesAsync.fulfilled, (state, action) => {
      state.groceries = action.payload;
      state.getGroceries = REQUEST_STATE.FULFILLED;
    })
    .addCase(getGroceriesAsync.rejected, (state) => {
      state.getGroceries = REQUEST_STATE.REJECTED;
    })
    .addCase(getGroceryAsync.pending, (state) => {
      state.getGroceries = REQUEST_STATE.PENDING;
    })
    .addCase(getGroceryAsync.fulfilled, (state, action) => {
      state.groceries = [...state.groceries, action.payload];
      state.getGroceries = REQUEST_STATE.FULFILLED;
    })
    .addCase(getGroceryAsync.rejected, (state) => {
      state.getGroceries = REQUEST_STATE.REJECTED;
    })
    .addCase(addGroceryAsync.pending, (state) => {
      state.addGrocery = REQUEST_STATE.PENDING;
    })
    .addCase(addGroceryAsync.fulfilled, (state, action) => {
      state.groceries = [...state.groceries, action.payload];
      state.addGrocery = REQUEST_STATE.FULFILLED;
    })
    .addCase(addGroceryAsync.rejected, (state) => {
      state.addGrocery = REQUEST_STATE.REJECTED;
    })
    .addCase(addGroceriesAsync.pending, (state) => {
      state.addGroceries = REQUEST_STATE.PENDING;
    })
    .addCase(addGroceriesAsync.fulfilled, (state, action) => {
      state.groceries = [...state.groceries, ...action.payload];
      state.addGroceries = REQUEST_STATE.FULFILLED;
    })
    .addCase(addGroceriesAsync.rejected, (state) => {
      state.addGroceries = REQUEST_STATE.REJECTED;
    })
    .addCase(updateGroceryAsync.pending, (state) => {
      state.updateGrocery = REQUEST_STATE.PENDING;
    })
    .addCase(updateGroceryAsync.fulfilled, (state, action) => {
      const index = state.groceries.findIndex(
        (grocery) => grocery._id === action.payload._id
      );
      if (index !== -1) {
        state.groceries[index] = action.payload;
      }
      state.updateGrocery = REQUEST_STATE.FULFILLED;
    })
    .addCase(updateGroceryAsync.rejected, (state) => {
      state.updateGrocery = REQUEST_STATE.REJECTED;
    })
    .addCase(deleteGroceryAsync.pending, (state) => {
      state.deleteGrocery = REQUEST_STATE.PENDING;
    })
    .addCase(deleteGroceryAsync.fulfilled, (state, action) => {
      state.groceries = state.groceries.filter(
        (grocery) => grocery._id !== action.payload._id
      );
      state.deleteGrocery = REQUEST_STATE.FULFILLED;
    })
    .addCase(deleteGroceryAsync.rejected, (state) => {
      state.deleteGrocery = REQUEST_STATE.REJECTED;
    });
};

const handleCategoriesCases = (builder) => {
  builder
    .addCase(getCategoriesAsync.pending, (state) => {
      state.getCategories = REQUEST_STATE.PENDING;
    })
    .addCase(getCategoriesAsync.fulfilled, (state, action) => {
      state.categories = action.payload;
      state.getCategories = REQUEST_STATE.FULFILLED;
    })
    .addCase(getCategoriesAsync.rejected, (state) => {
      state.getCategories = REQUEST_STATE.REJECTED;
    })
    .addCase(getCategoryAsync.pending, (state) => {
      state.getCategories = REQUEST_STATE.PENDING;
    })
    .addCase(getCategoryAsync.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
      state.getCategories = REQUEST_STATE.FULFILLED;
    })
    .addCase(getCategoryAsync.rejected, (state) => {
      state.getCategories = REQUEST_STATE.REJECTED;
    })
    .addCase(addCategoryAsync.pending, (state) => {
      state.addCategory = REQUEST_STATE.PENDING;
    })
    .addCase(addCategoryAsync.fulfilled, (state, action) => {
      state.categories = [...state.categories, action.payload];
      state.addCategory = REQUEST_STATE.FULFILLED;
    })
    .addCase(addCategoryAsync.rejected, (state) => {
      state.addCategory = REQUEST_STATE.REJECTED;
    })
    .addCase(deleteCategoryAsync.pending, (state) => {
      state.deleteCategory = REQUEST_STATE.PENDING;
    })
    .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
      state.deleteCategory = REQUEST_STATE.FULFILLED;
    })
    .addCase(deleteCategoryAsync.rejected, (state) => {
      state.deleteCategory = REQUEST_STATE.REJECTED;
    })
    .addCase(updateCategoryAsync.pending, (state) => {
      state.updateCategory = REQUEST_STATE.PENDING;
    })
    .addCase(updateCategoryAsync.fulfilled, (state, action) => {
      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
      state.updateCategory = REQUEST_STATE.FULFILLED;
    })
    .addCase(updateCategoryAsync.rejected, (state) => {
      state.updateCategory = REQUEST_STATE.REJECTED;
    });
};

const handleLocationsCases = (builder) => {
  builder
    .addCase(getLocationsAsync.pending, (state) => {
      state.getLocations = REQUEST_STATE.PENDING;
    })
    .addCase(getLocationsAsync.fulfilled, (state, action) => {
      state.locations = action.payload;
      state.getLocations = REQUEST_STATE.FULFILLED;
    })
    .addCase(getLocationsAsync.rejected, (state) => {
      state.getLocations = REQUEST_STATE.REJECTED;
    })
    .addCase(getLocationAsync.pending, (state) => {
      state.getLocations = REQUEST_STATE.PENDING;
    })
    .addCase(getLocationAsync.fulfilled, (state, action) => {
      state.locations = [...state.locations, action.payload];
      state.getLocations = REQUEST_STATE.FULFILLED;
    })
    .addCase(getLocationAsync.rejected, (state) => {
      state.getLocations = REQUEST_STATE.REJECTED;
    })
    .addCase(addLocationAsync.pending, (state) => {
      state.addLocation = REQUEST_STATE.PENDING;
    })
    .addCase(addLocationAsync.fulfilled, (state, action) => {
      state.locations = [...state.locations, action.payload];
      state.addLocation = REQUEST_STATE.FULFILLED;
    })
    .addCase(addLocationAsync.rejected, (state) => {
      state.addLocation = REQUEST_STATE.REJECTED;
    })
    .addCase(updateLocationAsync.pending, (state) => {
      state.updateLocation = REQUEST_STATE.PENDING;
    })
    .addCase(updateLocationAsync.fulfilled, (state, action) => {
      const index = state.locations.findIndex(
        (location) => location._id === action.payload._id
      );
      if (index !== -1) {
        state.locations[index] = action.payload;
      }
      state.updateLocation = REQUEST_STATE.FULFILLED;
    })
    .addCase(updateLocationAsync.rejected, (state) => {
      state.updateLocation = REQUEST_STATE.REJECTED;
    })
    .addCase(deleteLocationAsync.pending, (state) => {
      state.deleteLocation = REQUEST_STATE.PENDING;
    })
    .addCase(deleteLocationAsync.fulfilled, (state, action) => {
      state.locations = state.locations.filter(
        (location) => location._id !== action.payload._id
      );
      state.deleteLocation = REQUEST_STATE.FULFILLED;
    })
    .addCase(deleteLocationAsync.rejected, (state) => {
      state.deleteLocation = REQUEST_STATE.REJECTED;
    });
};

export default groceriesSlice.reducer;
