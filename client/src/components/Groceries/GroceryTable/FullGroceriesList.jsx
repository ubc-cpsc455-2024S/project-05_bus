import { useState } from "react";
import {
  Box,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  VStack,
  Text,
  Spacer,
  Tooltip,
} from "@chakra-ui/react";
import {
  TriangleDownIcon,
  TriangleUpIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  UpDownIcon,
} from "@chakra-ui/icons";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import ColumnFilter from "./ColumnFilter";
import NotificationPopover from "./NotificationPopover";
import AddGrocery from "./AddGrocery";
import GroceriesDrawer from "../GroceryDrawer/Drawer";
import columns from "./TableColumns";

import { addEvent } from "../../../redux/slices/calendarSlice";

import EditGroceryPopover from "./EditGroceryItem";
import FavoriteButton from "./FavouriteButton";
import SelectMealButton from "./MealButton";

export default function GroceriesTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 12 });
  const [openFilter, setOpenFilter] = useState("");
  const [dateFilterType, setDateFilterType] = useState("on");

  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);
  const groceriesData = useSelector((state) => state.groceries.groceries);
  const events = useSelector((state) => state.events.events);

  const dispatch = useDispatch();

  const tooltipColumns = ['name', 'categoryId', 'locationId'];

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
          choreId: "6",
          type: "restock",
          memberId: groceryItem.restockerId,
          done: false,
        },
      })
    );
  };

  const handleToggle = (columnId) => {
    setOpenFilter(columnId === openFilter ? null : columnId);
  };

  const table = useReactTable({
    data: groceriesData,
    columns: columns(
      locations,
      categories,
      dispatch,
      events,
      dateFilterType,
      createRestockNotification
    ),
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

  return (
    <Box
      p={5}
      flex="1"
      boxShadow="base"
      bg="white"
      className="groceries-container"
      height="100vh"
    >
      <VStack spacing={4} height="100%">
        <Box flex="1" overflow="auto" width="100%">
          <TableContainer>
            <Table variant="striped" colorScheme="cyan" size="sm">
              <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <Tr key={headerGroup.id} bg="gray.100">
                    {headerGroup.headers.map((header) => (
                      <Th
                        key={header.id}
                        cursor="pointer"
                        bg="teal.500"
                        color="white"
                        py={2}
                        px={3}
                        borderTopLeftRadius={
                          header.id === headerGroup.headers[0].id
                            ? "md"
                            : "none"
                        }
                        _hover={{ bg: "teal.600" }}
                      >
                        <HStack
                          spacing={2}
                          w="full"
                          justifyContent="space-between"
                        >
                          <Box
                            onClick={header.column.getToggleSortingHandler()}
                            cursor="pointer"
                            display="flex"
                            alignItems="center"
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
                    <Th
                      bg="teal.500"
                      color="white"
                      py={3}
                      px={4}
                      borderTopRightRadius="md"
                      _hover={{ bg: "teal.600" }}
                    >
                      Actions
                    </Th>
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <Tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <Td key={cell.id} maxWidth="180px">
                        {tooltipColumns.includes(cell.column.id) ? (
                          <Tooltip
                            label={flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                            hasArrow
                          >
                            <Box
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap"
                              p={1}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Box>
                          </Tooltip>
                        ) : (
                          <Box
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            p={1}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </Box>
                        )}
                      </Td>
                    ))}
                    <Td>
                      <EditGroceryPopover groceryItem={row.original} />
                      <NotificationPopover groceryItem={row.original} />
                      <FavoriteButton groceryItem={row.original} />
                      <SelectMealButton groceryItem={row.original} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <HStack>
          <AddGrocery />
          <GroceriesDrawer />
        </HStack>
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
