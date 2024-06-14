import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import moment from "moment";
import {
  removeGrocery,
  updateGrocery,
} from "../../../redux/slices/groceriesSlice";
import { removeEvent } from "../../../redux/slices/calendarSlice";

import { DateFilter } from "./FilterFns";

const columns = (locations, categories, dispatch, events, dateFilterType, createRestockNotification) => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "locationId",
    header: "Location",
    cell: (info) =>
      locations.find((l) => l.id === String(info.getValue())).name,
  },
  {
    accessorKey: "categoryId",
    header: "Category",
    cell: (info) =>
      categories.find((c) => c.id === String(info.getValue())).name,
  },
  {
    accessorKey: "expiryDate",
    header: "Expiry Date",
    cell: (info) => moment(info.getValue()).format("MMMM DD, YYYY"),
    filterFn: (row, columnId, filterValue) => {
      return DateFilter(row, columnId, filterValue, dateFilterType);
    },
  },
  {
    accessorKey: "quantity",
    header: "Qty",
    cell: ({ row }) => {
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
              events
                .filter((event) => {
                  event.extendedProps.groceryId === row.original.id;
                })
                .forEach((event) => {
                  dispatch(removeEvent(event.id));
                });
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
    },
  },
];

export default columns;
