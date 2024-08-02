import { useAuth0 } from "@auth0/auth0-react";
import { PageLoader } from "../components/Auth/PageLoader";
import { Box, Button, Input, Stack, Text } from "@chakra-ui/react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserAsync } from '../redux/users/thunks';
import { setCurrentUserID, setCurrentUserName } from '../redux/users/usersSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export default function ProfileCreationPage() {
  const { user, isAuthenticated, isLoading, logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) {
    return <PageLoader />;
  }

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const profileData = new FormData(e.currentTarget)
    const userData = {
      firstName: profileData.get('firstName'),
      lastName: profileData.get('lastName'),
      email: user.email
    }
    const result = await dispatch(addUserAsync(userData));
    const newUser = unwrapResult(result);
    dispatch(setCurrentUserID(newUser._id));
    const name = newUser.firstName + " " + newUser.lastName;
    dispatch(setCurrentUserName(name));
    navigate('/groups');
  }

  return (
    <Box padding="50px">
      <Box display="flex" alignItems="center">
        <Text fontSize="xx-large">Create your profile</Text>
        {isAuthenticated && (
          <Box borderWidth='1px' borderRadius='lg' marginY="10px" marginX="30px" padding="10px" width="fit-content">
            <Text fontSize="large"><strong>Email:</strong> {user.email}</Text>
          </Box>
        )}
      </Box>

      <form onSubmit={handleSubmit}>
        <Stack spacing="20px" paddingY="30px">
          <Box borderWidth='1px' borderRadius='lg' padding="10px">
            <Text as="b">First Name:</Text>
            <Input name="firstName"></Input>
          </Box>
          <Box borderWidth='1px' borderRadius='lg' padding="10px">
            <Text as="b">Last Name:</Text>
            <Input name="lastName"></Input>
          </Box>
        </Stack>
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Button type="submit">Submit</Button>
          </Box>
          <Box>
            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </Box>
      </form >
    </Box >
  );
}