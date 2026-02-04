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
`;

const Paragraph = styled.p`
  line-height: 1.7;
  margin-bottom: 20px;
`;

const ImageFrame = styled.div`
  border: 4px solid #8fdac2;
  padding: 12px;
  background: #2b3337;
  width: fit-content;
  margin: 25px auto;

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }
`;

const InlineLink = styled.a`
  color: #9ee3b1;
  text-decoration: underline;
  text-underline-offset: 3px;

  &:hover {
    color: #c1ffd2;
  }
`;

const List = styled.ul`
  list-style-type: "- ";
  margin-left: 20px;

  ul {
    list-style-type: "- ";
    margin-left: 25px;
  }
`;

const SubHeading = styled.div`
  font-size: 18px;
  margin-bottom: 20px;
`;

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

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <Page>
      <Container>
        {/* HEADER / HERO */}
        <Section>
          <Heading>Projects</Heading>
          <Separator>
            --)::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::(--
          </Separator>
          <Paragraph>Dipendra Yadav :: {projects.length} fetched projects</Paragraph>

          <ImageFrame>
            <img src="img/projects-hero.jpg" alt="Projects banner" />
          </ImageFrame>
        </Section>

        {/* TABLE OF CONTENTS FOR PROJECTS */}
        <Section>
          <Heading>Table of Contents</Heading>

          <List>
            {projects.map((p) => (
              <li key={p.id}>
                <InlineLink href={`#${p.slug}`}>{p.title}</InlineLink>
                <ul>
                  <li>
                    <InlineLink href={`#${p.slug}-desc`}>Description</InlineLink>
                  </li>
                  <li>
                    <InlineLink href={`#${p.slug}-links`}>Links</InlineLink>
                  </li>
                </ul>
              </li>
            ))}
          </List>
        </Section>

        {/* DYNAMIC PROJECT COLLECTION */}
        {projects.map((p) => (
          <Section id={p.slug} key={p.id}>
            <SubHeading>
              <InlineLink href="#my-project-collection">Back to top</InlineLink>
            </SubHeading>

            <Heading id={`${p.slug}-title`}>{p.title}</Heading>
            <br />

            <Heading id={`${p.slug}-desc`}>Description</Heading>
            <Paragraph>
              {p.long_description ? p.long_description : p.short_description}
            </Paragraph>

            {p.hero_image && (
              <ImageFrame>
                <img src={getImageUrl(p.hero_image)} alt={p.title} />
              </ImageFrame>
            )}

            <br />
            <Heading id={`${p.slug}-links`}>Links</Heading>
            <List>
              {p.repo_url && <li><InlineLink href={p.repo_url} target="_blank">GitHub Repo</InlineLink></li>}
              {p.live_url && <li><InlineLink href={p.live_url} target="_blank">Live Demo</InlineLink></li>}
            </List>
          </Section>
        ))}

        {/* You can add actual detailed sections for each project below,
            using the IDs referenced in the TOC if you want */}
      </Container>

      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink href="#">[Blogs] →</FooterLink>
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
