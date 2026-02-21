import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/GlobalStyles'

const TopRow = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  background: ${({ $scrolled }) => $scrolled ? theme.bgCard : 'transparent'};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ $scrolled }) => $scrolled ? theme.border : 'transparent'};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.3s ease;
  border-radius: ${({ $scrolled }) => $scrolled ? '0 0 16px 16px' : '0'};
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const HomeBtn = styled(Link)`
  color: ${theme.text};
  font-family: ${theme.fontHeading};
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: -0.5px;
  
  span {
    color: ${theme.accent};
  }
  
  &:hover {
    color: ${theme.text};
    text-decoration: none;
  }
`

const DesktopNav = styled.nav`
  display: flex;
  gap: 32px;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`

const NavLink = styled(Link)`
  color: ${({ $active }) => $active ? theme.accent : theme.textMuted};
  font-weight: ${({ $active }) => $active ? '600' : '500'};
  font-size: 15px;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: ${({ $active }) => $active ? '100%' : '0'};
    height: 2px;
    bottom: -4px;
    left: 0;
    background: ${theme.accentGradient};
    transition: width 0.3s ease;
    border-radius: 2px;
  }
  
  &:hover {
    color: ${theme.text};
    text-decoration: none;
    
    &:after {
      width: 100%;
    }
  }
`

const HireNavLink = styled(NavLink)`
  padding: 8px 16px;
  background: ${theme.accentGradient};
  color: white;
  border-radius: 20px;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
  
  &:after {
    display: none;
  }
  
  &:hover {
    transform: scale(1.05);
    color: white;
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.4);
  }
`

const ActionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`

const Lang = styled.select`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 12px;
  border-radius: 8px;
  font-family: ${theme.fontBody};
  font-size: 14px;
  cursor: pointer;
  color: ${theme.text};
  outline: none;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
  
  option {
    background: ${theme.bg};
  }
`

const MobileMenuBtn = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 101;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  
  span {
    display: block;
    width: 28px;
    height: 3px;
    background: ${theme.text};
    border-radius: 3px;
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg) translate(8px, 6px)' : 'none'};
    }
    &:nth-child(2) {
      opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
    }
    &:nth-child(3) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg) translate(6px, -5px)' : 'none'};
    }
  }
`

const MobileNavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${theme.bg};
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  pointer-events: ${({ $isOpen }) => $isOpen ? 'all' : 'none'};
  transition: opacity 0.3s ease;
  
  @media (min-width: 769px) { /* Above tablet */
    display: none;
  }
`

const MobileNavLink = styled(Link)`
  font-family: ${theme.fontHeading};
  font-size: 32px;
  font-weight: 700;
  color: ${({ $active }) => $active ? theme.accent : theme.text};
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.accentHover};
  }
`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <TopRow $scrolled={scrolled} aria-label="top navigation">
        <LogoWrapper>
          <HomeBtn to="/" aria-current="page">Dipendra<span>.dev</span></HomeBtn>
        </LogoWrapper>

        <DesktopNav>
          <NavLink to="/aboutme" $active={location.pathname === '/aboutme'}>About</NavLink>
          <NavLink to="/blog" $active={location.pathname === '/blog'}>Blog</NavLink>
          <NavLink to="/mydiary" $active={location.pathname === '/mydiary'}>Diary</NavLink>
          <NavLink to="/projects" $active={location.pathname.startsWith('/projects')}>Projects</NavLink>
          <HireNavLink to="/hire-me">Hire Me</HireNavLink>
        </DesktopNav>

        <ActionArea>
          <Lang aria-label="language">
            <option>EN</option>
          </Lang>
          <MobileMenuBtn $isOpen={mobileMenuOpen} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle mobile menu">
            <span></span>
            <span></span>
            <span></span>
          </MobileMenuBtn>
        </ActionArea>
      </TopRow>

      <MobileNavOverlay $isOpen={mobileMenuOpen}>
        <MobileNavLink to="/aboutme" $active={location.pathname === '/aboutme'}>About</MobileNavLink>
        <MobileNavLink to="/blog" $active={location.pathname === '/blog'}>Blog</MobileNavLink>
        <MobileNavLink to="/mydiary" $active={location.pathname === '/mydiary'}>Diary</MobileNavLink>
        <MobileNavLink to="/projects" $active={location.pathname.startsWith('/projects')}>Projects</MobileNavLink>
        <MobileNavLink to="/hire-me" style={{
          background: theme.accentGradient,
          padding: '10px 30px',
          borderRadius: '50px',
          color: 'white',
          marginTop: '20px'
        }}>Hire Me</MobileNavLink>
      </MobileNavOverlay>
    </>
  )
}
