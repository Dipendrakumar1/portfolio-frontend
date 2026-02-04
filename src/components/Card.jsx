import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/GlobalStyles'

const CardWrap = styled.article`
  width: 100%;
  max-width: 320px;
  border: 6px solid ${theme.accent};
  padding: 10px;
  border-radius: 5px;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: ${theme.breakpoints.mobile}) {
    max-width: 100%;
  }
`

const Img = styled.img`
  width: 100%;
  height: 210px;
  object-fit: cover;
  border-radius: 2px;
  display: block;
`

const Title = styled.div`
  margin-top: 18px;
  font-size: 20px;
  color: ${theme.text};
`

const Read = styled.div`
  margin-top: 12px;
  font-size: 17px;
  color: ${theme.accent};
`

export default function Card({ src, alt, title, href }) {
  return (
    <CardWrap role="listitem">
      <Img src={src} alt={alt} />
      <Title>{title}</Title>
      <Read><a href={href || '#'}>[Read more]</a></Read>
    </CardWrap>
  )
}
