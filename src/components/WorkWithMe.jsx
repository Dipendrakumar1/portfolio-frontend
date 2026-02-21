import React from "react";
import styled from "styled-components";
import { API_BASE_URL } from "../api";
import { theme, SiteContainer, GlassCard, GradientText } from "../styles/GlobalStyles";

const HeroSection = styled.section`
  padding: 80px 0 40px;
  text-align: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    width: 50vw;
    height: 50vw;
    background: ${theme.accent};
    filter: blur(150px);
    opacity: 0.08;
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`

const Title = styled.h1`
  font-size: clamp(40px, 7vw, 64px);
  margin-bottom: 24px;
  letter-spacing: -1px;
`

const Subtitle = styled.p`
  font-size: clamp(18px, 2.5vw, 22px);
  color: ${theme.textMuted};
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 40px;
`

const ContactCard = styled(GlassCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 48px 32px;
  gap: 24px;
  
  &:hover {
    transform: translateY(-8px);
    background: rgba(56, 189, 248, 0.1);
  }
`

const IconCircle = styled.div`
  width: 80px;
  height: 80px;
  background: ${theme.accentGradient};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 16px rgba(56, 189, 248, 0.3);
  
  img {
    width: 40px;
    height: 40px;
    filter: brightness(0) invert(1);
  }
`

const CardTitle = styled.h3`
  font-size: 24px;
  margin: 0;
`

const CardText = styled.p`
  font-size: 16px;
  margin: 0;
  color: ${theme.textMuted};
`

const ActionButton = styled.a`
  display: inline-block;
  padding: 14px 32px;
  background: ${theme.accentGradient};
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(56, 189, 248, 0.4);
    color: white;
  }
`

const EmailAddress = styled.div`
  font-size: 14px;
  color: ${theme.textMuted};
  margin-top: 4px;
  letter-spacing: 0.3px;
  
  code {
    background: rgba(255,255,255,0.07);
    border: 1px solid ${theme.border};
    padding: 4px 10px;
    border-radius: 8px;
    font-size: 13px;
    color: ${theme.accent};
    user-select: all;
  }
`

const InfoSection = styled.section`
  margin-top: 100px;
  padding-bottom: 80px;
`

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  
  @media (max-width: ${theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`

const InfoImage = styled.img`
  width: 100%;
  border-radius: 20px;
  box-shadow: ${theme.shadows.glass};
  border: 1px solid ${theme.border};
`

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 24px;
  
  li {
    margin-bottom: 16px;
    padding-left: 32px;
    position: relative;
    color: ${theme.text};
    font-size: 18px;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: ${theme.accent};
      font-weight: bold;
      font-size: 20px;
    }
  }
`

export default function WorkWithMe() {
  const [contactInfo, setContactInfo] = React.useState({
    whatsapp: "+917742228345", // Fallback to provided info
    email: "dipendrayadav299@gmail.com"
  });

  React.useEffect(() => {
    fetch(`${API_BASE_URL}/about`)
      .then(res => res.json())
      .then(data => {
        if (data.whatsapp || data.email) {
          setContactInfo({
            whatsapp: data.whatsapp || contactInfo.whatsapp,
            email: data.email || contactInfo.email
          });
        }
      })
      .catch(err => console.error("Error fetching contact info:", err));
  }, []);

  return (
    <SiteContainer>
      <HeroSection>
        <Title>Let's Build Something <GradientText>Amazing Together</GradientText></Title>
        <Subtitle>
          I'm currently available for freelance work and interesting projects.
          Whether you have a fully-formed idea or just the start of something, I'd love to hear from you.
        </Subtitle>
      </HeroSection>

      <Grid>
        <ContactCard>
          <IconCircle>
            <img src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000" alt="WhatsApp" />
          </IconCircle>
          <CardTitle>WhatsApp</CardTitle>
          <CardText>Fastest way to get in touch for a quick chat or project inquiry.</CardText>
          <ActionButton href={`https://wa.me/${contactInfo.whatsapp?.replace('+', '')}`} target="_blank" rel="noopener noreferrer">
            Message on WhatsApp
          </ActionButton>
        </ContactCard>

        <ContactCard>
          <IconCircle>
            <img src="https://img.icons8.com/?size=100&id=12580&format=png&color=000000" alt="Email" />
          </IconCircle>
          <CardTitle>Email Me</CardTitle>
          <CardText>For detailed project proposals or long-form communication.</CardText>
          <ActionButton
            href={`https://mail.google.com/mail/?view=cm&to=${contactInfo.email}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Send an Email
          </ActionButton>
        </ContactCard>
      </Grid>

      <InfoSection>
        <InfoGrid>
          <div>
            <h2 style={{ fontSize: '32px' }}>Why <GradientText>Work With Me?</GradientText></h2>
            <p style={{ marginTop: '20px', fontSize: '18px' }}>
              I bring a unique blend of technical expertise and eye for design to every project.
              My goal is not just to write code, but to solve problems and deliver value.
            </p>
            <List>
              <li>Expertise in React, Node.js, and Modern Web Tech</li>
              <li>Focus on Performance and SEO best practices</li>
              <li>Clean, Maintainable, and Scalable Codebase</li>
              <li>Direct Communication & Regular Updates</li>
              <li>User-Centric Design Thinking</li>
            </List>
          </div>
          <InfoImage src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1470&auto=format&fit=crop" alt="Collaboration" />
        </InfoGrid>
      </InfoSection>
    </SiteContainer>
  );
}
