import { addCategoryAsync, addLocationAsync } from '../../../redux/groceries/thunks';

export const handleCreateCategory = async (inputValue, dispatch, groupID, setCategory) => {
  const resultAction = await dispatch(addCategoryAsync({ name: inputValue, groupID }));
  if (addCategoryAsync.fulfilled.match(resultAction)) {
    setCategory(resultAction.payload._id);
  }
};

export const handleCreateLocation = async (inputValue, dispatch, groupID, setLocation) => {
  const resultAction = await dispatch(addLocationAsync({ name: inputValue, groupID }));
  if (addLocationAsync.fulfilled.match(resultAction)) {
    setLocation(resultAction.payload._id);
  }
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
