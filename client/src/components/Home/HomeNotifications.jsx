import "./Home.css";
import { Box, Card, CardHeader, CardBody, VStack } from "@chakra-ui/react";
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

export default function HomeNotifications() {
  const userId = useCurrentUser()._id;
  const activeEvents = useSelector(selectActiveEvents);
  const dismissedEvents = useSelector(selectDismissedEvents);

  const groceries = useSelector(selectCurrentUserGroceries);
  const dispatch = useDispatch();

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
            {activeEvents.length !== 0 ? (
              activeEvents.map((event) => (
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
            {groceries.length !== 0 && <GroceryCard groceries={groceries} />}
            <ReminderCard dismissedEvents={dismissedEvents} />
          </VStack>
        </CardBody>
      </Card>
    </Box>
  );
}
