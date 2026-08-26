/* eslint-disable react-refresh/only-export-components */
import styled, { createGlobalStyle } from 'styled-components'

export const theme = {
  bg: '#0a0f1d', // Ultra-sleek deep slate/navy
  bgCard: 'rgba(17, 24, 39, 0.72)', // Glassmorphic card background
  bgCardHover: 'rgba(30, 41, 59, 0.85)',
  text: '#ffffff', // Crisp bright pure white for titles and primary elements
  textBody: '#cbd5e1', // High-contrast, easy-on-the-eyes readable slate-300
  textMuted: '#94a3b8', // Muted secondary captions & metadata
  textHighlight: '#e2e8f0', // Clean highlight text
  accent: '#38bdf8', // Cyber sky blue
  accentPurple: '#a855f7',
  accentPink: '#ec4899',
  accentGradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 50%, #c084fc 100%)', // Multi-stop glowing gradient
  accentGradientShift: 'linear-gradient(120deg, #38bdf8, #818cf8, #f472b6, #a78bfa, #38bdf8)', // Animated multi-stop gradient
  accentHover: '#7dd3fc',
  success: '#34d399',
  border: 'rgba(56, 189, 248, 0.18)', // Subtle glowing borders
  borderStrong: 'rgba(56, 189, 248, 0.45)',
  borderGlow: 'rgba(56, 189, 248, 0.65)',
  fontBody: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontHeading: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
  fontMono: '"JetBrains Mono", "Fira Code", monospace',
  fontHandwriting: '"Caveat", cursive',
  containerMax: '1700px',
  radii: {
    xs: '6px',
    sm: '10px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    pill: '999px'
  },
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px'
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
    lift: '0 20px 50px -10px rgba(0, 0, 0, 0.75), 0 0 25px 0 rgba(56, 189, 248, 0.18)',
    glow: '0 0 35px 0 rgba(56, 189, 248, 0.35)',
    glowPurple: '0 0 35px 0 rgba(168, 85, 247, 0.35)',
    neonHover: '0 0 20px rgba(56, 189, 248, 0.5), inset 0 0 15px rgba(56, 189, 248, 0.2)'
  }
}

const GlobalStyle = createGlobalStyle`
  * { 
    box-sizing: border-box; 
    margin: 0; 
    padding: 0;
  }
  
  html {
    scroll-behavior: smooth;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  html, body, #root { 
    min-height: 100%; 
  }
  
  body {
    background:
      repeating-linear-gradient(90deg, rgba(148, 163, 184, 0.025) 0, rgba(148, 163, 184, 0.025) 1px, transparent 1px, transparent 72px),
      repeating-linear-gradient(0deg, rgba(148, 163, 184, 0.02) 0, rgba(148, 163, 184, 0.02) 1px, transparent 1px, transparent 72px),
      radial-gradient(1200px 800px at 85% -10%, rgba(56, 189, 248, 0.16), transparent 60%),
      radial-gradient(1000px 700px at -10% 20%, rgba(129, 140, 248, 0.14), transparent 60%),
      radial-gradient(1100px 900px at 50% 115%, rgba(16, 185, 129, 0.1), transparent 60%),
      radial-gradient(800px 600px at 20% 70%, rgba(192, 132, 252, 0.08), transparent 50%),
      ${theme.bg};
    background-attachment: fixed;
    color: ${theme.textBody};
    font-family: ${theme.fontBody};
    font-size: 16px;
    line-height: 1.7;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fontHeading};
    font-weight: 700;
    margin-bottom: 0.85rem;
    color: ${theme.text};
    letter-spacing: 0;
    line-height: 1.25;
  }

  p {
    margin-bottom: 1.25rem;
    color: ${theme.textBody};
    line-height: 1.75;
  }
  
  a { 
    color: ${theme.accent}; 
    text-decoration: none; 
    transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  }
  
  a:hover { 
    color: ${theme.accentHover};
  }

  strong, b {
    color: ${theme.text};
    font-weight: 600;
  }

  button {
    font-family: inherit;
    cursor: pointer;
  }
  
  :focus-visible {
    outline: 2px solid ${theme.accent};
    outline-offset: 3px;
    border-radius: 6px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      scroll-behavior: auto !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  ::selection { 
    background: rgba(56, 189, 248, 0.35); 
    color: #ffffff;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.bg};
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(56, 189, 248, 0.25);
    border-radius: 999px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(56, 189, 248, 0.5);
  }

  /* ===== Keyframe Animations ===== */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(24px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.94);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes glowPulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.5);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(52, 211, 153, 0);
    }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`

export const SiteContainer = styled.div`
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  padding: 40px 48px;

  @media (max-width: ${theme.breakpoints.desktop}) {
    padding: 32px 24px;
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 24px 16px;
  }

  @media (max-width: 480px) {
    padding: 16px 12px;
  }
`

export const GradientText = styled.span`
  background: ${theme.accentGradientShift};
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  font-weight: 800;
  animation: gradientShift 7s ease infinite;
`

export const GlassCard = styled.div`
  position: relative;
  background: linear-gradient(145deg, rgba(23, 32, 54, 0.75) 0%, rgba(13, 20, 37, 0.6) 100%);
  backdrop-filter: blur(16px) saturate(160%);
  -webkit-backdrop-filter: blur(16px) saturate(160%);
  border: 1px solid ${theme.border};
  border-radius: 20px;
  padding: 32px;
  box-shadow: ${theme.shadows.glass}, inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease, box-shadow 0.4s ease;
  
  &:hover {
    transform: translateY(-6px);
    border-color: ${theme.borderStrong};
    box-shadow: ${theme.shadows.lift};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 24px 18px;
    border-radius: 16px;
  }

  @media (max-width: 480px) {
    padding: 20px 14px;
    border-radius: 14px;
  }
`

export const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 14px;
  border-radius: ${theme.radii.pill};
  font-size: 13.5px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${theme.accent};
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(56, 189, 248, 0.18);
    border-color: ${theme.accent};
  }
`

export const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 16px;
  border-radius: ${theme.radii.pill};
  font-size: 14px;
  font-weight: 600;
  color: ${theme.text};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${theme.border};
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
`

export const SectionDivider = styled.div`
  height: 1px;
  width: 100%;
  max-width: 300px;
  background: linear-gradient(90deg, transparent, ${theme.borderStrong}, transparent);
  margin: 32px auto;
`

// Animation utility components
export const FadeIn = styled.div`
  animation: fadeIn 0.6s ease-out forwards;
`

export const FadeInUp = styled.div`
  animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`

export const FadeInDown = styled.div`
  animation: fadeInDown 0.5s ease-out forwards;
`

export const SlideInLeft = styled.div`
  animation: slideInLeft 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`

export const SlideInRight = styled.div`
  animation: slideInRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`

export const ScaleIn = styled.div`
  animation: scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
`

export const Shimmer = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.08) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
`

export const Pulse = styled.div`
  animation: pulse 2s ease-in-out infinite;
`

export const Float = styled.div`
  animation: float 4s ease-in-out infinite;
`

// Staggered animation wrapper
export const StaggerContainer = styled.div`
  > * {
    animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;
  }

  > *:nth-child(1) { animation-delay: 0.04s; }
  > *:nth-child(2) { animation-delay: 0.08s; }
  > *:nth-child(3) { animation-delay: 0.12s; }
  > *:nth-child(4) { animation-delay: 0.16s; }
  > *:nth-child(5) { animation-delay: 0.20s; }
  > *:nth-child(6) { animation-delay: 0.24s; }
  > *:nth-child(7) { animation-delay: 0.28s; }
  > *:nth-child(8) { animation-delay: 0.32s; }
  > *:nth-child(9) { animation-delay: 0.36s; }
  > *:nth-child(10) { animation-delay: 0.40s; }
`

export default GlobalStyle
