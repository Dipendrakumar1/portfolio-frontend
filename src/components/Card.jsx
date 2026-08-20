import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme, GlassCard } from '../styles/GlobalStyles'

const CardWrap = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 360px;
  padding: 0;
  overflow: hidden;
  text-decoration: none;
  border-radius: ${theme.radii.lg};
  border: 1px solid ${theme.border};
  background: linear-gradient(160deg, rgba(26, 36, 60, 0.75) 0%, rgba(13, 19, 36, 0.85) 100%);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    transform: translateY(-8px);
    border-color: ${theme.borderGlow};
    box-shadow: ${theme.shadows.lift}, 0 0 30px rgba(56, 189, 248, 0.2);
  }

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 230px;
  overflow: hidden;
  background: #080d1a;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(10, 15, 29, 0.05) 0%, rgba(10, 15, 29, 0.85) 100%);
    transition: opacity 0.35s ease;
  }
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  
  ${CardWrap}:hover & {
    transform: scale(1.08);
  }
`

const CardBadge = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 2;
  padding: 4px 12px;
  border-radius: ${theme.radii.pill};
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: rgba(10, 15, 29, 0.75);
  backdrop-filter: blur(8px);
  color: ${theme.accent};
  border: 1px solid rgba(56, 189, 248, 0.3);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`

const ContentWrap = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
  gap: 16px;
  background: transparent;
`

const Title = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: ${theme.text};
  line-height: 1.4;
  transition: color 0.25s ease;

  ${CardWrap}:hover & {
    color: ${theme.accent};
  }
`

const ReadMore = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.accent};
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }
  
  ${CardWrap}:hover & svg {
    transform: translateX(5px);
  }
`

export default function Card({ src, alt, title, href }) {
  return (
    <CardWrap as={Link} to={href || '#'} role="listitem">
      <ImageWrapper>
        <Img src={src} alt={alt} loading="lazy" />
        <CardBadge>Featured</CardBadge>
      </ImageWrapper>
      <ContentWrap>
        <Title>{title}</Title>
        <ReadMore>
          <span>Explore project</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </ReadMore>
      </ContentWrap>
    </CardWrap>
  )
}
