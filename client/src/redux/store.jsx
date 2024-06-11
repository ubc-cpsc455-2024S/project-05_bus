import { configureStore } from '@reduxjs/toolkit'
import calendarReducer  from './slices/calendarSlice'
import choresReducer from './slices/choresSlice';
import membersReducer from './slices/membersSlice';
import groceriesReducer from './slices/groceriesSlice';

const store = configureStore({
  reducer: {
    events: calendarReducer,
    chores: choresReducer,
    members: membersReducer,
    groceries: groceriesReducer,
  },
})

export default store;