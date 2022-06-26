/* eslint-disable quotes */
import { extendTheme } from '@chakra-ui/react';

const fonts = {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`
};

const breakpoints = {
    sm: '320px',
    md: '768px',
    lg: '960px',
    xl: '1200px',
    '2xl': '1536px',
};

const theme = extendTheme({
    colors: {
        green: {
            default: '#2C7300',
            600: '#2C7300'
        }
    },
    fonts,
    breakpoints,
    shadows: {
        glow: '0px 0px 7px 2px green;',
        'glow-yellow': '0px 0px 7px 2px #ffab00;',
        all: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 -25px 50px -12px rgba(0, 0, 0, 0.25);'
        // glow: '0px 0px 10px 5px light-green;'
    }
});

export default theme;
