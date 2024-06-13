import { useRef } from "react";
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  IconButton,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  useToast,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { CreatableSelect } from "chakra-react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  handleCreateCategory,
  handleCreateLocation,
  isValidNewCategory,
  isValidNewLocation,
} from "./CreateNewSelectOptions";
import { updateGrocery } from "../../redux/slices/groceriesSlice";
import moment from "moment";

export default function EditGroceryPopover({ groceryItem }) {
  const [name, setName] = useState(groceryItem.name);
  const [location, setLocation] = useState(groceryItem.locationId);
  const [category, setCategory] = useState(groceryItem.categoryId);
  const [expiryDate, setExpiryDate] = useState(groceryItem.expiryDate);
  const [quantity, setQuantity] = useState(groceryItem.quantity);
  const [errors, setErrors] = useState({});
  const ref = useRef();

  const locations = useSelector((state) => state.groceries.locations);
  const categories = useSelector((state) => state.groceries.categories);

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const currentCategory = categories.find((cat) => cat.id === category);
  const currentLocation = locations.find((loc) => loc.id === location);

  useOutsideClick({
    ref: ref,
    handler: () => {
      onClose();
    },
  });

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!location) newErrors.location = "Location is required";
    if (!category) newErrors.category = "Category is required";
    if (!quantity || quantity <= 0)
      newErrors.quantity = "Quantity must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      toast({
        title: "Grocery item updated.",
        description: "Your changes have been saved.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      dispatch(
        updateGrocery({
          id: groceryItem.id,
          name,
          locationId: location,
          categoryId: category,
          expiryDate: moment(expiryDate).format(),
          quantity,
        })
      );
      onClose();
    }
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={false}>
      <PopoverTrigger>
        <IconButton
          aria-label="Edit Grocery Item"
          icon={<EditIcon />}
          bg="transparent"
          onClick={onOpen}
        />
      </PopoverTrigger>
      <PopoverContent shadow="lg">
        <PopoverArrow />
        <PopoverHeader>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Edit Grocery Item</Text>
            <ButtonGroup>
              <Button
                className="material-symbols-outlined"
                size="sm"
                onClick={handleSave}
              >
                Save
              </Button>
              <PopoverCloseButton position="static" size="md" />
            </ButtonGroup>
          </Box>
        </PopoverHeader>
        <PopoverBody ref={ref}>
          <FormControl isInvalid={errors.name} pb={2}>
            <FormLabel>Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl isInvalid={errors.location} pb={2}>
            <FormLabel>Location</FormLabel>
            <CreatableSelect
              options={locations.map((loc) => ({
                value: loc.id,
                label: loc.name,
              }))}
              onChange={(option) => setLocation(option.value)}
              isValidNewOption={(input) => isValidNewLocation(input, locations)}
              value={
                currentCategory
                  ? { value: currentCategory.id, label: currentCategory.name }
                  : null
              }
              onCreateOption={(input) =>
                handleCreateLocation(
                  input,
                  locations,
                  dispatch,
                  setLocation,
                  setErrors,
                  errors
                )
              }
            />
            {errors.location && (
              <FormErrorMessage>{errors.location}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl isInvalid={errors.category} pb={2}>
            <FormLabel>Category</FormLabel>
            <CreatableSelect
              options={categories.map((cat) => ({
                value: cat.id,
                label: cat.name,
              }))}
              onChange={(option) => setCategory(option.value)}
              value={
                currentLocation
                  ? { value: currentLocation.id, label: currentLocation.name }
                  : null
              }
              isValidNewOption={(input) =>
                isValidNewCategory(input, categories)
              }
              onCreateOption={(input) =>
                handleCreateCategory(
                  input,
                  categories,
                  dispatch,
                  setLocation,
                  setErrors,
                  errors
                )
              }
            />
            {errors.category && (
              <FormErrorMessage>{errors.category}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl pb={2}>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              type="date"
              value={moment(expiryDate).format("YYYY-MM-DD")}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </FormControl>
          <FormControl isInvalid={errors.quantity} pb={2}>
            <FormLabel>Quantity</FormLabel>
            <NumberInput
              min={0}
              value={quantity}
              onChange={(value) => setQuantity(value)}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {errors.quantity && (
              <FormErrorMessage>{errors.quantity}</FormErrorMessage>
            )}
          </FormControl>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
