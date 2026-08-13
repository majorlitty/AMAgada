import os
import re

modal_replacement = """                <h3 className="font-serif text-3xl text-[#111] font-normal mb-3 leading-tight tracking-tight">How to donate</h3>
                <p className="text-gray-500 font-sans text-[15px] mb-8 leading-[1.65]">
                  Every contribution, regardless of its size, helps us educate a child, strengthen a family, and build healthier, more resilient communities
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="border border-gray-200 rounded-[1rem] p-5 hover:border-[#eb5e43]/30 transition-colors flex flex-col md:col-span-2">
                    <div className="flex flex-col gap-3 mb-auto">
                      <div className="w-10 h-10 rounded-full bg-[#fdf5f4] flex items-center justify-center text-[#eb5e43]">
                        <Heart className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#111] text-[15px]">ABRAHAM ATTAH AND MARY AGADA FOUNDATION</h4>
                        <p className="text-gray-500 text-[13px] mb-4">First Bank Nigeria</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-[0.8rem] p-4 mt-4">
                      <div>
                        <p className="text-[11px] text-gray-400 font-medium mb-2 tracking-widest uppercase">Account Number</p>
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-mono text-[#111] text-[16px] font-medium tracking-wide break-all">
                             2049080551
                          </p>
                          <button 
                            onClick={() => handleCopy('2049080551', 'firstbank')}
                            className="w-10 h-10 flex-shrink-0 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:border-gray-300 transition-colors"
                          >
                            {copiedBank === 'firstbank' ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="mt-8 text-center text-gray-500 text-[12px] md:text-[13px] leading-relaxed max-w-2xl mx-auto border-t border-gray-100 pt-6">
                  All bank transfers are handled securely. Note that international transfers may incur additional bank fees. 
                  For support or to request a donation receipt, please contact <a href="mailto:support@amagada.org" className="text-[#eb5e43] hover:underline font-medium">support@amagada.org</a>.
                </p>
              </div>

              {/* Toast for copy success */}
"""

def update_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    # Find the bounds
    start_str = r'<h3 className="font-serif text-3xl text-\[\#111\] font-normal mb-3 leading-tight tracking-tight">(Direct Bank <br\/>Deposits|How to donate)<\/h3>'
    end_str = r'\{\/\* Toast for copy success \*\/\}'

    # match the start
    start_match = re.search(start_str, content)
    end_match = re.search(end_str, content)
    
    if start_match and end_match:
        start_idx = start_match.start()
        end_idx = end_match.end() - len('{/* Toast for copy success */}')
        
        new_content = content[:start_idx] + modal_replacement + content[end_idx:]
        
        # also remove the donationFrequency state if it exists
        new_content = re.sub(r'const \[donationFrequency, setDonationFrequency\] = useState<\'onetime\' \| \'monthly\'>\(\'onetime\'\);\n', '', new_content)
        
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"Could not find bounds in {filepath}")

for f in ['app/page.tsx', 'app/our-story/page.tsx', 'app/contact/page.tsx']:
    update_file(f)
