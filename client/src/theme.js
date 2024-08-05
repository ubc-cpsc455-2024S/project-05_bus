import { extendTheme } from '@chakra-ui/react';

const breakpoints = {
  base: '0px',     
  sm: '480px',     
  md: '768px',    
  lg: '1024px',   
  xl: '1280px',
};

const Theme = extendTheme({ breakpoints });

export default Theme;