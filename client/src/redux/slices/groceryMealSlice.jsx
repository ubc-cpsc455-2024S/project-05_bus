import { createSlice } from "@reduxjs/toolkit"
import { REQUEST_STATE } from './utils';
import { addMeal, getMeals, removeMeal } from '../thunks/groceryMealThunk';

const INITIAL_STATE = {
  list: [],
  getMeals: REQUEST_STATE.IDLE,
  addMeal: REQUEST_STATE.IDLE,
  removeMeal: REQUEST_STATE.IDLE,
  error: null
}

const groceryMealSlice = createSlice({
    name: 'meals',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getMeals.pending, (state) => {
          state.getMeals = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(getMeals.fulfilled, (state, action) => {
          state.getMeals = REQUEST_STATE.FULFILLED;
          state.list = action.payload;
        })
        .addCase(getMeals.rejected, (state, action) => {
          state.getMeals = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(addMeal.pending, (state) => {
          state.addMeal = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(addMeal.fulfilled, (state) => {
          state.addMeal = REQUEST_STATE.FULFILLED;
        })
        .addCase(addMeal.rejected, (state, action) => {
          state.addMeal = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
        .addCase(removeMeal.pending, (state) => {
          state.removeMeal = REQUEST_STATE.PENDING;
          state.error = null;
        })
        .addCase(removeMeal.fulfilled, (state) => {
          state.removeMeal = REQUEST_STATE.FULFILLED;
        })
        .addCase(removeMeal.rejected, (state, action) => {
          state.removeMeal = REQUEST_STATE.REJECTED;
          state.error = action.error;
        })
    }
  })

export default groceryMealSlice.reducer;