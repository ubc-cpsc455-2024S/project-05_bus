import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import { addEvent, removeEvent } from "../../redux/slices/calendarSlice";
import EventPopover from "./EventPopover";
import { Box, Tooltip } from "@chakra-ui/react";
import { editEvent } from "../../redux/slices/calendarSlice";

export default function Calendar() {
  const events = useSelector((state) => state.events.events);
  const chores = useSelector((state) => state.chores.chores);
  const members = useSelector((state) => state.members.members);
  const selectedMember = useSelector((state) => state.members.selectedMember)
  const isFiltered = useSelector((state) => state.events.filter)

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
      dispatch(removeEvent(popoverInfo.event.id));
      popoverInfo.event.remove();
      closePopover();
    }
  };

  const handleDragEvent = (info) => {
    dispatch(
      editEvent({
        id: info.event.id,
        title: info.event.title,
        start: info.event.start,
        end: info.event.end,
        backgroundColor: info.event.backgroundColor,
        borderColor: info.event.backgroundColor,
        textColor: info.event.textColor,
        extendedProps: info.event.extendedProps,
      })
    );
  };

  const handleEditEvent = (eventDetails) => {
    if (popoverInfo.event) {
      const chore = chores.find((ch) => ch.title === eventDetails.title);
      if (chore) {
        dispatch(
          editEvent({
            id: popoverInfo.event.id,
            title: eventDetails.title,
            start: eventDetails.start,
            end: eventDetails.end,
            backgroundColor: chore.color,
            borderColor: chore.color,
            extendedProps: {
              choreId: chore.id,
              memberId: eventDetails.memberId,
              done: eventDetails.done,
            },
          })
        );
        closePopover();
      }
    }
  };

  const renderEventContent = (eventInfo) => {
    const member = members.find(
      (member) => member.id === String(eventInfo.event.extendedProps.memberId)
    );
    const isDone = eventInfo.event.extendedProps.done;

    return (
      <div className="event-wrapper">
        <div
          className="event-background"
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "4px",
            backgroundColor: eventInfo.event.backgroundColor,
            boxShadow: "0 1px 2px rgba(0, 0, 0, 0.3)",
          }}
        ></div>
        <Tooltip label={eventInfo.event.title}>
          <div
            className="event-title"
            style={{
              color: "white",
              mixBlendMode: "difference",
              position: "relative",
              padding: "2px 2px 0px 4px",
              textDecoration: isDone ? "line-through" : "none",
              overflow: "hidden",
            }}
          >
            {member.name.concat(" - ", eventInfo.event.title)}
          </div>
        </Tooltip>
      </div>
    );
  };

  return (
    <Box
      p={5}
      flex="7"
      boxShadow="base"
      bg="white"
      className="calendar-container"
      height="100vh"
    >
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventStartEditable={true}
        eventDurationEditable={false}
        droppable
        events={isFiltered ? events.filter(event => event.extendedProps.memberId === selectedMember.id) : events}
        eventReceive={(info) => {
          dispatch(
            addEvent({
              title: info.event.title,
              start: info.event.start,
              end: info.event.end,
              backgroundColor: info.event.backgroundColor,
              borderColor: "none",
              textColor: info.event.textColor,
              extendedProps: info.event.extendedProps,
            })
          );
        }}
        eventClick={handleEventClick}
        eventDrop={handleDragEvent}
        eventContent={renderEventContent}
        height="100%"
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
