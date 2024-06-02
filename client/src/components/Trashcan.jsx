import { Box, Icon } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

export default function Trashcan({ onDrop }) {
  return (
    <Box
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      width="100px"
      height="100px"
      bg="red.500"
      borderRadius="full"
      position="fixed"
      bottom="20px"
      right="20px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxShadow="lg"
      _hover={{
        bg: "red.600",
        cursor: "pointer",
        transform: "scale(1.05)",
        transition: "transform 0.2s",
      }}
    >
      <Icon as={DeleteIcon} w={8} h={8} color="white" />
    </Box>
  );
}