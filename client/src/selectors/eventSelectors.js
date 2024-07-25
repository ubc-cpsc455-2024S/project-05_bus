import { createSelector } from "@reduxjs/toolkit";

const selectEvents = (state) => state.events.events;
const selectCurrentUser = (state) => state.users.currentUserID;

export const selectActiveEvents = createSelector(
    [selectEvents, selectCurrentUser],
    (events, userId) =>
      events
        .filter((event) => {
          const { memberId, done, dismissedBy, reminder, reminded } = event.extendedProps;
  
          return (
            memberId === userId &&
            done === false &&
            (dismissedBy !== userId || !!reminder) &&
            !(reminder && reminded === false && dismissedBy === userId)
          );
        })
        .sort((a, b) => new Date(a.start) - new Date(b.start))
  );

export const selectDismissedEvents = createSelector(
  [selectEvents, selectCurrentUser],
  (events, userId) =>
    events
      .filter(
        (event) =>
          event.extendedProps.memberId !== userId &&
          event.extendedProps.done === false &&
          !!event.extendedProps.dismissedBy &&
          event.extendedProps.reminded === false
      )
      .sort((a, b) => new Date(a.start) - new Date(b.start))
);
