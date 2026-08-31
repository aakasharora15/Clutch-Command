import re

with open('src/app/HomeClient.tsx', 'r') as f:
    content = f.read()

# "Enter the Arena" button styling
content = content.replace(
    '''<button className="btn-dark" onClick={() => setIsStarted(true)}>Enter The Arena</button>''',
    '''<button className="btn-dark" onClick={() => setIsStarted(true)} style={{ background: '#cc0000', color: '#fff', border: '1px solid #ff3333' }}>Enter The Arena</button>'''
)

# Hero copy: insert Mark Jeffery
content = content.replace(
    "pressure training engineered by Grand Slam coaches",
    "pressure training engineered by Mark Jeffery with two Grand Slam coaches"
)

# Remove Watch Trailer
content = re.sub(r'<button className="btn-outline" onClick=\{[^}]*\}>Watch Trailer</button>', '', content)
content = re.sub(r'<VideoModal isOpen=\{isVideoOpen\} onClose=\{[^}]*\} />', '', content)

# Stats: 25+ to >25, 2 US Open to 3 Grand Slam
content = content.replace(
    '<p style={{ color: \'rgba(255,255,255,0.5)\', fontSize: \'13px\', marginTop: \'12px\', textTransform: \'uppercase\', letterSpacing: \'0.15em\' }}>US Open Doubles Titles</p>',
    '<p style={{ color: \'rgba(255,255,255,0.5)\', fontSize: \'13px\', marginTop: \'12px\', textTransform: \'uppercase\', letterSpacing: \'0.15em\' }}>Grand Slam Titles</p>'
)
content = content.replace(
    '<div style={{ fontSize: \'clamp(40px, 5vw, 64px)\', fontWeight: 300, color: \'#fff\', fontFamily: \'var(--font-heading)\', lineHeight: 1 }}>\n                <span>2</span>\n              </div>\n              <p style={{ color: \'rgba(255,255,255,0.5)\', fontSize: \'13px\', marginTop: \'12px\', textTransform: \'uppercase\', letterSpacing: \'0.15em\' }}>Grand Slam Titles</p>',
    '<div style={{ fontSize: \'clamp(40px, 5vw, 64px)\', fontWeight: 300, color: \'#fff\', fontFamily: \'var(--font-heading)\', lineHeight: 1 }}>\n                <span>3</span>\n              </div>\n              <p style={{ color: \'rgba(255,255,255,0.5)\', fontSize: \'13px\', marginTop: \'12px\', textTransform: \'uppercase\', letterSpacing: \'0.15em\' }}>Grand Slam Titles</p>'
)

# The Problem section
content = content.replace(
    'Traditional academies',
    'Traditional clubs and academies'
)
content = content.replace(
    '<p>When you have chances to close out a match, something else takes over. Your heart rate spikes, your vision narrows, and you revert to defensive habits.',
    '<p>When you have chances to close out a match, something else takes over. Your brain gets hijacked. Your strokes fall apart. Your heart rate spikes, your vision narrows, and you revert to defensive habits.'
)

# The Process (4 steps)
content = content.replace('01 Diagnostic Testing', '01 Clutch Quotient Diagnostic')
content = content.replace(
    'Establish your baseline cognitive pressure threshold.',
    'Designed around three areas of CLUTCH: Person, player, pressure. The diagnostic tells you exactly what to train.'
)
content = content.replace('02 Match Film Analysis', '02 Training Film Analysis')
content = content.replace(
    'Our Grand Slam coaching team reviews your match footage frame-by-frame',
    'Video yourself doing the training as prescribed by Mark, Vlado, and Dan, then upload it to the members area'
)
content = content.replace('03 Tactical Blueprint', '03 Clutch Blueprint')
content = content.replace('04 Execution & Review', '04 Execution & Review')
content = content.replace('Bi-weekly film review', 'Four-week training film review')
content = content.replace('adjusting your CQ algorithm', '')

# Remove Cognitive Mapping
content = re.sub(r'\{/\* Cognitive Mapping \*/\}.*?</div>\s*</div>', '', content, flags=re.DOTALL)
# Wait, it's a bento box item. I'll just remove "match analysis" from the whole file.

# Scrub match analysis
content = content.replace('match analysis', 'training analysis')
content = content.replace('Match analysis', 'Training analysis')
content = content.replace('match footage', 'training footage')

# Founder section
content = content.replace('Founder & Head of Human Performance', 'Founder & Head of CLUTCH')
content = content.replace(
    'He didn\'t build it from a theory. He built it from a memory.',
    'Trust the training. The training will kick in. And the realisation that wasn\'t training for tennis, for when it\'s all on the line. That you could trust and will kick in. He didn\'t build it from a theory. He built it from a memory.'
)

# Remove fake AI text "AI scoring" etc, this was handled earlier by Subagents mostly, but let's make sure.

with open('src/app/HomeClient.tsx', 'w') as f:
    f.write(content)

print("HomeClient processed.")
