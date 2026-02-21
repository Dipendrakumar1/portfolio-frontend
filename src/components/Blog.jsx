import React, { useEffect, useState } from "react";
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GradientText, GlassCard } from "../styles/GlobalStyles";

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

// Footer
const Footer = styled.footer`
  margin-top: 100px;
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid ${theme.border};
`;

const FooterSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.textMuted};
  margin-bottom: 24px;
  font-size: 14px;
  letter-spacing: 2px;
  text-transform: uppercase;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid ${theme.border};
    margin: 0 20px;
  }
`;

const FooterLink = styled.a`
  display: inline-block;
  margin-bottom: 32px;
  color: ${theme.text};
  text-decoration: none;
  font-weight: 500;
  font-size: 18px;
  transition: color 0.2s ease;

  &:hover {
    color: ${theme.accent};
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;

  a {
    transition: transform 0.2s ease;

    &:hover {
      transform: translateY(-4px);
    }
  }
  
  img {
    filter: invert(1);
    opacity: 0.7;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 1;
    }
  }
`;

export default function Blog() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/blogs`)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <>
      <HeroSection>
        <Title>Tech <GradientText>Musings</GradientText></Title>
        <Subtitle>Thoughts on software engineering, web development, and my professional journey.</Subtitle>
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
                    {b.subtitle || (b.content ? b.content.replace(/<[^>]+>/g, '').substring(0, 150) + "..." : "")}
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

      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink href="/aboutme">About Me →</FooterLink>
        <SocialIcons>
          <a href="https://github.com/yourname" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=12598&format=png&color=000000" alt="GitHub" width="28" height="28" />
          </a>
          <a href="https://linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=447&format=png&color=000000" alt="LinkedIn" width="28" height="28" />
          </a>
          <a href="https://twitter.com/yourname" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000" alt="Twitter" width="28" height="28" />
          </a>
          <a href="https://instagram.com/yourname" target="_blank" rel="noopener noreferrer">
            <img src="https://img.icons8.com/?size=100&id=eRJfQw0Zs44S&format=png&color=000000" alt="Instagram" width="28" height="28" />
          </a>
        </SocialIcons>
      </Footer>
    </>
  );
}
