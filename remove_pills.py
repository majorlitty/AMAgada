import re

with open('app/our-story/page.tsx', 'r') as f:
    content = f.read()

# Pattern to match the specific pill divs
# We want to match:
# <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1 rounded-full">
#   ... (anything inside)
# </div>
# OR
# <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-6">
#   ...
# </div>

# The one to keep is:
# className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-4 py-1.5 rounded-full mb-6"
# (Notice px-4 vs px-3, but let's be more specific by matching the actual tags to remove)

# Section 01 (empty)
content = re.sub(r'<div className="inline-flex items-center gap-2 bg-\[\#fdf5f4\] border border-\[\#f3dcdb\] px-3 py-1 rounded-full">\s*<\/div>\n*', '', content)

# Section 02, 03, 04
content = re.sub(r'<div className="inline-flex items-center gap-2 bg-\[\#fdf5f4\] border border-\[\#f3dcdb\] px-3 py-1 rounded-full">\s*(?:<[^>]+>\s*)*<span[^>]*>Section 0[2-4]<\/span>\s*<\/div>\n*', '', content)

# Join Our Mission / Make an Impact (modals)
content = re.sub(r'<div className="inline-flex items-center gap-2 bg-\[\#fdf5f4\] border border-\[\#f3dcdb\] px-3 py-1\.5 rounded-full mb-6">\s*<[^>]+>\s*<span[^>]*>(Join Our Mission|Make an Impact)<\/span>\s*<\/div>\n*', '', content)

with open('app/our-story/page.tsx', 'w') as f:
    f.write(content)
print("Done")
