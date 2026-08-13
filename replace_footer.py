import re

with open('footer.txt', 'r') as f:
    footer_content = f.read()

# For app/page.tsx
with open('app/page.tsx', 'r') as f:
    page_content = f.read()

# Replace <motion.footer ... </motion.footer> with footer_content
page_content = re.sub(r'<motion\.footer.*?</motion\.footer>', footer_content, page_content, flags=re.DOTALL)

with open('app/page.tsx', 'w') as f:
    f.write(page_content)

# For app/contact/page.tsx
with open('app/contact/page.tsx', 'r') as f:
    contact_content = f.read()

contact_content = re.sub(r'<footer.*?</footer>', footer_content, contact_content, flags=re.DOTALL)

with open('app/contact/page.tsx', 'w') as f:
    f.write(contact_content)

print("Replaced footers")
