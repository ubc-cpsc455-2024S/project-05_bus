import Groups from "../models/groupSchema.js";

const groupQueries = {
  getAllGroups: async function () {
    try {
      const groups = await Groups.find();
      return groups;
    } catch (error) {
      console.error("Error fetching all groups: ", error);
      throw error;
    }
  },
  getGroup: async function(groupID) {
    try {
      const group = await Groups.findById(groupID);
      return group;
    } catch (error) {
      console.error(`Error fetching group ${groupID}: `, error);
      throw error;
    }
  },
  addGroup: async function(groupData) {
    try {
      const newGroup = new Groups(groupData);
      const savedGroup = await newGroup.save();
      // update users' groupID's here ???
      return savedGroup;
    } catch (error) {
      console.error("Error saving new group: ", error);
      throw error;
    }
  },
  addMember: async function (groupID, userID) {
    try {
      // update user's groupID here ???
      return await Groups.findByIdAndUpdate(groupID, {$push: {memberIDs: userID}}, {new: true});
    } catch (error) {
      console.error(`Error adding user ${userID} to group ${groupID}: `, error);
      throw error;
    }
  },
  deleteGroup: async function(groupID) {
    try {
      // update users' groupID's here ???
      return await Groups.findByIdAndDelete(groupID);
    } catch (error) {
      console.error(`Error deleting group with id ${groupID}: `, error);
      throw error;
    }
  },
  removeMember: async function (groupID, userID) {
    try {
      // update user's groupID here ???
      return await Groups.findByIdAndUpdate(groupID, {$pull: {memberIDs: userID}}, {new: true});
    } catch (error) {
      console.error(`Error removing user ${userID} from group ${groupID}: `, error);
      throw error;
    }
  },
  updateName: async function (groupID, newName) {
    try {
      return await Groups.findByIdAndUpdate(groupID, {name: newName}, {new: true});
    } catch (error) {
      console.error(`Error updating name for group ${groupID}: `, error);
      throw error;
    }
  }
}

export default groupQueries;