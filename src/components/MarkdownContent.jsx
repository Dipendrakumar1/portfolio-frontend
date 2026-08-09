import React from "react";
import styled from "styled-components";
import { theme } from "../styles/GlobalStyles";

/**
 * MarkdownContent – a styled wrapper that provides beautiful, readable
 * typography for all Markdown / HTML content rendered by ReactMarkdown.
 *
 * Usage:
 *   <MarkdownContent>
 *     <ReactMarkdown rehypePlugins={[rehypeRaw]}>{rawContent}</ReactMarkdown>
 *   </MarkdownContent>
 */
const MarkdownContent = styled.div`
  /* ===== Base typography ===== */
  font-size: 18px;
  line-height: 1.75;
  color: ${theme.text}; /* bright white-gray for readability */
  font-family: ${theme.fontBody};

  @media (max-width: ${theme.breakpoints.tablet}) {
    font-size: 16px;
    line-height: 1.6;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 1.5;
  }

  /* ===== Headings ===== */
  h1, h2, h3, h4, h5, h6 {
    color: ${theme.text};
    font-family: ${theme.fontHeading};
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.01em;
    margin-top: 1.75em;
    margin-bottom: 0.75em;

    /* subtle glow on headings */
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  h1 { 
    font-size: clamp(28px, 5vw, 2.25rem);
    
    @media (max-width: 480px) {
      font-size: 24px;
    }
  }
  
  h2 { 
    font-size: clamp(22px, 4vw, 1.75rem);
    
    @media (max-width: 480px) {
      font-size: 20px;
    }
  }
  
  h3 { 
    font-size: clamp(18px, 3.5vw, 1.4rem);
    
    @media (max-width: 480px) {
      font-size: 17px;
    }
  }
  
  h4 { 
    font-size: clamp(16px, 3vw, 1.2rem);
    
    @media (max-width: 480px) {
      font-size: 15px;
    }
  }

  /* accent underline for h2/h3 */
  h2, h3 {
    position: relative;
    padding-bottom: 0.4em;

    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: ${theme.accentGradient};
      border-radius: 2px;
      transform: translateY(0.6em);
    }
  }

  /* ===== Paragraphs ===== */
  p {
    margin-bottom: 1.25em;
    color: ${theme.text};
  }

  /* ===== Links ===== */
  a {
    color: ${theme.accent};
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    transition: all 0.2s ease;
    font-weight: 500;

    &:hover {
      color: ${theme.accentHover};
      text-decoration-thickness: 2px;
    }
  }

  /* ===== Lists ===== */
  ul, ol {
    margin: 1.25em 0;
    padding-left: 1.5rem;
    color: ${theme.text};

    li {
      margin-bottom: 0.5em;
      line-height: 1.6;
    }

    p {
      margin-bottom: 0.25em;
    }
  }

  ul {
    list-style-type: disc;
  }

  ol {
    list-style-type: decimal;
  }

  /* nested lists */
  ul ul, ol ol, ul ol, ol ul {
    margin-top: 0.6em;
    margin-bottom: 0.6em;
  }

  /* ===== Blockquotes ===== */
  blockquote {
    border-left: 4px solid ${theme.accent};
    margin: 1.5em 0;
    padding: 1em 1.25em;
    background: rgba(56, 189, 248, 0.05);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: ${theme.text};
    line-height: 1.6;
    position: relative;

    &::before {
      content: """;
      position: absolute;
      top: -8px;
      left: 8px;
      font-size: 32px;
      color: rgba(56, 189, 248, 0.2);
      font-family: Georgia, serif;
      line-height: 1;
    }

    p {
      margin-bottom: 0.4em;
    }
  }

  /* ===== Code blocks ===== */
  pre, code {
    font-family: "Fira Code", "Fira Mono", "JetBrains Mono", source-code-pro,
      Menlo, Monaco, Consolas, "Courier New", monospace;
    border-radius: 8px;
  }

  pre {
    background: rgba(15, 23, 42, 0.8);
    border: 1px solid ${theme.border};
    border-radius: 12px;
    padding: 16px;
    margin: 1.25em 0;
    overflow-x: auto;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);

    code {
      background: transparent;
      padding: 0;
      color: #e2e8f0;
      font-size: 13px;
      line-height: 1.5;
      display: block;
      white-space: pre;
      overflow-x: auto;
    }
  }

  code {
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.2);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.85em;
    color: #7dd3fc;
    line-height: 1.3;
    margin: 0 2px;
  }

  /* ===== Images ===== */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 1.5em auto;
    display: block;
    border: 1px solid ${theme.border};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.02);
  }

  figure {
    margin: 1.5em 0;
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
    border-collapse: collapse;
    margin: 1.25em 0;
    font-size: 15px;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid ${theme.border};

    th, td {
      padding: 10px 12px;
      text-align: left;
      border-bottom: 1px solid ${theme.border};
    }

    th {
      background: rgba(56, 189, 248, 0.08);
      color: ${theme.text};
      font-weight: 600;
    }

    td {
      color: ${theme.textMuted};
    }

    tr:last-child td {
      border-bottom: none;
    }

    tr:hover td {
      background: rgba(56, 189, 248, 0.03);
    }
  }

  /* ===== Horizontal rules ===== */
  hr {
    border: none;
    height: 1px;
    background: ${theme.border};
    margin: 2em 0;
  }

  /* ===== Strong / emphasis ===== */
  strong {
    color: ${theme.text};
    font-weight: 600;
  }
`;

export default MarkdownContent;