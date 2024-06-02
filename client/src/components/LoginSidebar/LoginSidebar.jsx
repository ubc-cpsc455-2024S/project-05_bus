import React from 'react';
import { Box } from '@chakra-ui/react';

export default function LoginSidebar({ value }) {
  return (
    <Box className="login-sidebar" p={4} bg="gray.50" borderRadius="md" boxShadow="md">
      {value}
    </Box>
  );
};