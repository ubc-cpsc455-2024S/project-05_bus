import { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { updateGrocery } from "../../../redux/slices/groceriesSlice";

export default function FavoriteButton({ groceryItem }) {
  const [isFavourite, setIsFavourite] = useState(groceryItem.favourite);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsFavourite(groceryItem.favourite);
  }, [groceryItem.favourite]);

  const toggleFavourite = () => {
    dispatch(updateGrocery({ id: groceryItem.id, favourite: !isFavourite }));
    setIsFavourite(!isFavourite);
  };

  return (
    <IconButton
      aria-label="Toggle Favorite"
      icon={<span className='material-symbols-outlined'>skillet</span>}
      color={isFavourite ? "orange.500" : "gray.600"}
      onClick={toggleFavourite}
      bg="transparent"
      _hover={{ color: isFavourite ? "orange.300" : "gray.400" }}
      _active={{ color: isFavourite ? "orange.700" : "gray.800" }}
    />
  );
}
