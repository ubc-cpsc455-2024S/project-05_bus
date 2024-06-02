import React from 'react';
import { Box } from '@chakra-ui/react';
import './LoginSidebar.css';

export default function LoginSidebar({ value }) {
  return (
    <Box className="login-sidebar">
      <b>{value}</b>
    </Box>
  );
};