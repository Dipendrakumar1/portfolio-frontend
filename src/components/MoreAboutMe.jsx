import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet-async'
import { API_BASE_URL, getImageUrl } from "../api";
import styled from "styled-components";
import { theme, SiteContainer, GlassCard, GradientText, FadeInUp } from "../styles/GlobalStyles";
import Footer from '../components/Footer';
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const HeroSection = styled.section`
  padding: 60px 0 30px;
  text-align: center;
`

const Title = styled.h1`
  font-size: clamp(38px, 6vw, 60px);
  margin-bottom: 18px;
  font-weight: 900;
  letter-spacing: -0.03em;
`

const Subtitle = styled.p`
  font-size: clamp(16px, 2vw, 19px);
  color: ${theme.textMuted};
  max-width: 650px;
  margin: 0 auto;
  line-height: 1.7;
`

const HeroImageWrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  margin: 36px auto 50px;
  border-radius: ${theme.radii.lg};
  overflow: hidden;
  box-shadow: ${theme.shadows.lift};
  border: 1px solid ${theme.border};
  background: #080d1a;
  
  img {
    width: 100%;
    height: auto;
    display: block;
    max-height: 480px;
    object-fit: cover;
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 48px;
  align-items: start;
  max-width: 1300px;
  margin: 0 auto;
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    grid-template-columns: 1fr;
    gap: 36px;
  }
`;

const TOCWrap = styled(GlassCard)`
  position: sticky;
  top: 100px;
  padding: 28px 24px;
  background: linear-gradient(150deg, rgba(20, 29, 49, 0.85) 0%, rgba(11, 17, 33, 0.95) 100%);
  
  @media (max-width: ${theme.breakpoints.desktop}) {
    position: relative;
    top: 0;
  }
`;

const TOCHeading = styled.h3`
  font-size: 18px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 18px;
  color: #fff;
  border-bottom: 1px solid ${theme.border};
  padding-bottom: 12px;
  letter-spacing: 0.5px;
`;

const TOCList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const TOCLink = styled.a`
  color: ${theme.textMuted};
  font-weight: 500;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    color: ${theme.accent};
    transform: translateX(4px);
  }

  &::before {
    content: '•';
    color: ${theme.accent};
    font-size: 16px;
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const SectionTitle = styled.h2`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 4px;
    height: 24px;
    background: ${theme.accentGradient};
    border-radius: 2px;
    box-shadow: 0 0 10px ${theme.accent};
  }
`;

const ProfileCard = styled(GlassCard)`
  display: flex;
  gap: 36px;
  padding: 40px;
  align-items: flex-start;
  background: linear-gradient(150deg, rgba(23, 32, 54, 0.8) 0%, rgba(13, 20, 37, 0.9) 100%);
  border: 1px solid ${theme.border};
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    flex-direction: column;
    align-items: center;
    padding: 24px 18px;
    gap: 20px;
  }
`;

const ProfileImageFrame = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid ${theme.borderStrong};
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.5), 0 0 20px rgba(56, 189, 248, 0.25);
  background: #080d1a;
  transition: all 0.35s ease;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 14px;
    transition: transform 0.4s ease;
  }

  &:hover {
    border-color: ${theme.accent};
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6), 0 0 25px rgba(56, 189, 248, 0.4);

    img {
      transform: scale(1.04);
    }
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
    border-radius: 12px;
    img {
      border-radius: 10px;
    }
  }
`;

const ProfileBio = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    font-size: clamp(14.5px, 3.6vw, 16.5px);
    line-height: 1.8;
    color: ${theme.textBody};
    margin: 0;
  }

  strong {
    color: #fff;
  }
`;

const ResumeButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 12px 24px;
  margin-top: 20px;
  border-radius: ${theme.radii.pill};
  background: ${theme.accentGradient};
  color: #fff !important;
  font-weight: 700;
  font-size: 14.5px;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(56, 189, 248, 0.3);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  align-self: flex-start;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(56, 189, 248, 0.5);
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const BlockCard = styled(GlassCard)`
  padding: 32px;
  background: linear-gradient(150deg, rgba(20, 29, 49, 0.8) 0%, rgba(11, 17, 33, 0.9) 100%);

  @media (max-width: ${theme.breakpoints.tablet}) {
    padding: 22px 16px;
  }
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const SkillBadge = styled.div`
  font-size: 13.5px;
  color: #fff;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid ${theme.border};
  padding: 6px 14px;
  border-radius: ${theme.radii.pill};
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.25s ease;
  
  &:hover {
    border-color: ${theme.accent};
    background: rgba(56, 189, 248, 0.12);
    transform: translateY(-2px);
  }

  span.cat {
    color: ${theme.accent};
    font-weight: 700;
    font-size: 11px;
    text-transform: uppercase;
    background: rgba(56, 189, 248, 0.15);
    padding: 2px 6px;
    border-radius: 4px;
  }

  span.lvl {
    color: ${theme.textMuted};
    font-size: 11.5px;
  }

  @media (max-width: 480px) {
    font-size: 12.5px;
    padding: 5px 12px;
  }
`;

const ExperienceTimeline = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ExpItem = styled.div`
  padding: 24px;
  border-radius: ${theme.radii.md};
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid ${theme.border};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.borderGlow};
    background: rgba(56, 189, 248, 0.04);
  }

  @media (max-width: 480px) {
    padding: 16px 14px;
  }
`;

const ExpHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 14px;
  gap: 12px;
  
  @media (max-width: ${theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 8px;
  }
`;

const ExpCompany = styled.h3`
  font-size: clamp(18px, 4.8vw, 22px);
  font-weight: 800;
  color: ${theme.accent};
  margin: 0 0 4px 0;
`;

const ExpMeta = styled.div`
  display: flex;
  gap: 12px;
  font-size: 13.5px;
  color: ${theme.textMuted};
  margin-bottom: 12px;
  flex-wrap: wrap;
  
  span strong {
    color: #fff;
  }
`;

const BulletList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0;

  li {
    margin-bottom: 8px;
    padding-left: 18px;
    position: relative;
    color: ${theme.textBody};
    line-height: 1.6;
    font-size: clamp(14px, 3.6vw, 15.5px);
    
    &:before {
      content: '▹';
      color: ${theme.accent};
      position: absolute;
      left: 0;
      top: 0;
      font-size: 15px;
    }
  }
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const CertCard = styled.div`
  padding: 20px;
  border-radius: ${theme.radii.md};
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.border};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${theme.accent};
    transform: translateY(-3px);
  }

  .cert-name {
    font-weight: 700;
    font-size: 16px;
    color: #fff;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    font-weight: 600;
    color: ${theme.accent};
  }

  img {
    max-height: 80px;
    width: auto;
    object-fit: contain;
    border-radius: 6px;
  }
`;

const ToolGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 14px;
`;

const ToolBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid ${theme.border};
  color: ${theme.text};
  font-weight: 600;
  font-size: 14px;
  transition: all 0.25s ease;

  &:hover {
    border-color: ${theme.accent};
    background: rgba(56, 189, 248, 0.1);
    transform: translateY(-2px);
  }

  img {
    height: 20px;
    width: 20px;
    object-fit: contain;
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

  const heroImageSrc = about?.hero_image 
    ? getImageUrl(about.hero_image) 
    : "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1472&auto=format&fit=crop";

  return (
    <>
      <Helmet>
        <title>About Me - Dipendra Yadav | Software Developer Profile</title>
        <meta name="description" content="Learn more about Dipendra Yadav - Full stack engineer with expertise in Python, React, Flask, and scalable systems." />
        <meta name="author" content="Dipendra Yadav" />
        <link rel="canonical" href="https://www.dipendrakumaryadav.com.np/aboutme" />
      </Helmet>

      <HeroSection id="top">
        <Title>About <GradientText>Me</GradientText></Title>
        <Subtitle>Discover my technical background, core skill set, career trajectory, and achievements.</Subtitle>
      </HeroSection>

      <SiteContainer>
        <FadeInUp>
          <HeroImageWrapper>
            <img src={heroImageSrc} alt="Dipendra workspace banner" />
          </HeroImageWrapper>
        </FadeInUp>

        <ContentGrid>
          <TOCWrap>
            <TOCHeading>Quick Navigation</TOCHeading>
            <TOCList>
              <li><TOCLink href="#about">Bio & Overview</TOCLink></li>
              {skills.length > 0 && <li><TOCLink href="#skills">Core Skills</TOCLink></li>}
              {experiences.length > 0 && <li><TOCLink href="#experience">Work Experience</TOCLink></li>}
              {achievements.length > 0 && <li><TOCLink href="#achievements">Achievements</TOCLink></li>}
              {tools.length > 0 && <li><TOCLink href="#tools">Tools & Tech</TOCLink></li>}
              {languages.length > 0 && <li><TOCLink href="#languages">Languages</TOCLink></li>}
              {certs.length > 0 && <li><TOCLink href="#certificates">Certificates</TOCLink></li>}
            </TOCList>
          </TOCWrap>

          <MainContent>
            <section id="about">
              <SectionTitle>Who I Am</SectionTitle>
              <ProfileCard>
                <ProfileImageFrame>
                  <img src={getImageUrl(about?.hero_image) || "img/profile.jpg"} alt="Dipendra profile" />
                </ProfileImageFrame>
                <ProfileBio>
                  {about?.body ? (
                    <ReactMarkdown rehypePlugins={[rehypeRaw]}>{about.body}</ReactMarkdown>
                  ) : (
                    <p>Software developer dedicated to writing maintainable, production-ready code.</p>
                  )}
                  {about?.resume && (
                    <ResumeButton 
                      href={`${API_BASE_URL.replace("/api", "")}/api/download-resume`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      <span>Download Resume</span>
                    </ResumeButton>
                  )}
                </ProfileBio>
              </ProfileCard>
            </section>

            {skills.length > 0 && (
              <section id="skills">
                <SectionTitle>Core Skills & Expertise</SectionTitle>
                <BlockCard>
                  <BadgeContainer>
                    {skills.map(skill => (
                      <SkillBadge key={skill.id}>
                        {skill.category && <span className="cat">{skill.category}</span>}
                        <strong>{skill.name}</strong>
                        {skill.level && <span className="lvl">({skill.level})</span>}
                      </SkillBadge>
                    ))}
                  </BadgeContainer>
                </BlockCard>
              </section>
            )}

            {experiences.length > 0 && (
              <section id="experience">
                <SectionTitle>Work Experience</SectionTitle>
                <BlockCard>
                  <ExperienceTimeline>
                    {experiences.map((exp) => (
                      <ExpItem key={exp.id} id={`exp-${exp.id}`}>
                        <ExpHeader>
                          <div>
                            <ExpCompany>{exp.company_name}</ExpCompany>
                            <ExpMeta>
                              <span><strong>Role:</strong> {exp.role}</span>
                              <span><strong>Tenure:</strong> {exp.tenure}</span>
                            </ExpMeta>
                          </div>
                          {exp.company_logo && (
                            <img 
                              src={getImageUrl(exp.company_logo)} 
                              alt={exp.company_name} 
                              style={{ height: '36px', objectFit: 'contain' }}
                            />
                          )}
                        </ExpHeader>
                        <BulletList>
                          {exp.contributions.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </BulletList>
                      </ExpItem>
                    ))}
                  </ExperienceTimeline>
                </BlockCard>
              </section>
            )}

            {achievements.length > 0 && (
              <section id="achievements">
                <SectionTitle>Achievements & Recognitions</SectionTitle>
                <BlockCard>
                  <BulletList>
                    {achievements.map(ach => (
                      <li key={ach.id}>
                        <strong style={{ color: '#fff' }}>{ach.title}</strong>
                        {ach.description && <p style={{ fontSize: "14px", margin: "4px 0 0 0", color: theme.textMuted }}>{ach.description}</p>}
                      </li>
                    ))}
                  </BulletList>
                </BlockCard>
              </section>
            )}

            {tools.length > 0 && (
              <section id="tools">
                <SectionTitle>Tools & Technologies</SectionTitle>
                <BlockCard>
                  <ToolGrid>
                    {tools.map(tool => (
                      <ToolBadge key={tool.id}>
                        {tool.icon_url && <img src={getImageUrl(tool.icon_url)} alt="" />}
                        <span>{tool.name}</span>
                      </ToolBadge>
                    ))}
                  </ToolGrid>
                </BlockCard>
              </section>
            )}

            {languages.length > 0 && (
              <section id="languages">
                <SectionTitle>Languages</SectionTitle>
                <BlockCard>
                  <BadgeContainer>
                    {languages.map(lang => (
                      <SkillBadge key={lang.id}>
                        <strong>{lang.name}</strong>
                        {lang.level && <span className="lvl">({lang.level})</span>}
                      </SkillBadge>
                    ))}
                  </BadgeContainer>
                </BlockCard>
              </section>
            )}

            {certs.length > 0 && (
              <section id="certificates">
                <SectionTitle>Certificates & Credentials</SectionTitle>
                <BlockCard>
                  <CertGrid>
                    {certs.map((cert) => (
                      <CertCard key={cert.id}>
                        <div className="cert-name">{cert.name}</div>
                        {cert.image_url ? (
                          <img src={getImageUrl(cert.image_url)} alt={cert.name} />
                        ) : cert.link_url ? (
                          <a href={cert.link_url} target="_blank" rel="noopener noreferrer">
                            <span>View Credential</span>
                            <span>→</span>
                          </a>
                        ) : null}
                      </CertCard>
                    ))}
                  </CertGrid>
                </BlockCard>
              </section>
            )}
          </MainContent>
        </ContentGrid>
      </SiteContainer>
      <Footer linkText="Explore My Blogs →" linkTo="/blog" />
    </>
  );
}
