import { useEffect } from 'react';

const KeyboardScroll = () => {
  useEffect(() => {
    // Function to handle keyboard scroll
    const handleKeyScroll = (event) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
      }

      const scrollAmount = 200; // Higher scroll amount for faster response
      const pageScrollAmount = window.innerHeight * 2.5; // Larger amount for Page Up/Page Down keys

      switch (event.key) {
        case 'ArrowDown':
          window.scrollBy(0, scrollAmount);
          break;
        case 'ArrowUp':
          window.scrollBy(0, -scrollAmount);
          break;
        case 'PageDown':
          window.scrollBy(0, pageScrollAmount);
          break;
        case 'PageUp':
          window.scrollBy(0, -pageScrollAmount);
          break;
        case 'Home':
          window.scrollTo(0, 0);
          break;
        case 'End':
          window.scrollTo(0, document.body.scrollHeight);
          break;
        default:
          break;
      }
    };

    // Function to handle two-finger scroll (trackpad)
    const handleWheelScroll = (event) => {
      event.preventDefault();
      window.scrollBy(0, event.deltaY * 3); // Increase multiplier for faster two-finger scrolling
    };

    // Function to handle touch scrolling for mobile devices
    let lastTouchY = 0;
    const handleTouchStart = (event) => {
      lastTouchY = event.touches[0].clientY;
    };

    const handleTouchMove = (event) => {
      event.preventDefault();
      const touchY = event.touches[0].clientY;
      const deltaY = lastTouchY - touchY;
      lastTouchY = touchY;
      window.scrollBy(0, deltaY * 5); // Significant multiplier for faster scrolling
    };

    // Add event listeners for keyboard, wheel, and touch scrolling
    window.addEventListener('keydown', handleKeyScroll);
    window.addEventListener('wheel', handleWheelScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyScroll);
      window.removeEventListener('wheel', handleWheelScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return null;
};

export default KeyboardScroll;
