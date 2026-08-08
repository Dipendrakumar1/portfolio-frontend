import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { theme } from '../styles/GlobalStyles';

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

const socialLinks = [
  {
    href: "https://github.com/Dipendrakumar1",
    src: "https://img.icons8.com/?size=100&id=12598&format=png&color=000000",
    alt: "GitHub"
  },
  {
    href: "https://www.linkedin.com/in/dipendra-kumar-yadav-37b663216/",
    src: "https://img.icons8.com/?size=100&id=447&format=png&color=000000",
    alt: "LinkedIn"
  },
  {
    href: "https://x.com/Dipendr29983389?t=mohL1QRH8N9lYVLviSomfA&s=09",
    src: "https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=000000",
    alt: "Twitter"
  },
  {
    href: "https://www.instagram.com/dipendrayad_?igsh=ZjFpNWQyeDlpZHZ6",
    src: "https://img.icons8.com/?size=100&id=eRJfQw0Zs44S&format=png&color=000000",
    alt: "Instagram"
  },
  {
    href: "https://www.youtube.com/@DipendraKumarYadav-y3q",
    src: "https://img.icons8.com/?size=100&id=19318&format=png&color=000000",
    alt: "YouTube"
  }
];

export default function FooterComponent({ linkText, linkTo }) {
  return (
    <Footer>
      <FooterSeparator>READ OTHER POSTS</FooterSeparator>
      <FooterLink to={linkTo}>{linkText}</FooterLink>
      <SocialIcons>
        {socialLinks.map((social, index) => (
          <a 
            key={index} 
            href={social.href} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img src={social.src} alt={social.alt} width="28" height="28" />
          </a>
        ))}
      </SocialIcons>
    </Footer>
  );
}