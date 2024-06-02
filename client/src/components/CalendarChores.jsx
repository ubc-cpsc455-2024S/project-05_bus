import { useRef, useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Heading,
  VStack,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Draggable } from "@fullcalendar/interaction";
import CreateChore from "./CreateChore";
import CalendarPeople from "./CalendarPeople";
import EventList from "./EventList";
import DeleteAlert from "./DeleteAlert";

export default function CalendarChores() {
  const eventsRef = useRef(null);
  const chores = useSelector((state) => state.chores.chores);
  const [canDrag, setCanDrag] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const sidebarBg = useColorModeValue("gray.100", "gray.700");

  useEffect(() => {
    if (canDrag) {
      const containerEl = eventsRef.current;
      const draggable = new Draggable(containerEl, {
        itemSelector: ".event",
        eventData: (eventEl) => {
          const choreId = Number(eventEl.getAttribute("data-chore-id"));
          const eventTitleEl = eventEl.querySelector(".event-title");
          return {
            title: eventTitleEl.innerText,
            backgroundColor: eventEl.style.backgroundColor,
            extendedProps: {
              choreId: choreId,
              memberId: selectedMember.id,
            },
          };
        },
      });

      return () => {
        draggable.destroy();
      };
    }
  }, [canDrag, chores, selectedMember]);

  const handleSelectionChange = useCallback((selectedMemberDetails) => {
    setSelectedMember(selectedMemberDetails);
    setCanDrag(!!selectedMemberDetails);
  }, []);

  return (
    <Box bg={sidebarBg} flex="3" p="4" overflowY="auto" height="100vh">
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        marginBottom={4}
      >
        <CalendarPeople onSelectionChange={handleSelectionChange} />
      </Box>
      <Box
        p={5}
        shadow="md"
        borderWidth="1px"
        flex="1"
        borderRadius="md"
        marginBottom={4}
      >
        <Heading mb={4}>Chores</Heading>
        <VStack id="events" ref={eventsRef} spacing={4}>
          {chores.map((chore, index) => (
            <HStack
              key={index}
              className="event"
              data-chore-id={chore.id}
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
                  mixBlendMode: "difference",
                }}
              >
                {chore.title}
              </Text>
              <DeleteAlert id={chore.id} />
            </HStack>
          ))}
          <CreateChore />
        </VStack>
      </Box>
      <EventList />
    </Box>
  );
}
