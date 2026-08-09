import styled, { createGlobalStyle } from 'styled-components'

export const theme = {
  bg: '#0f172a', // Deep elegant dark slate
  bgCard: 'rgba(30, 41, 59, 0.7)', // Glassmorphic card background
  text: '#f8fafc', // Crisp white text
  textMuted: '#94a3b8', // Elegant muted text
  accent: '#38bdf8', // Vibrant sky blue
  accentGradient: 'linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)', // Blue to Indigo gradient
  accentHover: '#7dd3fc',
  border: 'rgba(56, 189, 248, 0.2)', // Subtle borders
  fontBody: '"Inter", sans-serif',
  fontHeading: '"Outfit", sans-serif',
  containerMax: '1700px',
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  },
  shadows: {
    glass: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
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
  }
  
  html, body, #root { 
    height: 100%; 
  }
  
  body {
    background: ${theme.bg};
    color: ${theme.text};
    font-family: ${theme.fontBody};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.6;
    overflow-y: overlay;
    overflow-x: hidden;
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fontHeading};
    font-weight: 700;
    margin-bottom: 1rem;
    color: ${theme.text};
  }

  p {
    margin-bottom: 1.5rem;
    color: ${theme.textMuted};
  }
  
  a { 
    color: ${theme.accent}; 
    text-decoration: none; 
    transition: all 0.2s ease-in-out;
  }
  
  a:hover { 
    color: ${theme.accentHover};
  }
  
  ::selection { 
    background: rgba(56, 189, 248, 0.3); 
    color: #fff;
  }
  
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: ${theme.bg};
  }
  ::-webkit-scrollbar-thumb {
    background: #334155;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #475569;
  }

  /* ===== Animations ===== */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
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
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`

export const SiteContainer = styled.div`
  width: 100%;
  max-width: 1700px;
  margin: 0 auto;
  padding: 40px 48px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 28px 20px;
  }

  @media (max-width: 480px) {
    padding: 16px 10px;
  }
`

export const GradientText = styled.span`
  background: ${theme.accentGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
`

export const GlassCard = styled.div`
  background: ${theme.bgCard};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${theme.border};
  border-radius: 16px;
  padding: 24px;
  box-shadow: ${theme.shadows.glass};
  transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    border-color: rgba(56, 189, 248, 0.4);
    box-shadow: 0 12px 40px 0 rgba(0, 0, 0, 0.4);
  }
`

// Animation utility components
export const FadeIn = styled.div`
  animation: fadeIn 0.6s ease-out;
`

export const FadeInUp = styled.div`
  animation: fadeInUp 0.6s ease-out;
`

export const FadeInDown = styled.div`
  animation: fadeInDown 0.5s ease-out;
`

export const SlideInLeft = styled.div`
  animation: slideInLeft 0.6s ease-out;
`

export const SlideInRight = styled.div`
  animation: slideInRight 0.6s ease-out;
`

export const ScaleIn = styled.div`
  animation: scaleIn 0.5s ease-out;
`

export const Shimmer = styled.div`
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  background-size: 1000px 100%;
  animation: shimmer 2s infinite;
`

export const Pulse = styled.div`
  animation: pulse 2s ease-in-out infinite;
`

export const Float = styled.div`
  animation: float 3s ease-in-out infinite;
`

// Staggered animation wrapper
export const StaggerContainer = styled.div`
  > * {
    animation: fadeInUp 0.5s ease-out backwards;
  }

  > *:nth-child(1) { animation-delay: 0.05s; }
  > *:nth-child(2) { animation-delay: 0.1s; }
  > *:nth-child(3) { animation-delay: 0.15s; }
  > *:nth-child(4) { animation-delay: 0.2s; }
  > *:nth-child(5) { animation-delay: 0.25s; }
  > *:nth-child(6) { animation-delay: 0.3s; }
  > *:nth-child(7) { animation-delay: 0.35s; }
  > *:nth-child(8) { animation-delay: 0.4s; }
  > *:nth-child(9) { animation-delay: 0.45s; }
  > *:nth-child(10) { animation-delay: 0.5s; }
`

export default GlobalStyle
