import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../api";
import { theme, SiteContainer, GlassCard } from "../styles/GlobalStyles";

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

const HeroImageWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 0 auto 40px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${theme.shadows.glass};
  border: 1px solid ${theme.border};
  
  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 500px;
    object-fit: cover;
  }
`;

const ContentCard = styled(GlassCard)`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 24px;
  }
`;

const BlogContent = styled.article`
  line-height: 1.8;
  font-size: 17px;
  color: ${theme.text};
  
  h2, h3, h4 {
    margin-top: 2em;
    margin-bottom: 0.75em;
    color: ${theme.text};
  }
  
  p {
    margin-bottom: 1.5em;
    color: ${theme.textMuted};
  }
  
  a {
    color: ${theme.accent};
    text-decoration: underline;
    text-underline-offset: 4px;
    
    &:hover {
      color: ${theme.accentHover};
    }
  }
  
  ul, ol {
    margin-bottom: 1.5em;
    padding-left: 1.5em;
    color: ${theme.textMuted};
    
    li {
      margin-bottom: 0.5em;
    }
  }
  
  blockquote {
    border-left: 4px solid ${theme.accent};
    padding-left: 20px;
    margin-left: 0;
    margin-right: 0;
    font-style: italic;
    color: ${theme.textMuted};
    background: rgba(255, 255, 255, 0.02);
    padding: 20px;
    border-radius: 0 8px 8px 0;
  }
  
  pre, code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
  }
  
  pre {
    padding: 16px;
    overflow-x: auto;
    border: 1px solid ${theme.border};
  }
  
  code {
    padding: 2px 6px;
    color: ${theme.accentHover};
  }
  
  pre code {
    padding: 0;
    color: inherit;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 32px auto;
    display: block;
    border: 1px solid ${theme.border};
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

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/blogs/${slug}`)
      .then(res => res.json())
      .then(data => {
        setBlog(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <SiteContainer>
        <LoadingContainer>Loading article...</LoadingContainer>
      </SiteContainer>
    );
  }

  if (!blog) {
    return (
      <SiteContainer>
        <LoadingContainer>Article not found.</LoadingContainer>
      </SiteContainer>
    );
  }

  return (
    <>
      <SiteContainer>
        <BackLink to="/blog">Back to all articles</BackLink>

        <ArticleHeader>
          <Title>{blog.title}</Title>
          <Meta>
            <span>{blog.published_at}</span>
            <span>·</span>
            <span>{blog.author}</span>
            <span>·</span>
            <span>{blog.read_time_min} min read</span>
          </Meta>
        </ArticleHeader>

        {blog.hero_image && (
          <HeroImageWrapper>
            <img src={getImageUrl(blog.hero_image)} alt={blog.title} />
          </HeroImageWrapper>
        )}

        <ContentCard>
          <BlogContent dangerouslySetInnerHTML={{ __html: blog.content }} />
        </ContentCard>
      </SiteContainer>

      <Footer>
        <Link to="/blog">Read more articles →</Link>
      </Footer>
    </>
  );
}
