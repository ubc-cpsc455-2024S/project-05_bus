import { createAsyncThunk } from '@reduxjs/toolkit';
import MealService from './service';
import { actionTypes } from './actionTypes';

export const getMealsAsync = createAsyncThunk(
    actionTypes.GET_MEALS,
  async () => {
    return await MealService.getMeals();
  }
);

export const addMealAsync = createAsyncThunk(
    actionTypes.ADD_MEAL,
  async (newMeal) => {
    return await MealService.addMeal(newMeal);
  }
);

export const removeMealAsync = createAsyncThunk(
    actionTypes.DELETE_MEAL,
  async (id) => {
    return await MealService.removeMeal(id);
  }
);

export const generateMealAsync = createAsyncThunk(
  actionTypes.GENERATE_MEAL,
async (list) => {
  return await MealService.generateMeal(list);
}
);