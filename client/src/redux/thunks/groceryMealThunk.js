import { createAsyncThunk } from '@reduxjs/toolkit';
import MealService from '../services/groceryMealService';

export const getMeals = createAsyncThunk(
    "meals/getMeals",
  async () => {
    return await MealService.getMeals();
  }
);

export const addMeal = createAsyncThunk(
    "meals/addMeal",
  async (newMeal) => {
    return await MealService.addMeal(newMeal);
  }
);

export const removeMeal = createAsyncThunk(
    "meals/removeMeal",
  async (id) => {
    return await MealService.removeMeal(id);
  }
);