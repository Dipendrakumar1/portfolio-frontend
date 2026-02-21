import React, { useEffect, useState } from "react";
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme, SiteContainer, GlassCard, GradientText } from "../styles/GlobalStyles";

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

const HeroImageWrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin: 40px auto 60px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${theme.shadows.glass};
  border: 1px solid ${theme.border};
  
  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 400px;
    object-fit: cover;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 40px;
  align-items: start;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const TOCWrap = styled(GlassCard)`
  position: sticky;
  top: 100px;
  padding: 24px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    position: relative;
    top: 0;
  }
`;

const TOCHeading = styled.h3`
  font-size: 24px;
  margin-top: 0;
  margin-bottom: 20px;
  color: ${theme.text};
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 12px;
`;

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  
  li {
    margin-bottom: 12px;
  }
  
  ul {
    list-style: none;
    padding-left: 24px;
    margin-top: 8px;
    border-left: 1px solid ${theme.border};
  }
`;

const TOCLink = styled.a`
  color: ${theme.text};
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;
  
  &:hover {
    color: ${theme.accent};
    transform: translateX(4px);
  }
`;

const TOCSubLink = styled.a`
  color: ${theme.textMuted};
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;
  
  &:hover {
    color: ${theme.accentHover};
    transform: translateX(4px);
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: ${theme.text};
  margin-bottom: 24px;
`;

const ProfileCard = styled(GlassCard)`
  display: flex;
  gap: 32px;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  img {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    object-fit: cover;
    border: 4px solid ${theme.border};
  }
  
  p {
    font-size: 16px;
    line-height: 1.7;
    flex-grow: 1;
  }
`;

const BlockCard = styled(GlassCard)`
  padding: 32px;
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Badge = styled.div`
  font-size: 14px;
  color: ${theme.text};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid ${theme.border};
  padding: 6px 12px;
  border-radius: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  
  span {
    color: ${theme.accent};
    font-weight: 600;
  }
`;

const ExperienceItem = styled.div`
  margin-bottom: 40px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const ExpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 12px;
  }
`;

const ExpCompany = styled.h3`
  font-size: 22px;
  color: ${theme.accentHover};
  margin: 0 0 8px 0;
`;

const ExpLogoFrame = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 8px;
  border-radius: 8px;
  border: 1px solid ${theme.border};
  
  img {
    height: 40px;
    width: auto;
    display: block;
    object-fit: contain;
  }
`;

const ExpMeta = styled.div`
  display: flex;
  gap: 16px;
  font-size: 14px;
  color: ${theme.textMuted};
  margin-bottom: 16px;
  font-family: ${theme.fontBody};
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 4px;
  }
`;

const ContributionTitle = styled.h4`
  font-size: 15px;
  color: ${theme.text};
  margin-bottom: 12px;
`;

const BulletList = styled.ul`
  list-style: none;
  padding-left: 0;

  li {
    margin-bottom: 12px;
    padding-left: 24px;
    position: relative;
    color: ${theme.textMuted};
    line-height: 1.6;
    
    &:before {
      content: '•';
      color: ${theme.accent};
      position: absolute;
      left: 0;
      top: 0;
      font-size: 18px;
    }
  }
`;

const NormalList = styled(BulletList)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  
  li {
    margin-bottom: 0;
  }
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 16px;
    text-align: left;
    border-bottom: 1px solid ${theme.border};
  }
  
  th {
    color: ${theme.text};
    font-weight: 600;
    font-family: ${theme.fontHeading};
  }
  
  td {
    color: ${theme.textMuted};
  }
  
  a {
    color: ${theme.accent};
    text-decoration: underline;
    text-underline-offset: 4px;
    
    &:hover {
      color: ${theme.accentHover};
    }
  }

  .certificate-img {
    height: 60px;
    width: auto;
    border-radius: 4px;
    border: 1px solid ${theme.border};
  }
`;

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

const FooterLink = styled(Link)`
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
export default function AboutMore() {
  const [about, setAbout] = useState(null);
  const [certs, setCerts] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [tools, setTools] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [achievements, setAchievements] = useState([]);

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

    fetch(`${API_BASE_URL}/skills`)
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));

    fetch(`${API_BASE_URL}/interests`)
      .then((res) => res.json())
      .then((data) => setInterests(data))
      .catch((err) => console.error("Error fetching interests:", err));

    fetch(`${API_BASE_URL}/tools`)
      .then((res) => res.json())
      .then((data) => setTools(data))
      .catch((err) => console.error("Error fetching tools:", err));

    fetch(`${API_BASE_URL}/languages`)
      .then((res) => res.json())
      .then((data) => setLanguages(data))
      .catch((err) => console.error("Error fetching languages:", err));

    fetch(`${API_BASE_URL}/achievements`)
      .then((res) => res.json())
      .then((data) => setAchievements(data))
      .catch((err) => console.error("Error fetching achievements:", err));
  }, []);

  return (
    <>
      <HeroSection id="top">
        <Title>About <GradientText>Me</GradientText></Title>
        <Subtitle>I am a software developer with a passion for creating beautiful and functional digital experiences.</Subtitle>
      </HeroSection>

      <SiteContainer>
        <HeroImageWrapper>
          <img src="https://images.unsplash.com/photo-1768813282031-2aec62eee8b7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hero Banner" />
        </HeroImageWrapper>

        <ContentGrid>
          {/* TABLE OF CONTENTS */}
          <TOCWrap>
            <TOCHeading>Table of Contents</TOCHeading>
            <TOCList>
              {skills.length > 0 && <li><TOCLink href="#skills">Core Skills & Expertise</TOCLink></li>}
              {experiences.length > 0 && (
                <li>
                  <TOCLink href="#experience">Experience</TOCLink>
                  <ul>
                    {experiences.map(exp => (
                      <li key={exp.id}><TOCSubLink href={`#exp-${exp.id}`}>{exp.company_name}</TOCSubLink></li>
                    ))}
                  </ul>
                </li>
              )}
              {interests.length > 0 && <li><TOCLink href="#interests">Interests</TOCLink></li>}
              {tools.length > 0 && <li><TOCLink href="#tools">Tools and Technologies</TOCLink></li>}
              {languages.length > 0 && <li><TOCLink href="#languages">Programming Languages</TOCLink></li>}
              {achievements.length > 0 && <li><TOCLink href="#achievements">Achievements</TOCLink></li>}
              {certs.length > 0 && <li><TOCLink href="#certificates">Certificates and Badges</TOCLink></li>}
            </TOCList>
          </TOCWrap>

          <MainContent>
            {/* ABOUT PROFILE */}
            <section id="about">
              <SectionTitle>Who I Am</SectionTitle>
              <ProfileCard>
                <img src={getImageUrl(about?.hero_image) || "img/profile.jpg"} alt="Profile" />
                <div>
                  {about?.body ? (
                    <span dangerouslySetInnerHTML={{ __html: about.body }} />
                  ) : (
                    <p>Loading bio...</p>
                  )}
                </div>
              </ProfileCard>
            </section>

            {/* SKILLS */}
            {skills.length > 0 && (
              <section id="skills">
                <SectionTitle>Core Skills & Expertise</SectionTitle>
                <BlockCard>
                  <BadgeContainer>
                    {skills.map(skill => (
                      <Badge key={skill.id}>
                        {skill.category && <span>{skill.category}</span>} {skill.name} {skill.level && `(${skill.level})`}
                      </Badge>
                    ))}
                  </BadgeContainer>
                </BlockCard>
              </section>
            )}

            {/* ACHIEVEMENTS */}
            {achievements.length > 0 && (
              <section id="achievements">
                <SectionTitle>Achievements & Recognitions</SectionTitle>
                <BlockCard>
                  <BulletList>
                    {achievements.map(ach => (
                      <li key={ach.id}>
                        <strong style={{ color: theme.text }}>{ach.title}</strong>
                        {ach.description && <p style={{ fontSize: "14px", margin: "4px 0 0 0", color: theme.textMuted }}>{ach.description}</p>}
                      </li>
                    ))}
                  </BulletList>
                </BlockCard>
              </section>
            )}

            {/* EXPERIENCE */}
            <section id="experience">
              <SectionTitle>Experience</SectionTitle>
              {experiences.length > 0 ? (
                experiences.map((exp) => (
                  <BlockCard id={`exp-${exp.id}`} key={exp.id} style={{ marginBottom: "24px" }}>
                    <ExpHeader>
                      <div>
                        <ExpCompany>{exp.company_name}</ExpCompany>
                        <ExpMeta>
                          <span><strong>Role:</strong> {exp.role}</span>
                          <span><strong>Tenure:</strong> {exp.tenure}</span>
                        </ExpMeta>
                      </div>
                      {exp.company_logo && (
                        <ExpLogoFrame>
                          <img src={getImageUrl(exp.company_logo)} alt={exp.company_name} />
                        </ExpLogoFrame>
                      )}
                    </ExpHeader>

                    <ContributionTitle>Key Contributions</ContributionTitle>
                    <BulletList>
                      {exp.contributions.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </BulletList>
                  </BlockCard>
                ))
              ) : (
                <p>No experience records found.</p>
              )}
            </section>

            {/* INTERESTS */}
            {interests.length > 0 && (
              <section id="interests">
                <SectionTitle>Interests</SectionTitle>
                <BlockCard>
                  <NormalList>
                    {interests.map(interest => (
                      <li key={interest.id}>{interest.name}</li>
                    ))}
                  </NormalList>
                </BlockCard>
              </section>
            )}

            {/* TOOLS */}
            {tools.length > 0 && (
              <section id="tools">
                <SectionTitle>Tools and Technologies</SectionTitle>
                <BlockCard>
                  <BadgeContainer>
                    {tools.map(tool => (
                      <Badge key={tool.id}>
                        {tool.icon_url && <img src={getImageUrl(tool.icon_url)} alt="" style={{ height: "16px", objectFit: "contain" }} />}
                        {tool.name}
                      </Badge>
                    ))}
                  </BadgeContainer>
                </BlockCard>
              </section>
            )}

            {/* LANGUAGES */}
            {languages.length > 0 && (
              <section id="languages">
                <SectionTitle>Programming Languages</SectionTitle>
                <BlockCard>
                  <NormalList>
                    {languages.map(lang => (
                      <li key={lang.id}>{lang.name} {lang.level && <span style={{ opacity: 0.6 }}>({lang.level})</span>}</li>
                    ))}
                  </NormalList>
                </BlockCard>
              </section>
            )}

            {/* CERTIFICATES */}
            <section id="certificates">
              <SectionTitle>Certificates and Badges</SectionTitle>
              <BlockCard style={{ padding: 0, overflow: 'hidden' }}>
                <TableWrapper>
                  <Table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Credentials</th>
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
                                <a href={cert.link_url} target="_blank" rel="noopener noreferrer">View Certificate →</a>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr><td colSpan="2" style={{ textAlign: "center", padding: "32px" }}>No certificates found.</td></tr>
                      )}
                    </tbody>
                  </Table>
                </TableWrapper>
              </BlockCard>
            </section>
          </MainContent>
        </ContentGrid>
      </SiteContainer>
      {/* FOOTER */}
      <Footer>
        <FooterSeparator>READ OTHER POSTS</FooterSeparator>
        <FooterLink to="/blog">Blog →</FooterLink>
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
