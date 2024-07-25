import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import GroupsService from "./service";
import { setUserGroupID } from "../users/usersSlice";

export const getGroupsAsync = createAsyncThunk(
  actionTypes.GET_GROUPS,
  async () => {
    return await GroupsService.getAllGroups();
  }
);

export const getGroupAsync = createAsyncThunk(actionTypes.GET_GROUP, async (id) => {
  return await GroupsService.getGroup(id);
});

export const createGroupAsync = createAsyncThunk(
  actionTypes.CREATE_GROUP,
  async (group) => {
    return await GroupsService.createGroup(group);
  }
);

export const updateGroupNameAsync = createAsyncThunk(
  actionTypes.UPDATE_GROUP_NAME,
  async ({id, newName}) => {
    return await GroupsService.updateGroupName(id, {name: newName});
  }
);

export const addMemberAsync = createAsyncThunk(
  actionTypes.ADD_MEMBER,
  async ({ groupID, userID }, thunkAPI) => {
    try {
      const updatedGroup = await GroupsService.addGroupMember(groupID, userID);
      thunkAPI.dispatch(setUserGroupID({ userID, groupID }));
      return updatedGroup;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeMemberAsync = createAsyncThunk(
  actionTypes.REMOVE_MEMBER,
  async ({ groupID, userID }, thunkAPI) => {
    try {
      const updatedGroup = await GroupsService.removeGroupMember(groupID, userID);
      thunkAPI.dispatch(setUserGroupID({ userID, groupID: null }));
      return updatedGroup;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addAdminAsync = createAsyncThunk(
  actionTypes.ADD_ADMIN,
  async ({groupID, userID}) => {
    return await GroupsService.addAdmin(groupID, userID);
  }
);

export const removeAdminAsync = createAsyncThunk(
  actionTypes.REMOVE_ADMIN,
  async ({groupID, userID}) => {
    return await GroupsService.removeAdmin(groupID, userID);
  }
);

export const deleteGroupAsync = createAsyncThunk(
  actionTypes.DELETE_GROUP,
  async ({groupID, currentUserID}, thunkAPI) => {
    try {
      const deletedGroup = await GroupsService.deleteGroup(groupID);
      thunkAPI.dispatch(setUserGroupID({ userID: currentUserID, groupID: null }));
      return deletedGroup;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
