import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { API_BASE_URL, getImageUrl } from "../api";
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

const BannerFrame = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${theme.shadows.glass};
  max-width: 900px;
  margin: 40px auto;
  border: 1px solid ${theme.border};
  
  img {
    width: 100%;
    height: auto;
    display: block;
    object-fit: cover;
    max-height: 400px;
  }
`

const TOCContainer = styled(GlassCard)`
  margin: 40px auto;
  max-width: 800px;
`

const TOCHeading = styled.h3`
  font-size: 24px;
  margin-bottom: 20px;
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 12px;
`

const TOCList = styled.ul`
  list-style: none;
  padding: 0;

  li {
    margin-bottom: 12px;
  }
  
  ul {
    list-style: none;
    padding-left: 24px;
    margin-top: 8px;
    border-left: 1px solid ${theme.border};
  }
`

const TOCLink = styled.a`
  color: ${theme.text};
  font-weight: 500;
  
  &:hover {
    color: ${theme.accent};
    padding-left: 4px;
  }
`

const TOCSubLink = styled.a`
  color: ${theme.textMuted};
  font-size: 14px;
  
  &:hover {
    color: ${theme.accentHover};
  }
`

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  margin-top: 80px;
`

const ProjectSection = styled.article`
  scroll-margin-top: 100px; // for smooth scrolling offset
`

const ProjectHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 16px;
  margin-bottom: 24px;
`

const ProjectTitle = styled.h2`
  font-size: 32px;
  margin: 0;
`

const BackToTop = styled.a`
  font-size: 14px;
  color: ${theme.textMuted};
  
  &:hover {
    color: ${theme.accent};
  }
`

const ProjectImage = styled.div`
  border-radius: 12px;
  overflow: hidden;
  margin: 32px auto;
  border: 1px solid ${theme.border};
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  max-width: 800px;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 450px;
    object-fit: contain;
    background: rgba(0,0,0,0.2);
  }
`

const LinkGrid = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 24px;
  flex-wrap: wrap;
`

const ProjectLink = styled.a`
  padding: 10px 20px;
  background: rgba(255,255,255,0.05);
  border: 1px solid ${theme.border};
  border-radius: 8px;
  color: ${theme.text};
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(56, 189, 248, 0.1);
    border-color: ${theme.accent};
    color: ${theme.accent};
    transform: translateY(-2px);
  }
`

const ShortDesc = styled.p`
  font-size: 18px;
  color: ${theme.textMuted};
  line-height: 1.7;
  margin-bottom: 24px;
`

const ProjectContent = styled.div`
  line-height: 1.8;
  font-size: 16px;
  color: ${theme.text};
  margin-top: 24px;

  h2, h3, h4 {
    margin-top: 1.8em;
    margin-bottom: 0.6em;
    color: ${theme.text};
  }

  h2 { font-size: 22px; }
  h3 { font-size: 18px; color: ${theme.accentHover}; }

  p {
    margin-bottom: 1.2em;
    color: ${theme.textMuted};
  }

  a {
    color: ${theme.accent};
    text-decoration: underline;
    text-underline-offset: 4px;
    &:hover { color: ${theme.accentHover}; }
  }

  ul, ol {
    margin-bottom: 1.2em;
    padding-left: 1.5em;
    color: ${theme.textMuted};
    li { margin-bottom: 0.5em; }
  }

  strong { color: ${theme.text}; }

  blockquote {
    border-left: 4px solid ${theme.accent};
    margin: 1.5em 0;
    padding: 16px 20px;
    background: rgba(56, 189, 248, 0.05);
    border-radius: 0 8px 8px 0;
    color: ${theme.textMuted};
    font-style: italic;
  }

  pre, code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 4px;
  }

  pre {
    padding: 16px;
    overflow-x: auto;
    border: 1px solid ${theme.border};
    margin: 1.5em 0;
  }

  code {
    padding: 2px 6px;
    color: ${theme.accentHover};
    font-size: 14px;
  }

  pre code {
    padding: 0;
    color: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 24px auto;
    display: block;
    border: 1px solid ${theme.border};
  }
`

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [pageMeta, setPageMeta] = useState({});

  useEffect(() => {
    // Fetch projects
    fetch(`${API_BASE_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));

    // Fetch page meta
    fetch(`${API_BASE_URL}/projects/meta`)
      .then((res) => res.json())
      .then((data) => setPageMeta(data))
      .catch((err) => console.error("Error fetching projects meta:", err));
  }, []);

  return (
    <>
      <Helmet>
        <title>{pageMeta.title || 'My Projects - Portfolio'}</title>
        <meta name="description" content={pageMeta.description || "A showcase of my recent work, side projects, and open-source contributions."} />
        <meta name="keywords" content="projects, portfolio, open source, web development, Dipendra Yadav" />
        <meta property="og:title" content={pageMeta.title || 'My Projects - Portfolio'} />
        <meta property="og:description" content={pageMeta.description || "A showcase of my recent work, side projects, and open-source contributions."} />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroSection>
        <Title>My <GradientText>Projects</GradientText></Title>
        <Subtitle>{pageMeta.description || "A showcase of my recent work, side projects, and open-source contributions."}</Subtitle>

        {pageMeta.hero_image && (
          <BannerFrame>
            <img src={getImageUrl(pageMeta.hero_image)} alt="Projects banner" />
          </BannerFrame>
        )}
      </HeroSection>

      <SiteContainer>
        <TOCContainer id="top">
          <TOCHeading>Table of Contents</TOCHeading>
          <TOCList>
            {projects.map((p) => (
              <li key={p.id}>
                <TOCLink href={`#${p.slug}`}>{p.title}</TOCLink>
                <ul>
                  <li><TOCSubLink href={`#${p.slug}`}>Description</TOCSubLink></li>
                </ul>
              </li>
            ))}
          </TOCList>
        </TOCContainer>

        <ProjectsList>
          {projects.map((p) => (
            <ProjectSection id={p.slug} key={p.id}>
              <ProjectHeader>
                <ProjectTitle>{p.title}</ProjectTitle>
                <BackToTop href="#top">↑ Back to top</BackToTop>
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
                {p.repo_url && <ProjectLink href={p.repo_url} target="_blank">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                  GitHub Repository
                </ProjectLink>}
                {p.live_url && <ProjectLink href={p.live_url} target="_blank">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  Live Demo
                </ProjectLink>}
              </LinkGrid>
            </ProjectSection>
          ))}
        </ProjectsList>
      </SiteContainer>

      <Footer linkText="Read My Blog →" linkTo="/blog" />
    </>
  );
}
