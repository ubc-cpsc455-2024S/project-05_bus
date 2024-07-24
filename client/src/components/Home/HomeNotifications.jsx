import "./Home.css";
import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  VStack,
} from "@chakra-ui/react";
import NotificationCard from "./NotificationCard";
import { useSelector } from "react-redux";
import {
  selectCurrentUserEvents,
  selectCurrentUserGroceries,
} from "../../selectors/userSelectors";
import GroceryCard from "./GroceryCard";

export default function HomeNotifications() {
  const [dismissedNotifications, setDismissedNotifications] = useState([]);
  const events = useSelector(selectCurrentUserEvents)
    .filter(
      (event) =>
        event.extendedProps.done === false &&
        !dismissedNotifications.includes(event.id)
    )
    .sort((a, b) => new Date(a.start) - new Date(b.start));

  const groceries = useSelector(selectCurrentUserGroceries);

  const handleDismiss = (id) => {
    setDismissedNotifications((prev) => [...prev, id]);
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
            {events.length !== 0 ? (
              events.map((event) => (
                <NotificationCard
                  key={event.id}
                  event={event}
                  onDismiss={handleDismiss}
                />
              ))
            ) : (
              <p className="notifications-placeholder">No new notifications</p>
            )}
            {groceries.length !== 0 && <GroceryCard groceries={groceries} />}
          </VStack>
        </CardBody>
        <CardFooter className="home-card-footer">
          <Button className="settings-button">
            <span className="material-symbols-outlined settings-icon">
              settings
            </span>
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
