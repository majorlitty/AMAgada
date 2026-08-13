import re
import os

files = ['app/page.tsx', 'app/our-story/page.tsx', 'app/contact/page.tsx']

replacements = {
    'Menu': '"Menu"',
    'X': '"✕"',
    'ArrowRight': '"→"',
    'ChevronRight': '"›"',
    'ChevronLeft': '"‹"',
    'Play': '"▶"',
    'Copy': '"Copy"',
    'CheckCircle2': '"✓"',
    'Heart': '"♥"',
    'Twitter': '"X"',
    'Instagram': '"IG"',
    'Linkedin': '"LI"',
    'Award': '"★"',
    'BookOpen': '"Book"',
    'Quote': '"\\""',
    'GraduationCap': '"Edu"',
    'Users': '"People"',
    'Phone': '"Tel"',
    'MapPin': '"Pin"',
    'Mail': '"Email"',
    'ArrowUpRight': '"↗"',
    'Smile': '"☺"',
    'Grid': '"#"',
    'ChevronDown': '"v"',
    'Activity': '"~"',
    'Handshake': '"🤝"',
    'DollarSign': '"$"',
    'PoundSterling': '"£"'
}

for f_path in files:
    with open(f_path, 'r') as f:
        content = f.read()

    # Remove multiline lucide-react import
    content = re.sub(r'import\s+\{.*?\}\s+from\s+["\']lucide-react["\'];?', '', content, flags=re.DOTALL)
    
    # Replace tags
    for tag, text in replacements.items():
        # Match <Tag ... /> or <Tag />
        pattern = r'<' + tag + r'(?:\s+[^>]*)?/>'
        
        # When replacing, since it's JSX, if it's not inside {} we should not put quotes,
        # but my replacements have quotes so they can be valid JS strings if inside {}.
        # Wait, if we replace <Heart /> with "♥", in JSX that will literally render the quotes if it's outside brackets.
        # But wait! If it's outside brackets, we want it to just render as text.
        # Or better, wrap it in a span: <span>{text}</span>
        
        # Let's replace with <span>{text}</span>!
        span_text = f'<span>{{{text}}}</span>'
        content = re.sub(pattern, span_text, content)

    with open(f_path, 'w') as f:
        f.write(content)

    print(f"Processed {f_path}")

