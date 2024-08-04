import {
  Box,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  DrawerHeader,
  Text,
  Divider,
} from '@chakra-ui/react';
import RecipeList from './RecipeList';
import { useState } from 'react';
import { deleteRecipeAsync } from '../../../redux/recipes/thunks';
import { useDispatch } from 'react-redux';
  
export default function RecipeDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const dispatch = useDispatch();

  const handleRecipeSelect = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBack = () => {
    setSelectedRecipe(null);
  };

  const handleDelete = async () => {
    await dispatch(deleteRecipeAsync(selectedRecipe._id));
    setSelectedRecipe(null);
  };

  return (
    <>
      <Box display='flex' justifyContent='flex-end' mt={4} mr={4}>
        <Button
          className='material-symbols-outlined'
          onClick={onOpen}
          style={{ fontSize: '2.5rem' }}
          bg='transparent'
          color='teal.500'
        >
          menu_book
        </Button>
      </Box>
      <Drawer isOpen={isOpen} placement='right' onClose={onClose} size='lg'>
        <DrawerOverlay>
          <DrawerContent overflowY='auto'>
            <Box>
              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                p={4}
                borderBottom='1px'
                borderColor='gray.200'
                whiteSpace='nowrap'
              >
                {selectedRecipe ? (
                  <Button mt={5} p={4} fontSize='xl' fontWeight='bold' bg='transparent' color='black' onClick={handleBack}>Back to Recipes</Button>
                ) : (
                  <DrawerHeader mt={5} ml={4} p={1} fontSize='xl' fontWeight='bold' color='teal.600'>Favourited Recipes</DrawerHeader>
                )}
                <DrawerCloseButton mt={6} mr={4} p={4} fontSize='xl' />
              </Box>
              <Divider />
            </Box>
            <DrawerBody height='calc(100vh - 120px)'>
              {selectedRecipe ? (
                <Box p={4}>
                  <Text fontSize='2xl' color='teal.500' fontWeight='bold' mb={4}>{selectedRecipe.recipe}</Text>
                  <Text fontSize='lg' mb={2} color='teal.500' fontWeight='bold'>Ingredients:</Text>
                  <Box mb={4}>
                    {selectedRecipe.ingredients && selectedRecipe.ingredients.map((ingredient, index) => (
                      <Text key={index}>- {ingredient}</Text>
                    ))}
                  </Box>
                  <Text fontSize='lg' mb={2} color='teal.500' fontWeight='bold'>Instructions:</Text>
                  <Box>
                    {selectedRecipe.instructions && selectedRecipe.instructions.map((instruction, index) => (
                      <Text key={index}>{instruction}</Text>
                    ))}
                  </Box>
                  <Box display='flex' justifyContent='flex-end' mt={4}>
                    <Button color='red.500' fontWeight='bold' onClick={handleDelete}>Delete Recipe</Button>
                  </Box>
                </Box>
              ) : (
                <Box p={4}>
                  <RecipeList onRecipeSelect={handleRecipeSelect} />
                </Box>
              )}
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}
  