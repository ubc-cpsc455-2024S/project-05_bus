import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    memberIDs: { type: [String], required: true },
});

const Groups = model('Groups', groupSchema);

export default Groups;