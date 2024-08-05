import { Schema, model } from 'mongoose';

// create schema
const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  groupID: { type: Schema.Types.ObjectId, ref: 'Group', default: null },
  // a security measure we may want to look into is hashing the password when we store it
});

// create model
const Users = model('Users', userSchema);

export default Users;