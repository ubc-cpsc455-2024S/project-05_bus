import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  groups: [
    {
      _id: "6680530d7522f05c47e32859",
      name: "Group One",
      memberIDs: ["668053007522f05c47e32853", "668053007522f05c47e32854"]
    },
  ],
  selectedMemberID: ""
}

const groups = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    addGroup: (state, action) => {
      if (!state.groups.find(group => group._id === action.payload._id)) {
        state.groups.push(action.payload);
      } else {
        console.log(`A group with id ${action.payload._id} already exists`);
      }
    },
    deleteGroup: (state, action) => {
      state.groups = state.groups.filter(group => group.id !== action.payload);
    },
    addMember: (state, action) => {
      const { groupID, userID } = action.payload;
      const groupIndex = state.groups.findIndex(group => group._id == groupID);
      if (!state.groups[groupIndex].memberIDs.includes(userID)) {
        state.groups[groupIndex].memberIDs.push(userID);
      } else {
        console.log(`User ${userID} is already part of group ${groupID}`);
      }
    },
    removeMember: (state, action) => {
      const { groupID, userID } = action.payload;
      const groupIndex = state.groups.findIndex(group => group._id == groupID);
      state.groups[groupIndex].memberIDs = state.groups[groupIndex].memberIDs.filter(memberID => memberID !== userID);
    },
    setSelectedMemberID: (state, action) => {
      state.selectedMemberID = action.payload;
    },
  },
});

export const { addGroup, deleteGroup, addMember, removeMember, setSelectedMemberID } = groups.actions;
export default groups.reducer;