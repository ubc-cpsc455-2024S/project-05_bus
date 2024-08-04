import moment from 'moment';
import { DateFilter } from '../utils/FilterFns';
import { HStack, Text, Badge } from '@chakra-ui/react';

const columns = (locations, categories, members, dateFilterType, breakpoint) => {
  const allColumns = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => (
        <HStack>
          <Text overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'>
            {info.getValue()}
          </Text>
          {!info.row.original.ownerId ? (
            <Badge colorScheme='green'>Shared</Badge>
          ) : (
            <Badge colorScheme='blue'>
              {
                members.find((m) => m._id === String(info.row.original.ownerId))
                  .firstName
              }
            </Badge>
          )}
        </HStack>
      ),
    },
    {
      accessorKey: 'categoryId',
      header: 'Category',
      cell: (info) => {
        const category = categories.find(
          (c) => c._id === String(info.getValue())
        );
        return category ? category.name : 'No Category';
      },
    },
    {
      accessorKey: 'expiryDate',
      header: 'Expiry Date',
      cell: (info) => {
        const dateValue = info.getValue();
        return dateValue
          ? moment(dateValue).format('MMMM DD, YYYY')
          : 'No Expiry Date Provided';
      },
      filterFn: (row, columnId, filterValue) => {
        return DateFilter(row, columnId, filterValue, dateFilterType);
      },
    },
    {
      accessorKey: 'locationId',
      header: 'Location',
      cell: (info) => {
        const location = locations.find((l) => l._id === String(info.getValue()));
        return location ? location.name : 'No Location';
      },
    },
    {
      accessorKey: 'quantity',
      header: 'Qty',
      cell: (info) => {
        return info.row.original.quantityUnit
          ? info.getValue() + ' ' + info.row.original.quantityUnit
          : info.getValue();
      },
    },
  ];


  const visibleColumns = allColumns.filter((column) => {
    if (breakpoint === 'base' || breakpoint === 'sm') {
      return column.accessorKey === 'name' || column.accessorKey === 'quantity';
    }
    if (breakpoint === 'md' || breakpoint === 'lg') {
      return column.accessorKey === 'name' || column.accessorKey === 'quantity' || column.accessorKey === 'categoryId';
    }
    return true;
  });

  return visibleColumns;
};

export default columns;