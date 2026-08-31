import os
import re

files_to_fix = [
    'src/app/offer/page.tsx',
    'src/app/terms/page.tsx',
    'src/app/promises/page.tsx',
    'src/app/ai-engine/page.tsx'
]

for file_path in files_to_fix:
    with open(file_path, 'r') as f:
        content = f.read()

    # Generic replacements
    content = content.replace('match footage', 'training footage')
    content = content.replace('match play', 'pressure training')
    content = content.replace('Upload your match footage and let our proprietary AI engine score you against the 30 variables of the Clutch Quotient.', 'Upload your training footage and let our coaching team analyze your mechanics and decision-making.')
    content = content.replace('Upload your training footage and let our proprietary AI engine score you against the 30 variables of the Clutch Quotient.', 'Upload your training footage and let our coaching team analyze your mechanics and decision-making.')
    
    with open(file_path, 'w') as f:
        f.write(content)

print("Match analysis terminology scrubbed.")
