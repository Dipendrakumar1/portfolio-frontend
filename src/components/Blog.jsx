import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GradientText, GlassCard, FadeInUp, StaggerContainer } from "../styles/GlobalStyles";
import Footer from '../components/Footer';

const HeroSection = styled.section`
  padding: 80px 20px 60px;
  text-align: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 60px 16px 40px;
  }
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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 36px;
  margin: 60px auto 0;
  max-width: 1400px;
  width: 100%;
  padding: 0 48px;
  justify-items: center;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 0 20px;
    gap: 24px;
  }

  @media (max-width: 480px) {
    padding: 0 8px;
    gap: 16px;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 60px;
  padding: 20px 0;

  @media (max-width: ${theme.breakpoints.mobile}) {
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

  @media (max-width: ${theme.breakpoints.mobile}) {
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

const BlogCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  padding: 0;
  overflow: hidden;
  text-decoration: none;
`

const BlogImageWrapper = styled.div`
  width: 100%;
  height: 220px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  ${BlogCard}:hover & img {
    transform: scale(1.05);
  }
`

const BlogContent = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const BlogTitle = styled.h3`
  font-size: 22px;
  margin: 0 0 12px 0;
  color: ${theme.text};
  line-height: 1.4;
`

const BlogMeta = styled.div`
  font-size: 14px;
  color: ${theme.textMuted};
  margin-bottom: 16px;
  font-family: ${theme.fontBody};
`

const BlogTeaser = styled.p`
  font-size: 15px;
  color: ${theme.textMuted};
  line-height: 1.6;
  margin-bottom: 24px;
  flex-grow: 1;
`

const ReadMore = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${theme.accent};
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:after {
    content: '→';
    transition: transform 0.3s ease;
  }
  
  ${BlogCard}:hover &:after {
    transform: translateX(4px);
  }
`

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [pageMeta, setPageMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch blogs
    fetch(`${API_BASE_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));

    // Fetch page meta
    fetch(`${API_BASE_URL}/blogs/meta`)
      .then((res) => res.json())
      .then((data) => setPageMeta(data))
      .catch((err) => console.error("Error fetching blogs meta:", err));
  }, []);

  // Pagination logic
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
        <title>{pageMeta.title || 'Tech Musings - Blog'}</title>
        <meta name="description" content={pageMeta.description || "Thoughts on software engineering, web development, and my professional journey."} />
        <meta name="keywords" content="blog, tech musings, software engineering, web development, Dipendra Yadav, programming, technology blog" />
        <meta name="author" content="Dipendra Yadav" />
        <link rel="canonical" href="https://www.dipendrakumaryadav.com.np/blog" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.dipendrakumaryadav.com.np/blog" />
        <meta property="og:title" content={pageMeta.title || 'Tech Musings - Blog'} />
        <meta property="og:description" content={pageMeta.description || "Thoughts on software engineering, web development, and my professional journey."} />
        <meta property="og:image" content="https://www.dipendrakumaryadav.com.np/blog-og.jpg" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.dipendrakumaryadav.com.np/blog" />
        <meta name="twitter:title" content={pageMeta.title || 'Tech Musings - Blog'} />
        <meta name="twitter:description" content={pageMeta.description || "Thoughts on software engineering, web development, and my professional journey."} />
        <meta name="twitter:image" content="https://www.dipendrakumaryadav.com.np/blog-og.jpg" />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "name": "Tech Musings",
            "description": pageMeta.description || "Thoughts on software engineering, web development, and my professional journey.",
            "url": "https://www.dipendrakumaryadav.com.np/blog",
            "author": {
              "@type": "Person",
              "name": "Dipendra Yadav"
            }
          })}
        </script>
      </Helmet>
      <FadeInUp>
        <HeroSection>
          <Title>Tech <GradientText>Musings</GradientText></Title>
          <Subtitle>{pageMeta.description || "Thoughts on software engineering, web development, and my professional journey."}</Subtitle>
        </HeroSection>
      </FadeInUp>

      <SiteContainer>
        <StaggerContainer>
          <BlogGrid>
            {currentBlogs.length > 0 ? (
              currentBlogs.map((b) => (
                <BlogCard as="a" href={`/blog/${b.slug}`} key={b.id}>
                  {b.hero_image && (
                    <BlogImageWrapper>
                      <img src={getImageUrl(b.hero_image)} alt={b.title} loading="lazy" />
                    </BlogImageWrapper>
                  )}
                  <BlogContent>
                    <BlogTitle>{b.title}</BlogTitle>
                    <BlogMeta>
                      {b.published_at} · {b.read_time_min} min read
                    </BlogMeta>
                    <BlogTeaser>
                      {b.subtitle || (b.content ? b.content.replace(/[#*`_\[\]\(\)]/g, '').substring(0, 150) + "..." : "")}
                    </BlogTeaser>
                    <ReadMore>Read Article</ReadMore>
                  </BlogContent>
                </BlogCard>
              ))
            ) : (
              <div style={{ color: theme.textMuted, width: '100%', gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                No blogs found.
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

      <Footer linkText="About Me →" linkTo="/aboutme" />
    </>
  );
}
