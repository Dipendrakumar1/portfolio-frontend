import re

filepath = r'd:\SurakshamPro\Dynamic-website\frontend\src\components\BlogDetail.jsx'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Fix: Line 241 (0-indexed: 240) has excessive spaces before <ContentCard>
# Also remove duplicate lines 247-250 (0-indexed: 246-249)
# Line 241 should be: '        <ContentCard>\n' (8 spaces)
# Lines 242-246 are correct
# Lines 247-248: duplicate ReactMarkdown + /MarkdownContent - DELETE
# Line 249: blank - DELETE
# Line 250: duplicate <LikeSection> - DELETE
# Line 251: <LikeButton> - KEEP

fixed_lines = []
for i, line in enumerate(lines):
    lineno = i + 1  # 1-indexed
    
    # Fix line 241: excessive indentation on ContentCard
    if lineno == 241:
        fixed_lines.append('        <ContentCard>\n')
        continue
    
    # Skip duplicate lines 247-250
    if lineno in (247, 248, 249, 250):
        continue
    
    fixed_lines.append(line)

content_fixed = ''.join(fixed_lines)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(content_fixed)

print(f"Fixed BlogDetail.jsx - {len(fixed_lines)} lines (was {len(lines)} lines)")
print("Removed 4 duplicate/corrupted lines and fixed ContentCard indentation")

