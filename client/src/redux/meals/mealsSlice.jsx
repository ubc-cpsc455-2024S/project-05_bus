import { createSlice } from "@reduxjs/toolkit"
import { REQUEST_STATE } from "../utils";
import { addMealAsync, getMealsAsync, removeMealAsync, generateMealAsync } from './thunks';

const INITIAL_STATE = {
  list: [],
  recipe: "",
  getMealsAsync: REQUEST_STATE.IDLE,
  addMealAsync: REQUEST_STATE.IDLE,
  removeMealAsync: REQUEST_STATE.IDLE,
  generateMealAsync: REQUEST_STATE.IDLE,
  error: null
}

const groceryMealSlice = createSlice({
    name: 'meals',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getMealsAsync.pending, (state) => {
          state.getMeals = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getMealsAsync.fulfilled, (state, action) => {
          state.getMeals = REQUEST_STATE.FULFILLED;
          state.list = action.payload;
        })
        .addCase(getMealsAsync.rejected, (state, action) => {
          state.getMeals = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(addMealAsync.pending, (state) => {
          state.addMeal = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(addMealAsync.fulfilled, (state) => {
          state.addMeal = REQUEST_STATE.FULFILLED;
        })
        .addCase(addMealAsync.rejected, (state, action) => {
          state.addMeal = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(removeMealAsync.pending, (state) => {
          state.removeMeal = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(removeMealAsync.fulfilled, (state) => {
          state.removeMeal = REQUEST_STATE.FULFILLED;
        })
        .addCase(removeMealAsync.rejected, (state, action) => {
          state.removeMeal = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(generateMealAsync.pending, (state) => {
          state.generateMeal = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(generateMealAsync.fulfilled, (state, action) => {
          state.generateMeal = REQUEST_STATE.FULFILLED;
          state.recipe = action.payload;
        })
        .addCase(generateMealAsync.rejected, (state, action) => {
          state.generateMeal = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
    }
  })

export default groceryMealSlice.reducer;