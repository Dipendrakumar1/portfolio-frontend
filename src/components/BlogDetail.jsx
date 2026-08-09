import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GradientText, GlassCard } from "../styles/GlobalStyles";

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
  max-width: 1500px;
  margin: 0 auto 40px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${theme.shadows.glass};
  border: 1px solid ${theme.border};
  
  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 590px;
    object-fit: cover;
  }
`;

const ContentCard = styled(GlassCard)`
  max-width: 1700px;
  margin: 0 auto;
  padding: 56px 48px;

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 32px 20px;
  }

  @media (max-width: 480px) {
    padding: 20px 12px;
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

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MarkdownContent from "./MarkdownContent";
import Footer from '../components/Footer';

const LikeSection = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
  border-top: 1px solid ${theme.border};
`;

const LikeButton = styled.button`
  background: ${props => props.$liked ? 'rgba(244, 63, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$liked ? '#f43f5e' : theme.border};
  color: ${props => props.$liked ? '#f43f5e' : theme.text};
  padding: 12px 24px;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  
  &:hover {
    transform: translateY(-3px);
    background: ${props => props.$liked ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
    box-shadow: ${theme.shadows.glass};
  }

  &:active {
    transform: scale(0.95);
  }

  svg {
    width: 24px;
    height: 24px;
    fill: ${props => props.$liked ? '#f43f5e' : 'none'};
    stroke: ${props => props.$liked ? '#f43f5e' : 'currentColor'};
    transition: all 0.3s ease;
  }
`;

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Generate or get session ID
    let sId = localStorage.getItem("visitor_session_id");
    if (!sId) {
      sId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem("visitor_session_id", sId);
    }
    setSessionId(sId);

    // Check if liked from localStorage
    const likedBlogs = JSON.parse(localStorage.getItem("liked_blogs") || "[]");
    if (likedBlogs.includes(slug)) {
      setLiked(true);
    }

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

  const handleLike = () => {
    if (liked) return;

    fetch(`${API_BASE_URL}/blogs/${slug}/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ session_id: sessionId })
    })
      .then(res => res.json())
      .then(data => {
        setBlog(prev => ({ ...prev, likes: data.likes }));
        setLiked(true);
        const likedBlogs = JSON.parse(localStorage.getItem("liked_blogs") || "[]");
        localStorage.setItem("liked_blogs", JSON.stringify([...likedBlogs, slug]));
      })
      .catch(err => console.error("Error liking blog:", err));
  };

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
      <Helmet>
        <title>{blog.title} - Tech Musings | Dipendra Yadav</title>
        <meta name="description" content={blog.subtitle || blog.content?.replace(/[#*`_\[\]\(\)]/g, '').substring(0, 160) || "Blog post"} />
        <meta name="keywords" content={`${blog.title}, blog, tech musings, Dipendra Yadav, software engineering, web development`} />
        <meta name="author" content={blog.author || "Dipendra Yadav"} />
        <meta name="published_date" content={blog.published_at} />
        <meta name="read_time" content={`${blog.read_time_min} min read`} />
        <link rel="canonical" href={`https://www.dipendrakumaryadav.com.np/blog/${blog.slug}`} />
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://www.dipendrakumaryadav.com.np/blog/${blog.slug}`} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.subtitle || blog.content?.replace(/[#*`_\[\]\(\)]/g, '').substring(0, 160) || "Blog post"} />
        <meta property="og:image" content={blog.hero_image ? getImageUrl(blog.hero_image) : "https://www.dipendrakumaryadav.com.np/blog-og.jpg"} />
        <meta property="og:locale" content="en_US" />
        <meta property="article:published_time" content={blog.published_at} />
        <meta property="article:author" content={blog.author || "Dipendra Yadav"} />
        
        <!-- Twitter -->
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={`https://www.dipendrakumaryadav.com.np/blog/${blog.slug}`} />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.subtitle || blog.content?.replace(/[#*`_\[\]\(\)]/g, '').substring(0, 160) || "Blog post"} />
        <meta name="twitter:image" content={blog.hero_image ? getImageUrl(blog.hero_image) : "https://www.dipendrakumaryadav.com.np/blog-og.jpg"} />
        
        <!-- Additional SEO -->
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        <!-- Structured Data for Article -->
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": blog.title,
            "description": blog.subtitle || blog.content?.replace(/[#*`_\[\]\(\)]/g, '').substring(0, 160),
            "image": blog.hero_image ? getImageUrl(blog.hero_image) : "https://www.dipendrakumaryadav.com.np/blog-og.jpg",
            "url": `https://www.dipendrakumaryadav.com.np/blog/${blog.slug}`,
            "datePublished": blog.published_at,
            "author": {
              "@type": "Person",
              "name": blog.author || "Dipendra Yadav"
            },
            "publisher": {
              "@type": "Person",
              "name": "Dipendra Yadav",
              "url": "https://www.dipendrakumaryadav.com.np"
            }
          })}
        </script>
      </Helmet>
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
          <MarkdownContent>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>{blog.content}</ReactMarkdown>
          </MarkdownContent>

          <LikeSection>
            <LikeButton $liked={liked} onClick={handleLike}>
              <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l8.84-8.84 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {liked ? 'Liked' : 'Like this post'}
            </LikeButton>
            <p style={{ color: theme.textMuted, fontSize: '14px' }}>
              {blog.likes || 0} people liked this article
            </p>
          </LikeSection>
        </ContentCard>
      </SiteContainer>

      <Footer linkText="Read more articles →" linkTo="/blog" />
    </>
  );
}
