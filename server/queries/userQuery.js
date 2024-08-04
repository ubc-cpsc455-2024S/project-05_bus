import Users from '../models/userSchema.js';
import groupQueries from '../queries/groupQuery.js';

const userQueries = {
  getAllUsers: async function () {
    const users = await Users.find();
    return users;
  },
  getGroupMembers: async function (groupID) {
    const members = await Users.find({ groupID });
    return members;
  },
  getUserById: async function (id) {
    const user = await Users.findOne({ _id: id });
    return user;
  },
  postUserByEmail: async function (email) {
    const user = await Users.findOne({ email: email });
    return user;
  },
  postUser: async function (userData) {
    const newUser = new Users(userData);
    const savedUser = await newUser.save();
    return savedUser;
  },
  deleteUser: async function (id) {
    const user = await Users.findById(id);
    const userGroup = user.groupID;
    if (userGroup) groupQueries.removeMember(userGroup, id);
        
    const result = await Users.findOneAndDelete({ _id: id });
    return result;
  },
  updateUserGroup: async function (userID, groupID) {
    const result = await Users.findByIdAndUpdate(userID, {groupID});
    return result;
  }
}

export default userQueries;