import re

# Fix ai-engine/page.tsx
with open('src/app/ai-engine/page.tsx', 'r') as f:
    content = f.read()

# Replace empty ScrollReveal
content = re.sub(r'<ScrollReveal[^>]*>\s*</ScrollReveal>', '', content)

with open('src/app/ai-engine/page.tsx', 'w') as f:
    f.write(content)

# Fix labs/page.tsx
with open('src/app/labs/page.tsx', 'r') as f:
    content = f.read()

content = re.sub(r'<ScrollReveal[^>]*>\s*</ScrollReveal>', '', content)

with open('src/app/labs/page.tsx', 'w') as f:
    f.write(content)

