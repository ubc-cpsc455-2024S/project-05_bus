import { createSlice } from '@reduxjs/toolkit';
import { REQUEST_STATE } from '../utils';
import { getUsersAsync, getGroupMembersAsync, getUserAsync, addUserAsync, deleteUserAsync, updateUserNameAsync} from './thunks';
import { PURGE } from 'redux-persist';

const initialState = {
  users: [],
  currentUserID: '',
  currentUserName: '',
  getUsers: REQUEST_STATE.IDLE,
  getGroupMembers: REQUEST_STATE.IDLE,
  getUser: REQUEST_STATE.IDLE,
  addUser: REQUEST_STATE.IDLE,
  deleteUser: REQUEST_STATE.IDLE,
  updateUserName: REQUEST_STATE.IDLE,
};


const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setCurrentUserID: (state, action) => {
      state.currentUserID = action.payload;
    },
    setCurrentUserName: (state, action) => {
      state.currentUserName = action.payload;
    },
    setUserGroupID: (state, action) => {
      const index = state.users.findIndex(
        (user) => user._id === action.payload.userID
      );
      if (index !== -1) {
        state.users[index] = {...state.users[index], groupID: action.payload.groupID};
      }
    }
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
      })
      .addCase(updateUserNameAsync.pending, (state) => {
        state.updateUserName = REQUEST_STATE.PENDING;
      })
      .addCase(updateUserNameAsync.fulfilled, (state, action) => {
        const index = state.users.findIndex(
          (user) => user._id === action.payload._id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
          if (state.currentUserID === action.payload._id) {
            state.currentUserName = `${action.payload.firstName} ${action.payload.lastName}`;
          }
          state.updateUserName = REQUEST_STATE.FULFILLED;
        }
      })
      .addCase(updateUserNameAsync.rejected, (state) => {
        state.updateUserName = REQUEST_STATE.REJECTED;
      })
      .addCase(PURGE, () => initialState);
  }
});

export const { setCurrentUserID, setCurrentUserName, setUserGroupID } = usersSlice.actions;
export default usersSlice.reducer;