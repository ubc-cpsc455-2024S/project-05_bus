import { createSelector } from 'reselect';

const selectGroceries = state => state.groceries.groceries;
const selectCategories = state => state.groceries.categories;
const selectLocations = state => state.groceries.locations;

const selectGroceriesWithNames = createSelector(
  [selectGroceries, selectCategories, selectLocations],
  (groceries, categories, locations) => {
    const categoriesMap = categories.reduce((map, category) => {
      map[category.id] = category.name;
      return map;
    }, {});

    const locationsMap = locations.reduce((map, location) => {
      map[location.id] = location.name;
      return map;
    }, {});

    return groceries.map(grocery => ({
      ...grocery,
      categoryName: categoriesMap[grocery.categoryId],
      locationName: locationsMap[grocery.locationId],
      expiryDate: new Date(grocery.expiryDate)
    }));
  }
);

export default selectGroceriesWithNames;
