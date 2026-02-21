import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GradientText, GlassCard } from "../styles/GlobalStyles";

const HeroSection = styled.section`
  padding: 60px 0 40px;
  text-align: center;
`

const Title = styled.h1`
  font-size: clamp(36px, 6vw, 56px);
  margin-bottom: 24px;
`

const Subtitle = styled.p`
  font-size: 18px;
  color: ${theme.textMuted};
  max-width: 600px;
  margin: 0 auto;
`

const DiaryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-top: 60px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`

const DiaryEntryCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  padding: 32px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    padding: 24px;
  }
`

const DiaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 16px;
  margin-bottom: 24px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`

const DiaryTitle = styled.h2`
  font-size: 28px;
  margin: 0;
  color: ${theme.text};
`

const DiaryMeta = styled.div`
  font-size: 14px;
  color: ${theme.accent};
  font-family: ${theme.fontBody};
`

const DiaryBody = styled.p`
  font-size: 16px;
  color: ${theme.textMuted};
  line-height: 1.7;
  margin-bottom: 24px;
`

const ReadMore = styled.a`
  font-size: 15px;
  font-weight: 600;
  color: ${theme.accent};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  text-decoration: none;
  
  &:after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  &:hover {
    color: ${theme.accentHover};
    
    &:after {
      transform: translateX(4px);
    }
  }
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

export default function MyDiary() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/diaries`)
      .then((res) => res.json())
      .then((data) => setDiaries(data))
      .catch((err) => console.error("Error fetching diaries:", err));
  }, []);

  return (
    <>
      <HeroSection>
        <Title>My <GradientText>Diary</GradientText></Title>
        <Subtitle>Monthly reflections, goals, and personal notes collected over time.</Subtitle>
      </HeroSection>

      <SiteContainer>
        <DiaryGrid>
          {diaries.length > 0 ? (
            diaries.map((d) => (
              <DiaryEntryCard key={d.id}>
                <DiaryHeader>
                  <DiaryTitle>{d.month_label}</DiaryTitle>
                  <DiaryMeta>{d.date} · {d.author}</DiaryMeta>
                </DiaryHeader>
                <DiaryBody>{d.summary}</DiaryBody>
                <ReadMore href={`/mydiary/${d.slug}`}>Open Entry</ReadMore>
              </DiaryEntryCard>
            ))
          ) : (
            <div style={{ color: theme.textMuted, width: '100%', textAlign: 'center', padding: '40px' }}>
              No diary entries found.
            </div>
          )}
        </DiaryGrid>
      </SiteContainer>

      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink href="/blog">Read My Blog →</FooterLink>
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
  );
}
