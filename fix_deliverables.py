with open('src/app/HomeClient.tsx', 'r') as f:
    content = f.read()

content = content.replace('3D Memory Surface Report', 'Training Diagnostic Report')
content = content.replace(
    'A comprehensive digital dashboard breaking down your training footage. See your exact CQ score and where your pressure threshold broke.',
    'A comprehensive breakdown of your submitted training footage. See your exact CQ score and which cognitive load triggers need attention.'
)

with open('src/app/HomeClient.tsx', 'w') as f:
    f.write(content)
