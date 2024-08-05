import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useDispatch, useSelector } from 'react-redux';
import {
  getEventsAsync,
  updateEventAsync,
  addEventAsync,
  deleteEventAsync,
} from '../../redux/events/thunks';
import EventPopover from './EventPopover';
import { Box, useBreakpointValue } from '@chakra-ui/react';
import useCurrentGroup from '../../hooks/useCurrentGroup';
import { updateMonthView } from '../../redux/events/calendarSlice';
import moment from 'moment';
import { getChoresAsync } from '../../redux/chores/thunks';
import { getGroceryAsync } from '../../redux/groceries/thunks';

export default function Calendar() {
  const events = useSelector((state) => state.events.events);
  const chores = useSelector((state) => state.chores.chores);
  const group = useCurrentGroup();
  const selectedMemberID = useSelector(
    (state) => state.groups.selectedMemberID
  );
  const isFiltered = useSelector((state) => state.events.filter);

  const dispatch = useDispatch();

  useEffect(() => {
    if (group?._id) {
      dispatch(getEventsAsync(group._id));
      dispatch(getChoresAsync(group._id));
    }
  }, [dispatch, group]);

  const [popoverInfo, setPopoverInfo] = useState({
    visible: false,
    event: null,
  });

  const handleEventClick = (info) => {
    setPopoverInfo({
      visible: true,
      event: info.event,
    });
  };

  const closePopover = () => {
    setPopoverInfo({
      visible: false,
      event: null,
    });
  };

  const contentHeight = useBreakpointValue({ base: '40vh', md: '85vh' });
  const titleFormat = useBreakpointValue({ base: { year: 'numeric', month: 'short' }, lg: { year: 'numeric', month: 'long' } });

  const handleDeleteEvent = async (event) => {
    await dispatch(deleteEventAsync(event.id));
    if (event.extendedProps.type !== 'chore') {
      await dispatch(getGroceryAsync(event.extendedProps.groceryId));
    }
    closePopover();
  };

  const handleDragEvent = (info) => {
    dispatch(
      updateEventAsync({
        _id: info.event.id,
        start: info.event.start,
        end: info.event.end,
      })
    );
  };

  const handleEditEvent = (eventDetails) => {
    const chore = chores.find((ch) => ch.title === eventDetails.title);
    if (chore) {
      dispatch(
        updateEventAsync({
          _id: popoverInfo.event.id,
          title: eventDetails.title,
          start: eventDetails.start,
          end: eventDetails.end,
          backgroundColor: chore.colour,
          borderColor: chore.colour,
          extendedProps: {
            choreId: chore.id,
            ...eventDetails.extendedProps,
          },
        })
      );
      closePopover();
    } else if (eventDetails.type !== 'chore') {
      dispatch(
        updateEventAsync({
          _id: eventDetails._id,
          title: eventDetails.title,
          start: eventDetails.start,
          end: eventDetails.end,
          backgroundColor: eventDetails.backgroundColor,
          borderColor: eventDetails.borderColor,
          extendedProps: {
            ...eventDetails.extendedProps,
          },
        })
      );
      closePopover();
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <EventPopover
        isOpen={
          popoverInfo.visible && popoverInfo.event.id === eventInfo.event.id
        }
        event={eventInfo.event}
        onClose={closePopover}
        onDelete={handleDeleteEvent}
        onEdit={handleEditEvent}
      />
    );
  };

  return (
    <Box
      p={4}
      flex={['1', '1', '1', '4']}
      bg='white'
      className='calendar-container'
      minHeight={['50vh', '50vh', '100vh']}
    >
      <FullCalendar
        contentHeight={contentHeight}
        titleFormat={titleFormat}
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView='dayGridMonth'
        datesSet={(dateInfo) => {
          dispatch(
            updateMonthView({
              currentStart: moment(dateInfo.start).format(),
              currentEnd: moment(dateInfo.end).format(),
            })
          );
        }}
        eventStartEditable={(info) => {
          return info.event.extendedProps.type == 'chore';
        }}
        droppable
        eventDurationEditable={false}
        events={
          isFiltered
            ? events.filter(
              (event) => event.extendedProps.memberId === selectedMemberID
            )
            : events
        }
        eventReceive={(info) => {
          dispatch(
            addEventAsync({
              title: info.event.title,
              start: info.event.start,
              end: info.event.end,
              allDay: true,
              backgroundColor: info.event.backgroundColor,
              borderColor: info.event.backgroundColor,
              textColor: info.event.textColor,
              groupID: group._id,
              extendedProps: info.event.extendedProps,
            })
          );
        }}
        eventClick={handleEventClick}
        eventDrop={(info) => {
          if (info.event.extendedProps.type == 'chore') {
            handleDragEvent(info);
          }
        }}
        eventContent={renderEventContent}
      />
    </Box>
  );
}
