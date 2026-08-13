"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export default function Contact() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
    const [copiedBank, setCopiedBank] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        if (!isMobileMenuOpen) {
          setShowNav(false);
        }
      } else {
        setShowNav(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isMobileMenuOpen]);

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(type);
    setTimeout(() => {
      setCopiedBank(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-[#eb5e43]/20 pb-20">
      {/* Header */}
      <header 
        className={`px-6 md:px-12 py-5 flex items-center justify-between fixed top-0 left-0 w-full z-50 bg-[#fafafa]/90 backdrop-blur-md transition-transform duration-300 ease-in-out ${showNav || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
                <Link href="/" className="flex items-center text-gray-900 relative z-50 hover:opacity-80 transition-opacity">
          <Image src="/amagada-logo.svg" alt="AMAgada Foundation" width={180} height={50} className="h-8 md:h-10 w-auto" referrerPolicy="no-referrer" />
        </Link>

        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-10 text-[14.5px] font-medium text-gray-600">
            <Link href="/" className="cursor-pointer hover:text-gray-900 transition-colors">Home</Link>
            <Link href="/our-story" className="cursor-pointer hover:text-gray-900 transition-colors">Our Story</Link>
            <a href="/#resources" className="cursor-pointer hover:text-gray-900 transition-colors">Resources</a>
            <Link href="/contact" className="cursor-pointer text-[#eb5e43] font-semibold transition-colors">Contact</Link>
          </div>
        </nav>

        <div className="flex items-center gap-4 relative z-50">
          <button 
            onClick={() => setIsVolunteerModalOpen(true)}
            className="hidden lg:block text-gray-900 border border-gray-200 px-5 py-2.5 rounded-[0.5rem] font-medium text-[14px] hover:bg-gray-100 transition-colors shadow-sm"
          >
            Volunteer
          </button>
          <button 
            onClick={() => setIsDonateModalOpen(true)}
            className="hidden lg:block bg-[#1f1f1f] text-white px-5 py-2.5 rounded-[0.5rem] font-medium text-[14px] hover:bg-black transition-colors shadow-sm"
          >
            Donate now
          </button>
          <button 
            className="lg:hidden p-2 text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <span>{"✕"}</span> : <span>{"Menu"}</span>}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#fafafa] z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-[1.2rem] font-medium text-gray-900">
          <Link href="/" className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/our-story" className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
          <a href="/#resources" className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Resources</a>
          <Link href="/contact" className="cursor-pointer text-[#eb5e43] font-semibold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          <button 
            className="mt-4 bg-[#1f1f1f] text-white px-8 py-3.5 rounded-[0.5rem] font-medium text-[16px] w-auto shadow-sm" 
            onClick={() => { setIsMobileMenuOpen(false); setIsDonateModalOpen(true); }}
          >
            Donate now
          </button>
          <button 
            className="text-gray-900 border border-gray-300 px-8 py-3.5 rounded-[0.5rem] font-medium text-[16px] w-auto shadow-sm bg-white hover:bg-gray-50 transition-colors" 
            onClick={() => { setIsMobileMenuOpen(false); setIsVolunteerModalOpen(true); }}
          >
            Volunteer
          </button>
        </div>
      </div>

      <main className="pt-28 md:pt-36 px-4 md:px-8 max-w-[1240px] mx-auto relative">
        {/* PAGE HERO HEADER */}
        <section className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-2 mb-6"
          >
            <span className="bg-[#fdf5f4] text-[#eb5e43] px-4 py-1.5 rounded-full text-[13px] font-semibold tracking-wide uppercase">
              Get in Touch
            </span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-[3.5rem] md:text-[5rem] font-normal leading-[1.05] tracking-tight text-[#111] mb-6"
          >
            We&apos;d love to hear from you.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 text-[16px] md:text-[18px] max-w-2xl mx-auto leading-relaxed"
          >
            Whether you have a question about our programs, want to volunteer, or simply wish to say hello, our team is ready to connect with you.
          </motion.p>
        </section>

        {/* CONTACT INFO GRID */}
        <section className="mb-24 w-full max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            
            {/* Email Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:border-[#f3dcdb] transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#fdf5f4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span>{"Email"}</span>
              </div>
              <h3 className="font-serif text-2xl text-[#111] font-normal mb-3">Email Us</h3>
              <p className="text-gray-500 font-sans text-[15px] leading-relaxed mb-6">
                Send us an email anytime and we will get back to you as soon as possible.
              </p>
              <a href="mailto:hello@amagada.com" className="text-[#eb5e43] font-medium hover:underline text-[15px] mt-auto">
                hello@amagada.com
              </a>
            </motion.div>

            {/* Phone Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:border-[#f3dcdb] transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#fdf5f4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span>{"Tel"}</span>
              </div>
              <h3 className="font-serif text-2xl text-[#111] font-normal mb-3">Call Us</h3>
              <p className="text-gray-500 font-sans text-[15px] leading-relaxed mb-6">
                Speak directly with a member of our team during standard business hours.
              </p>
              <a href="tel:08032865488" className="text-[#eb5e43] font-medium hover:underline text-[15px] mt-auto">
                0803 286 5488
              </a>
            </motion.div>

            {/* Address Card */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white rounded-[2rem] p-10 flex flex-col items-center text-center shadow-sm border border-gray-100 hover:border-[#f3dcdb] transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-[#fdf5f4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <span>{"Pin"}</span>
              </div>
              <h3 className="font-serif text-2xl text-[#111] font-normal mb-3">Visit Us</h3>
              <p className="text-gray-500 font-sans text-[15px] leading-relaxed mb-6">
                Come say hello at our main office headquarters in Lagos.
              </p>
              <span className="text-[#eb5e43] font-medium text-[14px] leading-[1.6] mt-auto max-w-[200px]">
                Block B4 357, HFP Shopping Complex, Abraham Adesanya Junction, Lekki Lagos State
              </span>
            </motion.div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
            <footer className="mt-20 pt-16 border-t border-gray-200/80 px-6 md:px-12 max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 max-w-7xl mx-auto">
          {/* Brand & Mission */}
          <div className="max-w-md">
            <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-[#111] flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              AMAgada Foundation
            </Link>
            <p className="text-gray-500 font-sans text-[15.5px] leading-[1.7]">
              Preserving the educational legacy of Elder Abraham Attah Agada and Deaconess Mary Agada by empowering children and youth across Nigeria through education, healthcare, and mentorship.
            </p>
          </div>
          
          {/* Quick Links & Info */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
            <div className="flex flex-col gap-3">
              <h4 className="font-serif text-[18px] text-[#111] mb-2 font-normal">Navigation</h4>
              <Link href="/" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Home
              </Link>
              <Link href="/our-story" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Our Story
              </Link>
              <a href="/#resources" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Resources
              </a>
              <Link href="/contact" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Contact
              </Link>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-[18px] text-[#111] mb-2 font-normal">Follow Us</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="w-11 h-11 rounded-full bg-[#fdf5f4] border border-[#f3dcdb]/60 flex items-center justify-center text-[#eb5e43] hover:bg-[#eb5e43] hover:text-white transition-colors group">
                  <span>{"X"}</span>
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-[#fdf5f4] border border-[#f3dcdb]/60 flex items-center justify-center text-[#eb5e43] hover:bg-[#eb5e43] hover:text-white transition-colors group">
                  <span>{"IG"}</span>
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-[#fdf5f4] border border-[#f3dcdb]/60 flex items-center justify-center text-[#eb5e43] hover:bg-[#eb5e43] hover:text-white transition-colors group">
                  <span>{"LI"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-[#f3dcdb]/40 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-400 font-sans text-[14px]">
            &copy; {new Date().getFullYear()} AMAgada Foundation. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-400 hover:text-[#111] font-sans text-[14px] transition-colors">Privacy Policy</a>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            <a href="#" className="text-gray-400 hover:text-[#111] font-sans text-[14px] transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>


      {/* Volunteer Modal */}
      <AnimatePresence>
        {isVolunteerModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111]/40 backdrop-blur-[4px]"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.6 }}
              className="bg-white rounded-[1.5rem] w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => setIsVolunteerModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <span>{"✕"}</span>
              </button>
              
              <div className="p-8 md:p-10">
                <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-6">
                  <span>{"♥"}</span>
                  <span className="text-[#eb5e43] text-[13px] font-semibold tracking-wide">Join Our Mission</span>
                </div>
                <h3 className="font-serif text-3xl text-[#111] font-normal mb-3 leading-tight tracking-tight">Become a <br/>Volunteer</h3>
                <p className="text-gray-500 font-sans text-[15px] mb-8 leading-[1.65]">
                  Engage with your community and make a real impact. Fill out the form below and our team will get in touch.
                </p>
                
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setIsVolunteerModalOpen(false); }}>
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-[13px] font-semibold text-[#111] ml-1">Full Name</label>
                    <input type="text" id="name" required className="w-full bg-white border border-gray-200 rounded-[0.8rem] px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#eb5e43]/20 focus:border-[#eb5e43] transition-all shadow-sm" placeholder="Jane Doe" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[13px] font-semibold text-[#111] ml-1">Email Address</label>
                    <input type="email" id="email" required className="w-full bg-white border border-gray-200 rounded-[0.8rem] px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#eb5e43]/20 focus:border-[#eb5e43] transition-all shadow-sm" placeholder="jane@example.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="interests" className="text-[13px] font-semibold text-[#111] ml-1">Area of Interest</label>
                    <div className="relative">
                      <select id="interests" required className="w-full bg-white border border-gray-200 rounded-[0.8rem] px-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#eb5e43]/20 focus:border-[#eb5e43] transition-all text-gray-800 appearance-none shadow-sm cursor-pointer">
                        <option value="">Select an area...</option>
                        <option value="teaching">Teaching & Mentoring</option>
                        <option value="events">Event Coordination</option>
                        <option value="fundraising">Fundraising</option>
                        <option value="admin">Administrative Support</option>
                      </select>
                      <span>{"›"}</span>
                    </div>
                  </div>
                  <button type="submit" className="w-full bg-[#1f1f1f] text-white py-3.5 mt-6 rounded-[0.8rem] font-medium text-[15px] hover:bg-black transition-colors shadow-md flex items-center justify-center gap-2 group/btn">
                    Submit Application
                    <span>{"→"}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Donate Modal */}
      <AnimatePresence>
        {isDonateModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#111]/40 backdrop-blur-[4px]"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300, duration: 0.6 }}
              className="bg-white rounded-[1.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
            >
              <button 
                onClick={() => setIsDonateModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors z-10"
              >
                <span>{"✕"}</span>
              </button>
              
              <div className="p-8 md:p-10">
                <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-6">
                  <span>{"♥"}</span>
                  <span className="text-[#eb5e43] text-[13px] font-semibold tracking-wide">Make an Impact</span>
                </div>
                                <h3 className="font-serif text-3xl text-[#111] font-normal mb-3 leading-tight tracking-tight">How to donate</h3>
                <p className="text-gray-500 font-sans text-[15px] mb-8 leading-[1.65]">
                  Every contribution, regardless of its size, helps us educate a child, strengthen a family, and build healthier, more resilient communities
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="border border-gray-200 rounded-[1rem] p-5 hover:border-[#eb5e43]/30 transition-colors flex flex-col md:col-span-2">
                    <div className="flex flex-col gap-3 mb-auto">
                      <div className="w-10 h-10 rounded-full bg-[#fdf5f4] flex items-center justify-center text-[#eb5e43]">
                        <span>{"♥"}</span>
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
                            {copiedBank === 'firstbank' ? <span>{"✓"}</span> : <span>{"Copy"}</span>}
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
{/* Toast for copy success */}
              <AnimatePresence>
                {copiedBank && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#1f1f1f] text-white px-5 py-3 rounded-full text-[13px] font-medium shadow-xl flex items-center gap-2.5 z-20 pointer-events-none"
                  >
                    <span>{"✓"}</span>
                    Account details copied successfully
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
