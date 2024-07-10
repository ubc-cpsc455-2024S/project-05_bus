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
  createRestockNotification,
}) {
  // const removeAssociatedEvents = (groceryId) => {
  //   events
  //     .filter((event) => event.extendedProps.groceryId === groceryId)
  //     .forEach((event) => {
  //       dispatch(deleteEventAsync(event.id));
  //     });
  // };

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
        if (
          value <= row.original.restockThreshold &&
          row.original.restockerId
        ) {
          createRestockNotification(row.original);
          dispatch(
            updateGroceryAsync({
              _id: row.original._id,
              restockNotificationDate: new Date(),
            })
          );
        }
        if (
          value > row.original.restockThreshold &&
          row.original.restockNotificationDate !== null
        ) {
          dispatch(
            updateGroceryAsync({
              _id: row.original._id,
              restockNotificationDate: null,
            })
          );
          // removeAssociatedEvents(row.original._id);
        }
        if (value <= 0 && !row.original.favourite && row.original.restockNotificationDate == "") {
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
