import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../api";
import { theme, SiteContainer, GlassCard } from "../styles/GlobalStyles";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MarkdownContent from "./MarkdownContent";
import Footer from '../components/Footer';

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: ${theme.accentGradient};
  z-index: 9999;
  transition: width 0.1s ease;
  box-shadow: 0 0 10px ${theme.accent};
`

const ArticleHeader = styled.header`
  margin-bottom: 32px;
  text-align: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: clamp(24px, 6vw, 48px);
  margin-bottom: 16px;
  color: #fff;
  line-height: 1.25;
  font-weight: 800;
  letter-spacing: -0.02em;
`;

const Meta = styled.div`
  font-size: 14px;
  color: ${theme.textMuted};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  
  span.badge {
    padding: 4px 12px;
    border-radius: ${theme.radii.pill};
    background: rgba(56, 189, 248, 0.1);
    color: ${theme.accent};
    border: 1px solid rgba(56, 189, 248, 0.25);
    font-weight: 600;
    font-size: 12.5px;
  }
`;

const Summary = styled.div`
  font-size: clamp(14.5px, 3.8vw, 16.5px);
  color: ${theme.text};
  max-width: 700px;
  margin: 20px auto 0;
  line-height: 1.7;
  padding: 16px 20px;
  border-radius: ${theme.radii.md};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.border};
`;

const ContentCard = styled(GlassCard)`
  max-width: 1100px;
  margin: 0 auto;
  padding: 50px 60px;
  background: linear-gradient(150deg, rgba(20, 29, 49, 0.85) 0%, rgba(11, 17, 33, 0.95) 100%);
  border: 1px solid ${theme.border};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 28px 18px;
  }

  @media (max-width: 480px) {
    padding: 20px 14px;
    border-radius: 14px;
  }
`;

const TOCWrap = styled.div`
  margin-bottom: 50px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: ${theme.radii.md};
  padding: 28px 32px;
  border: 1px solid ${theme.border};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 20px;
  }
`;

const TOCHeading = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 16px;
  color: #fff;
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 12px;
`;

const TOCLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.accent};
  font-size: 14.5px;
  font-weight: 500;
  text-decoration: none;
  margin-bottom: 10px;
  transition: all 0.2s ease;
  
  &:hover {
    color: ${theme.accentHover};
    transform: translateX(4px);
  }

  &::before {
    content: '→';
    font-weight: bold;
  }
`;

const SectionBlock = styled.section`
  margin-bottom: 44px;
  scroll-margin-top: 100px;
  
  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 480px) {
    margin-bottom: 32px;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(20px, 5.2vw, 24px);
  font-weight: 800;
  color: #fff;
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    width: 4px;
    height: 20px;
    background: ${theme.accentGradient};
    border-radius: 2px;
  }
`;

const BulletList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;

  li {
    padding-left: 20px;
    position: relative;
    color: ${theme.textBody};
    line-height: 1.7;
    font-size: clamp(14.5px, 3.6vw, 16px);
    
    &:before {
      content: '▹';
      color: ${theme.accent};
      position: absolute;
      left: 0;
      top: 0;
      font-size: 15px;
      font-weight: bold;
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
  margin-bottom: 36px;
  font-weight: 600;
  font-size: 14.5px;
  padding: 8px 18px;
  border-radius: ${theme.radii.pill};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.border};
  transition: all 0.25s ease;
  
  svg {
    transition: transform 0.2s ease;
  }
  
  &:hover {
    color: #fff;
    background: rgba(56, 189, 248, 0.12);
    border-color: ${theme.accent};
    
    svg {
      transform: translateX(-4px);
    }
  }
`;

export default function SubDiary() {
  const { slug } = useParams();
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <SiteContainer>
        <LoadingContainer>Loading journal entry...</LoadingContainer>
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
      <ProgressBar style={{ width: `${scrollProgress}%` }} />

      <Helmet>
        <title>{diary.month_label} - My Diary | Dipendra Yadav</title>
        <meta name="description" content={diary.summary?.replace(/\*|#|`|_|\[|\]|\(|\)/g, '').substring(0, 160) || "Personal diary entry"} />
        <meta name="author" content={diary.author || "Dipendra Yadav"} />
        <link rel="canonical" href={`https://www.dipendrakumaryadav.com.np/mydiary/${diary.slug}`} />
      </Helmet>

      <SiteContainer>
        <BackLink to="/mydiary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to all diary entries
        </BackLink>

        <ArticleHeader>
          <Title>{diary.month_label}</Title>
          <Meta>
            <span className="badge">{diary.date}</span>
            <span>By <strong>{diary.author}</strong></span>
            {diary.word_count > 0 && (
              <>
                <span>•</span>
                <span>{diary.word_count} words</span>
              </>
            )}
          </Meta>
          {diary.summary && (
            <Summary>
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>{diary.summary}</ReactMarkdown>
            </Summary>
          )}
        </ArticleHeader>

        <ContentCard>
          {diary.sections && diary.sections.length > 0 && (
            <TOCWrap>
              <TOCHeading>Sections in this Entry</TOCHeading>
              {diary.sections.map((s, idx) => (
                <TOCLink key={idx} href={`#section-${idx}`}>
                  {s.title}
                </TOCLink>
              ))}
            </TOCWrap>
          )}

          {diary.sections &&
            diary.sections.map((s, idx) => (
              <SectionBlock id={`section-${idx}`} key={idx}>
                <SectionTitle>{s.title}</SectionTitle>
                {s.bullets && (
                  <BulletList>
                    {s.bullets.map((b, bIdx) => (
                      <li key={bIdx}>
                        <MarkdownContent>
                          <ReactMarkdown rehypePlugins={[rehypeRaw]}>{b.text}</ReactMarkdown>
                        </MarkdownContent>
                      </li>
                    ))}
                  </BulletList>
                )}
              </SectionBlock>
            ))}
        </ContentCard>
      </SiteContainer>

      <Footer linkText="Back to all entries →" linkTo="/mydiary" />
    </>
  );
}
