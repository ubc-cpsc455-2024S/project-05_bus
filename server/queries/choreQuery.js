import Chores from '../models/choreSchema';

const choreQueries = {
  getAllChores: async function (groupID) {
    try {
      const chores = await Chores.find({ groupID });
      return chores;
    } catch (error) {
      console.error('Error fetching chores:', error);
      throw error;
    }
  },
  getOneChore: async function (id) {
    try {
      const chore = await Chores.findOne({ _id: id });
      return chore;
    } catch (error) {
      console.error(`Error fetching chore with id ${id}:`, error);
      throw error;
    }
  },
  postChore: async function (choreData) {
    try {
      const newChore = new Chores(choreData);
      const savedChore = await newChore.save();
      return savedChore;
    } catch (error) {
      console.error('Error saving new chore:', error);
      throw error;
    }
  },
  updateChore: async function (choreData) {
    try {
      const result = await Chores.findOneAndUpdate(
        { _id: choreData._id },
        choreData,
        { new: true }
      );
      return result;
    } catch (error) {
      console.error(`Error updating chore with id ${choreData._id}:`, error);
      throw error;
    }
  },
  deleteChore: async function (id) {
    try {
      const result = await Chores.findOneAndDelete({ _id: id });
      return result;
    } catch (error) {
      console.error(`Error deleting chore with id ${id}:`, error);
      throw error;
    }
  },
};

export default choreQueries;
