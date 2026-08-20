import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GradientText, GlassCard, FadeInUp, StaggerContainer } from "../styles/GlobalStyles";
import Footer from '../components/Footer';

const HeroSection = styled.section`
  padding: 60px 0 30px;
  text-align: center;
`

const Title = styled.h1`
  font-size: clamp(38px, 6vw, 60px);
  margin-bottom: 18px;
  font-weight: 900;
  letter-spacing: -0.03em;
`

const Subtitle = styled.p`
  font-size: clamp(16px, 2vw, 19px);
  color: ${theme.textMuted};
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
`

const QuoteCard = styled(GlassCard)`
  max-width: 900px;
  margin: 30px auto 0;
  padding: 20px 24px;
  text-align: center;
  border-radius: ${theme.radii.md};
  font-style: italic;
  color: ${theme.text};
  font-size: 15px;
  border: 1px solid rgba(56, 189, 248, 0.25);
  background: linear-gradient(145deg, rgba(23, 32, 54, 0.5) 0%, rgba(13, 20, 37, 0.4) 100%);

  span.quote-author {
    display: block;
    margin-top: 6px;
    font-size: 12.5px;
    font-style: normal;
    color: ${theme.accent};
    font-weight: 600;
  }

  @media (max-width: 480px) {
    padding: 16px;
    margin-top: 20px;
    font-size: 14px;
  }
`

const DiaryGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-top: 40px;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 10px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0;
    gap: 20px;
  }
`

const DiaryEntryCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: ${theme.radii.lg};
  border: 1px solid ${theme.border};
  background: linear-gradient(150deg, rgba(23, 32, 54, 0.75) 0%, rgba(13, 20, 37, 0.85) 100%);
  transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    transform: translateY(-6px);
    border-color: ${theme.borderGlow};
    box-shadow: ${theme.shadows.lift};
  }

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 24px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 14px;
    border-radius: 14px;
  }
`

const DiaryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 14px;
  margin-bottom: 18px;
  gap: 12px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    align-items: flex-start;
    padding-bottom: 10px;
    margin-bottom: 14px;
  }
`

const DiaryTitle = styled.h2`
  font-size: clamp(20px, 5.2vw, 26px);
  font-weight: 800;
  margin: 0;
  color: #fff;
`

const DiaryMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: ${theme.accent};
  font-weight: 600;
  flex-wrap: wrap;
`

const DiaryBody = styled.p`
  font-size: clamp(14.5px, 3.6vw, 16px);
  color: ${theme.textBody};
  line-height: 1.7;
  margin-bottom: 20px;
`

const ReadMore = styled(Link)`
  font-size: 14px;
  font-weight: 700;
  color: ${theme.accent};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  text-decoration: none;
  padding: 8px 18px;
  border-radius: ${theme.radii.pill};
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.25);
  transition: all 0.25s ease;
  
  svg {
    transition: transform 0.25s ease;
  }
  
  &:hover {
    color: #fff;
    background: ${theme.accentGradient};
    border-color: transparent;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(56, 189, 248, 0.35);

    svg {
      transform: translateX(4px);
    }
  }

  @media (max-width: 480px) {
    width: 100%;
    justify-content: center;
    padding: 10px 16px;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 60px;
  padding: 20px 0;
`

const PageButton = styled.button`
  min-width: 44px;
  height: 44px;
  padding: 0 16px;
  border: 1px solid ${({ $active }) => $active ? theme.accent : theme.border};
  background: ${({ $active }) => $active ? theme.accentGradient : 'rgba(255, 255, 255, 0.03)'};
  color: ${({ $active }) => $active ? '#fff' : theme.text};
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: ${theme.fontBody};

  &:hover:not(:disabled) {
    background: ${theme.accent};
    color: white;
    border-color: ${theme.accent};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }
`

const PageInfo = styled.span`
  color: ${theme.textMuted};
  font-size: 14px;
  padding: 0 8px;
`

export default function MyDiary() {
  const [diaries, setDiaries] = useState([]);
  const [pageMeta, setPageMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(`${API_BASE_URL}/diaries`)
      .then((res) => res.json())
      .then((data) => setDiaries(data))
      .catch((err) => console.error("Error fetching diaries:", err));

    fetch(`${API_BASE_URL}/diaries/meta`)
      .then((res) => res.json())
      .then((data) => setPageMeta(data))
      .catch((err) => console.error("Error fetching diaries meta:", err));
  }, []);

  const totalPages = Math.ceil(diaries.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDiaries = diaries.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <>
      <Helmet>
        <title>{pageMeta.title || 'My Diary - Personal Reflections | Dipendra Yadav'}</title>
        <meta name="description" content={pageMeta.description || "Monthly reflections, technical goals, and personal engineering journal."} />
        <meta name="author" content="Dipendra Yadav" />
        <link rel="canonical" href="https://www.dipendrakumaryadav.com.np/mydiary" />
      </Helmet>

      <FadeInUp>
        <HeroSection>
          <Title>My <GradientText>Diary</GradientText></Title>
          <Subtitle>{pageMeta.description || "Monthly reflections, learning milestones, and personal engineering logs."}</Subtitle>
          <QuoteCard>
            "Continuous learning and honest reflection are the cornerstones of lasting craftsmanship."
            <span className="quote-author">— Engineering Philosophy</span>
          </QuoteCard>
        </HeroSection>
      </FadeInUp>

      <SiteContainer>
        <StaggerContainer>
          <DiaryGrid>
            {currentDiaries.length > 0 ? (
              currentDiaries.map((d) => (
                <DiaryEntryCard key={d.id}>
                  <DiaryHeader>
                    <DiaryTitle>{d.month_label}</DiaryTitle>
                    <DiaryMeta>
                      <span>{d.date}</span>
                      <span>•</span>
                      <span>{d.author}</span>
                    </DiaryMeta>
                  </DiaryHeader>
                  <DiaryBody>{d.summary}</DiaryBody>
                  <ReadMore to={`/mydiary/${d.slug}`}>
                    <span>Read Full Entry</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </ReadMore>
                </DiaryEntryCard>
              ))
            ) : (
              <div style={{ color: theme.textMuted, width: '100%', textAlign: 'center', padding: '60px 20px' }}>
                No diary entries found.
              </div>
            )}
          </DiaryGrid>
        </StaggerContainer>

        {totalPages > 1 && (
          <Pagination>
            <PageButton 
              onClick={handlePrevious} 
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Prev
            </PageButton>

            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <PageInfo key={`ellipsis-${index}`}>...</PageInfo>
              ) : (
                <PageButton
                  key={page}
                  onClick={() => handlePageChange(page)}
                  $active={currentPage === page}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </PageButton>
              )
            ))}

            <PageButton 
              onClick={handleNext} 
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              Next →
            </PageButton>
          </Pagination>
        )}
      </SiteContainer>

      <Footer linkText="Read My Blog →" linkTo="/blog" />
    </>
  );
}
