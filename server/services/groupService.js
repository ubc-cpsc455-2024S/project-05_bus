import groupQueries from "../queries/groupQuery.js";
import userQueries from "../queries/userQuery.js";

const getAllGroups = async () => {
  return await groupQueries.getAllGroups();
};

const getGroup = async (groupID) => {
  return await groupQueries.getGroup(groupID);
};

const createGroup = async (groupData) => {
  const group = await groupQueries.addGroup(groupData);
  const groupID = group._id;
  const members = group.memberIDs;

  const updatePromises = members.map(async (userID) => {
    const user = await userQueries.getOneUser(userID);
    const userGroup = user.groupID;
    if (userGroup) {
      console.log(`User ${userID} is already in group ${userGroup}`);
      await groupQueries.removeMember(groupID, userID);
    } else {
      await userQueries.updateUserGroup(userID, groupID);
    };
  });
  await Promise.all(updatePromises);
};

const updateName = async (groupID, newName) => {
  return await groupQueries.updateName(groupID, newName);
};

const addMember = async (groupID, userID) => {
  const user = await userQueries.getOneUser(userID);
  const userGroup = user.groupID
  if (userGroup) {
    throw new Error(`User ${userID} is already in group ${userGroup}`);
  }
  await groupQueries.addMember(groupID, userID);
  return await userQueries.updateUserGroup(userID, groupID);
};

const removeMember = async (groupID, userID) => {
  await groupQueries.removeMember(groupID, userID);
  return await userQueries.updateUserGroup(userID, null);
};

const deleteGroup = async (groupID) => {
  const group = await groupQueries.deleteGroup(groupID);
  const members = group.memberIDs;
  
  const updatePromises = members.map(async (userID) => {
    await userQueries.updateUserGroup(userID, null);
  });
  await Promise.all(updatePromises);
};

export default {
  getAllGroups,
  getGroup,
  createGroup,
  updateName,
  addMember,
  removeMember,
  deleteGroup,
};
