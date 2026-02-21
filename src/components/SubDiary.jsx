import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../api";
import { theme, SiteContainer, GlassCard, GradientText } from "../styles/GlobalStyles";

const ArticleHeader = styled.header`
  margin-bottom: 40px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: clamp(32px, 5vw, 48px);
  margin-bottom: 16px;
  color: ${theme.text};
  line-height: 1.2;
`;

const Meta = styled.div`
  font-size: 15px;
  color: ${theme.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
  
  span {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const Summary = styled.p`
  font-size: 18px;
  color: ${theme.textMuted};
  max-width: 600px;
  margin: 24px auto 0;
  line-height: 1.6;
`;

const ContentCard = styled(GlassCard)`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 24px;
  }
`;

const TOCWrap = styled.div`
  margin-bottom: 60px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 12px;
  padding: 24px;
  border: 1px solid ${theme.border};
`;

const TOCHeading = styled.h3`
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 16px;
  color: ${theme.text};
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 12px;
`;

const TOCLink = styled.a`
  display: block;
  color: ${theme.accent};
  text-decoration: none;
  margin-bottom: 10px;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.accentHover};
    transform: translateX(4px);
  }
`;

const SectionBlock = styled.section`
  margin-bottom: 60px;
  scroll-margin-top: 100px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  color: ${theme.text};
  margin-bottom: 24px;
`;

const BulletList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    margin-bottom: 16px;
    padding-left: 24px;
    position: relative;
    color: ${theme.textMuted};
    line-height: 1.6;
    
    &:before {
      content: '•';
      color: ${theme.accent};
      position: absolute;
      left: 0;
      top: 0;
      font-size: 18px;
    }
  }
`;

const LoadingContainer = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.textMuted};
  font-size: 18px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${theme.textMuted};
  margin-bottom: 32px;
  font-weight: 500;
  
  &:before {
    content: '←';
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: ${theme.accent};
    
    &:before {
      transform: translateX(-4px);
    }
  }
`;

const Footer = styled.footer`
  margin-top: 100px;
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid ${theme.border};

  a {
    color: ${theme.textMuted};
    text-decoration: none;
    font-weight: 500;
    
    &:hover {
      color: ${theme.accent};
    }
  }
`;

export default function SubDiary() {
  const { slug } = useParams();
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/diaries/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Diary not found");
        return res.json();
      })
      .then((data) => {
        setDiary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching diary:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <SiteContainer>
        <LoadingContainer>Loading entry...</LoadingContainer>
      </SiteContainer>
    );
  }

  if (!diary) {
    return (
      <SiteContainer>
        <LoadingContainer>Diary entry not found.</LoadingContainer>
      </SiteContainer>
    );
  }

  return (
    <>
      <SiteContainer>
        <BackLink to="/mydiary">Back to all entries</BackLink>

        <ArticleHeader>
          <Title>{diary.month_label}</Title>
          <Meta>
            <span>{diary.date}</span>
            <span>·</span>
            <span>{diary.author}</span>
            <span>·</span>
            <span>{diary.word_count} words</span>
          </Meta>
          <Summary>{diary.summary}</Summary>
        </ArticleHeader>

        <ContentCard>
          {/* TABLE OF CONTENTS */}
          {diary.sections && diary.sections.length > 0 && (
            <TOCWrap>
              <TOCHeading>Contents</TOCHeading>
              {diary.sections.map((s, idx) => (
                <TOCLink key={idx} href={`#section-${idx}`}>
                  {s.title}
                </TOCLink>
              ))}
            </TOCWrap>
          )}

          {/* SECTIONS */}
          {diary.sections &&
            diary.sections.map((s, idx) => (
              <SectionBlock id={`section-${idx}`} key={idx}>
                <SectionTitle>{s.title}</SectionTitle>
                {s.bullets && (
                  <BulletList>
                    {s.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b.text}</li>
                    ))}
                  </BulletList>
                )}
              </SectionBlock>
            ))}
        </ContentCard>
      </SiteContainer>

      <Footer>
        <Link to="/mydiary">Read more entries →</Link>
      </Footer>
    </>
  );
}
