import { useState } from "react";
import { SimpleGrid } from "@chakra-ui/react";
import MiniGroceryCard from "./MiniGroceryCard";

const getRandomMutedColour = () => {
  const mutedColours = [
    "#D1D5DB",
    "#F3F4F6",
    "#E5E7EB",
    "#F0F5F9",
    "#EDE9FE",
    "#FED7D7",
    "#FEEBC8",
    "#A7F3D0",
    "#BFDBFE",
  ];
  return mutedColours[Math.floor(Math.random() * mutedColours.length)];
};

export default function MiniGroceryList({ data, type, groceries }) {
  const [colours] = useState(() => {
    return data.reduce((acc, item) => {
      acc[item._id] = getRandomMutedColour();
      return acc;
    }, {});
  });

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
            bgColor={colours[item._id]}
          />
        ))}
    </SimpleGrid>
  );
}
