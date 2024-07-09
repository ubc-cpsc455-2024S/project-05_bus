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
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  deleteCategoryAsync,
  deleteLocationAsync,
  updateCategoryAsync,
  updateLocationAsync,
} from "../../../redux/groceries/thunks";

export default function GroceryCard({
  item,
  type,
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
    if (type === "category") {
      dispatch(updateCategoryAsync({ _id: item._id, name: cardName }));
    } else if (type === "location") {
      dispatch(updateLocationAsync({ _id: item._id, name: cardName }));
    }
    setIsEditing(false);
  };

  const handleDeleteClick = (id, type) => {
    if (confirm("Are you sure you want to delete this?") === false) return;
    if (type === "category") {
      dispatch(deleteCategoryAsync(id));
    } else if (type === "location") {
      dispatch(deleteLocationAsync(id));
    }
  };

  return (
    <>
      <Card key={item.id} backgroundColor={bgColor} ref={ref} shadow="xl">
        {isEditing ? (
          <IconButton
            size="xs"
            icon={<DeleteIcon />}
            onClick={() => handleDeleteClick(item.id, type)}
            backgroundColor="red.400"
            color="white"
            _hover={{ bg: "red.500" }}
            position="absolute"
            borderRadius="full"
            top="-10px"
            left="-10px"
            m="0"
            p="0"
            shadow="lg"
          />
        ) : null}
        <CardHeader
          fontSize="lg"
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
                  {matchingGroceries.map((grocery) => (
                    <Tr key={grocery.id}>
                      <Td>
                        <Tooltip label={grocery.name} aria-label="grocery-name">
                          <Box
                            maxWidth="90%"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            p={0.8}
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
    </>
  );
}
