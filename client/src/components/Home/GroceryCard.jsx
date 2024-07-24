import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import moment from "moment";

const GroceryList = ({ groceries }) => {
  return (
    <Box
      p={4}
      w="100%"
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
      bg="white"
      overflowX="auto"
    >
      <Text fontSize="2xl" fontWeight="bold" mb={4}>
        My Groceries
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th textAlign="right">Expiry Date</Th>
            <Th textAlign="right" isNumeric>
              Quantity
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {groceries.map((grocery, index) => (
            <Tr key={index}>
              <Td>
                <Text fontWeight="semibold">{grocery.name}</Text>
              </Td>
              <Td textAlign="right">
                {grocery.expiryDate
                  ? moment(grocery.expiryDate).format("MMM D, YYYY")
                  : "N/A"}
              </Td>
              <Td isNumeric textAlign="right">
                {grocery.quantity} {grocery.quantityUnit || ""}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GroceryList;
