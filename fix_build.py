import re

# Fix ai-engine/page.tsx
with open('src/app/ai-engine/page.tsx', 'r') as f:
    content = f.read()

content = re.sub(r"import AIVisualizer.*?\n", "", content)
content = re.sub(r"import TacticalBoard3D.*?\n", "", content)
content = re.sub(r"<AIVisualizer\s*/>", "", content)
content = re.sub(r"<TacticalBoard3D\s*/>", "", content)

with open('src/app/ai-engine/page.tsx', 'w') as f:
    f.write(content)

# Fix labs/page.tsx
with open('src/app/labs/page.tsx', 'r') as f:
    content = f.read()

content = re.sub(r"import TacticalBoard3D.*?\n", "", content)
content = re.sub(r"<TacticalBoard3D\s*/>", "", content)

with open('src/app/labs/page.tsx', 'w') as f:
    f.write(content)

