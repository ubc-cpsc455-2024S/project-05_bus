import { createSelector } from 'reselect';

const selectUsers = (state) => state.users.users;
const selectCurrentGroup = (state, currentGroup) => currentGroup;

export const selectGroupMembers = createSelector(
  [selectUsers, selectCurrentGroup],
  (users, currentGroup) => {
    const memberIDs = new Set(currentGroup.memberIDs);
    return users.filter(user => memberIDs.has(user._id));
  }
);