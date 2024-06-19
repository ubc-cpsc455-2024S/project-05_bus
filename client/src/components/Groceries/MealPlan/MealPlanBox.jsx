import { Box, Heading, IconButton, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGrocery } from '../../../redux/slices/groceriesSlice';

export default function MealPlanBox() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.groceries.groceries);

  const favouriteItems = items.filter(item => item.favourite);

  const removeFavourite = (item) => {
    dispatch(updateGrocery({ id: item.id, favourite: false }));
  };

  return (
    <Box p={1}>
      <Heading mb={4} size="lg" color="black" textAlign="center">
        Need Help <br /> Planning a Meal?
      </Heading>
      <Heading mb={4} size="sm" color="teal" textAlign="center">
        Select from the table which grocery items you would like to incorporate
      </Heading>
      <VStack align="start" spacing={3}>
        {favouriteItems.map((item) => (
          <Box
            key={item.id}
            display="flex"
            alignItems="center"
          >
            <IconButton
              icon={<span className="material-symbols-outlined">close_small</span>}
              bg="transparent"
              color="red"
              variant="unstyled"
              onClick={() => removeFavourite(item)}
            />
            <Text color="black">{item.name}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
