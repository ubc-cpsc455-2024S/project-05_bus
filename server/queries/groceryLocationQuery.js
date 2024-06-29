import GroceryLocations from "../models/grocerySchema.js";

const groceryLocationQueries = {
  getAllLocations: async function (groupID) {
    try {
      const locations = await GroceryLocations.find({ groupID });
      return locations;
    } catch (error) {
      console.error("Error fetching locations:", error);
      throw error;
    }
  },
  getOneLocation: async function (id) {
    try {
      const location = await GroceryLocations.findOne({ _id: id });
      return location;
    } catch (error) {
      console.error(`Error fetching location with id ${id}:`, error);
      throw error;
    }
  },
  postLocation: async function (locationData) {
    try {
      const newLocation = new GroceryLocations(locationData);
      const savedLocation = await newLocation.save();
      return savedLocation;
    } catch (error) {
      console.error("Error saving new location:", error);
      throw error;
    }
  },
  updateLocation: async function (locationData) {
    try {
      const result = await GroceryLocations.updateOne(
        { _id: locationData.id },
        locationData
      );
      return result;
    } catch (error) {
      console.error(
        `Error updating location with id ${locationData.id}:`,
        error
      );
      throw error;
    }
  },
  deleteLocation: async function (id) {
    try {
      const result = await GroceryLocations.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.error(`Error deleting location with id ${id}:`, error);
      throw error;
    }
  },
};

export default groceryLocationQueries;
