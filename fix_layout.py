with open('src/app/layout.tsx', 'r') as f:
    content = f.read()

if 'StickyCTA' not in content:
    content = content.replace(
        'import Footer from "@/components/Footer";',
        'import Footer from "@/components/Footer";\nimport StickyCTA from "@/components/StickyCTA";'
    )
    content = content.replace(
        '<Footer />',
        '<Footer />\n          <StickyCTA />'
    )
    with open('src/app/layout.tsx', 'w') as f:
        f.write(content)
