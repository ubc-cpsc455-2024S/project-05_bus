import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./events/calendarSlice";
import choresReducer from "./chores/choresSlice";
import groceriesReducer from "./groceries/groceriesSlice";
import mealsReducer from "./meals/mealsSlice";
import usersReducer from "./slices/usersSlice";
import groupsReducer from "./slices/groupsSlice";

const store = configureStore({
  reducer: {
    events: calendarReducer,
    chores: choresReducer,
    groceries: groceriesReducer,
    meals: mealsReducer,
    users: usersReducer,
    groups: groupsReducer,
  },
});

export default store;
