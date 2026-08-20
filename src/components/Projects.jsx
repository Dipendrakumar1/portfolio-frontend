import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GradientText, GlassCard, FadeInUp, StaggerContainer } from "../styles/GlobalStyles";
import Footer from '../components/Footer';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const HeroSection = styled.section`
  padding: 50px 0 24px;
  text-align: center;
  position: relative;

  @media (max-width: 480px) {
    padding: 30px 0 16px;
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

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 28px;

  @media (max-width: 480px) {
    gap: 8px;
    margin-top: 20px;
  }
`

const FilterButton = styled.button`
  padding: 9px 20px;
  border-radius: ${theme.radii.pill};
  border: 1px solid ${({ $active }) => $active ? theme.accent : 'rgba(56, 189, 248, 0.18)'};
  background: ${({ $active }) => $active ? theme.accentGradient : 'rgba(255, 255, 255, 0.03)'};
  color: ${({ $active }) => $active ? '#fff' : theme.textMuted};
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  font-family: ${theme.fontBody};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${({ $active }) => $active ? '0 6px 20px rgba(56, 189, 248, 0.35)' : 'none'};

  &:hover {
    border-color: ${theme.accent};
    color: #fff;
    transform: translateY(-2px);
  }

  @media (max-width: 480px) {
    padding: 7px 14px;
    font-size: 13px;
  }
`

const FilterCount = styled.span`
  margin-left: 6px;
  font-size: 11px;
  font-weight: 700;
  padding: 2px 6px;
  border-radius: ${theme.radii.pill};
  background: rgba(0, 0, 0, 0.25);
`

const BannerFrame = styled.div`
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lift};
  max-width: 1300px;
  margin: 36px auto 20px;
  border: 1px solid ${theme.border};
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    max-height: 440px;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
    margin: 24px auto 16px;
    img {
      max-height: 200px;
    }
  }
`

const TOCContainer = styled(GlassCard)`
  margin: 30px auto;
  max-width: 1200px;
  padding: 28px 36px;
  border: 1px solid ${theme.border};
  background: linear-gradient(145deg, rgba(23, 32, 54, 0.6) 0%, rgba(13, 20, 37, 0.5) 100%);

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 20px 16px;
    margin: 20px auto;
  }
`

const TOCHeading = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 14px;
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${theme.text};

  svg {
    color: ${theme.accent};
  }

  @media (max-width: 480px) {
    font-size: 16px;
  }
`

const TOCGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`

const TOCLink = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${theme.textMuted};
  font-weight: 500;
  font-size: 14.5px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid transparent;
  transition: all 0.2s ease;
  
  &:hover {
    color: #fff;
    background: rgba(56, 189, 248, 0.1);
    border-color: rgba(56, 189, 248, 0.3);
    transform: translateX(4px);
  }

  &::before {
    content: '→';
    color: ${theme.accent};
    font-weight: bold;
  }
`

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  margin-top: 60px;
`

const ProjectSection = styled.article`
  scroll-margin-top: 100px;
`

const ProjectCard = styled(GlassCard)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px;
  background: linear-gradient(150deg, rgba(20, 29, 49, 0.8) 0%, rgba(11, 17, 33, 0.9) 100%);
  border: 1px solid ${theme.border};
  border-radius: ${theme.radii.lg};

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 24px 18px;
  }

  @media (max-width: 480px) {
    padding: 20px 14px;
    border-radius: 14px;
  }
`

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 18px;
  margin-bottom: 24px;
  gap: 16px;

  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 12px;
    padding-bottom: 14px;
    margin-bottom: 18px;
  }
`

const ProjectTitle = styled.h2`
  font-size: clamp(22px, 5.5vw, 34px);
  font-weight: 800;
  margin: 0 0 8px 0;
  color: #fff;
`

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 4px 14px;
  border-radius: ${theme.radii.pill};
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: ${({ $category }) => $category === 'Real Client' ? 'rgba(52, 211, 153, 0.12)' : 'rgba(56, 189, 248, 0.12)'};
  border: 1px solid ${({ $category }) => $category === 'Real Client' ? theme.success : theme.accent};
  color: ${({ $category }) => $category === 'Real Client' ? theme.success : theme.accent};
`

const BackToTop = styled.a`
  font-size: 13px;
  font-weight: 600;
  color: ${theme.textMuted};
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: ${theme.radii.pill};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.border};
  
  &:hover {
    color: ${theme.accent};
    border-color: ${theme.accent};
  }
`

const ProjectImage = styled.div`
  border-radius: 14px;
  overflow: hidden;
  margin: 20px 0 28px;
  border: 1px solid ${theme.border};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  background: #080d1a;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 480px;
    object-fit: cover;
    transition: transform 0.6s ease;
  }

  &:hover img {
    transform: scale(1.02);
  }

  @media (max-width: 480px) {
    border-radius: 10px;
    margin: 16px 0 20px;
    img {
      max-height: 220px;
    }
  }
`

const ShortDesc = styled.p`
  font-size: clamp(15px, 3.8vw, 17px);
  color: ${theme.text};
  line-height: 1.75;
  margin-bottom: 20px;
`

const ProjectContent = styled.div`
  line-height: 1.8;
  font-size: clamp(14.5px, 3.6vw, 16px);
  color: ${theme.textBody};
  margin-top: 20px;

  h2, h3, h4 {
    margin-top: 1.6em;
    margin-bottom: 0.6em;
    color: ${theme.text};
  }

  h2 { font-size: clamp(18px, 4.5vw, 22px); }
  h3 { font-size: clamp(16px, 4vw, 18px); color: ${theme.accentHover}; }

  p {
    margin-bottom: 1.2em;
  }

  a {
    color: ${theme.accent};
    text-decoration: underline;
    text-underline-offset: 4px;
    &:hover { color: ${theme.accentHover}; }
  }

  ul, ol {
    margin-bottom: 1.2em;
    padding-left: 1.4em;
    li { margin-bottom: 0.5em; }
  }

  strong { color: #fff; }

  blockquote {
    border-left: 4px solid ${theme.accent};
    margin: 1.4em 0;
    padding: 14px 18px;
    background: rgba(56, 189, 248, 0.06);
    border-radius: 0 8px 8px 0;
    color: ${theme.text};
    font-style: italic;
  }

  pre, code {
    font-family: ${theme.fontMono};
    background: rgba(0, 0, 0, 0.45);
    border-radius: 6px;
  }

  pre {
    padding: 14px;
    overflow-x: auto;
    border: 1px solid ${theme.border};
    margin: 1.4em 0;
    -webkit-overflow-scrolling: touch;
  }

  code {
    padding: 2px 6px;
    color: ${theme.accentHover};
    font-size: 13px;
  }

  pre code {
    padding: 0;
    color: inherit;
  }
`

const LinkGrid = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 28px;
  flex-wrap: wrap;
  border-top: 1px solid ${theme.border};
  padding-top: 20px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`

const ProjectLink = styled.a`
  padding: 12px 22px;
  background: ${({ $primary }) => $primary ? theme.accentGradient : 'rgba(255, 255, 255, 0.04)'};
  border: 1px solid ${({ $primary }) => $primary ? 'transparent' : theme.border};
  border-radius: ${theme.radii.pill};
  color: #fff !important;
  font-weight: 600;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: ${({ $primary }) => $primary ? '0 4px 20px rgba(56, 189, 248, 0.3)' : 'none'};
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  
  &:hover {
    background: ${({ $primary }) => $primary ? theme.accentGradient : 'rgba(56, 189, 248, 0.15)'};
    border-color: ${theme.accent};
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(56, 189, 248, 0.35);
  }

  svg {
    width: 17px;
    height: 17px;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 12px 18px;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 80px;
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

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [pageMeta, setPageMeta] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const itemsPerPage = 4;
  const categories = ["All", "Real Client", "Personal"];

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));

    fetch(`${API_BASE_URL}/projects/meta`)
      .then((res) => res.json())
      .then((data) => setPageMeta(data))
      .catch((err) => console.error("Error fetching projects meta:", err));
  }, []);

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter((p) => (p.category || "Personal") === activeFilter);

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  const handleFilterChange = (category) => {
    setActiveFilter(category);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
        <title>{pageMeta.title || 'My Projects - Portfolio | Dipendra Yadav'}</title>
        <meta name="description" content={pageMeta.description || "A showcase of my recent work, client solutions, and open-source contributions."} />
        <meta name="keywords" content="projects, portfolio, open source, web development, Dipendra Yadav, React projects, Full stack projects" />
        <meta name="author" content="Dipendra Yadav" />
        <link rel="canonical" href="https://www.dipendrakumaryadav.com.np/projects" />
      </Helmet>

      <HeroSection id="top">
        <Title>My <GradientText>Projects</GradientText></Title>
        <Subtitle>{pageMeta.description || "A showcase of scalable web applications, client solutions, and open-source software."}</Subtitle>

        {pageMeta.hero_image && (
          <BannerFrame>
            <img src={getImageUrl(pageMeta.hero_image)} alt="Projects banner" />
          </BannerFrame>
        )}

        <FilterBar role="tablist" aria-label="Filter projects">
          {categories.map((cat) => {
            const count = cat === "All"
              ? projects.length
              : projects.filter((p) => (p.category || "Personal") === cat).length;
            return (
              <FilterButton
                key={cat}
                $active={activeFilter === cat}
                onClick={() => handleFilterChange(cat)}
                role="tab"
                aria-selected={activeFilter === cat}
              >
                {cat}
                <FilterCount>{count}</FilterCount>
              </FilterButton>
            );
          })}
        </FilterBar>
      </HeroSection>

      <SiteContainer>
        {filteredProjects.length > 0 && (
          <FadeInUp>
            <TOCContainer>
              <TOCHeading>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="8" y1="6" x2="21" y2="6"></line>
                  <line x1="8" y1="12" x2="21" y2="12"></line>
                  <line x1="8" y1="18" x2="21" y2="18"></line>
                  <line x1="3" y1="6" x2="3.01" y2="6"></line>
                  <line x1="3" y1="12" x2="3.01" y2="12"></line>
                  <line x1="3" y1="18" x2="3.01" y2="18"></line>
                </svg>
                Table of Contents (Jump to Project)
              </TOCHeading>
              <TOCGrid>
                {filteredProjects.map((p) => (
                  <TOCLink key={p.id} href={`#${p.slug}`}>
                    {p.title}
                  </TOCLink>
                ))}
              </TOCGrid>
            </TOCContainer>
          </FadeInUp>
        )}

        <StaggerContainer>
          <ProjectsList>
            {currentProjects.length > 0 ? currentProjects.map((p) => (
              <ProjectSection id={p.slug} key={p.id}>
                <ProjectCard>
                  <ProjectHeader>
                    <div>
                      <ProjectTitle>{p.title}</ProjectTitle>
                      {p.category && <CategoryBadge $category={p.category}>{p.category}</CategoryBadge>}
                    </div>
                    <BackToTop href="#top">↑ Top</BackToTop>
                  </ProjectHeader>

                  {p.hero_image && (
                    <ProjectImage>
                      <img src={getImageUrl(p.hero_image)} alt={p.title} />
                    </ProjectImage>
                  )}

                  <ShortDesc>{p.short_description}</ShortDesc>

                  {p.long_description && (
                    <ProjectContent>
                      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{p.long_description}</ReactMarkdown>
                    </ProjectContent>
                  )}

                  <LinkGrid>
                    {p.live_url && (
                      <ProjectLink href={p.live_url} target="_blank" rel="noopener noreferrer" $primary>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                          <polyline points="15 3 21 3 21 9"></polyline>
                          <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        Live Demo
                      </ProjectLink>
                    )}
                    {p.repo_url && (
                      <ProjectLink href={p.repo_url} target="_blank" rel="noopener noreferrer">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        Source Code
                      </ProjectLink>
                    )}
                  </LinkGrid>
                </ProjectCard>
              </ProjectSection>
            )) : (
              <div style={{ color: theme.textMuted, width: '100%', textAlign: 'center', padding: '60px 20px' }}>
                No {activeFilter === "All" ? "" : activeFilter + " "}projects found.
              </div>
            )}
          </ProjectsList>
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
