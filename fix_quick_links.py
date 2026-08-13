import re
import os

replacement = """            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-[18px] text-[#111] mb-2 font-normal">Quick Links</h4>
              <Link href="/" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Home
              </Link>
              <a href="#resources" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Resources
              </a>
              <Link href="/our-story" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> About
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Contact
              </Link>
            </div>"""

for f in ['app/page.tsx', 'app/our-story/page.tsx', 'app/contact/page.tsx']:
    with open(f, 'r') as file:
        content = file.read()
    
    content = re.sub(
        r'\{\/\* Quick Links \*\/\}.*?<\/div>',
        replacement,
        content,
        flags=re.DOTALL
    )
    
    with open(f, 'w') as file:
        file.write(content)
    print(f"Fixed {f}")
