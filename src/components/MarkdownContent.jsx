import React from "react";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";

/**
 * MarkdownContent – an elevated typography system designed for high
 * reading comprehension, clarity, and visual beauty for tech blogs,
 * diary entries, and project descriptions.
 */
const MarkdownContent = styled.div`
  /* ===== Base typography ===== */
  font-size: 17.5px;
  line-height: 1.85;
  color: ${theme.textBody};
  font-family: ${theme.fontBody};
  letter-spacing: -0.01em;

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 16px;
    line-height: 1.75;
  }

  /* ===== Headings ===== */
  h1, h2, h3, h4, h5, h6 {
    color: ${theme.text};
    font-family: ${theme.fontHeading};
    font-weight: 800;
    line-height: 1.3;
    letter-spacing: -0.025em;
    margin-top: 2em;
    margin-bottom: 0.8em;
  }

  h1 { 
    font-size: clamp(26px, 4vw, 34px);
    border-bottom: 1px solid ${theme.border};
    padding-bottom: 0.4em;
  }
  
  h2 { 
    font-size: clamp(22px, 3.2vw, 28px);
    position: relative;
    padding-bottom: 0.35em;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 42px;
      height: 3px;
      background: ${theme.accentGradient};
      border-radius: 2px;
    }
  }
  
  h3 { 
    font-size: clamp(18px, 2.6vw, 22px);
    color: ${theme.accentHover};
    font-weight: 700;
  }
  
  h4 { 
    font-size: clamp(16px, 2.2vw, 19px);
    color: #fff;
  }

  /* ===== Paragraphs ===== */
  p {
    margin-bottom: 1.4em;
    color: ${theme.textBody};
  }

  /* ===== Links ===== */
  a {
    color: ${theme.accent};
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1.5px;
    font-weight: 600;
    transition: all 0.2s ease;

    &:hover {
      color: ${theme.accentHover};
      text-decoration-color: ${theme.accentHover};
      text-shadow: 0 0 10px rgba(56, 189, 248, 0.4);
    }
  }

  /* ===== Lists ===== */
  ul, ol {
    margin: 1.4em 0;
    padding-left: 1.6rem;
    color: ${theme.textBody};

    li {
      margin-bottom: 0.6em;
      line-height: 1.75;

      &::marker {
        color: ${theme.accent};
        font-weight: bold;
      }
    }

    p {
      margin-bottom: 0.3em;
    }
  }

  /* ===== Blockquotes ===== */
  blockquote {
    border-left: 4px solid ${theme.accent};
    margin: 1.8em 0;
    padding: 18px 24px;
    background: linear-gradient(90deg, rgba(56, 189, 248, 0.08) 0%, rgba(15, 23, 42, 0.4) 100%);
    border-radius: 0 12px 12px 0;
    font-style: italic;
    color: #f1f5f9;
    line-height: 1.75;
    position: relative;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);

    p {
      margin-bottom: 0;
    }
  }

  /* ===== Inline & Block Code ===== */
  code {
    font-family: ${theme.fontMono};
    background: rgba(56, 189, 248, 0.12);
    border: 1px solid rgba(56, 189, 248, 0.25);
    padding: 2px 7px;
    border-radius: 6px;
    font-size: 0.88em;
    color: ${theme.accentHover};
    font-weight: 500;
  }

  pre {
    background: #080d1a;
    border: 1px solid ${theme.border};
    border-radius: 12px;
    padding: 20px 24px;
    margin: 1.8em 0;
    overflow-x: auto;
    box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.5), 0 4px 20px rgba(0, 0, 0, 0.25);

    code {
      background: transparent;
      border: none;
      padding: 0;
      color: #e2e8f0;
      font-size: 14px;
      line-height: 1.65;
      display: block;
      white-space: pre;
    }
  }

  /* ===== Images & Figures ===== */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 14px;
    margin: 2em auto;
    display: block;
    border: 1px solid ${theme.border};
    box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
    transition: transform 0.4s ease;
  }

  img:hover {
    transform: scale(1.015);
  }

  figure {
    margin: 2em 0;
    text-align: center;

    figcaption {
      color: ${theme.textMuted};
      font-size: 14px;
      margin-top: 0.8em;
      font-style: italic;
    }
  }

  /* ===== Tables ===== */
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    margin: 1.8em 0;
    font-size: 15px;
    overflow: hidden;
    border-radius: 10px;
    border: 1px solid ${theme.border};
    background: rgba(15, 23, 42, 0.4);

    th, td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid rgba(56, 189, 248, 0.12);
    }

    th {
      background: rgba(56, 189, 248, 0.1);
      color: #fff;
      font-weight: 700;
      letter-spacing: 0.03em;
      text-transform: uppercase;
      font-size: 13px;
    }

    td {
      color: ${theme.textBody};
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: rgba(56, 189, 248, 0.04);
    }
  }

  /* ===== Horizontal rules ===== */
  hr {
    border: none;
    height: 1px;
    background: linear-gradient(90deg, transparent, ${theme.borderStrong}, transparent);
    margin: 2.5em 0;
  }

  /* ===== Strong / Emphasis ===== */
  strong, b {
    color: #ffffff;
    font-weight: 700;
  }

  em, i {
    color: #e2e8f0;
  }
`;

export default MarkdownContent;