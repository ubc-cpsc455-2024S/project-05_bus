import { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Heading, VStack, Text, HStack, Tooltip } from "@chakra-ui/react";
import { Draggable } from "@fullcalendar/interaction";
import CreateChore from "./CreateChore";
import CalendarPeople from "./CalendarPeople";
import EventList from "./EventList";
import DeleteAlert from "./DeleteAlert";

export default function CalendarChores() {
  const eventsRef = useRef(null);
  const chores = useSelector((state) => state.chores.chores);
  const selectedMember = useSelector((state) => state.members.selectedMember);

  useEffect(() => {
    if (selectedMember) {
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
              done: false,
            },
          };
        },
      });

      return () => {
        draggable.destroy();
      };
    }
  }, [chores, selectedMember]);

  return (
    <Box bg="teal" flex="3" p="4" overflowY="auto" height="100vh">
      <Box
        p={5}
        borderWidth="1px"
        borderColor="teal.600"
        flex="1"
        borderRadius="md"
        marginBottom={4}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
      >
        <CalendarPeople />
      </Box>
      <Box
        p={5}
        borderWidth="1px"
        borderColor="teal.600"
        flex="1"
        borderRadius="md"
        marginBottom={4}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
      >
        <Heading size="lg" mb={4} color="white">
          Chores
        </Heading>
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
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
              }}
            >
              <Tooltip label={chore.title}>
                <Text
                  fontSize="md"
                  className="event-title"
                  style={{
                    color: "white",
                    mixBlendMode: "difference",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chore.title}
                </Text>
              </Tooltip>
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
