import styled, { createGlobalStyle } from 'styled-components'

export const theme = {
  // bg: '#2b3437',
  bg: '#164f64ff',
  text: '#b5e8df',
  accent: '#9fd8cc',
  subtitle: '#6b8b85',
  mono: '"Courier New", monospace',
  containerMax: '1200px',
  breakpoints: {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px'
  }
}

const GlobalStyle = createGlobalStyle`
  * { box-sizing: border-box; }
  html,body,#root { height: 100%; }
  body {
    margin: 0;
    padding: 0;
    background: ${theme.bg};
    color: ${theme.text};
    font-family: ${theme.mono};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.4;
    overflow-y: overlay;
  }
  a { color: ${theme.accent}; text-decoration: none; }
  a:hover { text-decoration: underline; }
  ::selection { background: rgba(159,216,204,0.16); }
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

export default GlobalStyle
