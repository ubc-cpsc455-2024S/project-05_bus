import { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  VStack,
  Input,
  Select,
  Button,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UpDownIcon,
  EditIcon,
} from "@chakra-ui/icons";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import ColumnFilter from "./ColumnFilter";
import { useSelector, useDispatch } from "react-redux";
import selectGroceriesWithNames from "../../redux/selectors/grocerySelectors";
import moment from "moment";
import { DateFilter } from "./FilterFns";
import NotificationPopover from "./NotificationPopover";
import { updateGroceryQuantity } from "../../redux/slices/groceriesSlice";
import { addEvent } from "../../redux/slices/calendarSlice";
import AddGrocery from "./AddGrocery";

export default function GroceriesTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 7 });
  const [openFilter, setOpenFilter] = useState(null);
  const [dateFilterType, setDateFilterType] = useState("on");
  const dispatch = useDispatch();

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "locationName",
      header: "Location",
    },
    {
      accessorKey: "categoryName",
      header: "Category",
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
      header: "Quantity",
      cell: ({ row }) => {
        return (
          <NumberInput
            value={row.original.quantity}
            size="sm"
            min={0}
            onChange={(valueString) => {
              const value = Number(valueString);
              dispatch(
                updateGroceryQuantity({ id: row.original.id, quantity: value })
              );
              row.original.quantity = value;
              if (value <= row.original.restockThreshold) {
                createRestockNotification(row.original);
              }
            }}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        );
      },
    },
  ];

  const createRestockNotification = (groceryItem) => {
    dispatch(
      addEvent({
        title: `Restock ${groceryItem.name}`,
        start: moment(new Date()).format(),
        allDay: true,
        backgroundColor: "#c49bad",
        borderColor: "#c49bad",
        extendedProps: {
          groceryId: groceryItem.id,
          choreId: 5,
          memberId: 0,
          done: false,
        },
      })
    );
  };

  const groceriesData = useSelector(selectGroceriesWithNames);

  const handleToggle = (columnId) => {
    setOpenFilter((currentOpenFilter) =>
      currentOpenFilter === columnId ? null : columnId
    );
  };

  const table = useReactTable({
    data: groceriesData,
    columns,
    state: {
      sorting,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleEdit = (row) => {
    console.log("Edit", row.original);
  };

  return (
    <Box
      p={5}
      flex="5"
      boxShadow="base"
      bg="white"
      className="groceries-container"
      height="100vh"
    >
      <VStack spacing={4} height="100%">
        <Box flex="1" overflow="auto" width="100%">
          <Table variant="striped" size="sm">
            <Thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Th key={header.id} cursor="pointer">
                      <HStack
                        spacing={2}
                        w="full"
                        justifyContent="space-between"
                      >
                        <Box
                          onClick={header.column.getToggleSortingHandler()}
                          cursor="pointer"
                          display="flex"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          <Box
                            display="inline-flex"
                            alignItems="center"
                            ml="4px"
                          >
                            {header.column.getIsSorted() ? (
                              header.column.getIsSorted() === "desc" ? (
                                <TriangleDownIcon />
                              ) : (
                                <TriangleUpIcon />
                              )
                            ) : (
                              <UpDownIcon />
                            )}
                          </Box>
                        </Box>
                        <Spacer />
                        <Box>
                          <ColumnFilter
                            column={header.column}
                            isOpen={openFilter === header.column.id}
                            onToggle={() => handleToggle(header.column.id)}
                            dateFilterType={dateFilterType}
                            setDateFilterType={setDateFilterType}
                          />
                        </Box>
                      </HStack>
                    </Th>
                  ))}
                  <Th>Actions</Th>
                </Tr>
              ))}
            </Thead>
            <Tbody>
              {table.getRowModel().rows.map((row) => (
                <Tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <Td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  ))}
                  <Td>
                    <IconButton
                      aria-label="Edit"
                      icon={<EditIcon />}
                      bg="transparent"
                      onClick={() => handleEdit(row)}
                    />
                    <NotificationPopover groceryItem={row.original} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <AddGrocery />
        <HStack spacing={2} justifyContent="space-between" width="100%">
          <IconButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<ArrowLeftIcon />}
            aria-label="Previous Page"
          />
          <Text>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </Text>
          <IconButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={<ArrowRightIcon />}
            aria-label="Next Page"
          />
        </HStack>
      </VStack>
    </Box>
  );
}
