var express = require('express');
var router = express.Router();
const userQueries = require('../queries/userQuery');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
      const result = await userQueries.getAllUsers();
      return res.send(result);
  } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});

/* GET user listing. */
router.get('/:id', async function(req, res, next) {
  try {
      const result = await userQueries.getOneUser(req.params.id);
      if (!result) {
        return res.status(404).send({ message: 'User not found' });
      }
      return res.send(result);
  } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});

/* POST user listing. */
router.post('/', async function(req, res, next) {
  try {
      const result = await userQueries.postUser(req.body);
      return res.send({ message: 'User added successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).send({ error: 'Internal Server Error' });
  }
});

/* DELETE user listing. */
router.delete('/:id', async function(req, res, next) {
  try {
      const result = await userQueries.deleteUser(req.params.id);
      if (!result) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).send({ message: 'User deleted successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
