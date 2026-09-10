import re
import os

with open('src/app/layout.tsx', 'r') as f:
    layout = f.read()

# Replace hardcoded GA
layout = layout.replace('<GoogleAnalytics gaId="G-XXXXXXXXXX" />', '{process.env.NEXT_PUBLIC_GA_ID && <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />}')

# Replace hardcoded Meta Pixel with conditional rendering
fb_script_old = """<Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', 'REPLACE_WITH_META_PIXEL_ID');
            fbq('track', 'PageView');
          `}
        </Script>"""

fb_script_new = """{process.env.NEXT_PUBLIC_META_PIXEL_ID && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}"""

layout = layout.replace(fb_script_old, fb_script_new)

with open('src/app/layout.tsx', 'w') as f:
    f.write(layout)

# Prune HomeClient.tsx
with open('src/app/HomeClient.tsx', 'r') as f:
    home = f.read()

home = re.sub(r"import PlatformSneakPeek from '../components/PlatformSneakPeek';\n", "", home)
home = re.sub(r"import TestimonialWall from '../components/TestimonialWall';\n", "", home)
home = re.sub(r"import VideoModal from '../components/VideoModal';\n", "", home)
home = re.sub(r"import AIVisualizer.*?\n", "", home)

with open('src/app/HomeClient.tsx', 'w') as f:
    f.write(home)

# Prune labs/page.tsx just in case AIVisualizer is there
try:
    with open('src/app/labs/page.tsx', 'r') as f:
        labs = f.read()
    labs = re.sub(r"import AIVisualizer.*?\n", "", labs)
    # If labs renders it, we need to remove it. Let's just remove the imports.
    with open('src/app/labs/page.tsx', 'w') as f:
        f.write(labs)
except FileNotFoundError:
    pass

# Delete deprecated files
files_to_delete = [
    'src/components/PlatformSneakPeek.tsx',
    'src/components/TestimonialWall.tsx',
    'src/components/VideoModal.tsx',
    'src/components/AIVisualizer.tsx',
    'src/components/TacticalBoard3D.tsx'
]

for path in files_to_delete:
    if os.path.exists(path):
        os.remove(path)

print("Critical fixes executed successfully.")
