with open('src/app/HomeClient.tsx', 'r') as f:
    content = f.read()

content = content.replace(
    'Singles Masterclass',
    'Vlado Platenik Clutch Singles Academy'
)

content = content.replace(
    'Doubles Mastery',
    'Dan Kiernan Clutch Doubles Academy'
)

content = content.replace(
    'Expert Match Analysis',
    'Clutch Command'
)

content = content.replace(
    'Our coaching team reviews your training footage frame-by-frame to expose your pressure leaks and prescribe targeted interventions.',
    'Upload your training footage to the members area for our proprietary AI and coaching team to identify your cognitive breakdowns under pressure.'
)

with open('src/app/HomeClient.tsx', 'w') as f:
    f.write(content)
