export const pagePaddingX = '10%';

export const navBarHeight = '80px';
export const navBarFooterHeight = '60px';

export const zIndexes = {
    splash: 50,
    footer: 10,
    navBar: 10,
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
