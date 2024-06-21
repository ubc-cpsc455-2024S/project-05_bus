import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  removeCategory,
  removeLocation,
  removeGrocery,
} from "./slices/groceriesSlice";
import { removeEvent } from "./slices/calendarSlice";
import { removeMember, deleteGroup, addMember, addGroup } from "./slices/groupsSlice";
import { updateUser, updateGroupIDs } from "./slices/usersSlice";
import { nanoid } from 'nanoid';

export const removeCategoryAndRelatedGroceries = createAsyncThunk(
  "categories/removeCategoryAndRelatedGroceries",
  async (categoryId, { dispatch, getState }) => {
    const state = getState();
    const relatedGroceries = state.groceries.filter(
      (grocery) => grocery.categoryId === categoryId
    );

    relatedGroceries.forEach((grocery) => {
      dispatch(removeGrocery(grocery.id));
    });

    dispatch(removeCategory(categoryId));
  }
);

export const removeLocationAndRelatedGroceries = createAsyncThunk(
  "locations/removeLocationAndRelatedGroceries",
  async (locationId, { dispatch, getState }) => {
    const state = getState();
    const relatedGroceries = state.groceries.groceries.filter(
      (grocery) => grocery.locationId === locationId
    );

    relatedGroceries.forEach((grocery) => {
      dispatch(removeGrocery(grocery.id));
    });

    dispatch(removeLocation(locationId));
  }
);

export const removeGroceryAndRelatedEvents = createAsyncThunk(
  "groceries/removeGroceryAndRelatedEvents",
  async (groceryId, { dispatch, getState }) => {
    const state = getState();
    const relatedEvents = state.events.events.filter(
      (event) => event.extendedProps.groceryId === groceryId
    );

    relatedEvents.forEach((event) => {
      dispatch(removeEvent(event.id));
    });
    dispatch(removeGrocery(groceryId));
  }
);

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
