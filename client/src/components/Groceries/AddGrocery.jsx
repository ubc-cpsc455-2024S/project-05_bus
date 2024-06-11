import { useState } from "react";
import {
  HStack,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Button,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { addGrocery } from "../../redux/slices/groceriesSlice";
import moment from "moment";

export default function AddGrocery() {
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);
  const groceries = useSelector((state) => state.groceries.groceries);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [locationId, setLocationId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState(0);

  const handleAdd = () => {
    const formatedExpiryDate = moment(expiryDate).format();
    dispatch(
      addGrocery({
        name,
        locationId: Number(locationId),
        categoryId: Number(categoryId),
        expiryDate: formatedExpiryDate,
        quantity,
      })
    );
    resetFields();
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
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        w="25%"
      />
      <Select
        placeholder="Location"
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
        w="20%"
      >
        {locations.map((location) => (
          <option key={location.id} value={location.id}>
            {location.name}
          </option>
        ))}
      </Select>
      <Select
        placeholder="Category"
        value={categoryId}
        onChange={(e) => setCategoryId(e.target.value)}
        w="20%"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
      <Input
        placeholder="Expiry Date"
        type="date"
        value={expiryDate}
        onChange={(e) => setExpiryDate(e.target.value)}
        w="20%"
      />
      <NumberInput
        placeholder="Quantity"
        value={quantity}
        onChange={(value) => setQuantity(value)}
        min={0}
        w="10%"
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Button onClick={handleAdd}>
        <AddIcon />
      </Button>
    </HStack>
  );
}
