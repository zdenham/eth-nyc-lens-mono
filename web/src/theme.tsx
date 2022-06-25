/* eslint-disable quotes */
import { extendTheme } from '@chakra-ui/react';

const fonts = {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`
};

const theme = extendTheme({
    colors: {
        green: '#2C7300',
    },
    fonts,
    shadows: {
        glow: '0px 0px 7px 2px green;'
        // glow: '0px 0px 10px 5px light-green;'
    }
});

export default theme;
