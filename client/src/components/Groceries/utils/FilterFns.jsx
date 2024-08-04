import moment from 'moment';

export function DateFilter(row, columnId, filterValue, dateFilterType) {
  const selectedDate = moment(filterValue);
  const rowDate = moment(row.getValue(columnId));

  switch (dateFilterType) {
  case 'before':
    return rowDate.isBefore(selectedDate, 'day');
  case 'on':
    return rowDate.isSame(selectedDate, 'day'); 
  case 'after':
    return rowDate.isAfter(selectedDate, 'day');
  default:
    return true;
  }
}