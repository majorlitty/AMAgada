import re
import os

replacement_logo = """        <Link href="/" className="flex items-center text-gray-900 relative z-50 hover:opacity-80 transition-opacity">
          <Image src="/amagada-logo.svg" alt="AMAgada Foundation" width={180} height={50} className="h-8 md:h-10 w-auto" referrerPolicy="no-referrer" />
        </Link>"""

replacement_footer = """          <Link href="/" className="flex items-center text-gray-900 mb-6 hover:opacity-80 transition-opacity">
            <Image src="/amagada-logo.svg" alt="AMAgada Foundation" width={180} height={50} className="h-8 md:h-10 w-auto" referrerPolicy="no-referrer" />
          </Link>"""


for f in ['app/page.tsx', 'app/our-story/page.tsx', 'app/contact/page.tsx']:
    with open(f, 'r') as file:
        content = file.read()
    
    # 1. Ensure Image is imported
    if "import Image from" not in content and "import Image" not in content:
        content = content.replace('import Link from "next/link";', 'import Link from "next/link";\nimport Image from "next/image";')
        
    # 2. Header replacement
    content = re.sub(
        r'<Link href="/" className="flex items-center gap-2 text-gray-900 relative z-50 hover:opacity-80 transition-opacity">.*?</Link>',
        replacement_logo,
        content,
        flags=re.DOTALL
    )
    
    # 3. Footer replacement
    content = re.sub(
        r'<Link href="/" className="flex items-center gap-2 text-[#111] mb-6 hover:opacity-80 transition-opacity">.*?</Link>',
        replacement_footer,
        content,
        flags=re.DOTALL
    )
    
    with open(f, 'w') as file:
        file.write(content)
    print(f"Fixed {f}")
