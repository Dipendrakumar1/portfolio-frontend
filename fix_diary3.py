#!/usr/bin/env python3
"""Remove old duplicate DiaryDetail.jsx content after BackLink."""

fpath = r'd:\SurakshamPro\Dynamic-website\frontend\src\components\DiaryDetail.jsx'

with open(fpath, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the second occurrence of "const Section = styled.div"
first_idx = content.find('const Section = styled.div')
second_idx = content.find('const Section = styled.div', first_idx + 1)

if second_idx == -1:
    print("ERROR: Could not find second Section definition")
else:
    kept = content[:second_idx].rstrip()
    print(f"Keeping content up to char {second_idx}")
    print(f"Last 100 chars kept: ...{kept[-100:]}")
    
    with open(fpath, 'w', encoding='utf-8') as f:
        f.write(kept)
    print(f"Trimmed file to {len(kept.splitlines())} lines")
