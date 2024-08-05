import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from '../components/Auth/PageLoader';
import { Box, Stack, Text } from '@chakra-ui/react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const currentUserName = useSelector(state => state.users.currentUserName);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <Box padding='30px'>
      <Text fontSize='xx-large'>Profile</Text>
      {isAuthenticated && (
        <Stack spacing='20px' paddingY='30px'>
          <Box borderWidth='1px' borderRadius='lg' padding='10px'> 
            <Text fontSize='large'><strong>Name:</strong> {currentUserName}</Text>
          </Box>
          <Box borderWidth='1px' borderRadius='lg' padding='10px'>
            <Text fontSize='large'><strong>Email:</strong> {user.email}</Text>
          </Box>

        </Stack>
      )}

    </Box>
  );
}