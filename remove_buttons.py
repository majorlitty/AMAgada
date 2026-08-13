import re

with open('app/page.tsx', 'r') as f:
    content = f.read()

# Pattern to match the button code exactly.
# Note: \s* is used for whitespace formatting
pattern = r'\s*<button\s*onClick=\{\(\) => setIsDonateModalOpen\(true\)\}\s*className="bg-white text-\[\#111\] px-5 py-2 rounded-\[0\.5rem\] text-\[13\.5px\] font-medium hover:bg-gray-100 transition-colors w-max"\s*>\s*Make a donation\s*<\/button>'

new_content = re.sub(pattern, '', content)

with open('app/page.tsx', 'w') as f:
    f.write(new_content)

print("Done")
