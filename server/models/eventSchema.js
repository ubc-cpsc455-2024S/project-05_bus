import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    title: { type: String, required: true },
    start: { type: Date, required: true },
    allDay: { type: Boolean, required: true },
    backgroundColor: { type: String, required: true },
    borderColor: { type: String, required: true },
    extendedProps: {
        groceryId: { type: String, required: false, ref: 'Grocery' },
        choreId: { type: String, required: true, ref: 'Chore' },
        type: { type: String, required: true },
        memberId: { type: String, required: true, ref: 'User' },
        done: { type: Boolean, required: true },
    },
    groupID: { type: String, required: true, ref: 'Group' },
});

const Events = model('Events', eventSchema);

export default Events;
