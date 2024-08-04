import { createSlice } from '@reduxjs/toolkit'
import { REQUEST_STATE } from '../utils';
import { addRecipeAsync, getRecipesAsync, deleteRecipeAsync, generateRecipeAsync } from './thunks';

const INITIAL_STATE = {
  list: [],
  recipe: {},
  getRecipesAsync: REQUEST_STATE.IDLE,
  addRecipeAsync: REQUEST_STATE.IDLE,
  deleteRecipeAsync: REQUEST_STATE.IDLE,
  generateRecipeAsync: REQUEST_STATE.IDLE,
  error: null
}

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRecipesAsync.pending, (state) => {
        state.getRecipes = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(getRecipesAsync.fulfilled, (state, action) => {
        state.getRecipes = REQUEST_STATE.FULFILLED;
        state.list = action.payload;
      })
      .addCase(getRecipesAsync.rejected, (state, action) => {
        state.getRecipes = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(addRecipeAsync.pending, (state) => {
        state.addRecipe = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(addRecipeAsync.fulfilled, (state) => {
        state.addRecipe = REQUEST_STATE.FULFILLED;
      })
      .addCase(addRecipeAsync.rejected, (state, action) => {
        state.addRecipe = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(deleteRecipeAsync.pending, (state) => {
        state.deleteRecipe = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(deleteRecipeAsync.fulfilled, (state) => {
        state.removeRecipe = REQUEST_STATE.FULFILLED;
      })
      .addCase(deleteRecipeAsync.rejected, (state, action) => {
        state.deleteRecipe = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
      .addCase(generateRecipeAsync.pending, (state) => {
        state.generateRecipe = REQUEST_STATE.PENDING;
        state.error = null;
      })
      .addCase(generateRecipeAsync.fulfilled, (state, action) => {
        state.generateRecipe = REQUEST_STATE.FULFILLED;
        state.recipe = action.payload;
      })
      .addCase(generateRecipeAsync.rejected, (state, action) => {
        state.generateRecipe = REQUEST_STATE.REJECTED;
        state.error = action.error;
      })
  }
})

export default recipeSlice.reducer;