import re

with open('app/page.tsx', 'r') as file:
    content = file.read()

replacement = """              <button 
                onClick={() => setIsDonateModalOpen(true)}
                className="bg-[#1f1f1f] text-white p-1.5 pl-6 rounded-[0.8rem] font-medium text-[15px] flex items-center justify-between gap-6 hover:bg-[#2a2a2a] transition-colors shadow-lg w-full xl:w-max xl:min-w-[210px] group/cta cursor-pointer"
              >
                Make a Donation
                <div className="w-[40px] h-[40px] rounded-[0.5rem] bg-gradient-to-br from-[#ff8c73] to-[#eb5e43] flex items-center justify-center group-hover/cta:scale-105 transition-transform shrink-0">
                  <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
              </button>"""

content = re.sub(
    r'<button \s*onClick=\{\(\) => setIsDonateModalOpen\(true\)\}\s*className="w-full xl:w-auto bg-\[\#eb5e43\].*?<\/button>',
    replacement,
    content,
    flags=re.DOTALL
)

with open('app/page.tsx', 'w') as file:
    file.write(content)
print("Done")
