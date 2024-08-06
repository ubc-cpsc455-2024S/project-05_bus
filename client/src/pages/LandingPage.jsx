import { Box, Button, Heading, Image, Text } from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';

export default function LandingPage() {
  const { loginWithRedirect } = useAuth0();

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
        flex={{ base: 3, md: 2 }}
        display='flex'
        flexDirection='column'
        justifyContent='center'
        padding={4}
      >
        <Heading
          size={{ base: '2xl' }}
          color='black'
          textAlign='center'
          mb={3}
        >
          A better way to 
        </Heading>
        <Heading
          size={{ base: '2xl' }}
          color='black'
          textAlign='center'
          mb={3}
        >
          navigate living
        </Heading>
        <Heading
          size={{ base: '2xl' }}
          color='teal'
          textAlign='center'
          mb={5}
        >
          together
        </Heading>
        <Text
          textAlign="center"
          marginTop={7}
          fontSize={{ base: 'md', md: 'lg' }}
        >
          <b>A lil app for roommates</b>
        </Text>
        <Box
          display='flex'
          flexDirection='row'
          gap={20}
          justifyContent="center"
          marginTop={24}
        >
          <Button onClick={handleLogin} size="lg"> Login</Button>
          <Button
            bg="teal.500"
            color="white"
            _hover={{ bg: 'teal.600' }}
            onClick={handleSignup}
            size="lg"
          >
            {' '}
            Sign Up
          </Button>
        </Box>
      </Box>
      <Box
        flex={4.5}
        width="auto"
        display={{ base: 'none', md: 'flex' }}
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
