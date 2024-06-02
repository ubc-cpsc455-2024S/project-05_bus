import { Box } from "@chakra-ui/react";
import Calendar from "./Calendar";
import CalendarChores from "./CalendarChores";

export default function CalendarPage() {
  return (
    <Box display="flex" flex-direction="row" w="100%" h="100vh" className="calendar-page">
      <Calendar />
      <CalendarChores />
    </Box>
  );
}
