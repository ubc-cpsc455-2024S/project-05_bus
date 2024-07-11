import { createAsyncThunk } from "@reduxjs/toolkit";
import { removeMember, deleteGroup, addMember, addGroup } from "./slices/groupsSlice";
import { updateUser, updateGroupIDs, createUser, setCurrentUserID } from "./slices/usersSlice";
import { nanoid } from 'nanoid';

export const createUserAndSetCurrent = createAsyncThunk(
  'users/createUserAndSetCurrent',
  async (user, { dispatch }) => {
    const userID = nanoid();
    try {
      dispatch(createUser({ id: userID, groupID: null, ...user }));
    } catch (error) {
      console.log("Could not create user, got error: ", error.message);
      throw new Error({message: error.message});
    }

    try {
      dispatch(setCurrentUserID(userID));
      return userID;
    } catch (error) {
      console.log(`Could not set current user to ${userID}, got error: ${error.message}`);
      throw new Error({message: error.message});
    }
  }
)

export const createGroupAndAssignMembers = createAsyncThunk(
  'groups/createGroupAndAssignMembers',
  async (group, { dispatch }) => {
    const groupID = nanoid();
    try {
      dispatch(addGroup({ id: groupID, ...group }));
    } catch (error) {
      console.log("Could not add group, got error: ", error.message);
      throw new Error({message: error.message});
    }

    try {
      dispatch(updateGroupIDs({ groupID, memberIDs: group.memberIDs }));
      return groupID;
    } catch (error) {
      console.log(`Could not assign group ${groupID} to members, got error: ${error.message}`);
      throw new Error({message: error.message});
    }
  }
);

export const addGroupMember = createAsyncThunk(
  "groups/addGroupMember",
  async ({ groupID, userID }, { dispatch }) => {
    try {
      dispatch(addMember({groupID, userID}));
    } catch (error) {
      console.log(`Could not add member ${userID} to group ${groupID}, got error: ${error.message}`);
      throw new Error(error.message);
    }

    try {
      dispatch(updateUser({id: userID, updatedFields: {groupID}}));
    } catch (error) {
      console.log(`Could not assign group ${groupID} to user ${userID}, got error: ${error.message}`);
      throw new Error(error.message);
    }
  }
);

export const removeGroupMember = createAsyncThunk(
  "groups/removeGroupMember",
  async ({ groupID, userID }, { dispatch }) => {
    dispatch(removeMember({groupID, userID}));
    dispatch(updateUser({id: userID, updatedFields: {groupID: null}}));
  }
);

export const deleteGroupAndUnassignMembers = createAsyncThunk(
  "groups/deleteGroupAndUnassignMembers",
  async (groupID, { dispatch, getState }) => {
    const state = getState();
    state.users.users.forEach(user => {
      if (user.groupID == groupID) {
        dispatch(updateUser({id: user.id, updatedFields: {groupID: null}}));
      }
    });
    dispatch(deleteGroup(groupID));
  }
);
