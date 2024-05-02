import { useEffect, useState, useRef } from 'react';

//Custom hook that checks if a given element is currently in the viewport.
export default function useIntersection(ref) {
  const [isOnScreen, setIsOnScreen] = useState(false);
  const observerRef = useRef(null);

  // Effect to initialize the IntersectionObserver on the ref element.
  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  //Effect to start observing the ref element and clean up on unmount.
  useEffect(() => {
    observerRef.current.observe(ref.current);

    return () => {
      observerRef.current.disconnect();
    };
  }, [ref]);

  return isOnScreen;
}
