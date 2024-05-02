import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible) {
  const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
  const ref = useRef(null);

const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false);
    }
};

/**
 * useEffect hook to add and remove event listener for click events.
 * This hook is used to handle click events outside a specific component.
 * The event listener is added when the component mounts and removed when it unmounts.
 */
useEffect(() => {
    // Add click event listener on document
    document.addEventListener('click', handleClickOutside, true);

    // Cleanup function to be called when component unmounts
    return () => {
        // Remove click event listener from document
        document.removeEventListener('click', handleClickOutside, true);
    };
}, []); // Empty dependency array ensures this runs on mount and unmount only

  return { ref, isComponentVisible, setIsComponentVisible };
}
