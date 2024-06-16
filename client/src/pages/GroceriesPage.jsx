import { Box } from "@chakra-ui/react";
import FullGroceriesList from "../components/Groceries/GroceryTable/FullGroceriesList";

export default function GroceriesPage() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      height="100vh"
      className="calendar-page"
    >
      <FullGroceriesList />
      <Box flex="1">
        Placeholder for groceries AI or whatever
      </Box>
    </Box>
  );
}
