import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';

export default function LandingPage() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
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
    console.log('Login clicked');
    try {
      await loginWithRedirect({
        appState: {
          returnTo: '/callback',
        },
      });
    } catch (error) {
      console.error('Login failed:', error);
    }
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
        <Heading size="4xl" color="brand.midGreen" textAlign="center" mb="50px" style={{ textShadow: 'px 2px 1px #125845' }}>
          roommates
        </Heading>
        <Heading size='xl' color='black' textAlign='center'>
          The best way to navigate living
        </Heading>
        <Heading size='xl' color='brand.midGreen' textAlign='center'>
          together
        </Heading>
        <Box
          display='flex'
          flexDirection='row'
          gap={12}
          justifyContent='center'
          marginTop={20}>
          <Button borderColor="brand.forestGreen" color="brand.forestGreen" variant="outline" size="lg" _hover={{ bg: 'brand.forestGreen', borderColor: 'brand.forestGreen', color: 'white' }} onClick={handleLogin}>Login</Button>
          <Button bg="brand.midGreen" color="white" size="lg" _hover={{ bg: 'brand.forestGreen' }} onClick={handleSignup}> Sign Up
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
        <Image
          src="https://img.freepik.com/free-vector/couple-sitting-drinking-coffee-sofa-home-romantic-characters-talking-eating-room-apartment-hygge-scandinavian-style-flat-vector-illustration-love-interior-furniture-concept_74855-24055.jpg?t=st=1722059080~exp=1722062680~hmac=efa9dfcf6969c5eed4bc3edafc9b38df9aa0779af7646b267677d33b1a781a58&w=1480"
          alt="Roommates Landing"
        />
      </Box>
    </Box>
  );
}
