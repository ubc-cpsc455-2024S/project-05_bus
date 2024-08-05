import express from 'express';
import eventQueries from '../queries/eventQuery.js';

const router = express.Router();

// Event routes

router.get('/group/:groupID', async (req, res) => {
  try {
    const events = await eventQueries.getAllEvents(req.params.groupID);
    return res.json(events);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await eventQueries.getOneEvent(req.params.id);
    return res.json(event);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post('/', async (req, res) => {
  try {
    const newEvent = await eventQueries.postEvent(req.body);
    return res.status(201).json(newEvent);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post('/many', async (req, res) => {
  try {
    const newEvent = await eventQueries.postEvent(req.body);
    return res.status(201).json(newEvent);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updatedEvent = await eventQueries.updateEvent(req.body);
    return res.json(updatedEvent);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await eventQueries.deleteEvent(req.params.id);
    return res.json(result);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

export default router;