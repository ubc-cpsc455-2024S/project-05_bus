import { Box } from "@chakra-ui/react";
import Calendar from "./Calendar/Calendar";
import CalendarChores from "./Calendar/CalendarChores";

export default function CalendarPage() {
  return (
    <Box display="flex" flex-direction="row" w="100%" h="100vh" className="calendar-page">
      <Calendar />
      <CalendarChores />
    </Box>
  );
}
