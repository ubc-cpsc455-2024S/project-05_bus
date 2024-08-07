import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { getChoresAsync, getChoreAsync, addChoreAsync, updateChoreAsync, deleteChoreAsync } from './thunks';
import { PURGE } from 'redux-persist';

const initialState = {
  chores: [],
  getChores: REQUEST_STATE.IDLE,
  getChore: REQUEST_STATE.IDLE,
  addChore: REQUEST_STATE.IDLE,
  updateChore: REQUEST_STATE.IDLE,
  deleteChore: REQUEST_STATE.IDLE,
};

const choresSlice = createSlice({
  name: 'chores',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getChoresAsync.pending, (state) => {
        state.getChore = REQUEST_STATE.PENDING;
      })
      .addCase(getChoresAsync.fulfilled, (state, action) => {
        state.chores = action.payload;
        state.getChore = REQUEST_STATE.FULFILLED;
      })
      .addCase(getChoresAsync.rejected, (state) => {
        state.getChore = REQUEST_STATE.REJECTED;
      })
      .addCase(getChoreAsync.pending, (state) => {
        state.getChore = REQUEST_STATE.PENDING;
      })
      .addCase(getChoreAsync.fulfilled, (state, action) => {
        state.chores = [...state.chores, action.payload];
        state.getChore = REQUEST_STATE.FULFILLED;
      })
      .addCase(getChoreAsync.rejected, (state) => {
        state.getChore = REQUEST_STATE.REJECTED;
      })
      .addCase(addChoreAsync.pending, (state) => {
        state.addChore = REQUEST_STATE.PENDING;
      })
      .addCase(addChoreAsync.fulfilled, (state, action) => {
        state.chores = [...state.chores, action.payload];
        state.addChore = REQUEST_STATE.FULFILLED;
      })
      .addCase(addChoreAsync.rejected, (state) => {
        state.addChore = REQUEST_STATE.REJECTED;
      })
      .addCase(updateChoreAsync.pending, (state) => {
        state.updateChore = REQUEST_STATE.PENDING;
      })
      .addCase(updateChoreAsync.fulfilled, (state, action) => {
        const index = state.chores.findIndex(
          (chore) => chore._id === action.payload._id
        );
        if (index !== -1) {
          state.chores[index] = action.payload;
        }
        state.updateChore = REQUEST_STATE.FULFILLED;
      })
      .addCase(updateChoreAsync.rejected, (state) => {
        state.updateChore = REQUEST_STATE.REJECTED;
      })
      .addCase(deleteChoreAsync.pending, (state) => {
        state.deleteChore = REQUEST_STATE.PENDING;
      })
      .addCase(deleteChoreAsync.fulfilled, (state, action) => {
        state.chores = state.chores.filter((chore) => chore._id !== action.payload._id);
        state.deleteChore = REQUEST_STATE.FULFILLED;
      })
      .addCase(deleteChoreAsync.rejected, (state) => {
        state.deleteChore = REQUEST_STATE.REJECTED;
      })
      .addCase(PURGE, () => initialState);
  }
});

export default choresSlice.reducer;
