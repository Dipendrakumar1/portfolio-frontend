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

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 60px;
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
  height: 200px;
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

  return (
    <>
      <Helmet>
        <title>{pageMeta.title || 'Tech Musings - Blog'}</title>
        <meta name="description" content={pageMeta.description || "Thoughts on software engineering, web development, and my professional journey."} />
        <meta name="keywords" content="blog, tech musings, software engineering, web development, Dipendra Yadav" />
        <meta property="og:title" content={pageMeta.title || 'Tech Musings - Blog'} />
        <meta property="og:description" content={pageMeta.description || "Thoughts on software engineering, web development, and my professional journey."} />
        <meta property="og:type" content="website" />
      </Helmet>
      <HeroSection>
        <Title>Tech <GradientText>Musings</GradientText></Title>
        <Subtitle>{pageMeta.description || "Thoughts on software engineering, web development, and my professional journey."}</Subtitle>
      </HeroSection>

      <SiteContainer>
        <BlogGrid>
          {blogs.length > 0 ? (
            blogs.map((b) => (
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
      </SiteContainer>

      <Footer linkText="About Me →" linkTo="/aboutme" />
    </>
  );
}
