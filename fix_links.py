import re

for filepath in ['app/page.tsx', 'app/our-story/page.tsx', 'app/contact/page.tsx']:
    with open(filepath, 'r') as f:
        content = f.read()

    # desktop nav
    content = re.sub(
        r'<a href="(?:/#?|#)contact" className="cursor-pointer (.*?)">Contact</a>',
        r'<Link href="/contact" className="cursor-pointer \1">Contact</Link>',
        content
    )

    # mobile nav
    content = re.sub(
        r'<a href="(?:/#?|#)contact" className="cursor-pointer (.*?)" onClick={(.*?)}>Contact</a>',
        r'<Link href="/contact" className="cursor-pointer \1" onClick={\2}>Contact</Link>',
        content
    )
    
    # footer
    content = re.sub(
        r'<a href="(?:/#?|#)contact" (className="text-gray-500.*?>[\s\S]*?)</a>',
        r'<Link href="/contact" \1</Link>',
        content
    )
    # the page.tsx one had href="#" in the footer maybe?
    content = re.sub(
        r'<a href="#" (className="text-gray-500.*?>[\s\S]*?)<span (.*?)></span> Contact\n\s*</a>',
        r'<Link href="/contact" \1<span \2></span> Contact\n              </Link>',
        content
    )
    
    # On contact page itself, the link should probably be highlighted.
    if 'app/contact/page.tsx' in filepath:
        content = re.sub(
            r'<Link href="/contact" className="cursor-pointer hover:text-gray-900 transition-colors">Contact</Link>',
            r'<Link href="/contact" className="cursor-pointer text-[#eb5e43] font-semibold transition-colors">Contact</Link>',
            content
        )
        content = re.sub(
            r'<Link href="/contact" className="cursor-pointer hover:text-\[#eb5e43\] transition-colors" onClick={(.*?)}>Contact</Link>',
            r'<Link href="/contact" className="cursor-pointer text-[#eb5e43] font-semibold transition-colors" onClick={\1}>Contact</Link>',
            content
        )
        # remove the highlight from our story on the contact page
        content = re.sub(
            r'<Link href="/our-story" className="cursor-pointer text-\[#eb5e43\] font-semibold transition-colors">Our Story</Link>',
            r'<Link href="/our-story" className="cursor-pointer hover:text-gray-900 transition-colors">Our Story</Link>',
            content
        )
        content = re.sub(
            r'<Link href="/our-story" className="cursor-pointer text-\[#eb5e43\] font-semibold transition-colors" onClick={(.*?)}>Our Story</Link>',
            r'<Link href="/our-story" className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={\1}>Our Story</Link>',
            content
        )

    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Updated {filepath}")
