import express from "express";
import choreQueries from "../queries/choreQuery.js";
import eventQueries from "../queries/eventQuery.js";

const router = express.Router();

// Chore routes

router.get("/group/:groupID", async (req, res) => {
  try {
    const chores = await choreQueries.getAllChores(req.params.groupID);
    return res.json(chores);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chore = await choreQueries.getOneChore(req.params.id);
    return res.json(chore);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newChore = await choreQueries.postChore(req.body);
    return res.status(201).json(newChore);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await choreQueries.deleteChore(req.params.id);
    await eventQueries.deleteChoreEvents(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;