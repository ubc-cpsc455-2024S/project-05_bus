import './Chores.css';
import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  Box,
  Heading,
  VStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
} from '@chakra-ui/react';
import { Draggable } from '@fullcalendar/interaction';
import CreateChore from './CreateChore';
import CalendarPeople from './CalendarPeople';
import EventList from './EventList';
import { deleteChoreAsync } from '../../redux/chores/thunks';
import Chore from './Chore';

export default function CalendarChores() {
  const eventsRef = useRef(null);
  const chores = useSelector((state) => state.chores.chores);
  const selectedMemberID = useSelector(
    (state) => state.groups.selectedMemberID
  );
  const dispatch = useDispatch();
  const [isInfoPopoverOpen, setInfoPopoverOpen] = useState(false);

  const handleDelete = (id) => {
    dispatch(deleteChoreAsync(id));
  };

  const handleInfo = () => {
    setInfoPopoverOpen(!isInfoPopoverOpen);
  };

  useEffect(() => {
    if (selectedMemberID) {
      const containerEl = eventsRef.current;
      const draggable = new Draggable(containerEl, {
        itemSelector: '.event',
        eventData: (eventEl) => {
          const choreId = eventEl.getAttribute('data-chore-id');
          const eventTitleEl = eventEl.querySelector('.event-title');
          const data = {
            title: eventTitleEl.innerText,
            allDay: true,
            backgroundColor: eventEl.style.backgroundColor,
            borderColor: eventEl.style.backgroundColor,
            textColor: eventTitleEl.style.color,
            extendedProps: {
              choreId: choreId,
              type: 'chore',
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
      flex={['1', '1', '1', '2']}
      p="4"
      height={['50vh', '50vh', '100vh']}
    >
      <Box
        p={4}
        flex='1'
        borderRadius='md'
        marginBottom={4}
        boxShadow='0 4px 8px rgba(0, 0, 0, 0.3)'
      >
        <CalendarPeople />
      </Box>
      <Box
        p={5}
        flex='1'
        borderRadius='md'
        marginBottom={4}
        boxShadow='0 4px 8px rgba(0, 0, 0, 0.3)'
      >
        <div className="chores-heading-container">
          <Heading size="lg" color="black">Chore Templates</Heading>
          <Popover 
            className="info-popover"
            isOpen={isInfoPopoverOpen}
            onClose={() => setInfoPopoverOpen(false)}
            placement="top"
            arrowSize={15}
          >
            <PopoverTrigger>
              <Button className="info-button" onClick={handleInfo} ml={2} size="sm">
                <span className="material-symbols-outlined info-icon">info</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent m={4} boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)" borderRadius={10}>
              <PopoverArrow bg="#f2f2f2" boxShadow="0 4px 8px rgba(0, 0, 0, 0.3)"/>
              <PopoverCloseButton />
              <PopoverBody className="info-text" p={6} borderRadius={10} bg="#f2f2f2">
                You can reuse these templates to quickly create new versions of common chores. 
                Just hit save to add a new chore event to your calendar!
                To edit an existing chore, click on its calendar event.
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </div>
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
