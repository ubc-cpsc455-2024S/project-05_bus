import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  removeCategory,
  removeLocation,
  removeGrocery,
} from "./slices/groceriesSlice";
import { removeEvent } from "./slices/calendarSlice";

export const removeCategoryAndRelatedGroceries = createAsyncThunk(
  "categories/removeCategoryAndRelatedGroceries",
  async (categoryId, { dispatch, getState }) => {
    const state = getState();
    const relatedGroceries = state.groceries.filter(
      (grocery) => grocery.categoryId === categoryId
    );

    relatedGroceries.forEach((grocery) => {
      dispatch(removeGrocery(grocery.id));
    });

    dispatch(removeCategory(categoryId));
  }
);

export const removeLocationAndRelatedGroceries = createAsyncThunk(
  "locations/removeLocationAndRelatedGroceries",
  async (locationId, { dispatch, getState }) => {
    const state = getState();
    const relatedGroceries = state.groceries.groceries.filter(
      (grocery) => grocery.locationId === locationId
    );

    relatedGroceries.forEach((grocery) => {
      dispatch(removeGrocery(grocery.id));
    });

    dispatch(removeLocation(locationId));
  }
);

export const removeGroceryAndRelatedEvents = createAsyncThunk(
  "groceries/removeGroceryAndRelatedEvents",
  async (groceryId, { dispatch, getState }) => {
    const state = getState();
    const relatedEvents = state.events.events.filter(
      (event) => event.extendedProps.groceryId === groceryId
    );

    relatedEvents.forEach((event) => {
      dispatch(removeEvent(event.id));
    });
    dispatch(removeGrocery(groceryId));
  }
);
