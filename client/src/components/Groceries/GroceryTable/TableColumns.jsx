import moment from "moment";
import { DateFilter } from "../utils/FilterFns";
import GroceryQuantityControl from "./GroceryQuantityControl";

const columns = (
  // locations,
  categories,
  dispatch,
  events,
  dateFilterType,
  createRestockNotification
) => [
  {
    accessorKey: "name",
    header: "Name",
  },
  // {
  //   accessorKey: "locationId",
  //   header: "Location",
  //   cell: (info) =>
  //     locations.find((l) => l.id === String(info.getValue())).name,
  // },
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
    cell: ({ row }) => (
      <GroceryQuantityControl
        row={row}
        dispatch={dispatch}
        events={events}
        createRestockNotification={createRestockNotification}
      />
    ),
  },
];

export default columns;
