import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from "../utils";
import { getUsersAsync, getGroupMembersAsync, getUserAsync, addUserAsync, deleteUserAsync} from './thunks';

const initialState = {
  users: [
    {
      _id: "668053007522f05c47e32853",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "password123",
      groupID: "6680530d7522f05c47e32859"
    },
    {
      _id: "668053007522f05c47e32854",
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: "password456",
      groupID: "6680530d7522f05c47e32859"
    }
  ],
  currentUserID: "668053007522f05c47e32853",
  getUsers: REQUEST_STATE.IDLE,
  getGroupMembers: REQUEST_STATE.IDLE,
  getUser: REQUEST_STATE.IDLE,
  addUser: REQUEST_STATE.IDLE,
  deleteUser: REQUEST_STATE.IDLE,
}


const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUserID: (state, action) => {
      state.currentUserID = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAsync.pending, (state) => {
        state.getUsers = REQUEST_STATE.PENDING;
      })
      .addCase(getUsersAsync.fulfilled, (state, action) => {
        state.users = action.payload;
        state.getUsers = REQUEST_STATE.FULFILLED;
      })
      .addCase(getUsersAsync.rejected, (state) => {
        state.getUsers = REQUEST_STATE.REJECTED;
      })
      .addCase(getGroupMembersAsync.pending, (state) => {
        state.getGroupMembers = REQUEST_STATE.PENDING;
      })
      .addCase(getGroupMembersAsync.fulfilled, (state) => {
        state.getGroupMembers = REQUEST_STATE.FULFILLED;
      })
      .addCase(getGroupMembersAsync.rejected, (state) => {
        state.getGroupMembers = REQUEST_STATE.REJECTED;
      })
      .addCase(getUserAsync.pending, (state) => {
        state.getUser = REQUEST_STATE.PENDING;
      })
      .addCase(getUserAsync.fulfilled, (state) => {
        state.getUser = REQUEST_STATE.FULFILLED;
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.getUser = REQUEST_STATE.REJECTED;
      })
      .addCase(addUserAsync.pending, (state) => {
        state.addUser = REQUEST_STATE.PENDING;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.users = [...state.users, action.payload];
        state.addUser = REQUEST_STATE.FULFILLED;
      })
      .addCase(addUserAsync.rejected, (state) => {
        state.addUser = REQUEST_STATE.REJECTED;
      })
      .addCase(deleteUserAsync.pending, (state) => {
        state.deleteUser = REQUEST_STATE.PENDING;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload._id);
        state.deleteUser = REQUEST_STATE.FULFILLED;
      })
      .addCase(deleteUserAsync.rejected, (state) => {
        state.deleteUser = REQUEST_STATE.REJECTED;
      });
  }
});

export const { setCurrentUserID } = usersSlice.actions;
export default usersSlice.reducer;