import React, { useEffect, useState } from "react";
import { API_BASE_URL } from "../api";
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

// Diary list styles
const DiaryEntry = styled.div`
  margin-bottom: 60px;
`;

const DiaryTitle = styled.div`
  font-size: 20px;
  font-weight: bold;
  color: #b2e2c5;
`;

const DiaryTitleSeparator = styled.div`
  margin-top: 4px;
  color: #8fdac2;
  font-size: 12px;
`;

const DiaryMeta = styled.div`
  margin-top: 14px;
  color: #8fdac2;
  font-size: 14px;
`;

const DiaryBody = styled.p`
  margin: 20px 0 18px 0;
  line-height: 1.7;
`;

const ReadMore = styled.a`
  color: #9ee3b1;
  text-decoration: none;

  &:hover {
    color: #c1ffd2;
  }
`;

// Footer (same as others if you want it here too)
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

export default function MyDiary() {
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/diaries`)
      .then((res) => res.json())
      .then((data) => setDiaries(data))
      .catch((err) => console.error("Error fetching diaries:", err));
  }, []);

  return (
    <Page>


      <Container>
        {/* HEADER */}
        <Section>
          <Heading>My Diary</Heading>
          <Separator>
            --)::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::(--
          </Separator>
        </Section>

        {/* DIARY ENTRIES */}
        <Section>
          {diaries.length > 0 ? (
            diaries.map((d) => (
              <DiaryEntry key={d.id}>
                <DiaryTitle>{d.month_label}</DiaryTitle>
                <DiaryTitleSeparator>
                  --)::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::(--
                </DiaryTitleSeparator>
                <DiaryMeta>{d.date} :: {d.author}</DiaryMeta>
                <DiaryBody>{d.summary}</DiaryBody>
                <ReadMore href={`/mydiary/${d.slug}`}>[Read more]</ReadMore>
              </DiaryEntry>
            ))
          ) : (
            <DiaryBody>No diary entries found.</DiaryBody>
          )}
        </Section>
      </Container>

      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink href="/blog">[Blogs] →</FooterLink>
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
