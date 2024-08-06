import { createAsyncThunk } from '@reduxjs/toolkit';
import RecipeService from './service';
import { actionTypes } from './actionTypes';

export const getRecipesAsync = createAsyncThunk(
  actionTypes.GET_RECIPES,
  async (groupID) => {
    return await RecipeService.getRecipes(groupID);
  }
);

export const addRecipeAsync = createAsyncThunk(
  actionTypes.ADD_RECIPE,
  async (newRecipe) => {
    return await RecipeService.addRecipe(newRecipe);
  }
);

export const deleteRecipeAsync = createAsyncThunk(
  actionTypes.DELETE_RECIPE,
  async (id) => {
    return await RecipeService.deleteRecipe(id);
  }
);

export const generateRecipeAsync = createAsyncThunk(
  actionTypes.GENERATE_RECIPE,
  async (list) => {
    return await RecipeService.generateRecipe(list);
  }
);