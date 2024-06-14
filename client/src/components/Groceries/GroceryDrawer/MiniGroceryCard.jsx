import {
  Box,
  Button,
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
  Text,
  Input,
  InputGroup,
  InputRightAddon,
  useOutsideClick,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  updateCategory,
  updateLocation,
} from "../../../redux/slices/groceriesSlice";

export default function GroceryCard({
  item,
  type,
  groceries,
  matchingGroceries,
  bgColor,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [cardName, setCardName] = useState(item.name);
  const dispatch = useDispatch();
  const ref = useRef();

  useOutsideClick({
    ref: ref,
    handler: () => setIsEditing(false),
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setCardName(e.target.value);
  };

  const handleSaveClick = () => {
    if (type === "categories") {
      dispatch(updateCategory({ id: item.id, name: cardName }));
    } else if (type === "locations") {
      dispatch(updateLocation({ id: item.id, name: cardName }));
    }
    setIsEditing(false);
  };

  return (
    <Card key={item.id} backgroundColor={bgColor} ref={ref}>
      <CardHeader
        fontSize="lg"s
        pt={2}
        pb={2}
        bg="teal.500"
        color="white"
        borderTopRadius="md"
        p={3}
        textAlign="center"
      >
        <InputGroup>
          <Input
            variant="unstyled"
            value={cardName}
            onChange={handleInputChange}
            isDisabled={!isEditing}
            _disabled={{ color: "white" }}
          />
          <InputRightAddon bg="none" border="none" m={0} p={0}>
            {isEditing ? (
              <Button
                className="material-symbols-outlined"
                colorScheme="teal"
                onClick={handleSaveClick}
              >
                save
              </Button>
            ) : (
              <Button
                className="material-symbols-outlined"
                colorScheme="teal"
                onClick={handleEditClick}
              >
                edit
              </Button>
            )}
          </InputRightAddon>
        </InputGroup>
      </CardHeader>
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
                        <Tooltip label={grocery.name} aria-label="grocery-name">
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
          <Text mt={1} textAlign="center" color="gray.500" mb={4}>
            No items found
          </Text>
        )}
      </CardBody>
    </Card>
  );
}
