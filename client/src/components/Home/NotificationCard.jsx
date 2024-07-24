import { Box, Text, IconButton, HStack, useBoolean } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import moment from "moment";
import ChoreBadge from "../Calendar/ChoreBadge";

const getTransform = (isOpen, isHovered) => {
  if (isOpen) {
    return isHovered ? "translateX(-40px) scale(1.02)" : "translateX(-40px)";
  }
  return isHovered ? "scale(1.02)" : "translateX(0)";
};

export default function NotificationCard({ event, onDismiss }) {
  const [isOpen, setIsOpen] = useBoolean();
  const [isHovered, setIsHovered] = useBoolean();

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      boxShadow="md"
      bg="white"
      w="100%"
      position="relative"
      cursor="pointer"
      transition="transform 0.3s ease"
      transform={getTransform(isOpen, isHovered)}
      onClick={setIsOpen.toggle}
      onMouseEnter={setIsHovered.on}
      onMouseLeave={setIsHovered.off}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        transition="transform 0.3s ease"
      >
        <Text fontWeight="bold" fontSize="lg">
          {event.title}
        </Text>
        <HStack>
          <Text color="gray.500" fontSize="sm">
            {moment(event.start).fromNow()}
          </Text>
          <ChoreBadge chore={event} />
        </HStack>
      </Box>
      {isOpen && (
        <IconButton
          icon={<CloseIcon />}
          position="absolute"
          right="-40px"
          top="15px"
          size="sm"
          onClick={() => onDismiss(event._id)}
          aria-label="Dismiss notification"
        />
      )}
    </Box>
  );
}