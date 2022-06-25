export const pagePaddingX = '10%';

export const navBarHeight = '80px';
export const navBarFooterHeight = '60px';

export const zIndexes = {
    splash: 50,
    cursor: 40,
    toggle: 30,
    mediaPlayer: 20,
    navBar: 10,
    teamCanvas: -1,
    canvas: -10
};

export const animationContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.33,
        }
    }
};

export const animationItem = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};
