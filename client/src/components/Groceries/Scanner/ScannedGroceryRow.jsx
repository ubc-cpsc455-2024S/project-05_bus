import { useState } from "react";
import {
  HStack,
  FormControl,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  isValidNewCategory,
  isValidNewLocation,
  handleCreateLocation,
  handleCreateCategory,
} from "../utils/CreateNewSelectOptions";
import useCurrentGroup from "../../../hooks/useCurrentGroup";
import moment from "moment";

export default function GroceryRow({
  index,
  grocery,
  allGroceries,
  setAllGroceries,
}) {
  const [name, setName] = useState(grocery.name || "");
  const [locationId, setLocationId] = useState(grocery.locationId || "");
  const [categoryId, setCategoryId] = useState(grocery.categoryId || "");
  const [expiryDate, setExpiryDate] = useState(grocery.expiryDate || "");
  const [quantity, setQuantity] = useState(grocery.quantity || "");
  const locations = useSelector((state) => state.groceries.locations);
  const categories = useSelector((state) => state.groceries.categories);

  const currentLocation = locations.find((loc) => loc._id === locationId);
  const currentCategory = categories.find((cat) => cat._id === categoryId);

  const group = useCurrentGroup();
  const dispatch = useDispatch();
  const toast = useToast();

  const updateGrocery = (updatedGrocery) => {
    const updatedGroceries = [...allGroceries];
    updatedGroceries[index] = updatedGrocery;
    setAllGroceries(updatedGroceries);
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    const updatedGrocery = { ...grocery, name: newName };
    updateGrocery(updatedGrocery);
  };

  const handleLocationChange = (e) => {
    const newLocationId = e.value;
    setLocationId(newLocationId);
    const updatedGrocery = { ...grocery, locationId: newLocationId };
    updateGrocery(updatedGrocery);
  };

  const handleCategoryChange = (e) => {
    const newCategoryId = e.value;
    setCategoryId(newCategoryId);
    const updatedGrocery = { ...grocery, categoryId: newCategoryId };
    updateGrocery(updatedGrocery);
  };

  const handleQuantityChange = (valueString) => {
    const newQuantity = parseInt(valueString, 10);
    setQuantity(newQuantity);
    const updatedGrocery = { ...grocery, quantity: newQuantity };
    updateGrocery(updatedGrocery);
  };

  const handleDateChange = (e) => {
    try {
      const selectedDate = moment(e.target.value, "YYYY-MM-DD", true);
      if (!selectedDate.isValid()) {
        throw new Error("Invalid date format. Please select a valid date.");
      }
      setExpiryDate(selectedDate);
      updateGrocery({ ...grocery, expiryDate: selectedDate });
    } catch (error) {
      toast({
        title: "Invalid Date",
        description: error.message,
        status: "error",
        duration: 500,
        isClosable: true,
      });
      setExpiryDate(null);
    }
  };
  
  return (
    <HStack spacing={2} justifyContent="space-between" width="100%">
      <FormControl isInvalid={name.length <= 0} w="25%" position="relative">
        <FormErrorMessage position="absolute" bottom="100%" left="0">
          Missing Name!
        </FormErrorMessage>
        <Input placeholder="Name" value={name} onChange={handleNameChange} />
      </FormControl>

      <FormControl w="25%" position="relative">
        <CreatableSelect
          placeholder="Location"
          options={locations.map((loc) => ({
            value: loc._id,
            label: loc.name,
          }))}
          value={
            currentLocation
              ? { value: currentLocation._id, label: currentLocation.name }
              : null
          }
          onChange={handleLocationChange}
          isValidNewOption={(input) => isValidNewLocation(input, locations)}
          menuPlacement="auto"
          onCreateOption={(input) =>
            handleCreateLocation(input, dispatch, group._id)
          }
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              width: "16px",
            }),
          }}
        />
      </FormControl>

      <FormControl w="25%" position="relative">
        <CreatableSelect
          placeholder="Category"
          options={categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
          }))}
          value={
            currentCategory
              ? { value: currentCategory._id, label: currentCategory.name }
              : null
          }
          onChange={handleCategoryChange}
          isValidNewOption={(input) => isValidNewCategory(input, categories)}
          menuPlacement="auto"
          onCreateOption={(input) =>
            handleCreateCategory(input, dispatch, group._id)
          }
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              width: "16px",
            }),
          }}
        />
      </FormControl>

      <FormControl w="20%">
        <Input
          placeholder="Expiry Date"
          type="date"
          value={
            expiryDate ? moment(expiryDate).format("YYYY-MM-DD") : ""
          }
          onChange={handleDateChange}
        />
      </FormControl>

      <FormControl isInvalid={quantity <= 0} w="10%" position="relative">
        <FormErrorMessage position="absolute" bottom="100%" left="0">
          Quantity cannot be 0.
        </FormErrorMessage>
        <NumberInput
          placeholder="Quantity"
          value={quantity}
          onChange={handleQuantityChange}
          min={0}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </HStack>
  );
}
