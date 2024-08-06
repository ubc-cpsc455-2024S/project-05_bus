import { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { updateMealSelect } from '../../../redux/groceries/groceriesSlice';

export default function SelectMealButton({ groceryItem }) {
  const [isSelect, setSelect] = useState(groceryItem.selectMeal);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelect(groceryItem.selectMeal);
  }, [groceryItem.selectMeal]);

  const toggleSelect = () => {
    dispatch(updateMealSelect({ _id: groceryItem._id, selectMeal: !isSelect }));
    setSelect(!isSelect);
  };

  return (
    <Tooltip label="Get Cooking" aria-label="Get Cooking">
    <IconButton
      aria-label='Toggle Select'
      icon={<span className='material-symbols-outlined'>skillet</span>}
      color={isSelect ? 'orange.500' : 'gray.600'}
      onClick={toggleSelect}
      bg='transparent'
      _hover={{ color: 'orange.300' }}
      _active={{ color: 'orange.700' }}
    />
    </Tooltip>
  );
}
