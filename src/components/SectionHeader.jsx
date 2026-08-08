import React from 'react'
import styled from 'styled-components'
import { theme, GradientText } from '../styles/GlobalStyles'

const HeaderWrap = styled.div`
  margin-bottom: 24px;
  text-align: center;
`

const Title = styled.h2`
  font-size: 32px;
  margin: 0 0 12px 0;
  color: ${theme.text};
  letter-spacing: -0.5px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 28px;
  }
`

const Subtitle = styled.div`
  color: ${theme.textMuted};
  font-size: 16px;
  font-weight: 500;
`

const Divider = styled.div`
  height: 3px;
  width: 60px;
  background: ${theme.accentGradient};
  border-radius: 2px;
  margin: 0 auto 16px;
`

export default function SectionHeader({ title, name, as }) {
  // Option to render as h1, h2, etc. Default to h2.
  return (
    <HeaderWrap>
      <Title as={as}>{title}</Title>
      <Divider aria-hidden="true" />
      {name && <Subtitle>{name}</Subtitle>}
    </HeaderWrap>
  )
}
