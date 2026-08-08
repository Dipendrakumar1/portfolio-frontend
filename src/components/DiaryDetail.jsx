import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams, Link } from "react-router-dom";
import { API_BASE_URL } from "../api";
import { theme, SiteContainer } from "../styles/GlobalStyles";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import MarkdownContent from "./MarkdownContent";
import Footer from '../components/Footer';
import { Helmet } from 'react-helmet-async';

const Page = styled.div`
  background: ${theme.bg};
  color: ${theme.text};
  width: 100%;
  min-height: 100vh;
  font-family: ${theme.fontBody};
  padding: 40px 0;
`;

const Container = styled.div`
  width: 85%;
  margin: auto;

  @media (max-width: ${theme.breakpoints.tablet}) {
    width: 95%;
  }
`;

const Section = styled.div`
  padding: 40px 0;
`;

const Heading = styled.div`
  font-size: 22px;
  font-weight: 700;
  color: ${theme.text};
  font-family: ${theme.fontHeading};
`;

const Separator = styled.div`
  color: ${theme.textMuted};
  margin: 10px 0 25px 0;
  font-size: 14px;

  &::before {
    content: "";
    display: block;
    width: 60px;
    height: 3px;
    background: ${theme.accentGradient};
    border-radius: 2px;
    margin-bottom: 20px;
  }
`;

const Paragraph = styled.p`
  line-height: 1.7;
  margin-bottom: 20px;
  color: ${theme.textMuted};
  font-size: 16px;
`;

const SubHeadingLink = styled.a`
  font-size: 18px;
  color: ${theme.text};
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
  margin-bottom: 8px;
  transition: all 0.2s ease;

  &:hover {
    color: ${theme.accent};
  }
`;

const BulletList = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 0 0 32px 0;

  li {
    margin-bottom: 24px;
    padding-left: 32px;
    position: relative;
    line-height: 1.6;
    color: ${theme.text};

    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 10px;
      height: 10px;
      background: ${theme.accent};
      border-radius: 50%;
      margin-top: 4px;
    }
  }
`;

const LoadingContainer = styled.div`
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.textMuted};
  font-size: 18px;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${theme.textMuted};
  margin-bottom: 32px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s ease;

  &:before {
    content: '';
    transition: transform 0.2s ease;
  }

  &:hover {
    color: ${theme.accent};

    &:before {
      transform: translateX(-4px);
    }
  }
`;