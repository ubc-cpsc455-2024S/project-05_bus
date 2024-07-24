import { createSelector } from "@reduxjs/toolkit";

const selectCurrentUser = (state) => state.users.currentUserID;
const selectEvents = (state) => state.events.events;
const selectGroceries = (state) => state.groceries.groceries;

export const selectCurrentUserEvents = createSelector(
  [selectEvents, selectCurrentUser],
  (events, currentUserID) =>
    events.filter((event) => event.extendedProps.memberId === currentUserID)
);

export const selectCurrentUserGroceries = createSelector(
  [selectGroceries, selectCurrentUser],
  (groceries, currentUserID) =>
    groceries.filter((grocery) => grocery.ownerId === currentUserID)
);
