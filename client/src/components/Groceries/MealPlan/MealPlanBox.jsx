import { Box, Button, Heading, IconButton, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, VStack, Spinner, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateMealSelect } from '../../../redux/groceries/groceriesSlice';
import React, { useState, useEffect } from 'react';
import useCurrentGroup from "../../../hooks/useCurrentGroup";
import { addRecipeAsync, generateRecipeAsync } from '../../../redux/recipes/thunks';
import RecipeDrawer from './RecipeDrawer';

export default function MealPlanBox() {
  const dispatch = useDispatch();
  const toast = useToast();
  const group = useCurrentGroup();
  const items = useSelector((state) => state.groceries.groceries);
  const [showRecipe, setShowRecipe] = useState(false);
  const [loading, setLoading] = useState(false);

  const selectedMealItems = items.filter(item => item.selectMeal);

  const recipe = useSelector((state) => state.recipes.recipe);

  const [quantities, setQuantities] = useState(
    selectedMealItems.reduce((acc, item) => {
      acc[item._id] = item.quantity;
      return acc;
    }, {})
  );

  const removeSelect = (item) => {
    dispatch(updateMealSelect({ _id: item._id, selectMeal: false }));
  };

  const saveMeal = () => {
    const newRecipe = {
      recipe: recipe.Recipe,
      estimatedtime: recipe.EstimatedTime,
      ingredients: recipe.Ingredients,
      instructions: recipe.Instructions,
      groupID: group._id,
    };
    dispatch(addRecipeAsync(newRecipe));
    toast({
      title: 'Recipe Successfully Added to Favourites',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    setShowRecipe(!showRecipe);
    selectedMealItems.forEach(item => {
      dispatch(updateMealSelect({ _id: item._id, selectMeal: false }));
    });
  };

  const cancelMeal = () => {
    setShowRecipe(!showRecipe);
  };
  
  const handleQuantityChange = (_id, value) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [_id]: value
    }));
  };

  const generateRecipe = () => {
    setLoading(true);
    let selectedItems = [];
    selectedMealItems.forEach(item => {
      const quantity = quantities[item._id] !== undefined ? quantities[item._id] : item.quantity;
      selectedItems.push({ name: item.name, quantity });
    });
    
    dispatch(generateRecipeAsync(selectedItems)).then(() => {
      setLoading(false);
      setShowRecipe(true);
    });
  };

  useEffect(() => {
    return () => {
      selectedMealItems.forEach(item => {
        if (selectedMealItems.selectMeal) {
          dispatch(updateMealSelect({ _id: item._id, selectMeal: false }));
        }
      });
    };
  }, );

  if (loading) {
    return (
      <Box p={5} display='flex' justifyContent='center' alignItems='center' height='100vh'>
        <Spinner size='xl' color='teal.500' />
      </Box>
    );
  }

  return (
    <>
      {showRecipe ? (
        <Box p={5}>
          <Box display='flex' justifyContent='space-between'>
            <IconButton
              icon={<span className='material-symbols-outlined' style={{ fontSize: '2rem' }}>bookmark</span>}
              bg='transparent'
              size='lg'
              color='orange.300'
              variant='unstyled'
              _hover={{color: 'orange.500'}}
              onClick={() => saveMeal()}
            />
            <IconButton
              icon={<span className='material-symbols-outlined'  style={{ fontSize: '2rem' }}>close</span>}
              bg='transparent'
              size='lg'
              color='red.500'
              variant='unstyled'
              _hover={{color: 'red.700'}}
              onClick={() => cancelMeal()}
            />
          </Box>
          <Text textAlign='center' color='teal.500' fontSize='2xl' mb={4}><strong>{recipe.Recipe}</strong><br /></Text>
          <Text textAlign='center' color='red.500' fontSize='md' mb={6}><strong>Estimated Time: {recipe.EstimatedTime}</strong><br /></Text>
          <Text><strong>Ingredients:</strong></Text>
          <Text>
            {recipe.Ingredients && recipe.Ingredients.map((ingredient, index) => (
              <React.Fragment key={index}>
                <span>- {ingredient}</span>
                <br />
              </React.Fragment>
            ))}<br /></Text>
          <Text><strong>Instructions:</strong></Text>
          <Text>
            {recipe.Instructions && recipe.Instructions.map((instruction, index) => (
              <React.Fragment key={index}>
                <span>{instruction}</span>
                <br />
              </React.Fragment>
            ))}</Text>
        </Box>
      ) : (
        <>
          <RecipeDrawer />
          <Box p={5}>
            <Heading mb={4} size='lg' color='black' textAlign='center'>
              Need Help <br /> Planning a Meal?
            </Heading>
            <Heading mb={4} size='sm' color='teal' textAlign='center'>
              Select from the table the grocery items you would like to incorporate
            </Heading>
            <VStack align='center' spacing={3}>
              {selectedMealItems.map((item) => (
                <Box
                  key={item._id}
                  display='flex'
                  alignItems='center'
                  justifyContent='space-between'
                >
                  <IconButton
                    icon={<span className='material-symbols-outlined'>close_small</span>}
                    bg='transparent'
                    color='red'
                    variant='unstyled'
                    onClick={() => removeSelect(item)}
                  />
                  <Text color='black'>{item.name}</Text>
                  <NumberInput 
                    defaultValue={item.quantity} 
                    max={item.quantity} 
                    min={1} 
                    size='sm'
                    width='62px'
                    border='transparent'
                    value={quantities[item._id]}
                    onChange={(valueString) => handleQuantityChange(item._id, parseInt(valueString))}
                  >
                    <NumberInputField fontWeight='bold' />
                    <NumberInputStepper>
                      <NumberIncrementStepper border='none' />
                      <NumberDecrementStepper border='none' />
                    </NumberInputStepper>
                  </NumberInput>
                </Box>
              ))}
            </VStack>
            <Box
              p={4}
              display='flex'
              justifyContent='center'
            >
              <Button
                size='md'
                bg='teal.500'
                color='white'
                _hover={{ bg: 'teal.600' }}
                onClick={generateRecipe}
                p={4}
                minWidth={{ base: "auto", md: "150px" }}
              >
                Generate Recipe
              </Button>
            </Box>
          </Box>
        </>
      )}
    </ >
  );
}