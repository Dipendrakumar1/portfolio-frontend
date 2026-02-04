import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/GlobalStyles'

const Col = styled.div`
  flex: 1 1 0;
  min-width: 200px;
  max-width: 33%;

  @media (max-width: ${theme.breakpoints.tablet}) {
    max-width: 100%;
    flex: 1 1 100%;
    text-align: center;
  }
`

const Title = styled.h2`
  font-size: 26px;
  color: ${theme.text};
  margin: 0 0 10px 0;
  letter-spacing: 0.8px;
`

const Dots = styled.div`
  color: ${theme.accent};
  letter-spacing: 6px;
  font-size: 18px;
  margin-bottom: 12px;
  white-space: nowrap;
  overflow: hidden;
`

const Subtitle = styled.div`
  color: ${theme.subtitle};
  margin-bottom: 28px;
  font-size: 16px;
`

export default function SectionHeader({ title, name }) {
  return (
    <Col>
      <Title>{title}</Title>
      <Dots>--)::::::(--</Dots>
      <Subtitle>{name}</Subtitle>
    </Col>
  )
}
