import GroupService from "../services/groupService.js";

const getAllGroups = async (req, res) => {
  try {
    const result = await GroupService.getAllGroups();
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
};

const getGroup = async (req, res) => {
  try {
    const result = await GroupService.getGroup(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(404).send({ error: "Group not found" });
  }
};

const createGroup = async (req, res) => {
  try {
    const result = await GroupService.createGroup(req.body);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
};

const updateName = async (req, res) => {
  try {
    const result = await GroupService.updateName(req.params.groupID, req.body.name);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
};

const addMember = async (req, res) => {
  try {
    const result = await GroupService.addMember(req.params.groupID, req.params.userID);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
};

const removeMember = async (req, res) => {
  try {
    const result = await GroupService.removeMember(req.params.groupID, req.params.userID);
    return res.status(200).json(result);;
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: err.message });
  }
};

const deleteGroup = async (req, res) => {
  try {
    const result = await GroupService.deleteGroup(req.params.id);
    return res.status(200).json(result);;
  } catch (err) {
    console.error(err);
    return res.status(404).send({ message: "Group not found" });
  }
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
