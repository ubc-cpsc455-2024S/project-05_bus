import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chores: [
    { id: 0, title: "Wash the dishes", color: "#FF0000" },
    { id: 1, title: "Empty the garbage", color: "#00FF00" },
    { id: 2, title: "Buy groceries", color: "#0000FF" },
  ],
};

initialState.id = initialState.chores.length;

const choresSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {
    addChore: (state, action) => {
      const chore = {
        id: state.id++,
        ...action.payload,
      };
      state.chores.push(chore);
    },
    removeChore: (state, action) => {
      state.chores = state.chores.filter(
        (chore) => chore.id !== action.payload
      );
    },
  },
});

export const { addChore, removeChore } = choresSlice.actions;
export default choresSlice.reducer;
