import { Groceries } from "../models/grocerySchema.js";
import eventQueries from "./eventQuery.js";

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
    const filteredData = groceryData.filter((grocery) => {
      const { categoryId, locationId, groupID } = grocery;

      const isValidCategoryId =
        categoryId === null || mongoose.Types.ObjectId.isValid(categoryId);
      const isValidLocationId =
        locationId === null || mongoose.Types.ObjectId.isValid(locationId);
      const isValidGroupId = mongoose.Types.ObjectId.isValid(groupID);

      return isValidCategoryId && isValidLocationId && isValidGroupId;
    });

    try {
      const savedGroceries = await Groceries.insertMany(filteredData);
      return savedGroceries;
    } catch (error) {
      console.error("Error saving new groceries:", error);
      throw error;
    }
  },
  updateGrocery: async function (groceryData) {
    try {
      const existingGrocery = await Groceries.findById(groceryData._id);
      if (!existingGrocery) {
        throw new Error(`Grocery item with id ${groceryData._id} not found.`);
      }

      if (shouldDeleteGrocery(groceryData, existingGrocery)) {
        await Groceries.findByIdAndDelete(groceryData._id);
        return null;
      }

      await handleExpiryEvents(groceryData, existingGrocery);
      await handleRestockNotifications(groceryData, existingGrocery);

      const updatedGrocery = await Groceries.findOneAndUpdate(
        { _id: groceryData._id },
        { $set: groceryData },
        { new: true }
      );

      if (updatedGrocery && updatedGrocery.restockNotificationDate) {
        await createRestockNotification(updatedGrocery);
      }

      return updatedGrocery;
    } catch (error) {
      console.error(
        `Error updating grocery with id ${groceryData._id}:`,
        error
      );
      throw error;
    }
  },
  deleteGrocery: async function (id) {
    try {
      const result = await Groceries.findOneAndDelete({ _id: id });
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

const shouldDeleteGrocery = (groceryData, existingGrocery) =>
  groceryData.quantity <= 0 &&
  !existingGrocery.favourite &&
  !existingGrocery.restockNotificationDate;

const handleExpiryEvents = async (groceryData, existingGrocery) => {
  if (
    "expiryDate" in groceryData ||
    ("expiryNotificationDate" in groceryData &&
      !groceryData.expiryNotificationDate)
  ) {
    await eventQueries.deleteExpiryEvents(existingGrocery._id);
    groceryData.expiryNotificationDate = null;
  }
};

const handleRestockNotifications = async (groceryData, existingGrocery) => {
  if ("quantity" in groceryData) {
    if (
      groceryData.quantity <= existingGrocery.restockThreshold &&
      existingGrocery.restockerId
    ) {
      groceryData.restockNotificationDate = new Date();
    } else if (groceryData.quantity > existingGrocery.restockThreshold) {
      groceryData.restockNotificationDate = null;
    }
  }

  if (
    "restockNotificationDate" in groceryData &&
    !groceryData.restockNotificationDate
  ) {
    await eventQueries.deleteRestockNotifications(existingGrocery._id);
  }
};

const createRestockNotification = async (groceryItem) => {
  const event = {
    title: `Restock ${groceryItem.name}`,
    start: new Date(),
    allDay: true,
    backgroundColor: "#c49bad",
    borderColor: "#c49bad",
    groupID: groceryItem.groupID,
    extendedProps: {
      groceryId: groceryItem._id,
      type: "restock",
      memberId: groceryItem.restockerId,
      done: false,
    },
  };
  await eventQueries.postEvent(event);
};

export default groceryQueries;
