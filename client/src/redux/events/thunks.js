import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './actionTypes';
import EventService from './service';

export const getEventsAsync = createAsyncThunk(
  actionTypes.GET_EVENTS,
  async (groupID) => {
    return await EventService.getAllEvents(groupID);
  }
);

export const getEventAsync = createAsyncThunk(
  actionTypes.GET_EVENT,
  async (id) => {
    return await EventService.getOneEvent(id);
  }
);

export const addEventAsync = createAsyncThunk(
  actionTypes.ADD_EVENT,
  async (event) => {
    return await EventService.addEvent(event);
  }
);

export const updateEventAsync = createAsyncThunk(
  actionTypes.UPDATE_EVENT,
  async (event) => {
    return await EventService.updateEvent(event);
  }
);

export const deleteEventAsync = createAsyncThunk(
  actionTypes.DELETE_EVENT,
  async (id) => {
    return await EventService.deleteEvent(id);
  }
);


