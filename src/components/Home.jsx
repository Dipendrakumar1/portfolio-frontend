import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { API_BASE_URL, getImageUrl } from "../api";
import styled from 'styled-components'
import SectionHeader from '../components/SectionHeader'
import Card from '../components/Card'
import Footer from '../components/Footer'
import { theme, GradientText, SiteContainer, FadeInUp, GlassCard } from '../styles/GlobalStyles'

const HeroSection = styled.section`
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 60px 16px 40px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 70vw;
    height: 70vw;
    max-width: 650px;
    max-height: 650px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.2) 0%, rgba(129, 140, 248, 0.12) 40%, transparent 70%);
    filter: blur(60px);
    z-index: -1;
    border-radius: 50%;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: pulse 6s ease-in-out infinite;
  }

  @media (max-width: 480px) {
    padding: 36px 8px 24px;
    min-height: auto;
  }
`

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 18px;
  margin-bottom: 20px;
  border-radius: ${theme.radii.pill};
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.02em;
  color: ${theme.success};
  background: rgba(52, 211, 153, 0.08);
  border: 1px solid rgba(52, 211, 153, 0.35);
  box-shadow: 0 4px 15px rgba(52, 211, 153, 0.15);
  animation: fadeInUp 0.6s ease-out backwards;

  .dot {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: ${theme.success};
    animation: glowPulse 2s ease-in-out infinite;
  }

  @media (max-width: 480px) {
    font-size: 12px;
    padding: 5px 14px;
    margin-bottom: 16px;
  }
`

const HeroTitle = styled.h1`
  font-size: clamp(32px, 8.5vw, 82px);
  line-height: 1.15;
  margin-bottom: 16px;
  letter-spacing: -0.035em;
  font-weight: 900;
  color: #ffffff;
`

const RoleSubtitle = styled.div`
  font-size: clamp(14.5px, 3.8vw, 22px);
  color: ${theme.accentHover};
  font-family: ${theme.fontHeading};
  font-weight: 600;
  margin-bottom: 18px;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;

  .divider-dot {
    color: ${theme.borderStrong};
    font-size: 12px;
  }

  @media (max-width: 480px) {
    gap: 6px;
    margin-bottom: 14px;
  }
`

const HeroSubtitle = styled.p`
  font-size: clamp(15px, 3.8vw, 19px);
  color: ${theme.textBody};
  max-width: 680px;
  margin: 0 auto;
  line-height: 1.7;
  font-weight: 400;

  @media (max-width: 480px) {
    line-height: 1.6;
  }
`

const HeroActions = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 32px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 24px;
  }
`

const PrimaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: ${theme.radii.pill};
  background: ${theme.accentGradient};
  color: #fff !important;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.01em;
  box-shadow: 0 8px 30px rgba(56, 189, 248, 0.4);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 12px 40px rgba(56, 189, 248, 0.6);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(4px);
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
    padding: 13px 20px;
  }
`

const SecondaryButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: ${theme.radii.pill};
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${theme.borderStrong};
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.01em;
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    color: #fff;
    background: rgba(56, 189, 248, 0.12);
    border-color: ${theme.accent};
    transform: translateY(-3px);
  }

  @media (max-width: 480px) {
    width: 100%;
    max-width: 320px;
    padding: 13px 20px;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  max-width: 900px;
  margin: 50px auto 0;
  width: 100%;
  padding: 0 10px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 12px;
    margin-top: 36px;
    padding: 0;
  }
`

const StatCard = styled.div`
  padding: 20px 16px;
  border-radius: ${theme.radii.lg};
  background: linear-gradient(145deg, rgba(23, 32, 54, 0.6) 0%, rgba(13, 20, 37, 0.4) 100%);
  border: 1px solid ${theme.border};
  backdrop-filter: blur(10px);
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.accent};
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
  }

  .number {
    font-family: ${theme.fontHeading};
    font-size: 34px;
    font-weight: 800;
    margin-bottom: 2px;
    background: ${theme.accentGradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.02em;
  }

  .label {
    font-size: 13px;
    color: ${theme.textMuted};
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }

  @media (max-width: 480px) {
    padding: 16px 14px;
    .number {
      font-size: 28px;
    }
  }
`

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 14px;
  max-width: 900px;
  margin: 24px auto 0;
`;

const HighlightCard = styled.div`
  padding: 18px;
  border: 1px solid ${theme.border};
  border-radius: ${theme.radii.md};
  background: rgba(255, 255, 255, 0.03);
  text-align: center;

  strong { display: block; color: #fff; font-size: 24px; }
  span { color: ${theme.textMuted}; font-size: 12px; text-transform: uppercase; }
`;

const TestimonialsSection = styled.section`
  max-width: 1100px;
  margin: 72px auto 0;
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
`;

const TestimonialCard = styled(GlassCard)`
  padding: 24px;
  margin: 0;

  blockquote { color: ${theme.textBody}; line-height: 1.7; margin-bottom: 18px; }
  cite { color: ${theme.textMuted}; font-size: 13px; font-style: normal; }
  cite strong { color: #fff; }
`;

const ContentSection = styled.section`
  margin-top: 70px;

  @media (max-width: 480px) {
    margin-top: 50px;
  }
`

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 28px;
  margin: 0 auto;
  max-width: 1400px;
  width: 100%;
  padding: 0;
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`

export default function Home() {
  const [cards, setCards] = useState([]);
  const [projectCount, setProjectCount] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/home-cards`)
      .then((res) => res.json())
      .then((data) => setCards(data))
      .catch((err) => console.error("Error fetching home cards:", err));

    fetch(`${API_BASE_URL}/site-stats`)
      .then((res) => res.json())
      .then((data) => {
        setProjectCount(data.projects_delivered);
        setHighlights(data.highlights || []);
      })
      .catch((err) => console.error("Error fetching site stats:", err));

    fetch(`${API_BASE_URL}/testimonials`)
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error("Error fetching testimonials:", err));
  }, []);

  return (
    <>
      <Helmet>
        <title>Dipendra Yadav - Full Stack Software Developer Portfolio</title>
        <meta name="description" content="Portfolio of Dipendra Yadav - Software Developer specializing in React, Python, Flask, MongoDB, and modern web architectures. Explore projects, diary, and technical musings." />
        <meta name="keywords" content="Dipendra Yadav, portfolio, web developer, React, Node.js, Python, Flask, MongoDB, full stack developer" />
        <meta name="author" content="Dipendra Yadav" />
        <link rel="canonical" href="https://www.dipendrakumaryadav.com.np/" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dipendrakumaryadav.com.np/" />
        <meta property="og:title" content="Dipendra Yadav - Full Stack Software Developer" />
        <meta property="og:description" content="Software Developer Portfolio - Building dynamic and scalable web experiences." />
        <meta property="og:image" content="https://www.dipendrakumaryadav.com.np/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.dipendrakumaryadav.com.np/" />
        <meta name="twitter:title" content="Dipendra Yadav - Full Stack Software Developer" />
        <meta name="twitter:description" content="Software Developer Portfolio - Building dynamic and scalable web experiences." />
        <meta name="twitter:image" content="https://www.dipendrakumaryadav.com.np/og-image.jpg" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Dipendra Yadav",
            "url": "https://www.dipendrakumaryadav.com.np",
            "jobTitle": "Full Stack Developer",
            "knowsAbout": ["React", "Python", "Flask", "MongoDB", "JavaScript", "Full Stack Development"]
          })}
        </script>
      </Helmet>

      <SiteContainer>
        <FadeInUp>
          <HeroSection>
            <HeroBadge>
              <span className="dot" />
              Open to new freelance opportunities
            </HeroBadge>
            
            <HeroTitle>
              Hi, I'm <GradientText>Dipendra Yadav</GradientText>
            </HeroTitle>

            <RoleSubtitle>
              <span>Full Stack Developer</span>
              <span className="divider-dot">•</span>
              <span>Python, AI & Backend</span>
              <span className="divider-dot">•</span>
              <span>Open Source Creator</span>
            </RoleSubtitle>
            
            <HeroSubtitle>
              I architect dynamic, highly scalable web applications with clean design aesthetics, robust APIs, and exceptional user experiences.
            </HeroSubtitle>
            
            <HeroActions>
              <PrimaryButton to="/projects">
                <span>View Portfolio</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </PrimaryButton>
              <SecondaryButton to="/hire-me">
                <span>Get In Touch</span>
              </SecondaryButton>
            </HeroActions>

            <StatsGrid>
              <StatCard>
                <div className="number">{projectCount === null ? "..." : projectCount >= 10 ? `${projectCount}+` : projectCount}</div>
                <div className="label">Projects Delivered</div>
              </StatCard>
              <StatCard>
                <div className="number">99.9%</div>
                <div className="label">Client Satisfaction</div>
              </StatCard>
              <StatCard>
                <div className="number">100%</div>
                <div className="label">Modern Codebase</div>
              </StatCard>
            </StatsGrid>
            {highlights.length > 0 && (
              <HighlightsGrid>
                {highlights.map((highlight) => (
                  <HighlightCard key={highlight.id}>
                    <strong>{highlight.value}</strong>
                    <span>{highlight.label}</span>
                  </HighlightCard>
                ))}
              </HighlightsGrid>
            )}
          </HeroSection>
        </FadeInUp>

        <ContentSection>
          <SectionHeader 
            badge="Portfolio Highlights" 
            title="Featured Works & Navigation" 
            name="Explore my core areas of work, articles, projects, and personal diary." 
          />

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
              <div style={{ color: theme.textMuted, width: '100%', gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                Loading interactive features...
              </div>
            )}
          </CardsGrid>
        </ContentSection>

        {testimonials.length > 0 && (
          <TestimonialsSection>
            <SectionHeader badge="Social proof" title="What collaborators say" name="A few words from people I have worked with." />
            <TestimonialsGrid>
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id}>
                  <blockquote>“{testimonial.quote}”</blockquote>
                  <cite><strong>{testimonial.name}</strong>{testimonial.role && `, ${testimonial.role}`}{testimonial.company && ` at ${testimonial.company}`}</cite>
                </TestimonialCard>
              ))}
            </TestimonialsGrid>
          </TestimonialsSection>
        )}

        <Footer linkText="Explore My Diary →" linkTo="/mydiary" />
      </SiteContainer>
    </>
  )
}
