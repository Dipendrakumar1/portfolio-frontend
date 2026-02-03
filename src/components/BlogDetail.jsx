import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { API_BASE_URL, getImageUrl } from "../api";

const Page = styled.div`
  background: #164f64ff;
  color: #b2e2c5;
  width: 100%;
  min-height: 100vh;
  font-family: "Fira Code", monospace;
  padding: 40px 0;
`;

const Container = styled.div`
  width: 85%;
  margin: auto;
`;

const Section = styled.div`
  padding: 40px 0;
`;

const Heading = styled.div`
  font-size: 26px;
  font-weight: bold;
  color: #9ee3b1;
`;

const Separator = styled.div`
  color: #8fdac2;
  margin: 15px 0 25px 0;
  font-size: 14px;
`;

const BlogMeta = styled.div`
  margin-bottom: 25px;
  font-size: 14px;
  color: #8fdac2;
`;

const BlogContent = styled.div`
  line-height: 1.8;
  font-size: 16px;
  
  p {
    margin-bottom: 20px;
  }
  
  img {
    max-width: 100%;
    height: auto;
    border: 4px solid #8fdac2;
    padding: 10px;
    margin: 20px auto;
    display: block;
  }
`;

const Footer = styled.footer`
  margin-top: 60px;
  text-align: center;
  padding: 40px 0;
  border-top: 1px solid #4a5a5f;
`;

const FooterLink = styled.a`
  display: block;
  margin-bottom: 20px;
  color: #7ea288;
  text-decoration: none;
  font-weight: 500;
  &:hover { color: #9ee3b1; }
`;

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  if (loading) return <Page><Container><Section><Heading>Loading blog...</Heading></Section></Container></Page>;
  if (!blog) return <Page><Container><Section><Heading>Blog not found.</Heading></Section></Container></Page>;

  return (
    <Page>
      <Container>
        <Section>
          <Heading>{blog.title}</Heading>
          <Separator>--)::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::(--</Separator>
          <BlogMeta>
            {blog.published_at} · {blog.author} · {blog.read_time_min} min read
          </BlogMeta>

          {blog.hero_image && (
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <img src={getImageUrl(blog.hero_image)} alt={blog.title} style={{ maxWidth: '100%', border: '4px solid #8fdac2', padding: '10px' }} />
            </div>
          )}

          <BlogContent dangerouslySetInnerHTML={{ __html: blog.content }} />
        </Section>
      </Container>

      <Footer>
        <FooterLink href="/blog">[Back to Blogs] →</FooterLink>
      </Footer>
    </Page>
  );
}
