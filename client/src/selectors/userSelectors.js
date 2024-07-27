import { createSelector } from "@reduxjs/toolkit";

const selectCurrentUser = (state) => state.users.currentUserID;
const selectGroceries = (state) => state.groceries.groceries;

export const selectCurrentUserGroceries = createSelector(
  [selectGroceries, selectCurrentUser],
  (groceries, currentUserID) =>
    groceries.filter((grocery) => grocery.ownerId === currentUserID)
);
