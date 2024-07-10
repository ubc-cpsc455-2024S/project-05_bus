import groupQueries from "../queries/groupQuery.js";

const getAllGroups = async () => {
  return await groupQueries.getAllGroups();
};

const getGroup = async (groupID) => {
  return await groupQueries.getGroup(groupID);
};

const createGroup = async (groupData) => {
  return await groupQueries.addGroup(groupData);
};

const updateName = async (groupID, newName) => {
  return await groupQueries.updateName(groupID, newName);
};

const addMember = async (groupID, userID) => {
  return await groupQueries.addMember(groupID, userID);
};

const removeMember = async (groupID, userID) => {
  return await groupQueries.removeMember(groupID, userID);
};

const deleteGroup = async (groupID) => {
  return await groupQueries.deleteGroup(groupID);
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
