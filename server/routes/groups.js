import express from "express";
import groupQueries from "../queries/groupQuery.js";

const router = express.Router();

/* GET groups listing. */
router.get("/", async function(req, res) {
  try {
    const result = await groupQueries.getAllGroups();
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

/* GET group listing. */
router.get("/:id", async function(req, res) {
  try {
    const result = await groupQueries.getGroup(req.params.id);
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(404).send({ error: "Group not found" });
  }
});

/* POST group listing. */
router.post("/", async function(req, res) {
  try {
    await groupQueries.addGroup(req.body);
    return res.status(201).send({ message: "Group added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

/* PATCH group member add listing. */
router.patch("/:groupID/:userID", async function(req, res) {
  try {
    await groupQueries.addMember(req.params.groupID, req.params.userID);
    return res.status(200).send({ message: "Group member added successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

/* PATCH group member remove listing. */
router.patch("/remove/:groupID/:userID", async function(req, res) {
  try {
    const result = await groupQueries.removeMember(req.params.groupID, req.params.userID);
    return res.status(200).send({ message: "Member removed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});

/* DELETE group listing. */
router.delete("/:id", async function(req, res) {
  try {
    const result = await groupQueries.deleteGroup(req.params.id);
    return res.status(200).send({ message: "Group deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(404).send({ message: "Group not found" });
  }
});

export default router;
