import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { updateGrocery, removeGrocery } from "../../../redux/slices/groceriesSlice";
import { removeEvent } from "../../../redux/slices/calendarSlice";

export default function GroceryQuantityControl({
  row,
  dispatch,
  events,
  createRestockNotification,
}) {
  const removeAssociatedEvents = (groceryId) => {
    events
      .filter((event) => event.extendedProps.groceryId === groceryId)
      .forEach((event) => {
        dispatch(removeEvent(event.id));
      });
  };

  return (
    <NumberInput
      value={row.original.quantity}
      size="sm"
      border="transparent"
      maxW={20}
      min={0}
      onChange={(valueString) => {
        const value = Number(valueString);
        dispatch(updateGrocery({ id: row.original.id, quantity: value }));
        if (
          value <= row.original.restockThreshold &&
          row.original.restockerId
        ) {
          createRestockNotification(row.original);
        }
        if (
          value > row.original.restockThreshold &&
          row.original.restockNotificationDate !== ""
        ) {
          dispatch(
            updateGrocery({
              id: row.original.id,
              restockNotificationDate: "",
            })
          );
          removeAssociatedEvents(row.original.id);
        }
        if (value <= 0 && !row.original.favourite) {
          dispatch(removeGrocery(row.original.id));
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
