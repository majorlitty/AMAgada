import re

replacement_footer_logo = """            <Link href="/" className="flex items-center text-gray-900 mb-6 hover:opacity-80 transition-opacity">
              <Image src="/amagada-logo.svg" alt="AMAgada Foundation" width={180} height={50} className="h-8 md:h-10 w-auto" referrerPolicy="no-referrer" />
            </Link>"""

for f in ['app/page.tsx', 'app/our-story/page.tsx', 'app/contact/page.tsx']:
    with open(f, 'r') as file:
        content = file.read()
    
    content = re.sub(
        r'<div className="font-serif text-2xl font-medium tracking-tight text-\[\#111\] flex items-center gap-2 mb-6">.*?<\/div>',
        replacement_footer_logo,
        content,
        flags=re.DOTALL
    )
    
    with open(f, 'w') as file:
        file.write(content)
    print(f"Fixed {f}")
