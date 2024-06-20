import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [
    {
      id: "1",
      name: "W 10th Roommates",
      memberIDs: ["1", "2", "3", "4"]
    },
  ]
}

const groups = createSlice({
  name: 'groups',
  initialState,
  reducers: {
      createGroup: (state, action) => {
          state.groups.push(action.payload);
      },
      deleteGroup: (state, action) => {
          state.groups = state.groups.filter(group => group.id !== action.payload);
      }
  },
});

export const { createGroup, deleteGroup } = groups.actions;
export default groups.reducer;