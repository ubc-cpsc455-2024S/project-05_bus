import { createAsyncThunk } from '@reduxjs/toolkit';
import MealService from './service';
import { actionTypes } from './actionTypes';

export const getMeals = createAsyncThunk(
    actionTypes.GET_MEALS,
  async () => {
    return await MealService.getMeals();
  }
);

export const addMeal = createAsyncThunk(
    actionTypes.ADD_MEAL,
  async (newMeal) => {
    return await MealService.addMeal(newMeal);
  }
);

export const removeMeal = createAsyncThunk(
    actionTypes.DELETE_MEAL,
  async (id) => {
    return await MealService.removeMeal(id);
  }
);