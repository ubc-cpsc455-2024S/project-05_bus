import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import ChoreService from "./service";
import { getEventsAsync } from "../events/thunks";

export const getChoresAsync = createAsyncThunk(
  actionTypes.GET_CHORES,
  async (groupID) => {
    return await ChoreService.getAllChores(groupID);
  }
);

export const getChoreAsync = createAsyncThunk(actionTypes.GET_CHORE, async (id) => {
  return await ChoreService.getOneChore(id);
});

export const addChoreAsync = createAsyncThunk(
  actionTypes.ADD_CHORE,
  async (chore) => {
    return await ChoreService.addChore(chore);
  }
);

export const updateChoreAsync = createAsyncThunk(
  actionTypes.UPDATE_CHORE,
  async (chore) => {
    return await ChoreService.updateChore(chore);
  }
);

export const deleteChoreAsync = createAsyncThunk(
  actionTypes.DELETE_CHORE,
  async (chore, { dispatch }) => {
    const response = await ChoreService.deleteChore(chore._id);
    dispatch(getEventsAsync(chore.groupID));
    return response;
  }
);
