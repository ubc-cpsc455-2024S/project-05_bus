import { combineReducers, configureStore } from '@reduxjs/toolkit';
import calendarReducer from './events/calendarSlice';
import choresReducer from './chores/choresSlice';
import groceriesReducer from './groceries/groceriesSlice';
import recipeReducer from './recipes/recipeSlice';
import usersReducer from './users/usersSlice';
import groupsReducer from './groups/groupsSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const rootReducer = combineReducers({
  events: calendarReducer,
  chores: choresReducer,
  groceries: groceriesReducer,
  recipes: recipeReducer,
  users: usersReducer,
  groups: groupsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};
 
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistor = persistStore(store);

export { store, persistor };

