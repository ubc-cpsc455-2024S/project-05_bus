import { configureStore } from '@reduxjs/toolkit'
import calendarReducer  from './calendarSlice'
import choresReducer from './choresSlice';
import membersReducer from './membersSlice';

const store = configureStore({
  reducer: {
    events: calendarReducer,
    chores: choresReducer,
    members: membersReducer,
  },
})

export default store;