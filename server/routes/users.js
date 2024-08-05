import express from 'express';
import userQueries from '../queries/userQuery.js';

const router = express.Router();

/* GET all users listing. */
router.get('/', async function(req, res) {
  try {
    const result = await userQueries.getAllUsers();
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

/* GET group members listing. */
router.get('/group/:groupID', async function(req, res) {
  try {
    const result = await userQueries.getGroupMembers(req.params.groupID);
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

/* GET user listing. */
router.get('/:id', async function(req, res) {
  try {
    const result = await userQueries.getUserById(req.params.id);
    if (!result) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

/* POST user listing. */
router.post('/', async function(req, res) {
  try {
    const result = await userQueries.postUser(req.body);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

/* POST user info via email bc apparently it is bad to do it with GET */
router.post('/userInfo', async function(req, res) {
  try {
    const result = await userQueries.postUserByEmail(req.body.email);
    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: 'Internal Server Error' });
  }
});

/* DELETE user listing. */
router.delete('/:id', async function(req, res) {
  try {
    const result = await userQueries.deleteUser(req.params.id);
    if (!result) {
      return res.status(404).send({ message: 'User not found' });
    }
    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
