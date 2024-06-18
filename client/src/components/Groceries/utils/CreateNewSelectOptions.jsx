import { addCategory, addLocation } from "../../../redux/slices/groceriesSlice";

export const handleCreateCategory = (inputValue, dispatch) => {
  dispatch(addCategory(inputValue));
};

export const handleCreateLocation = (inputValue, dispatch) => {
  dispatch(addLocation(inputValue));
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
