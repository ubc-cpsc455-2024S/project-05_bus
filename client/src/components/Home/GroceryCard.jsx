import { Box, Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import moment from "moment";

const GroceryList = ({ groceries }) => {
  return (
    <Box
      p={4}
      w="100%"
      bg="white"
      overflowX="auto"
      borderTop="2px solid"
      borderColor="gray.200"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        My Groceries
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th fontSize="sm">Name</Th>
            <Th fontSize="sm">Expiry Date</Th>
            <Th fontSize="sm" isNumeric>
              Quantity
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {groceries.map((grocery, index) => (
            <Tr key={index}>
              <Td>
                <Text fontWeight="semibold" fontSize="sm">{grocery.name}</Text>
              </Td>
              <Td fontSize="sm">
                {grocery.expiryDate
                  ? moment(grocery.expiryDate).format("MMM D, YYYY")
                  : "N/A"}
              </Td>
              <Td isNumeric fontSize="sm">
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
