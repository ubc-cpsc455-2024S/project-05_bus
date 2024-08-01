import { Box, useBreakpointValue } from "@chakra-ui/react";
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

  const showMealPlanBox = useBreakpointValue({
    base: false,
    sm: false,
    md: false,
    lg: true,
  });

  return (
    <Box display="flex" flexDirection="row" className="calendar-page">
      <Box flex="3" overflow="auto">
        <FullGroceriesList />
      </Box>
      {showMealPlanBox && (
        <Box
          flex="1"
          borderRadius="md"
          boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
          overflow="auto"
        >
          <MealPlanBox />
        </Box>
      )}
    </Box>
  );
}
