import { useState } from "react";
import {
  HStack,
  FormControl,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormLabel,
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { useSelector } from "react-redux";
import moment from "moment";
import useCurrentGroupMembers from "../../../hooks/useCurrentGroupMembers";
import { COMMON_UNITS } from "../utils/commonUnits";

export default function GroceryRow({ index, grocery, setUpdatedGrocery }) {
  const [name, setName] = useState(grocery.name || "");
  const [locationId, setLocationId] = useState(grocery.locationId || "");
  const [categoryId, setCategoryId] = useState(grocery.categoryId || "");
  const [expiryDate, setExpiryDate] = useState(grocery.expiryDate || "");
  const [quantity, setQuantity] = useState(grocery.quantity || "");
  const [quantityUnit, setQuantityUnit] = useState(grocery.quantityUnit || "");
  const [ownerId, setOwnerId] = useState(grocery.ownerId || "");

  const locations = useSelector((state) => state.groceries.locations);
  const categories = useSelector((state) => state.groceries.categories);
  const members = useCurrentGroupMembers();

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
    <HStack
      spacing={2}
      justifyContent="space-between"
      width="100%"
      display="flex"
    >
      <FormControl flex={1}>
        {index === 0 && <FormLabel>Name</FormLabel>}
        <Input placeholder="Name" value={name} onChange={handleNameChange} />
      </FormControl>

      <FormControl flex={1}>
        {index === 0 && <FormLabel>Location</FormLabel>}
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
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              width: "16px",
            }),
          }}
        />
      </FormControl>

      <FormControl flex={1}>
        {index === 0 && <FormLabel>Category</FormLabel>}
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
          chakraStyles={{
            dropdownIndicator: (provided) => ({
              ...provided,
              width: "16px",
            }),
          }}
        />
      </FormControl>

      <FormControl flex={1}>
        {index === 0 && <FormLabel>Expiry Date</FormLabel>}
        <Input
          placeholder="Expiry Date"
          type="date"
          value={expiryDate}
          onChange={handleDateChange}
        />
      </FormControl>

      <FormControl flex={1}>
        {index === 0 && <FormLabel>Owner</FormLabel>}
        <Select
          value={ownerId}
          onChange={(e) =>
            setOwnerId(e.target.value === "" ? null : e.target.value)
          }
        >
          <option value={""}>Shared</option>
          {members.map((member) => (
            <option key={member._id} value={member._id}>
              {`${member.firstName} ${member.lastName}`}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl flex={1}>
        {index === 0 && <FormLabel>Quantity</FormLabel>}
        <HStack display="flex" spacing={2}>
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
          <Select
            placeholder="Unit"
            value={quantityUnit}
            onChange={(e) => setQuantityUnit(e.target.value)}
            flex={1}
          >
            {COMMON_UNITS.map((unit) => (
              <option key={unit.value} value={unit.value}>
                {unit.label}
              </option>
            ))}
          </Select>
        </HStack>
      </FormControl>
    </HStack>
  );
}
