import { addCategory, addLocation } from "../../redux/slices/groceriesSlice";

export const handleCreateCategory = (inputValue, categories, dispatch, setCategory, setErrors, errors) => {
    const existingCategory = categories.find(
      (cat) => cat.name.toLowerCase() === inputValue.toLowerCase()
    );
    if (!existingCategory) {
      dispatch(addCategory(inputValue));
      setCategory(inputValue);
    } else {
      setErrors({ ...errors, category: "Category already exists" });
    }
  };
  
  export const handleCreateLocation = (inputValue, locations, dispatch, setLocation, setErrors, errors) => {
    if (
      !locations.some(
        (loc) => loc.name.toLowerCase() === inputValue.toLowerCase()
      )
    ) {
      dispatch(addLocation(inputValue));
      setLocation(inputValue);
    } else {
      setErrors({ ...errors, locationId: "Location already exists" });
    }
  };
  
  export const isValidNewCategory = (inputValue, categories) => {
    return !categories.some(
      (cat) => cat.name.toLowerCase() === inputValue.toLowerCase()
    );
  };
  
  export const isValidNewLocation = (inputValue, locations) => {
    return !locations.some(
      (loc) => loc.name.toLowerCase() === inputValue.toLowerCase()
    );
  };
  