import { Box } from "@chakra-ui/react";
import FullGroceriesList from "../components/Groceries/GroceryTable/FullGroceriesList";
import MealPlanBox from "../components/Groceries/MealPlan/MealPlanBox";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGroceriesAsync } from "../redux/groceries/thunks";
import useCurrentGroup from "../hooks/useCurrentGroup";

export default function GroceriesPage() {
  const dispatch = useDispatch();
  const group = useCurrentGroup();

  useEffect(() => {
    if (group?._id) {
      dispatch(getGroceriesAsync(group._id));
    }
  }, [dispatch, group]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      height="100vh"
      className="calendar-page"
    >
      <Box
        flex="3"
        minWidth="300px"
        overflow="auto"
      >
        <FullGroceriesList />
      </Box>
      <Box
        flex="1"
        borderRadius="md"
        minWidth="300px"
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
        overflow="auto"
      >
        <MealPlanBox />
      </Box>
    </Box>
  );
}
