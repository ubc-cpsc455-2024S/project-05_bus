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
        locationId,
        categoryId,
        expiryDate: formatedExpiryDate,
        quantity,
      })
    );
    console.log(groceries);
  };

  return (
    <HStack spacing={2} justifyContent="space-between" width="100%">
      <Input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Select
        placeholder="Location"
        value={locationId}
        onChange={(e) => setLocationId(e.target.value)}
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
      />
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
      <Button onClick={handleAdd}>Add</Button>
    </HStack>
  );
}
