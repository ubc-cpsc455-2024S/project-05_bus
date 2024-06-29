import express from "express";
import eventQueries from "../queries/eventQuery.js";

const router = express.Router();

// Event routes

router.get("/events", async (req, res) => {
  try {
    const events = await eventQueries.getAllEvents(req.params.groupID);
    res.json(events);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/events/:id", async (req, res) => {
  try {
    const event = await eventQueries.getOneEvent(req.params.id);
    res.json(event);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/events", async (req, res) => {
  try {
    const newEvent = await eventQueries.postEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete("/events/:id", async (req, res) => {
  try {
    const result = await eventQueries.deleteEvent(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;