import React, { useEffect, useState } from "react";
import { API_BASE_URL, getImageUrl } from "../api";
import styled from 'styled-components'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import { theme, GradientText } from '../styles/GlobalStyles'

const HeroSection = styled.section`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 20px;
  position: relative;
  
  // Subtle glow behind hero text
  &::before {
    content: '';
    position: absolute;
    width: 60vw;
    height: 60vw;
    background: ${theme.accent};
    filter: blur(150px);
    opacity: 0.1;
    z-index: -1;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const HeroTitle = styled.h1`
  font-size: clamp(48px, 8vw, 84px);
  line-height: 1.1;
  margin-bottom: 24px;
  letter-spacing: -2px;
`

const HeroSubtitle = styled.p`
  font-size: clamp(18px, 3vw, 24px);
  color: ${theme.textMuted};
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`

const ContentSection = styled.section`
  margin-top: 60px;
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 32px;
  margin-top: 40px;
  width: 100%;
`

// Footer
const Footer = styled.footer`
  margin-top: 100px;
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid ${theme.border};
`;

const FooterSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.textMuted};
  margin-bottom: 24px;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${theme.border};
    margin: 0 20px;
  }
`;

const FooterLink = styled.a`
  display: inline-block;
  margin-bottom: 32px;
  color: ${theme.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.accent};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;

  a {
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }
  
  img {
    filter: invert(1);
    opacity: 0.7;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 1;
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
      <HeroSection>
        <HeroTitle>
          Hi, I'm <GradientText>Dipendra Yadav</GradientText>
        </HeroTitle>
        <HeroSubtitle>
          I build dynamic, beautiful, and scalable web experiences. Explore my portfolio to see what I've been working on.
        </HeroSubtitle>
      </HeroSection>

      <ContentSection>
        <SectionHeader title="Featured Work" name="Some things I've built recently" />

        <CardsGrid role="list" aria-label="feature cards">
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
            <div style={{ color: theme.textMuted, width: '100%', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
              Loading projects...
            </div>
          )}
        </CardsGrid>
      </ContentSection>

      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink href="/mydiary">Explore My Diary →</FooterLink>
        <SocialIcons>
          <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=12598&format=png&color=000000" alt="GitHub" width="28" height="28" />
          </a>
          <a href="https://linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=447&format=png&color=000000" alt="LinkedIn" width="28" height="28" />
          </a>
          <a href="https://twitter.com/yourname" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000" alt="Twitter" width="28" height="28" />
          </a>
          <a href="https://instagram.com/yourname" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=eRJfQw0Zs44S&format=png&color=000000" alt="Instagram" width="28" height="28" />
          </a>
        </SocialIcons>
      </Footer>
    </>
  )
}
