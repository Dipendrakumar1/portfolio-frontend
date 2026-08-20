import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GradientText, GlassCard, FadeInUp, StaggerContainer } from "../styles/GlobalStyles";
import Footer from '../components/Footer';

const HeroSection = styled.section`
  padding: 50px 16px 24px;
  text-align: center;

  @media (max-width: 480px) {
    padding: 30px 8px 16px;
  }
`

const Title = styled.h1`
  font-size: clamp(32px, 7.5vw, 56px);
  margin-bottom: 14px;
  font-weight: 900;
  letter-spacing: -0.03em;
`

const Subtitle = styled.p`
  font-size: clamp(15px, 3.8vw, 18.5px);
  color: ${theme.textMuted};
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
`

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 28px;
  margin: 40px auto 0;
  max-width: 1400px;
  width: 100%;
  padding: 0 10px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    padding: 0;
    gap: 20px;
  }
`

const BlogCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  text-decoration: none;
  border-radius: ${theme.radii.lg};
  border: 1px solid ${theme.border};
  background: linear-gradient(160deg, rgba(23, 32, 54, 0.75) 0%, rgba(13, 20, 37, 0.85) 100%);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-8px);
    border-color: ${theme.borderGlow};
    box-shadow: ${theme.shadows.lift}, 0 0 25px rgba(56, 189, 248, 0.2);
  }

  @media (max-width: 480px) {
    border-radius: 14px;
  }
`

const BlogImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  position: relative;
  background: #080d1a;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }
  
  ${BlogCard}:hover & img {
    transform: scale(1.08);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 50%, rgba(10, 15, 29, 0.8) 100%);
  }

  @media (max-width: 480px) {
    height: 190px;
  }
`

const BlogContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 480px) {
    padding: 18px 16px;
  }
`

const BlogTitle = styled.h3`
  font-size: clamp(18px, 5vw, 22px);
  font-weight: 700;
  margin: 0 0 10px 0;
  color: ${theme.text};
  line-height: 1.4;
  transition: color 0.25s ease;

  ${BlogCard}:hover & {
    color: ${theme.accent};
  }
`

const BlogMeta = styled.div`
  font-size: 13px;
  color: ${theme.accentHover};
  font-weight: 500;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
`

const BlogTeaser = styled.p`
  font-size: 15px;
  color: ${theme.textMuted};
  line-height: 1.7;
  margin-bottom: 24px;
  flex-grow: 1;
`

const ReadMore = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${theme.accent};
  display: flex;
  align-items: center;
  gap: 8px;
  
  svg {
    width: 16px;
    height: 16px;
    transition: transform 0.3s ease;
  }
  
  ${BlogCard}:hover & svg {
    transform: translateX(5px);
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

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [pageMeta, setPageMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));

    fetch(`${API_BASE_URL}/blogs/meta`)
      .then((res) => res.json())
      .then((data) => setPageMeta(data))
      .catch((err) => console.error("Error fetching blogs meta:", err));
  }, []);

  const totalPages = Math.ceil(blogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentBlogs = blogs.slice(startIndex, endIndex);

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
        <title>{pageMeta.title || 'Tech Musings & Engineering Blog | Dipendra Yadav'}</title>
        <meta name="description" content={pageMeta.description || "Thoughts on software engineering, web architectures, and full stack systems."} />
        <meta name="keywords" content="blog, tech musings, software engineering, web development, Dipendra Yadav, programming" />
        <meta name="author" content="Dipendra Yadav" />
        <link rel="canonical" href="https://www.dipendrakumaryadav.com.np/blog" />
      </Helmet>

      <FadeInUp>
        <HeroSection>
          <Title>Tech <GradientText>Musings</GradientText></Title>
          <Subtitle>{pageMeta.description || "Articles on modern web architecture, Python engineering, and software craft."}</Subtitle>
        </HeroSection>
      </FadeInUp>

      <SiteContainer>
        <StaggerContainer>
          <BlogGrid>
            {currentBlogs.length > 0 ? (
              currentBlogs.map((b) => (
                <BlogCard as={Link} to={`/blog/${b.slug}`} key={b.id}>
                  {b.hero_image && (
                    <BlogImageWrapper>
                      <img src={getImageUrl(b.hero_image)} alt={b.title} loading="lazy" />
                    </BlogImageWrapper>
                  )}
                  <BlogContent>
                    <BlogMeta>
                      <span>{b.published_at}</span>
                      <span>•</span>
                      <span>{b.read_time_min} min read</span>
                    </BlogMeta>
                    <BlogTitle>{b.title}</BlogTitle>
                    <BlogTeaser>
                      {b.subtitle || (b.content ? b.content.replace(/\*|#|`|_|\[|\]|\(|\)/g, '').substring(0, 140) + "..." : "")}
                    </BlogTeaser>
                    <ReadMore>
                      <span>Read Article</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </ReadMore>
                  </BlogContent>
                </BlogCard>
              ))
            ) : (
              <div style={{ color: theme.textMuted, width: '100%', gridColumn: '1 / -1', textAlign: 'center', padding: '60px 20px' }}>
                No articles published yet.
              </div>
            )}
          </BlogGrid>
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

      <Footer linkText="About Me →" linkTo="/aboutme" />
    </>
  );
}
