import { useState } from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import MiniGroceryCard from './MiniGroceryCard'; // Adjust the import based on the actual file path

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
      acc[item.id] = getRandomMutedColour();
      return acc;
    }, {});
  });

  return (
    <SimpleGrid columns={2} spacing={10}>
      {data.map((item) => {
        const matchingGroceries = groceries.filter((grocery) => {
          if (type === "categories") {
            return grocery.categoryId === item.id;
          } else if (type === "locations") {
            return grocery.locationId === item.id;
          }
          return false;
        });
        return (
          <MiniGroceryCard
            key={item.id}
            item={item}
            type={type}
            groceries={groceries}
            matchingGroceries={matchingGroceries}
            bgColor={colours[item.id]}
          />
        );
      })}
    </SimpleGrid>
  );
}
