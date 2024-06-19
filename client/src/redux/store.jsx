import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "./slices/calendarSlice";
import choresReducer from "./slices/choresSlice";
import membersReducer from "./slices/membersSlice";
import groceriesReducer from "./slices/groceriesSlice";
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
    members: membersReducer,
    groceries: groceriesReducer,
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
