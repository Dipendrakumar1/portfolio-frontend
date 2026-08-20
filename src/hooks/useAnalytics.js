import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL } from '../api';

const generateSessionId = () => {
    return 'sess_' + Math.random().toString(36).substring(2, 11) + '_' + Date.now().toString(36);
};

const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) return 'Mobile';
    if (width <= 1024) return 'Tablet';
    return 'Desktop';
};

const getBrowser = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('SamsungBrowser')) return 'Samsung Internet';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    if (ua.includes('Edge') || ua.includes('Edg')) return 'Edge';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    return 'Other';
};

const getOS = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Win')) return 'Windows';
    if (ua.includes('Mac') && !ua.includes('iPhone') && !ua.includes('iPad')) return 'macOS';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) return 'iOS';
    if (ua.includes('Linux')) return 'Linux';
    return 'Other';
};

const getCleanReferrer = () => {
    const ref = document.referrer;
    if (!ref) return 'Direct / Bookmark';
    try {
        const url = new URL(ref);
        if (url.hostname.includes('linkedin.com')) return 'LinkedIn';
        if (url.hostname.includes('github.com')) return 'GitHub';
        if (url.hostname.includes('google.com')) return 'Google';
        if (url.hostname.includes('t.co') || url.hostname.includes('twitter.com') || url.hostname.includes('x.com')) return 'Twitter / X';
        if (url.hostname.includes('instagram.com')) return 'Instagram';
        if (url.hostname.includes('youtube.com')) return 'YouTube';
        if (url.hostname === window.location.hostname) return 'Internal Navigation';
        return url.hostname;
    } catch {
        return ref.substring(0, 50);
    }
};

const useAnalytics = () => {
    const location = useLocation();
    const maxScrollRef = useRef(0);

    useEffect(() => {
        // Persist session ID and initial referrer across page navigations in session
        if (!sessionStorage.getItem('analytics_session_id')) {
            sessionStorage.setItem('analytics_session_id', generateSessionId());
            sessionStorage.setItem('analytics_initial_referrer', getCleanReferrer());
        }

        maxScrollRef.current = 0;

        const sessionId = sessionStorage.getItem('analytics_session_id');
        const initialReferrer = sessionStorage.getItem('analytics_initial_referrer') || getCleanReferrer();
        const path = location.pathname;
        const deviceType = getDeviceType();
        const browser = getBrowser();
        const os = getOS();
        const screenResolution = `${window.screen.width}x${window.screen.height}`;

        const reportAnalytics = async (scrollDepth) => {
            try {
                await fetch(`${API_BASE_URL}/analytics`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        session_id: sessionId,
                        path: path,
                        scroll_depth: scrollDepth,
                        referrer: initialReferrer,
                        device_type: deviceType,
                        browser: browser,
                        os: os,
                        screen_resolution: screenResolution
                    }),
                });
            } catch (error) {
                // Silently fail on analytics network drop
            }
        };

        // Report initial page view with 0 scroll
        reportAnalytics(0);

        const handleScroll = () => {
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight;
            const clientHeight = document.documentElement.clientHeight;

            let scrollPercent = 0;
            if (scrollHeight > clientHeight) {
                scrollPercent = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
            } else {
                scrollPercent = 100;
            }

            if (scrollPercent > maxScrollRef.current && scrollPercent - maxScrollRef.current >= 15) {
                maxScrollRef.current = scrollPercent;
                reportAnalytics(scrollPercent);
            }
        };

        let isScrolling;
        const scrollListener = () => {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(handleScroll, 250);
        };

        window.addEventListener('scroll', scrollListener);

        return () => {
            window.removeEventListener('scroll', scrollListener);
            if (maxScrollRef.current > 0) {
                reportAnalytics(maxScrollRef.current);
            }
        };
    }, [location.pathname]);

    return null;
};

export default useAnalytics;
