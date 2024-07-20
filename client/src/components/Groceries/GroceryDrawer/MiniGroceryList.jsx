import { SimpleGrid } from "@chakra-ui/react";
import MiniGroceryCard from "./MiniGroceryCard";

export default function MiniGroceryList({ data, type, groceries }) {
  return (
    <SimpleGrid columns={2} spacing={10}>
      {data
        .map((item) => {
          const matchingGroceries = groceries.filter((grocery) => {
            if (type === "category") {
              return grocery.categoryId === item._id;
            } else if (type === "location") {
              return grocery.locationId === item._id;
            }
            return false;
          });
          return { ...item, matchingGroceries };
        })
        .sort((a, b) => b.matchingGroceries.length - a.matchingGroceries.length)
        .map((item) => (
          <MiniGroceryCard
            key={item._id}
            item={item}
            type={type}
            groceries={groceries}
            matchingGroceries={item.matchingGroceries}
            bgColor={item.colour}
          />
        ))}
    </SimpleGrid>
  );
}
