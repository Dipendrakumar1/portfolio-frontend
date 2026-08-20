import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/GlobalStyles'

const HeaderWrap = styled.div`
  margin-bottom: 36px;
  text-align: center;
  position: relative;
`

const BadgeWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding: 4px 14px;
  border-radius: ${theme.radii.pill};
  background: rgba(56, 189, 248, 0.08);
  border: 1px solid rgba(56, 189, 248, 0.2);
  font-size: 13px;
  font-weight: 600;
  color: ${theme.accent};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`

const Title = styled.h2`
  font-size: clamp(28px, 4vw, 40px);
  margin: 0 0 12px 0;
  color: ${theme.text};
  letter-spacing: -0.02em;
  font-weight: 800;
`

const Subtitle = styled.div`
  color: ${theme.textMuted};
  font-size: clamp(15px, 1.8vw, 17px);
  max-width: 580px;
  margin: 0 auto;
  line-height: 1.6;
`

const LineDecorator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin: 16px auto 0;

  &::before,
  &::after {
    content: '';
    height: 2px;
    width: 36px;
    background: linear-gradient(90deg, transparent, ${theme.accent});
    border-radius: 2px;
  }

  &::after {
    background: linear-gradient(90deg, ${theme.accent}, transparent);
  }

  .dot {
    width: 6px;
    height: 6px;
    background: ${theme.accent};
    border-radius: 50%;
    box-shadow: 0 0 8px ${theme.accent};
  }
`

export default function SectionHeader({ title, name, as, badge }) {
  return (
    <HeaderWrap>
      {badge && <BadgeWrap>{badge}</BadgeWrap>}
      <Title as={as}>{title}</Title>
      {name && <Subtitle>{name}</Subtitle>}
      <LineDecorator>
        <span className="dot" />
      </LineDecorator>
    </HeaderWrap>
  )
}
