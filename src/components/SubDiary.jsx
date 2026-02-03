import React from "react";
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
`;

// Footer (optional – same as other pages)
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
  return (
    <Page>
      <Container>
        {/* HEADER */}
        <Section>
          <Heading>[2025-11] Diary for November 2025</Heading>
          <Separator>
            ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
          </Separator>
          <Paragraph>2025-11-01 :: Dipendra Yadav :: 2 min read (309 words)</Paragraph>
        </Section>

        {/* TABLE OF CONTENTS */}
        <Section>
          <Heading>Table of Contents</Heading>

          <br />

          <SubHeadingLink href="#date-2025-11-25-30">
            Date 2025-11-25 2025-11-30
          </SubHeadingLink>

          <br />
          <br />

          <SubHeadingLink href="#date-2025-11-23-24">
            Date 2025-11-23 2025-11-24
          </SubHeadingLink>
        </Section>

        {/* DATE SECTION 1 */}
        <Section id="date-2025-11-25-30">
          <SubHeadingLink href="#date-2025-11-25-30">
            Date 2025-11-25 2025-11-30
          </SubHeadingLink>
          <br />
          <br />
          <BulletList>
            <li>some health issues</li>
            <li>
              The project&apos;s billing system is being upgraded from an old one
              (Stripe) to a new one (Polar.sh).
            </li>
            <li>
              This change involves updating how the system handles payments,
              subscriptions, and related data.
            </li>
            <li>
              New connections and settings were added for the new billing system.
            </li>
            <li>
              The old billing system&apos;s parts are still kept around, just in case
              they are needed again.
            </li>
            <li>
              The update also cleaned up some parts of the system for better clarity.
            </li>
            <li>
              more experience with better event based architecture and planning for
              better topics and grouping of events
            </li>
          </BulletList>
        </Section>

        {/* DATE SECTION 2 */}
        <Section id="date-2025-11-23-24">
          <SubHeadingLink href="#date-2025-11-23-24">
            Date 2025-11-23 2025-11-24
          </SubHeadingLink>
          <br />
          <br />
          <BulletList>
            <li>your next diary bullets go here</li>
            <li>add as many list items as you want</li>
          </BulletList>
        </Section>
      </Container>

      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink href="#">[My Diary] →</FooterLink>
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
