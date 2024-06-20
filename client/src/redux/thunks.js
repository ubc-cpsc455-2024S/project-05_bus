import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  removeCategory,
  removeLocation,
  removeGrocery,
} from "./slices/groceriesSlice";
import { removeEvent } from "./slices/calendarSlice";
import { removeMember, deleteGroup, addMember, createGroup } from "./slices/groupsSlice";
import { updateUser } from "./slices/usersSlice";

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
  "groups/createGroupAndAssignMembers",
  async (group, { dispatch, getState }) => {
    const state = getState();
    const memberIDs = new Set(group.memberIDs);

    dispatch(createGroup(group));
    state.users.users.forEach(user => {
      const id = user.id;
      if (memberIDs.has(id)) {
        dispatch(updateUser({id, updatedFields: {groupID: group.id}}));
      }
    })
  }
);

export const addGroupMember = createAsyncThunk(
  "groups/addGroupMember",
  async (groupID, userID, { dispatch }) => {
    dispatch(addMember({groupID, userID}));
    dispatch(updateUser({id: userID, updatedFields: {groupID: groupID}}));
  }
);

export const removeGroupMember = createAsyncThunk(
  "groups/removeGroupMember",
  async (groupID, userID, { dispatch }) => {
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
