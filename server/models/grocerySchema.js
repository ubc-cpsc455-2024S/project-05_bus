import { Schema, model } from "mongoose";
import eventQueries from "../queries/eventQuery.js";

const { deleteExpiryEvents, deleteRestockNotifications } = eventQueries;

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
  restockThreshold: { type: String, required: false },
  restockerId: { type: Schema.Types.ObjectId, required: false },
  favourite: { type: Boolean, default: false, required: false },
  selectMeal: { type: Boolean, default: false, required: false },
  groupID: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
});

grocerySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  const updateDoc = update.$set || update;
  const { expiryDate, quantity, restockNotificationDate, expiryNotificationDate } = updateDoc;
  const queryId = this.getQuery()._id;

  try {
    if (expiryDate !== undefined || expiryNotificationDate == null) {
      await deleteExpiryEvents(queryId);
    }
    if (quantity !== undefined) {
      const docToUpdate = await this.model.findOne(this.getQuery());
      if (quantity > docToUpdate.restockThreshold) {
        await deleteRestockNotifications(queryId);
      }
    }
    // if (restockNotificationDate == null) {
    //   await deleteRestockNotifications(queryId);
    // }

    next();
  } catch (error) {
    next(error);
  }
});


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
