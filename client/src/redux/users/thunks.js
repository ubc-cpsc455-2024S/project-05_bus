import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import UsersService from './service';

export const getUsersAsync = createAsyncThunk(
  actionTypes.GET_USERS,
  async () => {
    return await UsersService.getAllUsers();
  }
);

export const getGroupMembersAsync = createAsyncThunk(
  actionTypes.GET_GROUP_MEMBERS,
  async () => {
    return await UsersService.getGroupMembers();
  }
);

export const getUserAsync = createAsyncThunk(actionTypes.GET_USER, async (id) => {
  return await UsersService.getUser(id);
});

export const postUserByEmailAsync = createAsyncThunk(actionTypes.POST_USER, async (email) => {
  return await UsersService.postUserByEmail(email);
});

export const addUserAsync = createAsyncThunk(
  actionTypes.ADD_USER,
  async (user) => {
    return await UsersService.addUser(user);
  }
);

export const deleteUserAsync = createAsyncThunk(
  actionTypes.DELETE_USER,
  async (id) => {
    const response = await UsersService.deleteUser(id);
    return response;
  }
);

export const updateUserNameAsync = createAsyncThunk(
  actionTypes.UPDATE_USER_NAME,
  async ({id, firstName, lastName}) => {
    return await UsersService.updateUserName(id, {firstName: firstName, lastName: lastName});
  }
);
