import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./events/calendarSlice";
import choresReducer from "./chores/choresSlice";
import groceriesReducer from "./groceries/groceriesSlice";
import usersReducer from "./users/usersSlice";
import groupsReducer from "./groups/groupsSlice";

const store = configureStore({
  reducer: {
    events: calendarReducer,
    chores: choresReducer,
    groceries: groceriesReducer,
    users: usersReducer,
    groups: groupsReducer,
  },
});

export default store;
