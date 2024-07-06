import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import GroceryService from "./service";
import { getAllEvents } from "../events/thunks"

export const getGroceries = createAsyncThunk(
  actionTypes.GET_GROCERIES,
  async (groupID) => {
    return await GroceryService.getAllGroceries(groupID);
  }
);

export const getGrocery = createAsyncThunk(
  actionTypes.GET_GROCERY,
  async (id) => {
    return await GroceryService.getOneGrocery(id);
  }
);

export const addGrocery = createAsyncThunk(
  actionTypes.ADD_GROCERY,
  async (grocery) => {
    return await GroceryService.postGrocery(grocery);
  }
);

export const updateGrocery = createAsyncThunk(
  actionTypes.UPDATE_GROCERY,
  async (grocery, { dispatch }) => {
    const response = await GroceryService.updateGrocery(grocery);
    dispatch(getAllEvents(grocery.groupID));
    return response;
  }
);

export const deleteGrocery = createAsyncThunk(
  actionTypes.DELETE_GROCERY,
  async (id) => {
    return await GroceryService.deleteGrocery(id);
  }
);

export const addCategory = createAsyncThunk(
  actionTypes.ADD_CATEGORY,
  async (category) => {
    return await GroceryService.postCategory(category);
  }
);

export const removeCategory = createAsyncThunk(
  actionTypes.REMOVE_CATEGORY,
  async (category) => {
    return await GroceryService.deleteCategory(category);
  }
);

export const updateCategory = createAsyncThunk(
  actionTypes.UPDATE_CATEGORY,
  async (category) => {
    return await GroceryService.updateCategory(category);
  }
);

export const addLocation = createAsyncThunk(
  actionTypes.ADD_LOCATION,
  async (location) => {
    return await GroceryService.postLocation(location);
  }
);

export const removeLocation = createAsyncThunk(
  actionTypes.REMOVE_LOCATION,
  async (location) => {
    return await GroceryService.deleteLocation(location);
  }
);

export const updateLocation = createAsyncThunk(
  actionTypes.UPDATE_LOCATION,
  async (location) => {
    return await GroceryService.updateLocation(location);
  }
);
