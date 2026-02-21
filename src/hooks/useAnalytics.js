import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const generateSessionId = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

const useAnalytics = () => {
    const location = useLocation();
    const maxScrollRef = useRef(0);

    useEffect(() => {
        // Make sure we have a session ID
        if (!sessionStorage.getItem('analytics_session_id')) {
            sessionStorage.setItem('analytics_session_id', generateSessionId());
        }

        // Reset max scroll on route change
        maxScrollRef.current = 0;

        const sessionId = sessionStorage.getItem('analytics_session_id');
        const path = location.pathname;

        const reportAnalytics = async (scrollDepth) => {
            try {
                await fetch(`${API_BASE_URL}/api/analytics`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        session_id: sessionId,
                        path: path,
                        scroll_depth: scrollDepth,
                    }),
                });
            } catch (error) {
                console.error('Analytics tracking failed:', error);
            }
        };

        // Report initial page view with 0 scroll
        reportAnalytics(0);

        const handleScroll = () => {
            // Calculate scroll percentage
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            let scrollPercent = 0;
            if (scrollHeight > clientHeight) {
                scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
            } else {
                scrollPercent = 100; // No scrollbar means fully scrolled
            }

            // Only report if max scroll significantly increased (e.g., by 10%)
            if (scrollPercent > maxScrollRef.current && scrollPercent - maxScrollRef.current >= 10) {
                maxScrollRef.current = scrollPercent;
                reportAnalytics(scrollPercent);
            }
        };

        // Throttle scroll event handler
        let isScrolling;
        const scrollListener = () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(handleScroll, 200);
        };

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
            // Report final max scroll when leaving page
            if (maxScrollRef.current > 0) {
                reportAnalytics(maxScrollRef.current);
            }
        };
    }, [location.pathname]);

    return null;
};

export default useAnalytics;
