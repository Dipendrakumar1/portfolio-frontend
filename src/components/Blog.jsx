import React, { useEffect, useState } from "react";
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";

const Page = styled.div`
  background:#164f64ff;
  color: #b2e2c5;
  width: 100%;
  min-height: 100vh;
  font-family: "Fira Code", monospace;
  padding: 40px 0;
`;

const Navbar = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;
  background: #2b3337;
  border-bottom: 2px solid #8fdac2;
  position: sticky;
  top: 0;

  a {
    padding: 6px 12px;
    border: 1px solid #8fdac2;
    border-radius: 4px;
    color: #9ee3b1;
    text-decoration: none;

    &:hover {
      color: #c1ffd2;
    }
  }
`;

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  margin: auto;
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Section = styled.div`
  padding: 40px 0;
  @media (max-width: 768px) {
    padding: 20px 0;
  }
`;

const Heading = styled.div`
  font-size: 22px;
  font-weight: bold;
  text-align: left;
  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const Separator = styled.div`
  color: #8fdac2;
  margin: 10px 0 25px 0;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
`;

const Paragraph = styled.p`
  line-height: 1.7;
  margin-bottom: 20px;
  text-align: left;
`;

const ImageFrame = styled.div`
  border: 4px solid #8fdac2;
  padding: 12px;
  background: #2b3337;
  max-width: 500px;
  margin: 25px auto;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

// Blog list styles
const BlogList = styled.div`
  margin-top: 20px;
`;

const BlogItem = styled.div`
  margin-bottom: 35px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
`;

const BlogTitle = styled.a`
  font-size: 18px;
  color: #9ee3b1;
  text-decoration: none;
  font-weight: bold;

  &:hover {
    color: #c1ffd2;
  }
`;

const BlogMeta = styled.div`
  margin: 8px 0 14px 0;
  font-size: 14px;
  color: #8fdac2;
`;

const BlogTeaser = styled.p`
  margin-bottom: 14px;
  line-height: 1.6;
  max-width: 800px;
`;

const BlogThumbnailFrame = styled(ImageFrame)`
  margin: 15px auto 0 auto;
`;

// Footer (same as AboutMore)
const Footer = styled.footer`
  margin-top: 60px;
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid #4a5a5f;
`;

const FooterSeparator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7ea288;
  margin-bottom: 15px;

  &:before,
  &:after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #7ea288;
    margin: 0 10px;
  }
`;

const FooterLink = styled.a`
  display: block;
  margin-bottom: 20px;
  color: #7ea288;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #9ee3b1;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;

  a {
    color: #7ea288;
    font-size: 22px;
    text-decoration: none;

    &:hover {
      color: #9ee3b1;
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
    <Page>
      <Container>
        {/* BLOG HEADER (hero) */}
        <Section>
          <Heading>Blogs</Heading>
          <Separator>
            --)::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::(--
          </Separator>
          <Paragraph>Dipendra Yadav :: {blogs.length} posts published</Paragraph>

          <ImageFrame>
            <img src="img/blog-hero.jpg" alt="Blogs banner" />
          </ImageFrame>
        </Section>

        {/* TABLE OF CONTENTS / BLOG LIST */}
        <Section>
          <Heading>Table of Contents</Heading>

          <BlogList>
            {blogs.length > 0 ? (
              blogs.map((b) => (
                <BlogItem key={b.id}>
                  <BlogTitle href={`/blog/${b.slug}`}>
                    {b.title}
                  </BlogTitle>
                  <BlogMeta>
                    {b.published_at} · {b.read_time_min} min read
                  </BlogMeta>
                  <BlogTeaser>
                    {b.subtitle || (b.content ? b.content.substring(0, 150) + "..." : "")}
                  </BlogTeaser>
                  {b.hero_image && (
                    <BlogThumbnailFrame>
                      <img src={getImageUrl(b.hero_image)} alt={b.title} />
                    </BlogThumbnailFrame>
                  )}
                </BlogItem>
              ))
            ) : (
              <Paragraph>No blogs found.</Paragraph>
            )}
          </BlogList>
        </Section>
      </Container>

      {/* FOOTER */}
      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink href="#">[About Me] →</FooterLink>
        <SocialIcons>
          <a
            href="https://github.com/yourname"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img
              src="https://img.icons8.com/?size=100&id=12598&format=png&color=000000"
              alt="GitHub"
              width="32"
              height="32"
            />
          </a>
          <a
            href="https://github.com/yourname"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img
              src="https://img.icons8.com/?size=100&id=447&format=png&color=000000"
              alt="LinkedIn"
              width="32"
              height="32"
            />
          </a>
          <a
            href="https://github.com/yourname"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img
              src="https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000"
              alt="GitHub"
              width="32"
              height="32"
            />
          </a>
          <a
            href="https://github.com/yourname"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            class="social-icon"
          >
            <img
              src="https://img.icons8.com/?size=100&id=eRJfQw0Zs44S&format=png&color=000000"
              alt="GitHub"
              width="32"
              height="32"
            />
          </a>
        </SocialIcons>
      </Footer>
    </Page>
  );
}
