import { Schema, model } from "mongoose";

const choreSchema = new Schema({
    title: { type: String, required: true },
    colour: { type: String, required: true },
    groupID: { type: Schema.Types.ObjectId, required: true, ref: "Group" },
});

const Chores = model("Chores", choreSchema);

export default Chores;