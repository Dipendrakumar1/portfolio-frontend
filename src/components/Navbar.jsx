import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { theme } from '../styles/GlobalStyles'

const TopRow = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`

const HomeBtn = styled(Link)`
  background: ${theme.accent};
  color: #0f2a28;
  padding: 10px 25px;
  border-radius: 4px;
  border: none;
  font-family: ${theme.mono};
  font-size: 16px;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: none;
  }
`

const Bars = styled.div`
  flex: 1 1 auto;
  text-align: center;
  color: ${theme.accent};
  letter-spacing: 6px;
  font-size: 28px;
  line-height: 1;
  user-select: none;
  white-space: nowrap;
  overflow: hidden;
  &::before{
    content: "|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^|^||";
    display:inline-block;
    transform: translateY(2px);
  }
`

const Lang = styled.select`
  background: ${theme.accent};
  border: none;
  padding: 8px 14px;
  border-radius: 3px;
  font-family: ${theme.mono};
  font-size: 15px;
  cursor: pointer;
  color: #072422;
`

export default function Navbar() {
  return (
    <TopRow aria-label="top navigation">
      <HomeBtn to="/" aria-current="page">Home</HomeBtn>
      <Bars aria-hidden="true" />
      <Lang aria-label="language">
        <option>English ▾</option>
      </Lang>
    </TopRow>
  )
}
