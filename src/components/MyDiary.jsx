import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { API_BASE_URL } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GradientText, GlassCard, FadeInUp, StaggerContainer } from "../styles/GlobalStyles";
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
  max-width: 1700px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 48px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 20px;
    gap: 32px;
  }

  @media (max-width: 480px) {
    padding: 0 8px;
    gap: 24px;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 60px;
  padding: 20px 0;

  @media (max-width: 480px) {
    gap: 8px;
    margin-top: 40px;
  }
`

const PageButton = styled.button`
  min-width: 44px;
  height: 44px;
  padding: 0 16px;
  border: 1px solid ${theme.border};
  background: ${theme.bgCard};
  color: ${theme.text};
  border-radius: 8px;
  font-size: 15px;
  font-weight: 500;
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
    opacity: 0.4;
    cursor: not-allowed;
  }

  &.active {
    background: ${theme.accent};
    color: white;
    border-color: ${theme.accent};
  }

  @media (max-width: 480px) {
    min-width: 40px;
    height: 40px;
    padding: 0 12px;
    font-size: 14px;
  }
`

const PageInfo = styled.span`
  color: ${theme.textMuted};
  font-size: 14px;
  padding: 0 12px;
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

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

  // Pagination logic
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

  // Generate page numbers to display
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
        <title>{pageMeta.title || 'My Diary - Personal Reflections'}</title>
        <meta name="description" content={pageMeta.description || "Monthly reflections, goals, and personal notes collected over time."} />
        <meta name="keywords" content="diary, personal reflections, goals, Dipendra Yadav, personal development, monthly journal, life updates" />
        <meta name="author" content="Dipendra Yadav" />
        <link rel="canonical" href="https://www.dipendrakumaryadav.com.np/mydiary" />
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dipendrakumaryadav.com.np/mydiary" />
        <meta property="og:title" content={pageMeta.title || 'My Diary - Personal Reflections'} />
        <meta property="og:description" content={pageMeta.description || "Monthly reflections, goals, and personal notes collected over time."} />
        <meta property="og:image" content="https://www.dipendrakumaryadav.com.np/diary-og.jpg" />
        <meta property="og:locale" content="en_US" />
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.dipendrakumaryadav.com.np/mydiary" />
        <meta name="twitter:title" content={pageMeta.title || 'My Diary - Personal Reflections'} />
        <meta name="twitter:description" content={pageMeta.description || "Monthly reflections, goals, and personal notes collected over time."} />
        <meta name="twitter:image" content="https://www.dipendrakumaryadav.com.np/diary-og.jpg" />
        
        <!-- Additional SEO -->
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </Helmet>
      <FadeInUp>
        <HeroSection>
          <Title>My <GradientText>Diary</GradientText></Title>
          <Subtitle>{pageMeta.description || "Monthly reflections, goals, and personal notes collected over time."}</Subtitle>
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
        </StaggerContainer>

        {totalPages > 1 && (
          <Pagination>
            <PageButton 
              onClick={handlePrevious} 
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              ← Previous
            </PageButton>

            {getPageNumbers().map((page, index) => (
              page === '...' ? (
                <PageInfo key={`ellipsis-${index}`}>...</PageInfo>
              ) : (
                <PageButton
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={currentPage === page ? 'active' : ''}
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
