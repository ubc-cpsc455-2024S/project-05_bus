import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateGroupForm from '../components/Groups/CreateGroupForm';
import JoinGroupForm from '../components/Groups/JoinGroupForm';
import useCurrentUser from '../hooks/useCurrentUser';
import { Box, Button, Stack } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { persistor } from '../redux/store';

export default function GroupPage() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { logout } = useAuth0();

  useEffect(() => {
    if (currentUser.groupID) {
      navigate('/home');
    }
  }, [currentUser.groupID, navigate]);

  const handleLogout = async () => {
    await persistor.purge();
    logout({
      logoutParams: {
        returnTo: window.location.pathname,
      },
    });
  };

  return (
    <Box paddingY="100px" display="flex" flexDirection="column" minHeight="100vh" justifyContent="space-between">
      <Stack>
        <Box>
          <CreateGroupForm />
          <JoinGroupForm />
        </Box>
      </Stack>
      <Box display="flex" justifyContent="center">
        <Button onClick={handleLogout} bg="brand.red" color="white" size="md" _hover={({ bg: 'brand.pink' })}>Logout</Button>
      </Box>
    </Box>

  );
}
