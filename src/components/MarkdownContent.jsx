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

  /* ===== Headings ===== */
  h1, h2, h3, h4, h5, h6 {
    color: ${theme.text};
    font-family: ${theme.fontHeading};
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.01em;
    margin-top: 2.5em;
    margin-bottom: 1em;

    /* subtle glow on headings */
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  h1 { font-size: 2.25rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.4rem; }
  h4 { font-size: 1.2rem; }

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
    margin-bottom: 1.5em;
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
    margin: 1.5em 0;
    padding-left: 2rem;
    color: ${theme.text};

    li {
      margin-bottom: 0.6em;
      line-height: 1.7;
    }

    p {
      margin-bottom: 0.3em;
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
    margin-top: 0.8em;
    margin-bottom: 0.8em;
  }

  /* ===== Blockquotes ===== */
  blockquote {
    border-left: 4px solid ${theme.accent};
    margin: 2em 0;
    padding: 1.5em 2em;
    background: rgba(56, 189, 248, 0.05);
    border-radius: 0 12px 12px 0;
    font-style: italic;
    color: ${theme.text};
    line-height: 1.8;
    position: relative;

    &::before {
      content: """;
      position: absolute;
      top: -12px;
      left: 16px;
      font-size: 48px;
      color: rgba(56, 189, 248, 0.2);
      font-family: Georgia, serif;
      line-height: 1;
    }

    p {
      margin-bottom: 0.5em;
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
    padding: 20px;
    margin: 1.5em 0;
    overflow-x: auto;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.3);

    code {
      background: transparent;
      padding: 0;
      color: #e2e8f0;
      font-size: 14px;
      line-height: 1.5;
      display: block;
      white-space: pre;
      overflow-x: auto;
    }
  }

  code {
    background: rgba(56, 189, 248, 0.1);
    border: 1px solid rgba(56, 189, 248, 0.2);
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.875em;
    color: #7dd3fc;
    line-height: 1.4;
    margin: 0 2px;
  }

  /* ===== Images ===== */
  img {
    max-width: 100%;
    height: auto;
    border-radius: 12px;
    margin: 2em auto;
    display: block;
    border: 1px solid ${theme.border};
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease;
  }

  img:hover {
    transform: scale(1.02);
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
    border-collapse: collapse;
    margin: 1.5em 0;
    font-size: 15px;
    overflow: hidden;
    border-radius: 8px;
    border: 1px solid ${theme.border};

    th, td {
      padding: 12px 16px;
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
    margin: 2.5em 0;
  }

  /* ===== Strong / emphasis ===== */
  strong {
    color: ${theme.text};
    font-weight: 600;
  }
`;

export default MarkdownContent;