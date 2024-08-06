import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { PageLoader } from '../components/Auth/PageLoader';
import { Box, Button, Input, Stack, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addUserAsync } from '../redux/users/thunks';
import { setCurrentUserID, setCurrentUserName } from '../redux/users/usersSlice';
import { unwrapResult } from '@reduxjs/toolkit';

export default function ProfileCreationPage() {
  const { user, isLoading, logout } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  if (isLoading) {
    return <PageLoader />;
  }

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.pathname,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const profileData = new FormData(e.currentTarget);
    const firstName = profileData.get('firstName');
    const lastName = profileData.get('lastName');
    if (firstName && lastName) {
      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: user.email
      };
      const result = await dispatch(addUserAsync(userData));
      const newUser = unwrapResult(result);
      dispatch(setCurrentUserID(newUser._id));
      const name = newUser.firstName + ' ' + newUser.lastName;
      dispatch(setCurrentUserName(name));
      navigate('/groups');
    } else {
      setError(true);
    }

  };

  return (
    <Box paddingY="100px" paddingX={{ base: '50px', lg: '200px' }} display="flex" flexDirection="column" minHeight="100vh" justifyContent="space-between">
      <Stack spacing="none">
        <Text fontSize="xx-large" color="teal.600" as='b'>Create your profile</Text>
        <Box borderColor="brand.lightGrey" borderWidth='1px' borderRadius='lg' marginY="10px" padding="10px">
          <Text fontSize="large"><strong>Email:</strong> {user.email}</Text>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing="20px" paddingY="10px">
            <Box borderColor="brand.lightGrey" borderWidth='1px' borderRadius='lg' padding="10px">
              <Text as="b">First Name:</Text>
              <Input borderColor="brand.lightGrey" focusBorderColor="brand.grey" name="firstName"></Input>
            </Box>
            <Box borderColor="brand.lightGrey" borderWidth='1px' borderRadius='lg' padding="10px">
              <Text as="b">Last Name:</Text>
              <Input borderColor="brand.lightGrey" focusBorderColor="brand.grey" name="lastName"></Input>
            </Box>
            {error && (<Text color="brand.red" as='b'>Please fill in all fields before submitting</Text>)}
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" justifyContent="flex-end">
                <Button type="submit" borderColor="teal.600" color="teal.600" variant="outline" size="md" _hover={{ bg: 'teal.700', borderColor: 'teal.700', color: 'white' }}><b>Submit</b></Button>
              </Box>
              <Box display="flex" justifyContent="center">
                <Button onClick={handleLogout} bg="brand.red" color="white" _hover={({ bg: 'brand.pink' })} size="md">Logout</Button>
              </Box>
            </Box>
          </Stack>
        </form >
      </Stack >
    </Box >
  );
}