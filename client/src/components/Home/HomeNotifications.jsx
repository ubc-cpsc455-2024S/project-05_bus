import './Home.css';
import { Box, Card, CardHeader, CardBody } from '@chakra-ui/react';

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
      </Card>
    </Box>
  )
}
