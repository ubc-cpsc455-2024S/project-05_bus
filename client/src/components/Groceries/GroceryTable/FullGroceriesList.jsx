import React, { useState, useMemo } from "react";
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
  useBreakpointValue,
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
import { useSelector } from "react-redux";

import ColumnFilter from "./ColumnFilter";
import NotificationPopover from "./NotificationPopover";
import GroceryFooter from "./GroceryFooter";
import columns from "./TableColumns";

import EditGroceryPopover from "./EditGroceryItem";
import FavoriteButton from "./FavouriteButton";
import SelectMealButton from "./MealButton";

import useCurrentGroupMembers from "../../../hooks/useCurrentGroupMembers";
import NotePopover from "./NotePopover";

export default function GroceriesTable() {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 12 });
  const [openFilter, setOpenFilter] = useState("");
  const [dateFilterType, setDateFilterType] = useState("on");

  const groceriesData = useSelector((state) => state.groceries.groceries);
  const categories = useSelector((state) => state.groceries.categories);
  const locations = useSelector((state) => state.groceries.locations);
  const members = useCurrentGroupMembers();

  const tooltipColumns = ["name", "categoryId", "locationId"];

  const handleToggle = (columnId) => {
    setOpenFilter(columnId === openFilter ? null : columnId);
  };

  const breakpoint = useBreakpointValue({
    base: "base",
    sm: "sm",
    md: "md",
    lg: "lg",
    xl: "xl",
  });

  const memoizedColumns = useMemo(() => {
    return columns(locations, categories, members, dateFilterType, breakpoint);
  }, [locations, categories, members, dateFilterType, breakpoint]);

  const table = useReactTable({
    data: groceriesData,
    columns: memoizedColumns,
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
    autoResetPageIndex: false,
  });

  return (
    <Box
      p={5}
      boxShadow="base"
      bg="white"
      className="groceries-container"
      height="100vh"
    >
      <VStack spacing={4} height="100%">
        <Box overflow="auto" width="100%" height="100%">
          <TableContainer>
            <Table variant="simple" colorScheme="teal" bg="teal.50" size="sm">
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
                      display={{ base: "none", md: "table-cell" }}
                      _hover={{ bg: "teal.600" }}
                    >
                      Actions
                    </Th>
                  </Tr>
                ))}
              </Thead>
              <Tbody>
                {table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <Tr>
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
                      <Td
                        maxWidth="180px"
                        display={{ base: "none", md: "table-cell" }}
                      >
                        <EditGroceryPopover groceryItem={row.original} />
                        <NotificationPopover groceryItem={row.original} />
                        <FavoriteButton groceryItem={row.original} />
                        <NotePopover groceryItem={row.original} />
                        <SelectMealButton groceryItem={row.original} />
                      </Td>
                    </Tr>
                    <Tr display={{ base: "table-row", md: "none" }}>
                      <Td colSpan={row.getVisibleCells().length}>
                        <HStack spacing={2} justifyContent="flex-end">
                          <EditGroceryPopover groceryItem={row.original} />
                          <NotificationPopover groceryItem={row.original} />
                          <FavoriteButton groceryItem={row.original} />
                          <NotePopover groceryItem={row.original} />
                          <SelectMealButton groceryItem={row.original} />
                        </HStack>
                      </Td>
                    </Tr>
                  </React.Fragment>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <GroceryFooter />
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
            onClick={() => {
              if (table.getCanNextPage()) table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            icon={<ArrowRightIcon />}
            aria-label="Next Page"
          />
        </HStack>
      </VStack>
    </Box>
  );
}
