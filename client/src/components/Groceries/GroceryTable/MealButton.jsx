import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateGroceryAsync } from "../../../redux/groceries/thunks";

export default function SelectMealButton({ groceryItem }) {
  const [isSelect, setSelect] = useState(groceryItem.selectMeal);
  const dispatch = useDispatch();

  useEffect(() => {
    setSelect(groceryItem.selectMeal);
  }, [groceryItem.selectMeal]);

  const toggleSelect = () => {
    dispatch(updateGroceryAsync({ _id: groceryItem._id, selectMeal: !isSelect }));
    setSelect(!isSelect);
  };

  return (
    <IconButton
      aria-label="Toggle Select"
      icon={<span className='material-symbols-outlined'>skillet</span>}
      color={isSelect ? "orange.500" : "gray.600"}
      onClick={toggleSelect}
      bg="transparent"
      _hover={{ color: isSelect ? "orange.300" : "gray.400" }}
      _active={{ color: isSelect ? "orange.700" : "gray.800" }}
    />
  );
}