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

  return group;
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

const addAdmin = async (groupID, userID) => {
  return await groupQueries.addAdmin(groupID, userID);
};

const removeAdmin = async (groupID, userID) => {
  try {
    const group = await groupQueries.getGroup(groupID);
    if (!group) throw new Error(`Could not find group with id ${groupID}`);

    const isMember = group.memberIDs.includes(userID);
    const isAdmin = group.adminIDs.includes(userID);
    const adminCount = group.adminIDs.length;

    if (!isMember) throw new Error(`User ${userID} is not a member of group ${groupID}`);
    if (!isAdmin) throw new Error(`User ${userID} is not an admin of group ${groupID}`);
    if (adminCount <= 1) throw new Error(`Cannot remove user ${userID} as an admin. Groups must have at least one admin`);

    return await groupQueries.removeAdmin(groupID, userID);
  } catch (error) {
    throw error;
  }
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
  addAdmin,
  removeAdmin,
  deleteGroup,
};
