import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  groups: [
    {
      id: 1,
      name: "W 10th Roommates",
      memberIDs: [1, 2, 3, 4]
    },
    {
      id: 2,
      name: "Karen's House",
      memberIDs: [5]
    }
  ],
  currentGroup: null
}

const groups = createSlice({
  name: 'groups',
  initialState,
  reducers: {
      createGroup: (state, action) => {
          const group = {
              id: uuidv4(),
              ...action.payload,
          }
          state.groups.push(group);
      },
      deleteGroup: (state, action) => {
          state.groups = state.groups.filter(group => group.id !== action.payload);
      },
      setCurrentGroup: (state, action) => {
          state.currentGroup = state.groups.find(group => group.id === action.payload);
      }
  },
});

export const { createGroup, deleteGroup, setCurrentGroup } = groups.actions;
export default groups.reducer;