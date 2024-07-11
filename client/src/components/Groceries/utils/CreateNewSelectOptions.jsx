import { addCategoryAsync, addLocationAsync } from "../../../redux/groceries/thunks";

export const handleCreateCategory = (inputValue, dispatch, groupID) => {
  dispatch(addCategoryAsync({name: inputValue, groupID}));
};

export const handleCreateLocation = (inputValue, dispatch, groupID) => {
  dispatch(addLocationAsync({name: inputValue, groupID}));
};

export const isValidNewCategory = (inputValue, categories) => {
  return (
    inputValue.trim().length !== 0 &&
    !categories.some(
      (cat) => cat.name.toLowerCase() === inputValue.trim().toLowerCase()
    )
  );
};

export const isValidNewLocation = (inputValue, locations) => {
  return (
    inputValue.trim().length !== 0 &&
    !locations.some(
      (loc) => loc.name.toLowerCase() === inputValue.trim().toLowerCase()
    )
  );
};
