import {
  SimpleGrid,
  Box,
  Card,
  CardHeader,
  CardBody,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  Tooltip,
  Text
} from "@chakra-ui/react";

const MiniGroceryList = ({ data, type, groceries }) => (
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
        <Card key={item.id} backgroundColor={getRandomMutedColor()}>
          <CardHeader fontSize="lg">{item.name}</CardHeader>
          <CardBody m={1} p={0}>
            {matchingGroceries.length > 0 ? (
              <TableContainer overflowX="hidden" overflowY="scroll">
                <Table variant="unstyled">
                  <Thead>
                    <Tr>
                      <Th minWidth="80%">Name</Th>
                      <Th isNumeric>Qty</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {groceries
                      .filter((grocery) => {
                        if (type === "categories") {
                          return grocery.categoryId === item.id;
                        } else if (type === "locations") {
                          return grocery.locationId === item.id;
                        }
                        return false;
                      })
                      .map((grocery) => (
                        <Tr key={grocery.id}>
                          <Td>
                            <Tooltip
                              label={grocery.name}
                              aria-label="grocery-name"
                            >
                              <Box
                                maxWidth="90%"
                                overflow="hidden"
                                textOverflow="ellipsis"
                                whiteSpace="nowrap"
                              >
                                {grocery.name}
                              </Box>
                            </Tooltip>
                          </Td>
                          <Td isNumeric>{grocery.quantity}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </TableContainer>
            ) : (
              <Text textAlign="center" color="gray.500" mb={4}>
                No items found
              </Text>
            )}
          </CardBody>
        </Card>
      );
    })}
  </SimpleGrid>
);

const getRandomMutedColor = () => {
  const mutedColors = [
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
  return mutedColors[Math.floor(Math.random() * mutedColors.length)];
};

export default MiniGroceryList;
