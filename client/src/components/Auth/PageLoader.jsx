import { Box } from '@chakra-ui/react';
import { Circles } from 'react-loader-spinner';

export const PageLoader = () => {
  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      transform="translate(-50%, -50%)"
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Circles
        height="80"
        width="80"
        color="teal"
        ariaLabel="circles-loading"
        visible={true}
      />
    </Box>
  );
};
