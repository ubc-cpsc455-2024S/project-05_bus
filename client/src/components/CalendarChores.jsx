import { useRef, useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Heading,
  VStack,
  Text,
  IconButton,
  HStack,
  useColorModeValue
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Draggable } from "@fullcalendar/interaction";
import { removeChore } from "../redux/choresSlice";
import CreateChore from "./CreateChore";
import CalendarPeople from "./CalendarPeople";

export default function CalendarChores() {
  const eventsRef = useRef(null);
  const dispatch = useDispatch();
  const chores = useSelector((state) => state.chores.chores);
  const [canDrag, setCanDrag] = useState(false);
  const [selectedMember, setSelectedMember] = useState([]);
  const sidebarBg = useColorModeValue('gray.100', 'gray.700');

  useEffect(() => {
    if (canDrag) {
      const containerEl = eventsRef.current;
      const draggable = new Draggable(containerEl, {
        itemSelector: ".event",
        eventData: (eventEl) => {
          const choreId = parseInt(eventEl.getAttribute("data-chore-id"), 10);
          return {
            title: eventEl.querySelector(".event-title").innerText,
            backgroundColor: eventEl.style.backgroundColor,
            extendedProps: {
              choreId,
              memberId: selectedMember?.id,
            },
          };
        },
      });

      return () => {
        draggable.destroy();
      };
    }
  }, [canDrag, chores, selectedMember]);

  const removeExistingChore = (id) => {
    dispatch(removeChore(id));
  };

  const handleSelectionChange = useCallback((selectedMemberDetails) => {
    setSelectedMember(selectedMemberDetails);
    setCanDrag(selectedMemberDetails.length > 0);
  }, []);

  return (
    <Box
      bg={sidebarBg}
      w="30%"
      p="4"
      borderRadius="md"
      boxShadow="0 2px 4px rgba(0,0,0,0.1)"
    >
      <Heading mb={4}>Chores</Heading>
      <VStack id="events" ref={eventsRef} spacing={4}>
        {chores.map((chore, index) => (
          <HStack
            key={index}
            className="event"
            style={{
              backgroundColor: chore.color,
              padding: "8px",
              borderRadius: "4px",
              width: "100%",
              justifyContent: "space-between",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Text
              fontSize="md"
              className="event-title"
              style={{
                color: "white",
                textShadow: "0.5px 0.5px 1px black",
              }}
            >
              {chore.title}
            </Text>
            <IconButton
              size="xs"
              colorScheme="red"
              onClick={() => removeExistingChore(chore.id)}
              icon={<DeleteIcon />}
              aria-label="Remove chore"
            />
          </HStack>
        ))}
      </VStack>
      <CreateChore />
      <CalendarPeople onSelectionChange={handleSelectionChange} />
    </Box>
  );
}
