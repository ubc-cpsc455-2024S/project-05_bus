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
  },
});

export const { addEvent, removeEvent } = calendarSlice.actions;
export default calendarSlice.reducer;
