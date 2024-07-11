import { Box, Button, Heading, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateGrocery } from '../../../redux/slices/groceriesSlice';
import { useState } from 'react';
import { addMeal, generateMeal } from '../../../redux/meals/thunks';

export default function MealPlanBox() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.groceries.groceries);
  const [showRecipe, setShowRecipe] = useState(false);

  const selectedMealItems = items.filter(item => item.selectMeal);

  const recipe = useSelector((state) => state.meals.recipe);

  const [quantities, setQuantities] = useState(
    selectedMealItems.reduce((acc, item) => {
      acc[item.id] = item.quantity;
      return acc;
    }, {})
  );

  const removeSelect = (item) => {
    dispatch(updateGrocery({ id: item.id, selectMeal: false }));
  };

  const saveMeal = () => {
    dispatch(addMeal({meal: recipe.message}));
    setShowRecipe(!showRecipe);
    selectedMealItems.forEach(item => {
      dispatch(updateGrocery({ id: item.id, selectMeal: false }));
    });
  };

  const cancelMeal = () => {
    setShowRecipe(!showRecipe);
  };
  
  const handleQuantityChange = (id, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [id]: value
    }));
  };

  const generateRecipe = () => {
    let selectedItems = [];
    selectedMealItems.forEach(item => {
      const quantity = quantities[item.id] !== undefined ? quantities[item.id] : item.quantity;
      selectedItems.push({ name: item.name, quantity });
    });
    
    dispatch(generateMeal(selectedItems));
    setShowRecipe(true);
  };

  return (
    showRecipe ? (
      <Box p={5}>
        <Box display="flex" justifyContent="space-between">
          <IconButton
            icon={<span className="material-symbols-outlined">bookmark</span>}
            bg="transparent"
            size="lg"
            color="orange.300"
            variant="unstyled"
            _hover={{color: "orange.500"}}
            onClick={() => saveMeal()}
          />
          <IconButton
            icon={<span className="material-symbols-outlined">close</span>}
            bg="transparent"
            size="lg"
            color="red.500"
            variant="unstyled"
            _hover={{color: "red.700"}}
            onClick={() => cancelMeal()}
          />
        </Box>
        <Text>{ recipe.message }</Text>
      </Box>
    ) : (
      <Box p={5}>
        <Heading mb={4} size="lg" color="black" textAlign="center">
          Need Help <br /> Planning a Meal?
        </Heading>
        <Heading mb={4} size="sm" color="teal" textAlign="center">
          Select from the table the <br /> grocery items you would <br /> like to incorporate
        </Heading>
        <VStack align="start" spacing={3}>
          {selectedMealItems.map((item) => (
            <Box
              key={item.id}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton
                icon={<span className="material-symbols-outlined">close_small</span>}
                bg="transparent"
                color="red"
                variant="unstyled"
                onClick={() => removeSelect(item)}
              />
              <Text color="black">{item.name}</Text>
              <NumberInput 
                defaultValue={item.quantity} 
                max={item.quantity} 
                min={1} 
                size="sm"
                width="62px"
                border="transparent"
                value={quantities[item.id]}
                onChange={(valueString) => handleQuantityChange(item.id, parseInt(valueString))}
              >
                <NumberInputField fontWeight="bold" />
                <NumberInputStepper>
                  <NumberIncrementStepper border="none" />
                  <NumberDecrementStepper border="none" />
                </NumberInputStepper>
              </NumberInput>
            </Box>
          ))}
        </VStack>
        <Box
          p={4}
          display="flex"
          justifyContent="center"
        >
          <Button
            size="md"
            bg="teal.500"
            color="white"
            _hover={{ bg: "teal.600" }}
            onClick={generateRecipe}
          >
            Generate Meal
          </Button>
        </Box>
      </Box>
    )
  );
}