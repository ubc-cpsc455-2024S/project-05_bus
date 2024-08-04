import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { postUserByEmailAsync } from '../redux/users/thunks';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { setCurrentUserID, setCurrentUserName } from '../redux/users/usersSlice';

export default function LandingPage() {
  const { loginWithRedirect, user } = useAuth0();
  const dispatch = useDispatch();

  const handleSignup = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/profile-creation',
      },
      authorizationParams: {
        screen_hint: 'signup',
      },
    });
  };

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/home',
      },
    }).then(async () => {
      const userEmail = {
        email: user.email
      };
      const result = await dispatch(postUserByEmailAsync(userEmail));
      const newUser = unwrapResult(result);
      dispatch(setCurrentUserID(newUser._id));
      const name = newUser.firstName + newUser.lastName;
      dispatch(setCurrentUserName(name));
    });
  };

  return (
    <Box
      display='flex'
      flexDirection='row'
      width='100vw'
      height='100vh'
      padding={4}
    >
      <Box
        width={450}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        padding={4}
      >
        <Heading size='xl' color='black' textAlign='center'>
          The best way to navigate living
        </Heading>
        <Heading size='xl' color='teal' textAlign='center'>
          together
        </Heading>
        <Text textAlign='center' marginTop={7}><b>A lil app for roommates</b></Text>
        <Box
          display='flex'
          flexDirection='row'
          gap={12}
          justifyContent='center'
          marginTop={20}>
          <Button onClick={handleLogin}> Login
          </Button>
          <Button bg='teal.500' color='white' _hover={{ bg: 'teal.600' }} onClick={handleSignup}> Sign Up
          </Button>
        </Box>
      </Box>
      <Box
        width={950}
        display='flex'
        justifyContent='center'
        alignItems='center'
        padding={4}
      >
        <Image src='https://img.freepik.com/free-vector/couple-sitting-drinking-coffee-sofa-home-romantic-characters-talking-eating-room-apartment-hygge-scandinavian-style-flat-vector-illustration-love-interior-furniture-concept_74855-24055.jpg?t=st=1722059080~exp=1722062680~hmac=efa9dfcf6969c5eed4bc3edafc9b38df9aa0779af7646b267677d33b1a781a58&w=1480' alt='Roommates Landing' />
      </Box>
    </Box>
  );
}
