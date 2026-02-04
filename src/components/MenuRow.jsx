import React from 'react'
import styled from 'styled-components'
import { theme } from '../styles/GlobalStyles'
import MoreAboutMe from './MoreAboutMe'

const MenuWrap = styled.div`
  margin-top: 18px;
  text-align: center;
`

const Nav = styled.nav`
  display: inline-flex;
  gap: 40px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  @media (max-width: ${theme.breakpoints.mobile}) {
    gap: 20px;
  }
`

const MenuLink = styled.a`
  color: ${theme.accent};
  font-size: 19px;
  letter-spacing: 0.6px;
`

export default function MenuRow() {
  return (
    <MenuWrap role="navigation" aria-label="main menu">
      <Nav>
        <MenuLink href="/aboutme">About Me</MenuLink>
        <MenuLink href="/blog">Blogs</MenuLink>
        <MenuLink href="/mydiary">My Diary</MenuLink>
        <MenuLink href="/projects">Projects</MenuLink>
      </Nav>
    </MenuWrap>
  )
}
