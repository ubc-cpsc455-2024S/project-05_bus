import { Box } from '@chakra-ui/react';
import FullGroceriesList from '../components/Groceries/GroceryTable/FullGroceriesList';

export default function GroceriesPage() {
  return (
    <Box display="flex" flex-direction="row" w="100%" h="100vh" className="calendar-page">
      <FullGroceriesList />
      <Box flex="4">Placeholder for groceries AI or whatever</Box>
    </Box>
  )
}