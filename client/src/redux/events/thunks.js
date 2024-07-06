import { createAsyncThunk } from "@reduxjs/toolkit";
import { actionTypes } from "./actionTypes";
import EventService from "./service";

export const getEvents = createAsyncThunk(
  actionTypes.GET_EVENTS,
  async (groupID) => {
    return await EventService.getAllEvents(groupID);
  }
);

export const getEvent = createAsyncThunk(
  actionTypes.GET_EVENT,
  async (id) => {
    return await EventService.getOneEvent(id);
  }
);

export const addEvent = createAsyncThunk(
  actionTypes.ADD_EVENT,
  async (event) => {
    return await EventService.postEvent(event);
  }
);

export const updateEvent = createAsyncThunk(
  actionTypes.UPDATE_EVENT,
  async (event) => {
    return await EventService.updateEvent(event);
  }
);

export const deleteEvent = createAsyncThunk(
  actionTypes.DELETE_EVENT,
  async (id) => {
    return await EventService.deleteEvent(id);
  }
);


