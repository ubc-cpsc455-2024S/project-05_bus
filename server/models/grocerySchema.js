import { Schema, model } from "mongoose";
import eventQueries from "../queries/eventQuery.js";

const { deleteExpiryEvents, deleteRestockNotifications, postEvent } = eventQueries;

const grocerySchema = new Schema({
  name: { type: String, required: true },
  locationId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "GroceryLocation",
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "GroceryCategory",
  },
  expiryDate: { type: Date, required: false },
  quantity: { type: Number, required: true },
  expiryNotificationDate: { type: Date, required: false },
  restockNotificationDate: { type: Date, required: false },
  restockThreshold: { type: Number, required: false },
  restockerId: { type: Schema.Types.ObjectId, required: false },
  favourite: { type: Boolean, default: false, required: false },
  selectMeal: { type: Boolean, default: false, required: false },
  groupID: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
});

grocerySchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  const updateDoc = update.$set || update;
  const queryId = this.getQuery()._id;

  try {
    const docToUpdate = await this.model.findOne(this.getQuery());

    if ('expiryDate' in updateDoc || ('expiryNotificationDate' in updateDoc && updateDoc.expiryNotificationDate === null)) {
      await deleteExpiryEvents(queryId);
    }

    if ('quantity' in updateDoc) {
      const newQuantity = updateDoc.quantity;

      if (newQuantity <= docToUpdate.restockThreshold && docToUpdate.restockerId) {
        updateDoc.restockNotificationDate = new Date();
      }

      if (newQuantity > docToUpdate.restockThreshold && docToUpdate.restockNotificationDate !== null) {
        updateDoc.restockNotificationDate = null;
      }
    }

    if ('restockNotificationDate' in updateDoc && updateDoc.restockNotificationDate === null) {
      await deleteRestockNotifications(queryId);
    }

    next();
  } catch (error) {
    next(error);
  }
});

grocerySchema.post('findOneAndUpdate', async function(doc) {
  if (doc) {
    const update = this.getUpdate();
    const updateDoc = update.$set || update;
    if ('restockNotificationDate' in updateDoc && updateDoc.restockNotificationDate !== null) {
      await createRestockNotification(doc);
    }
  }
});

const createRestockNotification = async (groceryItem) => {
  console.log(groceryItem);
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

  await postEvent(event);
};

const groceryLocationSchema = new Schema({
  name: { type: String, required: true },
  groupID: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
});

const groceryCategorySchema = new Schema({
  name: { type: String, required: true },
  groupID: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
});

const Groceries = model("Groceries", grocerySchema);
const GroceryLocations = model("GroceryLocation", groceryLocationSchema);
const GroceryCategories = model("GroceryCategory", groceryCategorySchema);

export { Groceries, GroceryLocations, GroceryCategories };
