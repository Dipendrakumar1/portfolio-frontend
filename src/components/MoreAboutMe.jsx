import React, { useEffect, useState } from "react";
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";

const Page = styled.div`
 background: #164f64ff;
  color: #b2e2c5;
  width: 100%;
  min-height: 100vh;
  font-family: "Fira Code", monospace;
  padding: 40px 0;
`;

const Navbar = styled.div`
  display: flex;
  gap: 15px;
  padding: 15px;
  background: #2b3337;
  border-bottom: 2px solid #8fdac2;
  position: sticky;
  top: 0;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 100;

  a {
    padding: 6px 10px;
    border: 1px solid #8fdac2;
    border-radius: 4px;
    color: #9ee3b1;
    text-decoration: none;
    font-size: 14px;

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

const ProfileContainer = styled.div`
  display: flex;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 20px;
    text-align: center;
  }

  img {
    width: 260px;
    max-width: 100%;
    border: 4px solid #8fdac2;
    padding: 10px;
  }

  p {
    max-width: 800px;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  min-width: 500px;
  border-collapse: collapse;

  th, td {
    border: 2px solid #8fdac2;
    padding: 12px;
    text-align: left;
  }

  .certificate-img {
    width: 110px;
  }
`;

const List = styled.ul`
  list-style-type: "- ";
  margin-left: 20px;

  ul {
    list-style-type: disc;
    margin-left: 20px;
  }
`;
// Footer styled components
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

const ExpLogoFrame = styled.div`
  border: 4px solid #8fdac2;
  padding: 10px;
  background: #1e2426;
  width: fit-content;
  margin: 15px 0;

  img {
    height: 80px;
    width: auto;
    display: block;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 20px;
`;

const Badge = styled.div`
  font-size: 14px;
  color: #c1ffd2;
  span {
    border: 1px solid #4a5a5f;
    padding: 2px 6px;
    background: rgba(143, 218, 194, 0.1);
    color: #8fdac2;
    margin-right: 8px;
  }
`;

const ContributionTitle = styled.div`
  font-size: 14px;
  color: #8fdac2;
  border: 1px solid #4a5a5f;
  padding: 2px 8px;
  width: fit-content;
  background: rgba(143, 218, 194, 0.1);
  margin-bottom: 25px;
`;
export default function AboutMore() {
  const [about, setAbout] = useState(null);
  const [certs, setCerts] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE_URL}/about`)
      .then((res) => res.json())
      .then((data) => setAbout(data))
      .catch((err) => console.error("Error fetching about:", err));

    fetch(`${API_BASE_URL}/certificates`)
      .then((res) => res.json())
      .then((data) => setCerts(data))
      .catch((err) => console.error("Error fetching certificates:", err));

    fetch(`${API_BASE_URL}/experiences`)
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error("Error fetching experiences:", err));
  }, []);

  return (
    <Page>


      <Container>
        {/* ABOUT HEADER */}
        <Section>
          <Heading>About Me</Heading>
          <Separator>--)::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::(--</Separator>
          <Paragraph>Dipendra Yadav :: 5 min read (900 words)</Paragraph>

          <ImageFrame>
            <img src="https://images.unsplash.com/photo-1768813282031-2aec62eee8b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Banner Image" />
          </ImageFrame>
        </Section>

        {/* TABLE OF CONTENTS */}
        <Section>
          <Heading>Table of Contents</Heading>
          <List>
            <li><a href="#">Core Skills & Expertise</a></li>
            <li>
              <a href="#">Experience</a>
              <ul>
                <li>rtCamp</li>
                <li>Viamagus</li>
                <li>Ksctl</li>
                <li>Kubesimplify</li>
                <li>Viamagus</li>
              </ul>
            </li>
            <li><a href="#">Interests</a></li>
            <li><a href="#">Tools and Technologies</a></li>
            <li><a href="#">Programming Languages</a></li>
            <li><a href="#">Achievements</a></li>
            <li><a href="#">Certificates and Badges</a></li>
          </List>
        </Section>

        {/* ABOUT PROFILE */}
        <Section>
          <Heading>About Me</Heading>
          <ProfileContainer>
            <img src={getImageUrl(about?.hero_image) || "img/profile.jpg"} alt="Profile" />
            <Paragraph>
              {about?.body ? (
                <span dangerouslySetInnerHTML={{ __html: about.body }} />
              ) : (
                <>Loading bio...</>
              )}
            </Paragraph>
          </ProfileContainer>
        </Section>

        {/* ACHIEVEMENTS */}
        <Section>
          <Heading>🏆 Achievements & Recognitions</Heading>
          <List>
            <li>Winner — Nappitive + WeMakeDevs Cloud Native Hackathon</li>
            <li>Built Ksctl (carbon-aware Kubernetes CLI)</li>
            <li>Developed DevSecOps & MLOps pipelines</li>
          </List>
        </Section>
        {/* EXPERIENCE */}
        <Section>
          <Heading>Experience</Heading>
          {experiences.length > 0 ? (
            experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: "50px" }}>
                <Heading style={{ fontSize: "18px", color: "#9ee3b1" }}>{exp.company_name}</Heading>

                {exp.company_logo && (
                  <ExpLogoFrame>
                    <img src={getImageUrl(exp.company_logo)} alt={exp.company_name} />
                  </ExpLogoFrame>
                )}

                <BadgeContainer>
                  <Badge><span>Tenure</span> : {exp.tenure}</Badge>
                  <Badge><span>Role</span> : {exp.role}</Badge>
                </BadgeContainer>

                <ContributionTitle>Key Contributions</ContributionTitle>

                <List>
                  {exp.contributions.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </List>
              </div>
            ))
          ) : (
            <Paragraph>No experience records found.</Paragraph>
          )}
        </Section>
        {/* CERTIFICATES */}
        <Section>
          <Heading>Certificates and Badges</Heading>
          <TableWrapper>
            <Table>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>LINK</th>
                </tr>
              </thead>
              <tbody>
                {certs.length > 0 ? (
                  certs.map((cert) => (
                    <tr key={cert.id}>
                      <td>{cert.name}</td>
                      <td>
                        {cert.image_url ? (
                          <img src={getImageUrl(cert.image_url)} className="certificate-img" alt={cert.name} />
                        ) : (
                          <a href={cert.link_url} target="_blank" rel="noopener noreferrer">Certificate Link</a>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colspan="2">No certificates found.</td></tr>
                )}
              </tbody>
            </Table>
          </TableWrapper>
        </Section>
      </Container>
      {/* FOOTER */}
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
