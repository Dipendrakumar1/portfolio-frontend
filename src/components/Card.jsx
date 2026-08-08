import React from 'react'
import styled from 'styled-components'
import { theme, GlassCard } from '../styles/GlobalStyles'

const CardWrap = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 340px;
  padding: 0;
  overflow: hidden;
  text-decoration: none;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`

const ImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${CardWrap}:hover & {
    transform: scale(1.05);
  }
`

const ContentWrap = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const Title = styled.h3`
  font-size: 20px;
  margin: 0;
  color: ${theme.text};
`

const ReadMore = styled.div`
  margin-top: 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${theme.accent};
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  ${CardWrap}:hover &:after {
    transform: translateX(4px);
  }
`

export default function Card({ src, alt, title, href }) {
  return (
    <CardWrap as="a" href={href || '#'} role="listitem">
      <ImageWrapper>
        <Img src={src} alt={alt} loading="lazy" />
      </ImageWrapper>
      <ContentWrap>
        <Title>{title}</Title>
        <ReadMore>Read more</ReadMore>
      </ContentWrap>
    </CardWrap>
  )
}
