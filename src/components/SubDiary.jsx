import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { API_BASE_URL } from "../api";

const Page = styled.div`
  background:#164f64ff;
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
  font-size: 22px;
  font-weight: bold;
`;

const Separator = styled.div`
  color: #8fdac2;
  margin: 10px 0 25px 0;
  font-size: 14px;
`;

const Paragraph = styled.p`
  line-height: 1.7;
  margin-bottom: 20px;
`;

const SubHeadingLink = styled.a`
  font-size: 18px;
  color: #9ee3b1;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: #c1ffd2;
  }
`;

const BulletList = styled.ul`
  list-style-type: "- ";
  margin-left: 40px;
  line-height: 1.7;

  li {
    margin-bottom: 8px;
  }
`;

// Footer
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

export default function SubDiary() {
  const { slug } = useParams();
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/diaries/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Diary not found");
        return res.json();
      })
      .then((data) => {
        setDiary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching diary:", err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Page>
        <Container>
          <Section><Heading>Loading entry...</Heading></Section>
        </Container>
      </Page>
    );
  }

  if (!diary) {
    return (
      <Page>
        <Container>
          <Section><Heading>Diary entry not found.</Heading></Section>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container>
        {/* HEADER */}
        <Section>
          <Heading>{diary.month_label}</Heading>
          <Separator>
            ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          </Separator>
          <Paragraph>
            {diary.date} :: {diary.author} :: ({diary.word_count} words)
          </Paragraph>
          <Paragraph>{diary.summary}</Paragraph>
        </Section>

        {/* TABLE OF CONTENTS */}
        {diary.sections && diary.sections.length > 0 && (
          <Section>
            <Heading>Table of Contents</Heading>
            <br />
            {diary.sections.map((s, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <SubHeadingLink href={`#section-${idx}`}>
                  {s.title}
                </SubHeadingLink>
              </div>
            ))}
          </Section>
        )}

        {/* SECTIONS */}
        {diary.sections &&
          diary.sections.map((s, idx) => (
            <Section id={`section-${idx}`} key={idx}>
              <SubHeadingLink href={`#section-${idx}`}>{s.title}</SubHeadingLink>
              <br />
              <br />
              {s.bullets && (
                <BulletList>
                  {s.bullets.map((b, bIdx) => (
                    <li key={bIdx}>{b.text}</li>
                  ))}
                </BulletList>
              )}
            </Section>
          ))}
      </Container>

      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink href="/mydiary">[My Diary] →</FooterLink>
        <SocialIcons>
          <a
            href="https://github.com/yourname"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <img
              src="https://img.icons8.com/?size=100&id=12598&format=png&color=000000"
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
