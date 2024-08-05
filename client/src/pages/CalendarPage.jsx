import { Box } from '@chakra-ui/react';
import Calendar from '../components/Calendar/Calendar';
import CalendarChores from '../components/Calendar/CalendarChores';

export default function CalendarPage() {
  return (
    <Box display='flex' flex-direction='row' w='100%' h='100vh' className='calendar-page'>
      <Calendar />
      <CalendarChores />
    </Box>
  );
}
