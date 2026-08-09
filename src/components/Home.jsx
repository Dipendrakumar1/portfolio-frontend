import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { API_BASE_URL, getImageUrl } from "../api";
import styled from 'styled-components'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Footer from '../components/Footer'
import { theme, GradientText, SiteContainer, FadeInUp, StaggerContainer } from '../styles/GlobalStyles'
import { useFadeIn } from '../hooks/useFadeIn'

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
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  padding: 0 48px;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 0 16px;
    gap: 20px;
  }

  @media (max-width: 480px) {
    padding: 0 8px;
    gap: 16px;
  }
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
        <title>Dipendra Yadav - Software Developer Portfolio | React, Node.js, Web Development</title>
        <meta name="description" content="Portfolio of Dipendra Yadav - Software Developer specializing in React, Node.js, and modern web technologies. Explore projects, blog posts, and professional journey." />
        <meta name="keywords" content="Dipendra Yadav, portfolio, web developer, React, Node.js, software engineer, full stack developer, JavaScript, web development, Dipendra Yadav portfolio" />
        <meta name="author" content="Dipendra Yadav" />
        <link rel="canonical" href="https://www.dipendrakumaryadav.com.np/" />
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dipendrakumaryadav.com.np/" />
        <meta property="og:title" content="Dipendra Yadav - Software Developer Portfolio" />
        <meta property="og:description" content="Software Developer Portfolio - Building dynamic and scalable web experiences with React, Node.js, and modern technologies." />
        <meta property="og:image" content="https://www.dipendrakumaryadav.com.np/og-image.jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_US" />
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.dipendrakumaryadav.com.np/" />
        <meta name="twitter:title" content="Dipendra Yadav - Software Developer Portfolio" />
        <meta name="twitter:description" content="Software Developer Portfolio - Building dynamic and scalable web experiences with React, Node.js, and modern technologies." />
        <meta name="twitter:image" content="https://www.dipendrakumaryadav.com.np/og-image.jpg" />
        
        <!-- Additional SEO -->
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="7 days" />
        
        <!-- Structured Data / JSON-LD -->
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dipendra Yadav",
            "url": "https://www.dipendrakumaryadav.com.np",
            "image": "https://www.dipendrakumaryadav.com.np/profile.jpg",
            "jobTitle": "Software Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Freelance"
            },
            "sameAs": [
              "https://github.com/dipendra-yadav",
              "https://linkedin.com/in/dipendra-yadav",
              "https://twitter.com/dipendra_yadav"
            ],
            "knowsAbout": ["React", "Node.js", "JavaScript", "Web Development", "Full Stack Development"]
          })}
        </script>
      </Helmet>
      <SiteContainer>
        <FadeInUp>
          <HeroSection>
            <HeroTitle>
              Hi, I'm <GradientText>Dipendra Yadav</GradientText>
            </HeroTitle>
            <HeroSubtitle>
              I build dynamic, beautiful, and scalable web experiences. Explore my portfolio to see what I've been working on.
            </HeroSubtitle>
          </HeroSection>
        </FadeInUp>

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
      </SiteContainer>
    </>
  )
}

