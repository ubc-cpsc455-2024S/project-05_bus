import { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { Draggable } from "@fullcalendar/interaction";
import CreateChore from "./CreateChore";
import CalendarPeople from "./CalendarPeople";
import EventList from "./EventList";
import { deleteChoreAsync } from "../../redux/chores/thunks";
import Chore from "./Chore";

export default function CalendarChores() {
  const eventsRef = useRef(null);
  const chores = useSelector((state) => state.chores.chores);
  const selectedMemberID = useSelector(
    (state) => state.groups.selectedMemberID
  );
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteChoreAsync(id));
  };

  useEffect(() => {
    if (selectedMemberID) {
      const containerEl = eventsRef.current;
      const draggable = new Draggable(containerEl, {
        itemSelector: ".event",
        eventData: (eventEl) => {
          const choreId = eventEl.getAttribute("data-chore-id");
          const eventTitleEl = eventEl.querySelector(".event-title");
          const data = {
            title: eventTitleEl.innerText,
            allDay: true,
            backgroundColor: eventEl.style.backgroundColor,
            borderColor: eventEl.style.backgroundColor,
            textColor: eventTitleEl.style.color,
            extendedProps: {
              choreId: choreId,
              type: "chore",
              memberId: selectedMemberID,
              done: false,
            },
          };
  
          return data;
        },
      });

      return () => {
        draggable.destroy();
      };
    }
  }, [chores, selectedMemberID]);

  return (
    <Box
      bg="white"
      flex={["1", "1", "1", "2"]}
      p="4"
      overflowY="auto"
      height={["50vh", "50vh", "100vh"]}
    >
      <Box
        p={4}
        flex="1"
        borderRadius="md"
        marginBottom={4}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
      >
        <CalendarPeople />
      </Box>
      <Box
        p={5}
        flex="1"
        borderRadius="md"
        marginBottom={4}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"
      >
        <Heading size="lg" mb={4} color="black">
          Chores
        </Heading>
        <VStack id="events" ref={eventsRef} spacing={4}>
          {chores.map((chore, index) => (
            <Chore chore={chore} key={index} handleDelete={handleDelete} />
          ))}
          <CreateChore />
        </VStack>
      </Box>
      <EventList />
    </Box>
  );
}
