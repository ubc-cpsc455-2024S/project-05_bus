import './Home.css';
import { Box, Card, CardHeader, CardBody, CardFooter, Avatar, Button } from '@chakra-ui/react';
import useCurrentGroupMembers from '../../hooks/useCurrentGroupMembers';

export default function HomeGroup({ group }) {
  const members = useCurrentGroupMembers();

  return (
    <Box className="home-card-container">
      <Card className="home-card">
        <CardHeader className="home-card-header">
          <h1 className="home-heading">{group ? group.name : "No active group"}</h1>
          <span className="material-symbols-outlined icon">house</span>
        </CardHeader>
        <CardBody className="home-card-body">
          <ul>
            {members.map(member => (
              <div key={member._id} className="group-member-container">
                <Avatar className="group-member-avatar" size="sm" />
                <p>{`${member.firstName} ${member.lastName}`}</p>
              </div>
            ))}
          </ul>
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
