import { Schema, model } from 'mongoose';

// create schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  groupID: { type: Schema.Types.ObjectId, ref: 'Group', default: null },
});

// create model
const Users = model('Users', userSchema);

export default Users;