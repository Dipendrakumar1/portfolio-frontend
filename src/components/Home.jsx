import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { API_BASE_URL, getImageUrl } from "../api";
import styled from 'styled-components'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Footer from '../components/Footer'
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
      <Helmet>
        <title>Dipendra Yadav - Portfolio</title>
        <meta name="description" content="Portfolio of Dipendra Yadav - Software Developer specializing in React, Node.js, and modern web technologies." />
        <meta name="keywords" content="Dipendra Yadav, portfolio, web developer, React, Node.js, software engineer" />
        <meta property="og:title" content="Dipendra Yadav - Portfolio" />
        <meta property="og:description" content="Software Developer Portfolio - Building dynamic and scalable web experiences" />
        <meta property="og:type" content="website" />
      </Helmet>
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

      <Footer linkText="Explore My Diary →" linkTo="/mydiary" />
    </>
  )
}
