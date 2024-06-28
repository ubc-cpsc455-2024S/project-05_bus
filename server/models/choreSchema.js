import { Schema, model } from 'mongoose';

const choreSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    colour: { type: String, required: true },
    groupID: { type: String, required: true, ref: 'Group' },
});

const Chores = model('Chores', choreSchema);

export default Chores;