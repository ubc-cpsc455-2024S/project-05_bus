import { Schema, model } from "mongoose";

const eventSchema = new Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    allDay: { type: Boolean, required: true },
    backgroundColor: { type: String, required: true },
    borderColor: { type: String, required: true },
    extendedProps: {
        groceryId: { type: Schema.Types.ObjectId, required: false, ref: "Grocery" },
        choreId: { type: Schema.Types.ObjectId, required: false, ref: "Chore" },
        type: { type: String, required: true },
        memberId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
        done: { type: Boolean, default: false,  required: true },
        dismissedBy: { type: Schema.Types.ObjectId, required: false, default: null, ref: "User" },
        reminder: {
            senderId: { type: Schema.Types.ObjectId, required: false, ref: "User" },
            sendDate: { type: Date, required: false },
        },
        reminded: { type: Boolean, default: false, required: true },
    },
    groupID: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
});

eventSchema.virtual('id').get(function() {
    return this._id.toString();
});

eventSchema.set('toObject', { virtuals: true });
eventSchema.set('toJSON', { virtuals: true });

const Events = model("Events", eventSchema);

export default Events;
