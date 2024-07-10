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
  getAllMembers: async function (groupID) {
    try {
      const members = await Groups.find({ groupID });
      return members;
    } catch (error) {
      console.error(`Error fetching members of group ${groupID}: `, error);
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
  deleteGroup: async function(groupID) {
    try {
      // update users' groupID's here ???
      return await Groups.deleteOne({ _id: groupID });
    } catch (error) {
      console.error(`Error deleting group with id ${groupID}: `, error);
      throw error;
    }
  },
  addMember: async function (groupID, userID) {
    try {
      const group = Groups.find({_id: groupID});
      const newGroupData = { memberIDs: [...group.memberIDs, userID] };
      // update user's groupID here ???
      return Groups.findByIdAndUpdate(groupID, newGroupData, {new: true});
    } catch (error) {
      console.error(`Error adding user ${userID} to group ${groupID}: `, error);
      throw error;
    }
  },
  removeMember: async function (groupID, userID) {
    try {
      const group = Groups.find({_id: groupID});
      const index = group.memberIDs.indexOf(userID);
      if (index > -1) group.memberIDs.splice(index, 1);
      // update user's groupID here ???
      return Groups.findByIdAndUpdate(groupID, group, {new: true});
    } catch (error) {
      console.error(`Error removing user ${userID} from group ${groupID}: `, error);
      throw error;
    }
  }
}

export default userQueries;