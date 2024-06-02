import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  id: 0,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    addEvent: {
      reducer: (state, action) => {
        const event = {
          id: state.id,
          ...action.payload,
        };
        state.events.push(event);
        state.id++;
      },
      prepare: (event) => {
        const serializableDate =
          event.start instanceof Date ? event.start.toISOString() : event.start;
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
          event.start instanceof Date ? event.start.toISOString() : event.start;
        return {
          payload: {
            ...event,
            start: serializableDate,
          },
        };
      },
    },
  },
});

export const { addEvent, removeEvent, editEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
