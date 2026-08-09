import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-based fade-in animations
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Trigger point (0-1), default 0.1
 * @param {number} options.rootMargin - Root margin, default '0px'
 * @param {boolean} options.once - Only animate once, default true
 * @returns {Object} - ref and isVisible state
 */
export const useFadeIn = (options = {}) => {
  const { threshold = 0.1, rootMargin = '0px', once = true } = options;
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, isVisible };
};

export default useFadeIn;