import { createSlice } from "@reduxjs/toolkit";
import { REQUEST_STATE } from "../utils";
import {
  getEventsAsync,
  getEventAsync,
  addEventAsync,
  deleteEventAsync,
  updateEventAsync,
} from "./thunks";

const initialState = {
  events: [],
  getEvents: REQUEST_STATE.IDLE,
  getEvent: REQUEST_STATE.IDLE,
  addEvent: REQUEST_STATE.IDLE,
  updateEvent: REQUEST_STATE.IDLE,
  deleteEvent: REQUEST_STATE.IDLE,
  filter: false,
  currentStart: "",
  currentEnd: "",
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    toggleFilter: (state) => {
      state.filter = !state.filter;
    },
    updateMonthView(state, action) {
      state.currentStart = action.payload.currentStart;
      state.currentEnd = action.payload.currentEnd;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEventsAsync.pending, (state) => {
        state.getEvents = REQUEST_STATE.PENDING;
      })
      .addCase(getEventsAsync.fulfilled, (state, action) => {
        state.events = action.payload;
        state.getEvents = REQUEST_STATE.FULFILLED;
      })
      .addCase(getEventsAsync.rejected, (state) => {
        state.getEvents = REQUEST_STATE.REJECTED;
      })
      .addCase(getEventAsync.pending, (state) => {
        state.getEvent = REQUEST_STATE.PENDING;
      })
      .addCase(getEventAsync.fulfilled, (state, action) => {
        state.events = [...state.events, action.payload];
        state.getEvent = REQUEST_STATE.FULFILLED;
      })
      .addCase(getEventAsync.rejected, (state) => {
        state.getEvent = REQUEST_STATE.REJECTED;
      })
      .addCase(addEventAsync.pending, (state) => {
        state.addEvent = REQUEST_STATE.PENDING;
      })
      .addCase(addEventAsync.fulfilled, (state, action) => {
        const event = { ...action.payload, id: action.payload._id}
        state.events = [...state.events, event];
        state.addEvent = REQUEST_STATE.FULFILLED;
      })
      .addCase(addEventAsync.rejected, (state) => {
        state.addEvent = REQUEST_STATE.REJECTED;
      })
      .addCase(updateEventAsync.pending, (state) => {
        state.updateEvent = REQUEST_STATE.PENDING;
      })
      .addCase(updateEventAsync.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event._id === action.payload._id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.updateEvent = REQUEST_STATE.FULFILLED;
      })
      .addCase(updateEventAsync.rejected, (state) => {
        state.updateEvent = REQUEST_STATE.REJECTED;
      })
      .addCase(deleteEventAsync.pending, (state) => {
        state.deleteEvent = REQUEST_STATE.PENDING;
      })
      .addCase(deleteEventAsync.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event._id !== action.payload._id
        );
        state.deleteEvent = REQUEST_STATE.FULFILLED;
      })
      .addCase(deleteEventAsync.rejected, (state) => {
        state.deleteEvent = REQUEST_STATE.REJECTED;
      });
  },
});

export default calendarSlice.reducer;
