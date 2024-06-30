import Events from "../models/eventSchema.js";

const eventQueries = {
  getAllEvents: async function (groupID) {
    try {
      const events = await Events.find({ groupID });
      return events;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw error;
    }
  },
  getOneEvent: async function (id) {
    try {
      const event = await Events.findOne({ _id: id });
      return event;
    } catch (error) {
      console.error(`Error fetching event with id ${id}:`, error);
      throw error;
    }
  },
  postEvent: async function (eventData) {
    try {
      const newEvent = new Events(eventData);
      const savedEvent = await newEvent.save();
      return savedEvent;
    } catch (error) {
      console.error("Error saving new event:", error);
      throw error;
    }
  },
  postManyEvents: async function (eventData) {
    try {
      const savedEvents = await Events.insertMany(eventData);
      return savedEvents;
    } catch (error) {
      console.error("Error saving new events:", error);
      throw error;
    }
  },
  updateEvent: async function (eventData) {
    try {
      const result = await Events.updateOne({ _id: eventData._id }, eventData);
      return result;
    } catch (error) {
      console.error(`Error updating event with id ${eventData._id}:`, error);
      throw error;
    }
  },
  deleteEvent: async function (id) {
    try {
      const result = await Events.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.error(`Error deleting event with id ${id}:`, error);
      throw error;
    }
  },
  deleteManyEvents: async function (choreId) {
    try {
      const result = await Events.deleteMany({ choreId });
      return result;
    } catch (error) {
      console.error(`Error deleting events with choreId ${choreId}:`, error);
      throw error;
    }
  },
};

export default eventQueries;
