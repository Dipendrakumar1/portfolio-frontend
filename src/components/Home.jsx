import React, { useEffect, useState } from "react";
import { API_BASE_URL, getImageUrl } from "../api";
import styled from 'styled-components'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import { theme } from '../styles/GlobalStyles'

const Sections = styled.section`
  margin-top: 56px;
  display: flex;
  gap: 40px;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  flex-wrap: wrap;

  @media (max-width: ${theme.breakpoints.tablet}) {
    gap: 24px;
    margin-top: 32px;
  }
`

const CardsRow = styled.div`
  margin-top: 34px;
  display: flex;
  gap: 36px;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`

const Separator = styled.div`
  margin: 46px auto 0;
  width: 80%;
  max-width: 900px;
  height: 1px;
  background: rgba(255,255,255,0.03);
`
// Footer (optional – same as other pages)
const Footer = styled.footer`
  margin-top: 60px;
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid #4a5a5f;
`;

const FooterSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7ea288;
  margin-bottom: 15px;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #7ea288;
    margin: 0 10px;
  }
`;

const FooterLink = styled.a`
  display: block;
  margin-bottom: 20px;
  color: #7ea288;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #9ee3b1;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;

  a {
    color: #7ea288;
    font-size: 22px;
    text-decoration: none;

    &:hover {
      color: #9ee3b1;
    }
  }
`;


export default function Home() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/home-cards`)
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Error fetching home cards:", err));
  }, []);

  return (
    <>
      <Sections aria-label="sections header">
        <SectionHeader title="About Me" name="Dipendra Yadav" />
        <SectionHeader title="Blogs" name="Dipendra Yadav" />
        <SectionHeader title="Projects" name="Dipendra Yadav" />
      </Sections>

      <CardsRow role="list" aria-label="feature cards">
        {cards.length > 0 ? (
          cards.map((c) => (
            <Card
              key={c.id}
              src={getImageUrl(c.image_url)}
              alt={c.alt_text}
              title={c.title}
              href={c.link_url}
            />
          ))
        ) : (
          <div style={{ color: '#b2e2c5', width: '100%', textAlign: 'center' }}>Loading cards...</div>
        )}
      </CardsRow>

      <Separator aria-hidden="true" />
      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink href="/mydiary">[My Diary] →</FooterLink>
        <SocialIcons>
          <a
            href="https://github.com/yourname"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img
              src="https://img.icons8.com/?size=100&id=12598&format=png&color=000000"
              alt="GitHub"
              width="32"
              height="32"
            />
          </a>
          <a
            href="https://github.com/yourname"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img
              src="https://img.icons8.com/?size=100&id=447&format=png&color=000000"
              alt="LinkedIn"
              width="32"
              height="32"
            />
          </a>
          <a
            href="https://github.com/yourname"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img
              src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000"
              alt="GitHub"
              width="32"
              height="32"
            />
          </a>
          <a
            href="https://github.com/yourname"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img
              src="https://img.icons8.com/?size=100&id=eRJfQw0Zs44S&format=png&color=000000"
              alt="GitHub"
              width="32"
              height="32"
            />
          </a>
        </SocialIcons>
      </Footer>
    </>
  )
}
