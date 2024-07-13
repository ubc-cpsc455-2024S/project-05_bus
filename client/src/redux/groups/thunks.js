import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import GroupsService from "./service";

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
  async ({groupID, userID}) => {
    return await GroupsService.addGroupMember(groupID, userID);
  }
);

export const removeMemberAsync = createAsyncThunk(
  actionTypes.REMOVE_MEMBER,
  async ({groupID, userID}) => {
    return await GroupsService.removeGroupMember(groupID, userID);
  }
);

export const deleteGroupAsync = createAsyncThunk(
  actionTypes.DELETE_GROUP,
  async (id) => {
    const response = await GroupsService.deleteGroup(id);
    return response;
  }
);
