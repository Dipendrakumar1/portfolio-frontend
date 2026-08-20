import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/GlobalStyles'

const TopRow = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 36px;
  background: ${({ $scrolled }) => $scrolled ? 'rgba(10, 15, 29, 0.82)' : 'transparent'};
  backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)'};
  -webkit-backdrop-filter: ${({ $scrolled }) => $scrolled ? 'blur(20px) saturate(180%)' : 'blur(0px)'};
  border-bottom: 1px solid ${({ $scrolled }) => $scrolled ? 'rgba(56, 189, 248, 0.18)' : 'transparent'};
  box-shadow: ${({ $scrolled }) => $scrolled ? '0 10px 30px -10px rgba(0, 0, 0, 0.8)' : 'none'};
  position: sticky;
  top: 0;
  z-index: 100;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  border-radius: ${({ $scrolled }) => $scrolled ? '0 0 20px 20px' : '0'};
  animation: fadeInDown 0.6s ease-out;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 14px 20px;
  }
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`

const HomeBtn = styled(Link)`
  color: ${theme.text};
  font-family: ${theme.fontHeading};
  font-size: 22px;
  font-weight: 800;
  text-decoration: none;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 4px;
  
  .accent-dot {
    color: ${theme.accent};
    text-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
  }

  .dev-tag {
    font-size: 13px;
    font-weight: 600;
    padding: 2px 8px;
    border-radius: 6px;
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.25);
    color: ${theme.accent};
    margin-left: 4px;
  }
  
  &:hover {
    color: #fff;
    text-decoration: none;
  }
`

const DesktopNav = styled.nav`
  display: flex;
  gap: 8px;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  padding: 6px 10px;
  border-radius: ${theme.radii.pill};
  border: 1px solid rgba(255, 255, 255, 0.06);
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: none;
  }
`

const NavLink = styled(Link)`
  color: ${({ $active }) => $active ? '#fff' : theme.textMuted};
  font-weight: ${({ $active }) => $active ? '600' : '500'};
  font-size: 14.5px;
  padding: 8px 18px;
  border-radius: ${theme.radii.pill};
  background: ${({ $active }) => $active ? 'rgba(56, 189, 248, 0.15)' : 'transparent'};
  border: 1px solid ${({ $active }) => $active ? 'rgba(56, 189, 248, 0.3)' : 'transparent'};
  transition: all 0.25s ease;
  position: relative;
  
  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.06);
    text-decoration: none;
  }
`

const HireNavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 22px;
  background: ${theme.accentGradient};
  color: #fff !important;
  border-radius: ${theme.radii.pill};
  font-weight: 700;
  font-size: 14.5px;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.35);
  
  &:hover {
    transform: translateY(-2px) scale(1.03);
    box-shadow: 0 8px 25px rgba(56, 189, 248, 0.5);
  }
`

const ActionArea = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`

const AvailabilityBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  border-radius: ${theme.radii.pill};
  font-size: 12.5px;
  font-weight: 600;
  color: ${theme.success};
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.25);

  .pulse-dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${theme.success};
    animation: glowPulse 2s infinite;
  }

  @media (max-width: 900px) {
    display: none;
  }
`

const MobileMenuBtn = styled.button`
  display: none;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.border};
  border-radius: 10px;
  cursor: pointer;
  padding: 10px;
  z-index: 101;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  span {
    display: block;
    width: 22px;
    height: 2px;
    background: ${theme.text};
    border-radius: 2px;
    transition: all 0.3s ease;
    
    &:nth-child(1) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'};
    }
    &:nth-child(2) {
      opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
    }
    &:nth-child(3) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'};
    }
  }
`

const MobileNavOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(10, 15, 29, 0.95);
  backdrop-filter: blur(20px);
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  opacity: ${({ $isOpen }) => $isOpen ? '1' : '0'};
  pointer-events: ${({ $isOpen }) => $isOpen ? 'all' : 'none'};
  transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  
  @media (min-width: 769px) {
    display: none;
  }
`

const MobileNavLink = styled(Link)`
  font-family: ${theme.fontHeading};
  font-size: 26px;
  font-weight: 700;
  color: ${({ $active }) => $active ? theme.accent : theme.text};
  text-decoration: none;
  transition: all 0.2s ease;
  padding: 8px 24px;
  border-radius: ${theme.radii.pill};
  background: ${({ $active }) => $active ? 'rgba(56, 189, 248, 0.12)' : 'transparent'};
  
  &:hover {
    color: ${theme.accentHover};
    transform: scale(1.05);
  }
`

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <HomeBtn to="/" aria-current="page">
            Dipendra<span className="accent-dot">.</span><span className="dev-tag">dev</span>
          </HomeBtn>
        </LogoWrapper>

        <DesktopNav>
          <NavLink to="/aboutme" $active={location.pathname === '/aboutme'}>About</NavLink>
          <NavLink to="/blog" $active={location.pathname === '/blog'}>Blog</NavLink>
          <NavLink to="/mydiary" $active={location.pathname === '/mydiary'}>Diary</NavLink>
          <NavLink to="/projects" $active={location.pathname.startsWith('/projects')}>Projects</NavLink>
        </DesktopNav>

        <ActionArea>
          <AvailabilityBadge>
            <span className="pulse-dot" />
            Open for hire
          </AvailabilityBadge>
          <HireNavLink to="/hire-me">Hire Me</HireNavLink>
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
          padding: '12px 36px',
          color: 'white',
          marginTop: '12px',
          boxShadow: '0 8px 25px rgba(56, 189, 248, 0.4)'
        }}>Hire Me</MobileNavLink>
      </MobileNavOverlay>
    </>
  )
}
