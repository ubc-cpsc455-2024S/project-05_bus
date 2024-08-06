import './Home.css';
import { Box, Card, CardHeader, CardBody, CardFooter, Avatar, Button, Text } from '@chakra-ui/react';
import useCurrentGroupMembers from '../../hooks/useCurrentGroupMembers';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function HomeGroup({ group }) {
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();
  const members = useCurrentGroupMembers();

  const handleCopyGroupID = () => {
    navigator.clipboard.writeText(group._id);

    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const buttonSize = { base: 'xs', sm: 'sm', md: 'md', lg: 'lg'};
  const avatarSize = { base: 'xs', sm: 'sm'};

  return (
    <Box className='home-card-container'>
      <Card className='home-card'>
        <CardHeader>
          <div className='home-card-header'>
            <h1 className='home-heading'>{group ? group.name : 'No active group'}</h1>
            <span className='material-symbols-outlined icon'>house</span>
          </div>
          <div className='home-card-group-id'>
            Group ID: {group._id}
            <Button className='copy-button' onClick={handleCopyGroupID} ml={2} size={buttonSize}>
              <span className='material-symbols-outlined settings-icon'>content_copy</span>
            </Button>
            {copied && (
              <Box ml={2}>
                <Text fontSize="sm" color="teal.500">Copied!</Text>
              </Box>
            )}
          </div>
        </CardHeader>
        <CardBody className='home-card-body'>
          <ul>
            {members.map(member => (
              <div key={member._id} className='group-member-container'>
                <Avatar className='group-member-avatar' size={avatarSize} />
                <p>{`${member.firstName} ${member.lastName}`}</p>
              </div>
            ))}
          </ul>
        </CardBody>
        <CardFooter className='home-card-footer'>
          <Button className='settings-button' onClick={() => navigate('/settings')}>
            <span className='material-symbols-outlined settings-icon'>settings</span>
          </Button>
        </CardFooter>
      </Card>
    </Box>
  );
}
