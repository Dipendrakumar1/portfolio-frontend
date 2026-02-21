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
  containerMax: '1200px',
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
`

export const SiteContainer = styled.div`
  width: 100%;
  max-width: ${theme.containerMax};
  margin: 0 auto;
  padding: 36px 24px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 24px 16px;
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

export default GlobalStyle
