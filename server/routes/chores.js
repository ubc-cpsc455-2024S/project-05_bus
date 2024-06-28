import express from "express";
import choreQueries from "../queries/choreQuery";
import eventQueries from "../queries/eventQuery";

const router = express.Router();

// Chore routes

router.get("/chores", async (req, res) => {
  try {
    const chores = await choreQueries.getAllChores(req.params.groupID);
    res.json(chores);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/chores/:id", async (req, res) => {
  try {
    const chore = await choreQueries.getOneChore(req.params.id);
    res.json(chore);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/chores", async (req, res) => {
  try {
    const newChore = await choreQueries.postChore(req.body);
    res.status(201).json(newChore);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/chores/:id", async (req, res) => {
  try {
    await choreQueries.deleteChore(req.params.id);
    await eventQueries.deleteManyEvents(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
