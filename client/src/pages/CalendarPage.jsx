import { Box } from '@chakra-ui/react';
import Calendar from '../components/Calendar/Calendar';
import CalendarChores from '../components/Calendar/CalendarChores';

export default function CalendarPage() {
  return (
    <Box display="flex" flexDirection={["column", "column", "row"]} className="calendar-page">
      <Calendar />
      <CalendarChores />
    </Box>
  );
}
