// use-mobile.jsx
// This custom React hook detects if the current screen size is considered mobile.

import * as React from 'react';

const MOBILE_BREAKPOINT = 768; // Width in pixels below which the device is considered mobile

// useIsMobile returns true if the window width is less than the mobile breakpoint
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    // Create a media query list for the mobile breakpoint
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    // Handler to update state when the window size changes
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    // Set initial value
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    // Cleanup event listener on unmount
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
} 