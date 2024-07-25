import { Schema, model } from "mongoose";

const groupSchema = new Schema({
    name: { type: String, required: true },
    memberIDs: { type: [Schema.Types.ObjectId], required: true },
    adminIDs: { type: [Schema.Types.ObjectId], required: true },
});

const Groups = model("Groups", groupSchema);

export default Groups;