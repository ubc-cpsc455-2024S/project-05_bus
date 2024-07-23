import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from "../utils";
import { 
  getGroupsAsync,
  getGroupAsync,
  createGroupAsync,
  updateGroupNameAsync,
  addMemberAsync,
  removeMemberAsync,
  addAdminAsync,
  removeAdminAsync,
  deleteGroupAsync 
} from "./thunks";

const initialState = {
  groups: [],
  selectedMemberID: "6690889a83dc6d85ca91af4f",
  getGroups: REQUEST_STATE.IDLE,
  getGroup: REQUEST_STATE.IDLE,
  createGroup: REQUEST_STATE.IDLE,
  updateGroupName: REQUEST_STATE.IDLE,
  addMember: REQUEST_STATE.IDLE,
  removeMember: REQUEST_STATE.IDLE,
  addAdmin: REQUEST_STATE.IDLE,
  removeAdmin: REQUEST_STATE.IDLE,
  deleteGroup: REQUEST_STATE.IDLE,
};

const groupsSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    setSelectedMemberID: (state, action) => {
      state.selectedMemberID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGroupsAsync.pending, (state) => {
        state.getGroups = REQUEST_STATE.PENDING;
      })
      .addCase(getGroupsAsync.fulfilled, (state, action) => {
        state.groups = action.payload;
        state.getGroups = REQUEST_STATE.FULFILLED;
      })
      .addCase(getGroupsAsync.rejected, (state) => {
        state.getGroups = REQUEST_STATE.REJECTED;
      })
      .addCase(getGroupAsync.pending, (state) => {
        state.getGroup = REQUEST_STATE.PENDING;
      })
      .addCase(getGroupAsync.fulfilled, (state) => {
        state.getGroup = REQUEST_STATE.FULFILLED;
      })
      .addCase(getGroupAsync.rejected, (state) => {
        state.getGroup = REQUEST_STATE.REJECTED;
      })
      .addCase(createGroupAsync.pending, (state) => {
        state.createGroup = REQUEST_STATE.PENDING;
      })
      .addCase(createGroupAsync.fulfilled, (state, action) => {
        state.groups = [...state.groups, action.payload];
        state.createGroup = REQUEST_STATE.FULFILLED;
      })
      .addCase(createGroupAsync.rejected, (state) => {
        state.createGroup = REQUEST_STATE.REJECTED;
      })
      .addCase(updateGroupNameAsync.pending, (state) => {
        state.updateGroupName = REQUEST_STATE.PENDING;
      })
      .addCase(updateGroupNameAsync.fulfilled, (state, action) => {
        const index = state.groups.findIndex(
          (group) => group._id === action.payload._id
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
          state.updateGroupName = REQUEST_STATE.FULFILLED;
        }
      })
      .addCase(updateGroupNameAsync.rejected, (state) => {
        state.updateGroupName = REQUEST_STATE.REJECTED;
      })
      .addCase(addMemberAsync.pending, (state) => {
        state.addMember = REQUEST_STATE.PENDING;
      })
      .addCase(addMemberAsync.fulfilled, (state, action) => {
        const index = state.groups.findIndex(
          (group) => group._id === action.payload._id
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
          state.addMember = REQUEST_STATE.FULFILLED;
        }
      })
      .addCase(addMemberAsync.rejected, (state) => {
        state.addMember = REQUEST_STATE.REJECTED;
      })
      .addCase(removeMemberAsync.pending, (state) => {
        state.removeMember = REQUEST_STATE.PENDING;
      })
      .addCase(removeMemberAsync.fulfilled, (state, action) => {
        const index = state.groups.findIndex(
          (group) => group._id === action.payload._id
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
          state.removeMember = REQUEST_STATE.FULFILLED;
        }
      })
      .addCase(removeMemberAsync.rejected, (state) => {
        state.removeMember = REQUEST_STATE.REJECTED;
      })
      .addCase(addAdminAsync.pending, (state) => {
        state.addAdmin = REQUEST_STATE.PENDING;
      })
      .addCase(addAdminAsync.fulfilled, (state, action) => {
        const index = state.groups.findIndex(
          (group) => group._id === action.payload._id
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
          state.addAdmin = REQUEST_STATE.FULFILLED;
        } 
      })
      .addCase(addAdminAsync.rejected, (state) => {
        state.addAdmin = REQUEST_STATE.REJECTED;
      })
      .addCase(removeAdminAsync.pending, (state) => {
        state.removeAdmin = REQUEST_STATE.PENDING;
      })
      .addCase(removeAdminAsync.fulfilled, (state, action) => {
        const index = state.groups.findIndex(
          (group) => group._id === action.payload._id
        );
        if (index !== -1) {
          state.groups[index] = action.payload;
          state.removeAdmin = REQUEST_STATE.FULFILLED;
        }
      })
      .addCase(removeAdminAsync.rejected, (state) => {
        state.removeAdmin = REQUEST_STATE.REJECTED;
      })
      .addCase(deleteGroupAsync.pending, (state) => {
        state.deleteGroup = REQUEST_STATE.PENDING;
      })
      .addCase(deleteGroupAsync.fulfilled, (state, action) => {
        state.groups = state.groups.filter((group) => group._id !== action.payload._id);
        state.deleteGroup = REQUEST_STATE.FULFILLED;
      })
      .addCase(deleteGroupAsync.rejected, (state) => {
        state.deleteGroup = REQUEST_STATE.REJECTED;
      });
  }
});

export const { setSelectedMemberID } = groupsSlice.actions;
export default groupsSlice.reducer;
