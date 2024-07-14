import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useDispatch, useSelector } from "react-redux";
import {
  getEventsAsync,
  updateEventAsync,
  addEventAsync,
  deleteEventAsync,
} from "../../redux/events/thunks";
import EventPopover from "./EventPopover";
import { Box, Tooltip } from "@chakra-ui/react";
import useCurrentGroupMembers from "../../hooks/useCurrentGroupMembers";
import useCurrentGroup from "../../hooks/useCurrentGroup";
import { updateMonthView } from "../../redux/events/calendarSlice";
import moment from "moment";
import { getChoresAsync } from "../../redux/chores/thunks";

export default function Calendar() {
  const events = useSelector((state) => state.events.events);
  const chores = useSelector((state) => state.chores.chores);
  const group = useCurrentGroup();
  const members = useCurrentGroupMembers();
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
      dispatch(deleteEventAsync(popoverInfo.event.id));
      popoverInfo.event.remove();
      closePopover();
    }
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
    if (popoverInfo.event) {
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
              memberId: eventDetails.memberId,
              done: eventDetails.done,
            },
          })
        );
        closePopover();
      } else if (eventDetails.type !== "chore") {
        dispatch(
          updateEventAsync({
            _id: eventDetails._id,
            title: eventDetails.title,
            start: eventDetails.start,
            end: eventDetails.end,
            backgroundColor: eventDetails.backgroundColor,
            borderColor: eventDetails.borderColor,
            extendedProps: {
              type: "expiry",
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
      (member) => member._id === eventInfo.event.extendedProps.memberId
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
            {`${member.firstName} ${member.lastName} - ${eventInfo.event.title}`}
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
        datesSet={(dateInfo) => {
          dispatch(
            updateMonthView({
              currentStart: moment(dateInfo.start).format(),
              currentEnd: moment(dateInfo.end).format(),
            })
          );
        }}
        eventStartEditable={(info) => {
          return info.event.extendedProps.type == "chore";
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
          if (info.event.extendedProps.type == "chore") {
            handleDragEvent(info);
          }
        }}
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
