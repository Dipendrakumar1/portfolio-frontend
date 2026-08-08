import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { API_BASE_URL } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GradientText, GlassCard } from "../styles/GlobalStyles";
import Footer from '../components/Footer';

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

export default function MyDiary() {
  const [diaries, setDiaries] = useState([]);
  const [pageMeta, setPageMeta] = useState({});

  useEffect(() => {
    // Fetch diaries
    fetch(`${API_BASE_URL}/diaries`)
      .then((res) => res.json())
      .then((data) => setDiaries(data))
      .catch((err) => console.error("Error fetching diaries:", err));

    // Fetch page meta
    fetch(`${API_BASE_URL}/diaries/meta`)
      .then((res) => res.json())
      .then((data) => setPageMeta(data))
      .catch((err) => console.error("Error fetching diaries meta:", err));
  }, []);

  return (
    <>
      <Helmet>
        <title>{pageMeta.title || 'My Diary - Personal Reflections'}</title>
        <meta name="description" content={pageMeta.description || "Monthly reflections, goals, and personal notes collected over time."} />
        <meta name="keywords" content="diary, personal, reflections, goals, Dipendra Yadav" />
        <meta property="og:title" content={pageMeta.title || 'My Diary - Personal Reflections'} />
        <meta property="og:description" content={pageMeta.description || "Monthly reflections, goals, and personal notes collected over time."} />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroSection>
        <Title>My <GradientText>Diary</GradientText></Title>
        <Subtitle>{pageMeta.description || "Monthly reflections, goals, and personal notes collected over time."}</Subtitle>
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

      <Footer linkText="Read My Blog →" linkTo="/blog" />
    </>
  );
}
