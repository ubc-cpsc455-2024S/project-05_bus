import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    allDay: { type: Boolean, required: true },
    backgroundColor: { type: String, required: true },
    borderColor: { type: String, required: true },
    extendedProps: {
        groceryId: { type: Schema.Types.ObjectId, required: false, ref: 'Grocery' },
        choreId: { type: Schema.Types.ObjectId, required: true, ref: 'Chore' },
        type: { type: String, required: true },
        memberId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
        done: { type: Boolean, default: false,  required: true },
    },
    groupID: { type: Schema.Types.ObjectId, required: true, ref: 'Group' },
});

const Events = model('Events', eventSchema);

export default Events;
