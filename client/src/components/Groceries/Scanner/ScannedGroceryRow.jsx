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
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { useSelector } from "react-redux";
import moment from "moment";

export default function GroceryRow({
  grocery,
  setUpdatedGrocery,
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

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    setUpdatedGrocery({ ...grocery, name: newName });
  };

  const handleLocationChange = (e) => {
    const newLocationId = e.value;
    setLocationId(newLocationId);
    setUpdatedGrocery({ ...grocery, locationId: newLocationId });
  };

  const handleCategoryChange = (e) => {
    const newCategoryId = e.value;
    setCategoryId(newCategoryId);
    setUpdatedGrocery({ ...grocery, categoryId: newCategoryId });
  };

  const handleQuantityChange = (valueString) => {
    const newQuantity = parseInt(valueString, 10);
    setQuantity(newQuantity);
    setUpdatedGrocery({ ...grocery, quantity: newQuantity });
  };

  const handleDateChange = (e) => {
    const newExpiryDate = e.target.value;
    setExpiryDate(moment(newExpiryDate).format("YYYY-MM-DD"));
    setUpdatedGrocery({ ...grocery, expiryDate: newExpiryDate });
  };

  return (
    <HStack spacing={2} justifyContent="space-between" width="100%">
      <FormControl w="25%">
        <Input placeholder="Name" value={name} onChange={handleNameChange} />
      </FormControl>

      <FormControl w="25%">
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
        />
      </FormControl>

      <FormControl w="25%">
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
        />
      </FormControl>

      <FormControl w="20%">
        <Input
          placeholder="Expiry Date"
          type="date"
          value={expiryDate}
          onChange={handleDateChange}
        />
      </FormControl>

      <FormControl w="10%">
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
