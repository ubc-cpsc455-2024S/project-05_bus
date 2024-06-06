import { configureStore } from '@reduxjs/toolkit'
import calendarReducer  from './slices/calendarSlice'
import choresReducer from './slices/choresSlice';
import membersReducer from './slices/membersSlice';

const store = configureStore({
  reducer: {
    events: calendarReducer,
    chores: choresReducer,
    members: membersReducer,
  },
})

export default store;