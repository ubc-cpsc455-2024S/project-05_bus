import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./Calendar.css";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, removeEvent } from "../redux/calendarSlice";
import EventPopover from "./EventPopover";
import { Box } from "@chakra-ui/react";

export default function Calendar() {
  const events = useSelector((state) => state.events.events);
  const dispatch = useDispatch();

  const [popoverInfo, setPopoverInfo] = useState({
    visible: false,
    event: null,
    coordinates: { x: 0, y: 0 },
  });

  const handleEventClick = (info) => {
    setPopoverInfo({
      visible: true,
      event: info.event,
      coordinates: { x: info.jsEvent.pageX, y: info.jsEvent.pageY },
    });
  };

  const closePopover = () => {
    setPopoverInfo({
      visible: false,
      event: null,
      coordinates: { x: 0, y: 0 },
    });
  };

  const handleDeleteEvent = () => {
    if (popoverInfo.event) {
      dispatch(removeEvent(Number(popoverInfo.event.id)));
      popoverInfo.event.remove();
      closePopover();
    }
  };

  const handleEditEvent = (eventDetails) => {
    if (popoverInfo.event) {
      popoverInfo.event.setProp("title", eventDetails.title);
      popoverInfo.event.setStart(eventDetails.start);
      popoverInfo.event.setEnd(eventDetails.end);
      closePopover();
    }
  };

  return (
    <Box p={5} boxShadow="base" bg="white" w="70%" className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable
        droppable
        events={events}
        eventReceive={(info) => {
          dispatch(
            addEvent({
              title: info.event.title,
              start: info.event.start,
              end: info.event.end,
              allDay: true,
              backgroundColor: info.event.backgroundColor,
              borderColor: info.event.backgroundColor,
              textColor: info.event.textColor,
            })
          );
        }}
        eventResizableFromStart={true}
        eventClick={handleEventClick}
      />
      {popoverInfo.visible && (
        <EventPopover
          event={popoverInfo.event}
          onClose={closePopover}
          onDelete={handleDeleteEvent}
          onEdit={handleEditEvent}
          coordinates={popoverInfo.coordinates}
        />
      )}
    </Box>
  );
}
