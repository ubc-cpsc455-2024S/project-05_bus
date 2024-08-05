import { extendTheme } from '@chakra-ui/react';

const customTheme = extendTheme({
  colors: {
    brand: {
      lightGray: '#cfccc8',
      burntOrange: '#c86a3c',
      oliveBrown: '#8e6a4b',
      sageGreen: '#a6a89c',
      forestGreen: '#747760',
      beige: '#c7af98',
    },
  },
});

export default customTheme;
