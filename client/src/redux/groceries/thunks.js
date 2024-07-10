import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import GroceryService from "./service";
import { getEventsAsync } from "../events/thunks";

export const getGroceriesAsync = createAsyncThunk(
  actionTypes.GET_GROCERIES,
  async (groupID, { dispatch }) => {
    const response = await GroceryService.getAllGroceries(groupID);
    if (response) {
      await dispatch(getCategoriesAsync(groupID));
      await dispatch(getLocationsAsync(groupID));
    }
    return response;
  }
);

export const getGroceryAsync = createAsyncThunk(
  actionTypes.GET_GROCERY,
  async (id) => {
    return await GroceryService.getOneGrocery(id);
  }
);

export const addGroceryAsync = createAsyncThunk(
  actionTypes.ADD_GROCERY,
  async (grocery) => {
    return await GroceryService.postGrocery(grocery);
  }
);

export const updateGroceryAsync = createAsyncThunk(
  actionTypes.UPDATE_GROCERY,
  async (grocery, { dispatch }) => {
    const response = await GroceryService.updateGrocery(grocery);
    console.log(response);
    if (response) {
      await dispatch(getEventsAsync(response.groupID));
    }
    return response;
  }
);

export const deleteGroceryAsync = createAsyncThunk(
  actionTypes.DELETE_GROCERY,
  async (id) => {
    return await GroceryService.deleteGrocery(id);
  }
);

export const getCategoriesAsync = createAsyncThunk(
  actionTypes.GET_CATEGORIES,
  async (groupID) => {
    return await GroceryService.getCategories(groupID);
  }
);

export const getCategoryAsync = createAsyncThunk(
  actionTypes.GET_CATEGORY,
  async (id) => {
    return await GroceryService.getCategory(id);
  }
);

export const getLocationsAsync = createAsyncThunk(
  actionTypes.GET_LOCATIONS,
  async (groupID) => {
    return await GroceryService.getLocations(groupID);
  }
);

export const getLocationAsync = createAsyncThunk(
  actionTypes.GET_LOCATION,
  async (id) => {
    return await GroceryService.getLocation(id);
  }
);

export const addCategoryAsync = createAsyncThunk(
  actionTypes.ADD_CATEGORY,
  async (category) => {
    return await GroceryService.addCategory(category);
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  actionTypes.DELETE_CATEGORY,
  async (category, { dispatch }) => {
    const response = await GroceryService.deleteCategory(category._id);
    dispatch(getGroceriesAsync(category.groupID));
    return response;
  }
);

export const updateCategoryAsync = createAsyncThunk(
  actionTypes.UPDATE_CATEGORY,
  async (category) => {
    return await GroceryService.updateCategory(category);
  }
);

export const addLocationAsync = createAsyncThunk(
  actionTypes.ADD_LOCATION,
  async (location) => {
    return await GroceryService.addLocation(location);
  }
);

export const deleteLocationAsync = createAsyncThunk(
  actionTypes.DELETE_LOCATION,
  async (location, { dispatch }) => {
    const response = await GroceryService.deleteLocation(location._id);
    dispatch(getGroceriesAsync(location.groupID));
    return response;
  }
);

export const updateLocationAsync = createAsyncThunk(
  actionTypes.UPDATE_LOCATION,
  async (location) => {
    return await GroceryService.updateLocation(location);
  }
);
