import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, List, ListItem, Spinner } from '@chakra-ui/react';
import { getRecipesAsync } from '../../../redux/recipes/thunks';

const RecipeList = ({ onRecipeSelect }) => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.list);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      await dispatch(getRecipesAsync());
      setLoading(false);
    };

    fetchRecipes();
  }, [dispatch]);

  if (loading) {
    return (
      <Box textAlign="center" p={4}>
        <Spinner size="lg" color="teal.500" />
      </Box>
    );
  }

  return (
    <Box p={4}>
      <List spacing={3}>
        {recipes.map((recipe) => (
          <ListItem
            key={recipe._id}
            p={2}
            borderWidth="1px"
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: "gray.100" }}
            onClick={() => onRecipeSelect(recipe)}
          >
            {recipe.recipe}
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecipeList;
