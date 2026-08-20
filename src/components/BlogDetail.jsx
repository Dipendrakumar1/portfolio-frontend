import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";
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
  margin-bottom: 30px;
  text-align: center;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const Title = styled.h1`
  font-size: clamp(24px, 6.5vw, 48px);
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

const HeroImageWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto 40px;
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lift};
  border: 1px solid ${theme.border};
  background: #080d1a;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 500px;
    object-fit: cover;
  }

  @media (max-width: 480px) {
    border-radius: 12px;
    margin-bottom: 24px;
    img {
      max-height: 220px;
    }
  }
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

const LikeSection = styled.div`
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px 20px 20px;
  border-top: 1px solid ${theme.border};
`;

const LikeButton = styled.button`
  background: ${props => props.$liked ? 'rgba(244, 63, 94, 0.18)' : 'rgba(255, 255, 255, 0.05)'};
  border: 1px solid ${props => props.$liked ? '#f43f5e' : theme.border};
  color: ${props => props.$liked ? '#f43f5e' : theme.text};
  padding: 14px 32px;
  border-radius: ${theme.radii.pill};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 17px;
  font-weight: 700;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${props => props.$liked ? '0 0 25px rgba(244, 63, 94, 0.3)' : 'none'};
  
  &:hover {
    transform: translateY(-3px) scale(1.03);
    background: ${props => props.$liked ? 'rgba(244, 63, 94, 0.25)' : 'rgba(255, 255, 255, 0.1)'};
  }

  &:active {
    transform: scale(0.96);
  }

  svg {
    width: 22px;
    height: 22px;
    fill: ${props => props.$liked ? '#f43f5e' : 'none'};
    stroke: ${props => props.$liked ? '#f43f5e' : 'currentColor'};
    transition: all 0.3s ease;
  }
`;

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [likedBlogs, setLikedBlogs] = useState(() => JSON.parse(localStorage.getItem("liked_blogs") || "[]"));
  const [sessionId] = useState(() => {
    let sId = localStorage.getItem("visitor_session_id");
    if (!sId) {
      sId = Math.random().toString(36).substring(2) + Date.now().toString(36);
      localStorage.setItem("visitor_session_id", sId);
    }
    return sId;
  });
  const liked = likedBlogs.includes(slug);

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
        setLikedBlogs(prev => {
          const next = [...prev, slug];
          localStorage.setItem("liked_blogs", JSON.stringify(next));
          return next;
        });
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
      <ProgressBar style={{ width: `${scrollProgress}%` }} />

      <Helmet>
        <title>{blog.title} - Tech Musings | Dipendra Yadav</title>
        <meta name="description" content={blog.subtitle || blog.content?.replace(/\*|#|`|_|\[|\]|\(|\)/g, '').substring(0, 160) || "Blog post"} />
        <meta name="author" content={blog.author || "Dipendra Yadav"} />
        <link rel="canonical" href={`https://www.dipendrakumaryadav.com.np/blog/${blog.slug}`} />
      </Helmet>

      <SiteContainer>
        <BackLink to="/blog">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to all articles
        </BackLink>

        <ArticleHeader>
          <Title>{blog.title}</Title>
          <Meta>
            <span className="badge">{blog.published_at}</span>
            <span>By <strong>{blog.author}</strong></span>
            <span>•</span>
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
              {liked ? 'Article Liked' : 'Enjoyed this? Leave a Like'}
            </LikeButton>
            <p style={{ color: theme.textMuted, fontSize: '14px' }}>
              {blog.likes || 0} {blog.likes === 1 ? 'person' : 'people'} found this helpful
            </p>
          </LikeSection>
        </ContentCard>
      </SiteContainer>

      <Footer linkText="Explore more articles →" linkTo="/blog" />
    </>
  );
}
