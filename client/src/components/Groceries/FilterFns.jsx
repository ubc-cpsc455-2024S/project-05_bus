export function DateFilter(row, columnId, filterValue, dateFilterType) {
    const selectedDate = new Date(filterValue);
    const rowDate = new Date(row.getValue(columnId));

    switch (dateFilterType) {
      case "before":
        return rowDate < selectedDate;
      case "on":
        return rowDate.toDateString() === selectedDate.toDateString();
      case "after":
        return rowDate > selectedDate;
      default:
        return true;
    }
}