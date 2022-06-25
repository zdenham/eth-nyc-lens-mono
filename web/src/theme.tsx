import { extendTheme } from '@chakra-ui/react';

const fonts = { mono: `'Poppins', sans-serif` };

const theme = extendTheme({
  colors: {
    green: '#2C7300',
  },
  fonts
});

export default theme;
