import { Groceries } from "../models/grocerySchema.js";

const groceryQueries = {
  getAllGroceries: async function (groupID) {
    try {
      const groceries = await Groceries.find({ groupID });
      return groceries;
    } catch (error) {
      console.error("Error fetching groceries:", error);
      throw error;
    }
  },
  getOneGrocery: async function (id) {
    try {
      const grocery = await Groceries.findOne({ _id: id });
      return grocery;
    } catch (error) {
      console.error(`Error fetching grocery with id ${id}:`, error);
      throw error;
    }
  },
  postGrocery: async function (groceryData) {
    try {
      const newGrocery = new Groceries(groceryData);
      const savedGrocery = await newGrocery.save();
      return savedGrocery;
    } catch (error) {
      console.error("Error saving new grocery:", error);
      throw error;
    }
  },
  postManyGroceries: async function (groceryData) {
    try {
      const savedGroceries = await Groceries.insertMany(groceryData);
      return savedGroceries;
    } catch (error) {
      console.error("Error saving new groceries:", error);
      throw error;
    }
  },
  updateGrocery: async function (groceryData) {
    try {
      const result = await Groceries.findOneAndUpdate(
        { _id: groceryData._id },
        groceryData,
        { new: true }
      );
      return result;
    } catch (error) {
      console.error(
        `Error updating grocery with id ${groceryData._id}:`,
        error
      );
      throw error;
    }
  },
  deleteGrocery: async function (id, groupID) {
    try {
      const result = await Groceries.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.error(`Error deleting grocery with id ${id}:`, error);
      throw error;
    }
  },
  deleteManyGroceries: async function ({
    categoryId = null,
    locationId = null,
  } = {}) {
    try {
      const query = categoryId !== null ? { categoryId } : { locationId };
      const result = await Groceries.deleteMany(query);
      return result;
    } catch (error) {
      console.error(
        `Error deleting groceries with categoryId ${categoryId} or locationId ${locationId}:`,
        error
      );
      throw error;
    }
  },
};

export default groceryQueries;
