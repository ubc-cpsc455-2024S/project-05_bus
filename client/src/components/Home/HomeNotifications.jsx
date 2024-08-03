import "./Home.css";
import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  VStack,
  Button,
} from "@chakra-ui/react";
import NotificationCard from "./NotificationCard";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUserGroceries } from "../../selectors/userSelectors";
import GroceryCard from "./GroceryCard";
import useCurrentUser from "../../hooks/useCurrentUser";
import { updateEventAsync } from "../../redux/events/thunks";
import ReminderCard from "./Reminders";
import {
  selectActiveEvents,
  selectDismissedEvents,
} from "../../selectors/eventSelectors";
import moment from "moment";

export default function HomeNotifications() {
  const userId = useCurrentUser()._id;
  const activeEvents = useSelector(selectActiveEvents);
  const dismissedEvents = useSelector(selectDismissedEvents);
  console.log("dismissedEvents", dismissedEvents)
  const groceries = useSelector(selectCurrentUserGroceries);
  const dispatch = useDispatch();

  const [showFutureNotifications, setShowFutureNotifications] = useState(false);
  const [showOlderNotifications, setShowOlderNotifications] = useState(false);

  const oneMonthBack = moment().subtract(1, "months");
  const oneMonthAhead = moment().add(1, "months");

  const filteredActiveEvents = activeEvents.filter((event) => {
    const eventDate = moment(event.start);
    return eventDate.isBetween(oneMonthBack, oneMonthAhead);
  });

  const olderNotifications = activeEvents.filter((event) =>
    moment(event.start).isBefore(oneMonthBack)
  );
  const futureNotifications = activeEvents.filter((event) =>
    moment(event.start).isAfter(oneMonthAhead)
  );

  const handleDismiss = (event) => {
    dispatch(
      updateEventAsync({
        ...event,
        extendedProps: {
          ...event.extendedProps,
          dismissedBy: userId,
          reminded: false,
        },
      })
    );
  };

  const handleDone = (event) => {
    dispatch(
      updateEventAsync({
        ...event,
        extendedProps: { ...event.extendedProps, done: true },
      })
    );
  };

  return (
    <Box className="home-card-container home-notifications-container">
      <Card className="home-card">
        <CardHeader className="home-card-header">
          <h1 className="home-heading">Notifications</h1>
          <span className="material-symbols-outlined icon">notifications</span>
        </CardHeader>
        <CardBody className="home-card-body">
          <VStack spacing={4}>
            {filteredActiveEvents.length !== 0 ? (
              filteredActiveEvents.map((event) => (
                <NotificationCard
                  key={event.id}
                  event={event}
                  onDismiss={handleDismiss}
                  onDone={handleDone}
                />
              ))
            ) : (
              <p className="notifications-placeholder">No new notifications</p>
            )}
            {showFutureNotifications &&
              futureNotifications.map((event) => (
                <NotificationCard
                  key={event.id}
                  event={event}
                  onDismiss={handleDismiss}
                  onDone={handleDone}
                />
              ))}
            {futureNotifications.length > 0 && (
              <Button
                onClick={() =>
                  setShowFutureNotifications(!showFutureNotifications)
                }
              >
                {showFutureNotifications
                  ? "Hide Future Notifications"
                  : "Show Future Notifications"}
              </Button>
            )}
            {showOlderNotifications &&
              olderNotifications.map((event) => (
                <NotificationCard
                  key={event.id}
                  event={event}
                  onDismiss={handleDismiss}
                  onDone={handleDone}
                />
              ))}
            {olderNotifications.length > 0 && (
              <Button
                onClick={() =>
                  setShowOlderNotifications(!showOlderNotifications)
                }
              >
                {showOlderNotifications
                  ? "Hide Older Notifications"
                  : "Show Older Notifications"}
              </Button>
            )}
            {groceries.length !== 0 && <GroceryCard groceries={groceries} />}
            <ReminderCard dismissedEvents={dismissedEvents} />
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
