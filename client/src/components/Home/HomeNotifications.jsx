import './Home.css';
import { Box, Card, CardHeader, CardBody, CardFooter, Button } from '@chakra-ui/react';

export default function HomeNotifications() {
  return (
    <Box className="home-card-container home-notifications-container">
      <Card className="home-card">
        <CardHeader className="home-card-header">
          <h1 className="home-heading">Notifications</h1>
          <span className="material-symbols-outlined icon">notifications</span>
        </CardHeader>
        <CardBody className="home-card-body">
          <p className="notifications-placeholder">No new notifications</p>
        </CardBody>
        <CardFooter className="home-card-footer">
          <Button className="settings-button">
            <span className="material-symbols-outlined settings-icon">settings</span>
          </Button>
        </CardFooter>
      </Card>
    </Box>
  )
}
