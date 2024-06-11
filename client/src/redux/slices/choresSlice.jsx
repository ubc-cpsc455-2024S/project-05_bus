import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chores: [
    { id: 0, title: "Wash the dishes", color: "#ff9d94" },
    { id: 1, title: "Empty the garbage", color: "#9DC183" },
    { id: 2, title: "Buy groceries", color: "#89CFF0" },
    { id: 3, title: "Water the plants", color: "#88B7B5" },
    { id: 4, title: "Organize the bookshelf", color: "#F5F5DC" },
    { id: 5, title: "Check and Use Expiring Food", color: "#c49bad" },
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
