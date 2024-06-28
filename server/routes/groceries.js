import express from 'express';
import groceryQueries from '../queries/groceryQueries';
import groceryLocationQueries from '../queries/groceryLocationQueries';
import groceryCategoryQueries from '../queries/groceryCategoryQueries';

const router = express.Router();

// Grocery routes
router.get('/groceries', async (req, res) => {
  try {
    const groceries = await groceryQueries.getAllGroceries(req.params.groupID);
    res.json(groceries);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/groceries/:id', async (req, res) => {
  try {
    const grocery = await groceryQueries.getOneGrocery(req.params.id);
    res.json(grocery);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/groceries', async (req, res) => {
  try {
    const newGrocery = await groceryQueries.postGrocery(req.body);
    res.status(201).json(newGrocery);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/groceries/:id', async (req, res) => {
  try {
    const result = await groceryQueries.deleteGrocery(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Grocery Location Routes
router.get('/locations', async (req, res) => {
  try {
    const locations = await groceryLocationQueries.getAllLocations(req.params.groupID);
    res.json(locations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/locations/:id', async (req, res) => {
  try {
    const location = await groceryLocationQueries.getOneLocation(req.params.id);
    res.json(location);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/locations', async (req, res) => {
  try {
    const newLocation = await groceryLocationQueries.postLocation(req.body);
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/locations/:id', async (req, res) => {
  const locationId = req.params.id;
  const groupID = req.params.groupID;
  try {
    await groceryLocationQueries.deleteLocation(locationId);
    await groceryQueries.deleteManyGroceries({ locationId });
    res.status(200).send({ message: 'Location and related groceries deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Grocery Category Routes
router.get('/categories', async (req, res) => {
  try {
    const categories = await groceryCategoryQueries.getAllCategories(req.params.groupID);
    res.json(categories);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get('/categories/:id', async (req, res) => {
  try {
    const category = await groceryCategoryQueries.getOneCategory(req.params.id);
    res.json(category);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post('/categories', async (req, res) => {
  try {
    const newCategory = await groceryCategoryQueries.postCategory(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.delete('/categories/:id', async (req, res) => {
  const categoryId = req.params.id;
  const groupID = req.params.groupID;
  try {
    await groceryCategoryQueries.deleteCategory(categoryId);
    await groceryQueries.deleteMany({ categoryId });
    res.status(200).send({ message: 'Category and related groceries deleted successfully' });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;
