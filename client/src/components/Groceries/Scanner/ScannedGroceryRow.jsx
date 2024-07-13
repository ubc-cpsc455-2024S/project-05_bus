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
import { addGroceryAsync } from "../../../redux/groceries/thunks";
import useCurrentGroup from "../../../hooks/useCurrentGroup";
import {
  isValidNewCategory,
  isValidNewLocation,
  handleCreateLocation,
  handleCreateCategory,
} from "../utils/CreateNewSelectOptions";

export default function GroceryRow({
  name: initialName,
  location: initialLocation = "",
  category: initialCategory = "",
  quantity: initialQuantity,
}) {
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);
  const dispatch = useDispatch();
  const group = useCurrentGroup();
  const toast = useToast();

  const [name, setName] = useState(initialName);
  const [locationId, setLocationId] = useState(initialLocation);
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState(initialQuantity);

  const currentLocation = locations.find((loc) => loc._id === locationId);
  const currentCategory = categories.find((cat) => cat._id === categoryId);

  const [errors, setErrors] = useState({});

//   const handleAdd = () => {
//     const newErrors = {};

//     if (!name) newErrors.name = "Name is required";
//     if (!locationId) newErrors.locationId = "Location is required";
//     if (!categoryId) newErrors.categoryId = "Category is required";
//     if (quantity <= 0) newErrors.quantity = "Cannot be 0";

//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       dispatch(
//         addGroceryAsync({
//           name,
//           locationId: locationId,
//           categoryId: categoryId,
//           expiryDate,
//           quantity,
//           groupID: group._id,
//         })
//       );
//       toast({
//         title: "Grocery Added",
//         description: `${name}${
//           quantity > 1 ? "'s" : ""
//         } has been added to the ${
//           locations.find((l) => l._id === locationId).name
//         }`,
//         status: "success",
//         duration: 1000,
//         isClosable: true,
//       });
//       resetFields();
//     }
//   };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    setExpiryDate(
      selectedDate.toLocaleDateString("en-US", {
        timeZone: "America/Los_Angeles",
      })
    );
  };

  const resetFields = () => {
    setName("");
    setLocationId("");
    setCategoryId("");
    setExpiryDate("");
    setQuantity(0);
  };
  
  return (
    <HStack spacing={2} justifyContent="space-between" width="100%">
      <FormControl isInvalid={errors.name} w="25%" position="relative">
        <FormErrorMessage position="absolute" bottom="100%" left="0">
          {errors.name}
        </FormErrorMessage>
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl isInvalid={errors.locationId} w="25%" position="relative">
        <FormErrorMessage position="absolute" bottom="100%" left="0">
          {errors.locationId}
        </FormErrorMessage>
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
          onChange={(option) => setLocationId(option.value)}
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

      <FormControl isInvalid={errors.categoryId} w="25%" position="relative">
        <FormErrorMessage position="absolute" bottom="100%" left="0">
          {errors.categoryId}
        </FormErrorMessage>
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
          onChange={(option) => setCategoryId(option.value)}
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
            expiryDate ? new Date(expiryDate).toISOString().split("T")[0] : ""
          }
          onChange={handleDateChange}
        />
      </FormControl>

      <FormControl isInvalid={errors.quantity} w="10%" position="relative">
        <FormErrorMessage position="absolute" bottom="100%" left="0">
          {errors.quantity}
        </FormErrorMessage>
        <NumberInput
          placeholder="Quantity"
          value={quantity}
          onChange={(value) => setQuantity(value)}
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
