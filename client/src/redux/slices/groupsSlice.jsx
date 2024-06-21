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
    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },
    deleteGroup: (state, action) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
    addMember: (state, action) => {
      const { groupID, userID } = action.payload;
      const groupIndex = state.groups.findIndex(group => group.id == groupID);
      state.groups[groupIndex].memberIDs = state.groups[groupIndex].push(userID);
    },
    removeMember: (state, action) => {
      const { groupID, userID } = action.payload;
      const groupIndex = state.groups.findIndex(group => group.id == groupID);
      state.groups[groupIndex].memberIDs = state.groups[groupIndex].memberIDs.filter(memberID => memberID !== userID);
    },
  },
});

export const { addGroup, deleteGroup, addMember, removeMember } = groups.actions;
export default groups.reducer;