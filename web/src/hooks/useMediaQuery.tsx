import { useCallback, useEffect, useState } from 'react';

export const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
        if (e.matches) {
            setTargetReached(true);
        } else {
            setTargetReached(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);
        media.addEventListener('change', e => updateTarget(e));

        // Check on mount (callback is not called until a change occurs)
        if (media.matches) {
            setTargetReached(true);
        }

        return () => media.removeEventListener('change', e => updateTarget(e));
    }, []);

    return targetReached;
};

/** Returns `true` if viewport width <= 480px  */
// export const usePhoneMediaQuery = (): boolean => {
//     const isPhone = useMediaQuery(768);

//     return isPhone;
// };

/** Returns `true` if viewport width <= 1224px  */
export const useMobileMediaQuery = (): boolean => {
    const isMobile = useMediaQuery(768);

    return isMobile;
};

/** Returns `true` if viewport width <= 360px  */
// export const useSmallMobileMediaQuery = (): boolean => {
//     const isSmallMobile = useMediaQuery(360);

//     return isSmallMobile;
// };

