import { Box, Button, Heading, Image, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useAuth0 } from "@auth0/auth0-react";


export default function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  const handleSignup = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  }

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
  }

    return (
      <Box 
        display="flex"
        flexDirection="row"
        width="100vw"
        height="100vh"
        padding={4}
      >
        <Box
          width={450}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          padding={4}
        >
          <Heading size="xl" color="black" textAlign="center">
            The best way to navigate living
          </Heading>
          <Heading size="xl" color="teal" textAlign="center">
            together
          </Heading>
          <Text textAlign="center" marginTop={7}><b>A lil app for roommates</b></Text>
          <Box 
          display="flex"
          flexDirection="row"
          gap={12}
          justifyContent="center"
          marginTop={20}>
            <Button onclick={handleLogin}> Login
              {/* <ChakraLink as={ReactRouterLink} to='/login'><b>Login</b></ChakraLink> */}
            </Button>
            <Button bg="teal.500" color="white" _hover={{ bg: "teal.600" }} onClick={handleSignup}> Sign Up
                {/* <ChakraLink as={ReactRouterLink} to='/signup'><b>Sign Up</b></ChakraLink> */}
            </Button>
          </Box>
        </Box>
        <Box
          width={950}
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={4}
        >
          <Image src="/images/roommates-landing.png" alt="Roommates Landing" />
        </Box>
      </Box>
    )
  }
