import { createSelector } from 'reselect';

const selectUsers = (state) => state.users.users;
const selectCurrentGroup = (state, currentGroup) => currentGroup;
const selectCurrentUserID = (state) => state.users.currentUserID;

export const selectGroupMembers = createSelector(
  [selectUsers, selectCurrentGroup],
  (users, currentGroup) => {
    const memberIDs = new Set(currentGroup.memberIDs);
    return users.filter(user => memberIDs.has(user._id));
  }
);

export const selectAdmins = createSelector(
  [selectUsers, selectCurrentGroup],
  (users, currentGroup) => {
    const adminIDs = new Set(currentGroup.adminIDs);
    return users.filter(user => adminIDs.has(user._id));
  }
);

export const selectIsCurrentUserAdmin = createSelector(
  [selectCurrentUserID, selectCurrentGroup],
  (currentUserID, currentGroup) => {
    return currentGroup && currentGroup.adminIDs.includes(currentUserID);
  }
);