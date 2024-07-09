import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";
import choresReducer from "./slices/choresSlice";
import groceriesReducer from "./slices/groceriesSlice";
import usersReducer from "./slices/usersSlice";
import groupsReducer from "./slices/groupsSlice";
import mealsReducer from "./meals/mealsSlice";
import {
  deleteExpiryNotifications,
  deleteLocationRelatedGroceries,
  deleteCategoryRelatedGroceries,
  deleteGroceryRelatedEvents,
} from "./middleware";

const store = configureStore({
  reducer: {
    events: calendarReducer,
    chores: choresReducer,
    groceries: groceriesReducer,
    users: usersReducer,
    groups: groupsReducer,
    meals: mealsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      deleteExpiryNotifications,
      deleteLocationRelatedGroceries,
      deleteCategoryRelatedGroceries,
      deleteGroceryRelatedEvents
    ),
});

export default store;
