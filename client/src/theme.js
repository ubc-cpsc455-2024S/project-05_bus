import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      lightGray: '#cfccc8',
      burntOrange: '#c86a3c',
      oliveBrown: '#8e6a4b',
      aloeGreen: '#747760',
      beige: '#c7af98',
      lightGreen: '#13a10e',
      midGreen: '#077956',
      forestGreen: '#003E29',
      cream: '#FBF0E6',
      pink: '#BD7B9D',
      red: '#d03c38',
      lightGrey: '#c9cace',
      grey: '#65676e'
    },
  },
  breakpoints: {
    base: '0px',     
    sm: '480px',     
    md: '768px',    
    lg: '1024px',   
    xl: '1280px',
  },
});

export default customTheme;
