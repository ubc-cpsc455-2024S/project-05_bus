import { useState } from "react";
import {
  HStack,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { CreatableSelect } from "chakra-react-select";
import { AddIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import {
  handleCreateCategory,
  handleCreateLocation,
  isValidNewCategory,
  isValidNewLocation,
} from "../utils/CreateNewSelectOptions";
import useCurrentGroup from "../../../hooks/useCurrentGroup";
import { addGroceryAsync } from "../../../redux/groceries/thunks";

export default function AddGrocery() {
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);
  const dispatch = useDispatch();
  const group = useCurrentGroup();
  const toast = useToast();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [errors, setErrors] = useState({});

  const handleAdd = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!location) newErrors.locationId = "Location is required";
    if (!category) newErrors.categoryId = "Category is required";
    if (quantity <= 0) newErrors.quantity = "Cannot be 0";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // const formattedExpiryDate = moment(expiryDate).format();
      dispatch(
        addGroceryAsync({
          name,
          locationId: location,
          categoryId: category,
          expiryDate,
          quantity,
          groupID: group._id,
        })
      );
      toast({
        title: "Grocery Added",
        description: `${name}${
          quantity > 1 ? "'s" : ""
        } has been added to the ${locations.find((l) => l._id === location).name}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      resetFields();
    }
  };

  const resetFields = () => {
    setName("");
    setLocation("");
    setCategory("");
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
          onChange={(option) => setLocation(option.value)}
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
          onChange={(option) => setCategory(option.value)}
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
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
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

      <Button onClick={handleAdd}>
        <AddIcon />
      </Button>
    </HStack>
  );
}
