import GroceryCategories from "../models/grocerySchema.js";

const groceryCategoryQueries = {
  getAllCategories: async function (groupID) {
    try {
      const categories = await GroceryCategories.find({ groupID });
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
  getOneCategory: async function (id) {
    try {
      const category = await GroceryCategories.findOne({ _id: id });
      return category;
    } catch (error) {
      console.error(`Error fetching category with id ${id}:`, error);
      throw error;
    }
  },
  postCategory: async function (categoryData) {
    try {
      const newCategory = new GroceryCategories(categoryData);
      const savedCategory = await newCategory.save();
      return savedCategory;
    } catch (error) {
      console.error("Error saving new category:", error);
      throw error;
    }
  },
  updateCategory: async function (categoryData) {
    try {
      const result = await GroceryCategories.updateOne(
        { _id: categoryData.id },
        categoryData
      );
      return result;
    } catch (error) {
      console.error(
        `Error updating category with id ${categoryData.id}:`,
        error
      );
      throw error;
    }
  },
  deleteCategory: async function (id) {
    try {
      const result = await GroceryCategories.deleteOne({ _id: id });
      return result;
    } catch (error) {
      console.error(`Error deleting category with id ${id}:`, error);
      throw error;
    }
  },
};

export default groceryCategoryQueries;
