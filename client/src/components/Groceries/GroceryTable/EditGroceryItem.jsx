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
  Select,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { CreatableSelect } from "chakra-react-select";
import { useSelector, useDispatch } from "react-redux";
import {
  handleCreateCategory,
  handleCreateLocation,
  isValidNewCategory,
  isValidNewLocation,
} from "../utils/CreateNewSelectOptions";
import moment from "moment";
import {
  updateGroceryAsync,
  deleteGroceryAsync,
} from "../../../redux/groceries/thunks";
import useCurrentGroupMembers from "../../../hooks/useCurrentGroupMembers";
import { COMMON_UNITS } from "../utils/commonUnits";

export default function EditGroceryPopover({ groceryItem }) {
  const [name, setName] = useState(groceryItem.name);
  const [location, setLocation] = useState(groceryItem.locationId);
  const [category, setCategory] = useState(groceryItem.categoryId);
  const [expiryDate, setExpiryDate] = useState(groceryItem.expiryDate);
  const [quantity, setQuantity] = useState(groceryItem.quantity);
  const [quantityUnit, setQuantityUnit] = useState(groceryItem.quantityUnit);
  const [ownerId, setOwnerId] = useState(groceryItem.ownerId);
  const [errors, setErrors] = useState({});
  const ref = useRef();

  const locations = useSelector((state) => state.groceries.locations);
  const categories = useSelector((state) => state.groceries.categories);
  const members = useCurrentGroupMembers();

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();

  const currentCategory = categories.find((cat) => cat._id === category);
  const currentLocation = locations.find((loc) => loc._id === location);

  useOutsideClick({
    ref: ref,
    handler: () => {
      if (Object.keys(errors).length === 0) {
        onClose();
      }
    },
  });

  const validateForm = () => {
    const newErrors = {};
    if (name.trim().length === 0) newErrors.name = "Name is required";
    if (!quantity || quantity < 0)
      newErrors.quantity = "Quantity must be greater or equal to 0";
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
        updateGroceryAsync({
          _id: groceryItem._id,
          name,
          locationId: location,
          categoryId: category,
          expiryDate: expiryDate,
          ownerId,
          quantity,
          quantityUnit,
        })
      );
      onClose();
    }
  };

  const handleDelete = () => {
    dispatch(deleteGroceryAsync(groceryItem._id));
    toast({
      title: "Grocery item deleted.",
      description: "Your item has been removed.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} closeOnBlur={false}>
      <PopoverTrigger>
        <IconButton
          aria-label="Edit Grocery Item"
          icon={<span className="material-symbols-outlined">edit</span>}
          bg="transparent"
          onClick={onOpen}
          _hover={{ color: "teal.300" }}
          _active={{ color: "teal.700" }}
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
              <Button
                className="material-symbols-outlined"
                size="sm"
                onClick={handleDelete}
              >
                delete
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
          <FormControl pb={2}>
            <FormLabel>Location</FormLabel>
            <CreatableSelect
              options={locations.map((loc) => ({
                value: loc._id,
                label: loc.name,
              }))}
              onChange={(option) => setLocation(option.value)}
              isValidNewOption={(input) => isValidNewLocation(input, locations)}
              value={
                currentLocation
                  ? { value: currentLocation._id, label: currentLocation.name }
                  : null
              }
              onCreateOption={(input) =>
                handleCreateLocation(input, dispatch, setLocation)
              }
              chakraStyles={{
                singleValue: (provided) => ({
                  ...provided,
                  paddingTop: 1,
                  paddingBottom: 1,
                }),
              }}
            />
            {errors.location && (
              <FormErrorMessage>{errors.location}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl pb={2}>
            <FormLabel>Category</FormLabel>
            <CreatableSelect
              options={categories.map((cat) => ({
                value: cat._id,
                label: cat.name,
              }))}
              onChange={(option) => setCategory(option.value)}
              value={
                currentCategory
                  ? { value: currentCategory._id, label: currentCategory.name }
                  : null
              }
              isValidNewOption={(input) =>
                isValidNewCategory(input, categories)
              }
              onCreateOption={(input) =>
                handleCreateCategory(input, dispatch, setLocation)
              }
              chakraStyles={{
                singleValue: (provided) => ({
                  ...provided,
                  paddingTop: 1,
                  paddingBottom: 1,
                }),
              }}
            />
            {errors.category && (
              <FormErrorMessage>{errors.category}</FormErrorMessage>
            )}
          </FormControl>
          <FormControl pb={2}>
            <FormLabel>Owner</FormLabel>
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
          <FormControl pb={2}>
            <FormLabel>Expiry Date</FormLabel>
            <Input
              type="date"
              value={moment(expiryDate).format("YYYY-MM-DD")}
              onChange={(e) => setExpiryDate(e.target.value)}
            />
          </FormControl>
          <HStack spacing={4}>
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
            </FormControl>
            <FormControl pb={2}>
              <FormLabel>Units</FormLabel>
              <Select
                id="quantity-unit"
                placeholder="Select unit"
                value={quantityUnit}
                onChange={(e) => setQuantityUnit(e.target.value)}
              >
                {COMMON_UNITS.map((unit) => (
                  <option key={unit.value} value={unit.value}>
                    {unit.label}
                  </option>
                ))}
              </Select>
            </FormControl>

            {errors.quantity && (
              <FormErrorMessage>{errors.quantity}</FormErrorMessage>
            )}
          </HStack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}
