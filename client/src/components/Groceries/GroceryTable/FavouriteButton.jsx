import { useState } from 'react';
import { IconButton } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateGroceryAsync } from '../../../redux/groceries/thunks';

export default function FavoriteButton({ groceryItem }) {
  const [isFavourite, setIsFavourite] = useState(groceryItem.favourite);
  const dispatch = useDispatch();

  const toggleFavourite = () => {
    dispatch(
      updateGroceryAsync({ _id: groceryItem._id, favourite: !isFavourite })
    );
    setIsFavourite(!isFavourite);
  };

  return (
    <IconButton
      aria-label='Toggle Favorite'
      icon={<span className='material-symbols-outlined'>favorite</span>}
      color={isFavourite ? 'red.500' : 'gray.600'}
      onClick={toggleFavourite}
      bg='transparent'
      _hover={{ color: 'red.400' }}
      _active={{ color: 'red.700' }}
    />
  );
}
