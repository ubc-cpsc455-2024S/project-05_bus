import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment-timezone';
import { nanoid } from "nanoid";

const initialState = {
  events: [],
  filter: false,
  currentStart: "",
  currentEnd: "",
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: {
      reducer: (state, action) => {
        const event = {
          id: nanoid(),
          ...action.payload,
        };
        state.events.push(event);
      },
      prepare: (event) => {
        const serializableDate =
          event.start instanceof Date ? moment(event.start).format() : event.start;
        return {
          payload: {
            ...event,
            start: serializableDate,
          },
        };
      },
    },
    removeEvent: (state, action) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    editEvent: {
      reducer: (state, action) => {
        const index = state.events.findIndex(
          (event) => event.id === action.payload.id
        );
        if (index !== -1) {
          state.events[index] = {
            ...state.events[index],
            ...action.payload,
            extendedProps: {
              ...state.events[index].extendedProps,
              ...action.payload.extendedProps,
            },
          };
        }
      },
      prepare: (event) => {
        const serializableDate =
          event.start instanceof Date ? moment(event.start).format() : event.start;
        return {
          payload: {
            ...event,
            start: serializableDate,
          },
        };
      },
    },
    toggleFilter: (state) => {
      state.filter = !state.filter;
    },
    updateMonthView(state, action) {
      state.currentStart = action.payload.currentStart;
      state.currentEnd = action.payload.currentEnd;
    }
  },
});

export const { addEvent, removeEvent, editEvent, toggleFilter, updateMonthView } = calendarSlice.actions;
export default calendarSlice.reducer;
