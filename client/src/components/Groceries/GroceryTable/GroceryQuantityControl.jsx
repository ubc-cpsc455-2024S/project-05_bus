import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { deleteGroceryAsync, updateGroceryAsync } from "../../../redux/groceries/thunks";

export default function GroceryQuantityControl({
  row,
  dispatch,
}) {
  return (
    <NumberInput
      value={row.original.quantity}
      size="sm"
      border="transparent"
      maxW={20}
      min={0}
      onChange={(valueString) => {
        const value = Number(valueString);
        dispatch(updateGroceryAsync({ _id: row.original._id, quantity: value }));
        if (value <= 0 && !row.original.favourite && row.original.restockNotificationDate == null) {
          dispatch(deleteGroceryAsync(row.original._id));
        }
      }}
    >
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper border="none" />
        <NumberDecrementStepper border="none" />
      </NumberInputStepper>
    </NumberInput>
  );
}
