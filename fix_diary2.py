#!/usr/bin/env python3
"""Remove old DiaryDetail.jsx content and add new component body."""
fpath = r'd:\SurakshamPro\Dynamic-website\frontend\src\components\DiaryDetail.jsx'

with open(fpath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Find the line with the closing BackLink component (search for the pattern)
# After the BackLink `;` ending, we need to cut everything and add the new component
# The new BackLink ends with: `\`;` on its own line
cutoff = None
for i, line in enumerate(lines):
    # The BackLink styled component ends with a backtick-semicolon
    # After that, the old Page styled component starts
    if 'const Page = styled' in line and i > 100:
        cutoff = i
        break

if cutoff is None:
    print("ERROR: Could not find cutoff point")
else:
    # Keep everything up to the cutoff
    new_lines = lines[:cutoff]
    print(f"Keeping {cutoff} lines, removing old content from line {cutoff+1}")

    # Now we need to remove trailing old styled components that come BEFORE the Page
    # Actually, looking at the file, after BackLink ends with `;`, the old
    # Footer, FooterSeparator, etc. start, and then the old component body
    # Let's find the actual end of the BackLink styled component
    
    # Find the line with just ```;` after BackLink
    backlink_end = None
    for i in range(100, len(lines)):
        if lines[i].strip() == '`;' or lines[i].strip() == '`;':
            # Check if this is after BackLink
            backlink_end = i + 1  # keep this line, remove everything after
            break
    
    if backlink_end:
        new_lines = lines[:backlink_end]
        print(f"Keeping up to line {backlink_end} (BackLink end)")

# The new component body to append
component_body = '''
export default function DiaryDetail() {
  const { slug } = useParams();
  const [diary, setDiary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API_BASE_URL}/diaries/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Diary not found");
        return res.json();
      })
      .then((data) => {
        setDiary(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <Page>
        <SiteContainer>
          <LoadingContainer>Loading entry...</LoadingContainer>
        </SiteContainer>
      </Page>
    );
  }

  if (!diary) {
    return (
      <Page>
        <SiteContainer>
          <LoadingContainer>Diary entry not found.</LoadingContainer>
        </SiteContainer>
      </Page>
    );
  }

  return (
    <>
      <Helmet>
        <title>{diary.month_label} - My Diary</title>
        <meta name="description" content={diary.summary?.replace(/[#*`_\\\\[\\\\]\\\\\\\\(\\\\)]/g, '').substring(0, 160) || "Personal diary entry"} />
        <meta property="og:title" content={diary.month_label} />
        <meta property="og:description" content={diary.summary?.replace(/[#*`_\\\\[\\\\]\\\\\\\\(\\\\)]/g, '').substring(0, 160) || "Personal diary entry"} />
        <meta property="og:type" content="article" />
      </Helmet>
      <Page>
        <SiteContainer>
          <BackLink to="/mydiary">Back to all entries</BackLink>

          {/* HEADER */}
          <Section>
            <Heading>{diary.month_label}</Heading>
            <Separator />
            <Paragraph>{diary.date} · {diary.author} · ({diary.word_count} words)</Paragraph>
            {diary.summary && (
              <MarkdownContent>
                <ReactMarkdown rehypePlugins={[rehypeRaw]}>{diary.summary}</ReactMarkdown>
              </MarkdownContent>
            )}
          </Section>

          {/* TABLE OF CONTENTS */}
          {diary.sections && diary.sections.length > 0 && (
            <Section>
              <Heading>Contents</Heading>
              <br />
              {diary.sections.map((section, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <SubHeadingLink href={`#section-${index}`}>
                    {section.title}
                  </SubHeadingLink>
                </div>
              ))}
            </Section>
          )}

          {/* SECTIONS */}
          {diary.sections && diary.sections.map((section, index) => (
            <Section id={`section-${index}`} key={index}>
              <SubHeadingLink href={`#section-${index}`}>
                {section.title}
              </SubHeadingLink>
              <br /><br />
              {section.bullets && (
                <BulletList>
                  {section.bullets.map((bullet, bIndex) => (
                    <li key={bIndex}>
                      <MarkdownContent>
                        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{bullet.text}</ReactMarkdown>
                      </MarkdownContent>
                    </li>
                  ))}
                </BulletList>
              )}
            </Section>
          ))}
        </SiteContainer>

        <Footer linkText="Read more entries →" linkTo="/mydiary" />
      </Page>
    </>
  );
}
'''

new_lines.append(component_body)
content = ''.join(new_lines)

with open(fpath, 'w', encoding='utf-8') as f:
    f.write(content)

print(f"DiaryDetail.jsx rewritten successfully - {len(content.splitlines())} lines")
