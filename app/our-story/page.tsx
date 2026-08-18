"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Twitter, Instagram, Linkedin, Copy, Check, Menu, X as XIcon, Heart } from "lucide-react";

export default function OurStory() {
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
            <Link href="/our-story" className="cursor-pointer text-[#eb5e43] font-semibold transition-colors">Our Story</Link>
            
            <Link href="/contact" className="cursor-pointer hover:text-gray-900 transition-colors">Contact</Link>
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
            {isMobileMenuOpen ? <XIcon size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[#fafafa] z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 text-[1.2rem] font-medium text-gray-900">
          <Link href="/" className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/our-story" className="cursor-pointer text-[#eb5e43] font-semibold transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
          
          <Link href="/contact" className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
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
        <section className="text-center max-w-4xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-4 py-1.5 rounded-full mb-6"
          >
            
            <span className="text-[#eb5e43] text-[13.5px] font-semibold tracking-wide">Our Story & Legacy</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-[2.8rem] sm:text-[3.5rem] md:text-[4.2rem] leading-[1.08] font-serif font-normal tracking-[-0.035em] text-[#111] mb-6"
          >
            A Legacy of Love, Sacrifice & <br className="hidden md:block" />
            <span className="text-[#eb5e43] italic">Educational Vision</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-gray-600 text-[17px] md:text-[19px] leading-[1.7] max-w-2xl mx-auto font-sans"
          >
            Discover the remarkable journey of Elder Abraham Attah Agada and Deaconess Mary Agada—two visionary educators whose life’s passion continues to empower children, families, and communities across Nigeria.
          </motion.p>
        </section>

        {/* SECTION 1: THE FOUNDATION OF LOVE & VISION */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 bg-white border border-gray-100 rounded-[2rem] p-6 md:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#111] font-normal leading-[1.2] tracking-tight">
                Honouring Two Outstanding Educators
              </h2>
              <div className="space-y-4 text-gray-600 font-sans text-[16px] md:text-[17px] leading-[1.7]">
                <p>
                  The AMAgada Foundation was born out of a legacy of love, sacrifice, and an unwavering belief in the transformative power of education.
                </p>
                <p>
                  The Foundation honours the lives and vision of Elder Abraham Attah Agada and his beloved wife, Deaconess Mary Agada, two outstanding educators whose greatest passion was investing in people.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-md h-[340px] md:h-[420px] group">
                <img 
                  src="/baba and mama.png" 
                  alt="Educators mentoring young students" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="font-serif text-xl font-normal">Elder A.A. Agada & Deaconess Mary Agada</p>
                  <p className="text-white/80 text-[13px] font-sans mt-1">Founding Visionaries & Life-long Educators</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 2: OPENING THEIR HEARTS AND HOME */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 bg-[#fdfdfd] border border-gray-200/80 rounded-[2rem] p-6 md:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-md h-[340px] md:h-[420px] group">
                <img 
                  src="/Team.jpg" 
                  alt="Students gathering together in school" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-[13px] font-semibold text-[#111] shadow-sm">
                  Home & Family
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#111] font-normal leading-[1.2] tracking-tight">
                Opening Their Hearts and Home
              </h2>
              <div className="space-y-4 text-gray-600 font-sans text-[16px] md:text-[17px] leading-[1.7]">
                <p>
                  Known affectionately as <strong>Teacher</strong>, Elder Agada dedicated his life to teaching, mentoring, and giving children a chance to succeed. 
                </p>
                <p>
                  Together with Mary, he believed education should never be limited by a child’s background or financial circumstances. Long before they held leadership roles, they opened their home to eight children and have fostered more than 30 other children beyond their own, raising and educating them as family. To them, investing in children was investing in the future of the nation.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 3: EXPANDING IMPACT & PUBLIC SERVICE */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 bg-white border border-gray-100 rounded-[2rem] p-6 md:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#111] font-normal leading-[1.2] tracking-tight">
                Nationwide Reach & Public Leadership
              </h2>
              <div className="space-y-4 text-gray-600 font-sans text-[16px] md:text-[17px] leading-[1.7]">
                <p>
                  Their influence reached far beyond their home, transforming the lives of children across Plateau, Benue, Kogi, and beyond.
                </p>
                <p>
                  Through school fees, mentorship, encouragement, and opportunity, they helped countless young people become professionals and leaders who continue to shape society. 
                  </p>
                  <p> 
                  As Directors of Education in Government, Elder A. A. Agada and Mary Agada carried the same values into public service—integrity, excellence, compassion, and an unwavering commitment to developing people.
                </p>
              </div>
            </div>
            <div className="lg:col-span-6">
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-md h-[360px] md:h-[460px] group">
                <img 
                  src="/children-in-class-bw.jpg" 
                  alt="Classroom and public educational empowerment" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="bg-[#eb5e43] text-white text-[12px] font-bold px-3 py-1 rounded-full tracking-wide uppercase inline-block mb-2">Impact</span>
                  <p className="font-serif text-xl">Plateau • Benue • Kogi • Across Nigeria</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 4: PRESERVING AND EXPANDING THE LEGACY */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-24 bg-[#fdfdfd] border border-gray-200/80 rounded-[2rem] p-6 md:p-12 shadow-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative rounded-[1.5rem] overflow-hidden shadow-md h-[340px] md:h-[420px] group">
                <img 
                  src="/annie-spratt-feU8G7E5ODI-unsplash.jpg" 
                  alt="Young leaders learning and collaborating" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-[13px] font-semibold text-[#111] shadow-sm">
                  The Next Generation
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
                            <h2 className="font-serif text-3xl md:text-4xl text-[#111] font-normal leading-[1.2] tracking-tight">
                Preserving & Expanding the Legacy
              </h2>
              <div className="space-y-4 text-gray-600 font-sans text-[16px] md:text-[17px] leading-[1.7]">
                <p>
                  The AMAgada Foundation, established by their children, carries forward the legacy of Elder and Mary Agada.
                </p>
                <p>
                  Inspired by their lifelong commitment to service and education, the Foundation creates opportunities for young people through education, mentorship, healthcare, leadership development, and community empowerment.
                </p>
                <p>
                  Their mission is simple but powerful: to change lives, break cycles of poverty, unlock potential, and build stronger communities—one child, one family, and one community at a time.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* SECTION 5: OUR VISION & CALL TO MISSION */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 bg-gradient-to-br from-[#1f1f1f] to-[#111] text-white rounded-[2rem] p-8 md:p-14 relative overflow-hidden shadow-xl"
        >
          <div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full">
              <span>{"\""}</span>
              <span className="text-white text-[13px] font-medium tracking-wide">Our Vision & Call to Action</span>
            </div>

            <h2 className="font-serif text-3xl md:text-5xl font-normal leading-[1.15] tracking-tight text-white">
              Empowering the Leaders of Tomorrow
            </h2>

            <div className="space-y-5 text-gray-300 font-sans text-[16.5px] md:text-[18.5px] leading-[1.7]">
              <p>
                Our story is more than a tribute to two remarkable lives. It is a call to continue their mission. Through partnerships, scholarships, educational programmes, healthcare and community initiatives, the AMAgada Foundation is committed to raising a new generation of empowered, ethical, and compassionate leaders who will transform their communities and the nation.
              </p>
              <p className="text-white font-medium">
                Our vision is simple: to ensure that no child is denied the opportunity to learn, grow, and fulfil their God-given potential because of circumstance.
              </p>
            </div>

            {/* HIGHLIGHTED QUOTE BANNER */}
            <div className="py-6 px-8 bg-white/10 backdrop-blur-md rounded-[1.2rem] border border-white/15 my-8">
              <p className="font-serif text-2xl md:text-3xl text-[#ff8c73] italic">
                &quot;Their legacy is our mission. Their passion is our purpose.&quot;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button 
                onClick={() => setIsDonateModalOpen(true)}
                className="w-full sm:w-auto bg-[#eb5e43] text-white px-8 py-4 rounded-[0.8rem] font-medium text-[16px] hover:bg-[#d94f35] transition-all shadow-lg flex items-center justify-center gap-2 group/btn"
              >
                Donate Now
                <span>{"→"}</span>
              </button>
              <button 
                onClick={() => setIsVolunteerModalOpen(true)}
                className="w-full sm:w-auto bg-white/10 text-white border border-white/30 px-8 py-4 rounded-[0.8rem] font-medium text-[16px] hover:bg-white/20 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                Volunteer With Us
              </button>
            </div>
          </div>
        </motion.section>

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
              
              <Link href="/contact" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Contact
              </Link>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-[18px] text-[#111] mb-2 font-normal">Follow Us</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="w-11 h-11 rounded-full bg-[#fdf5f4] border border-[#f3dcdb]/60 flex items-center justify-center text-[#eb5e43] hover:bg-[#eb5e43] hover:text-white transition-colors group">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-[#fdf5f4] border border-[#f3dcdb]/60 flex items-center justify-center text-[#eb5e43] hover:bg-[#eb5e43] hover:text-white transition-colors group">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-[#fdf5f4] border border-[#f3dcdb]/60 flex items-center justify-center text-[#eb5e43] hover:bg-[#eb5e43] hover:text-white transition-colors group">
                  <Linkedin size={18} />
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
                <XIcon size={20} />
              </button>
              
              <div className="p-8 md:p-10">
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
                <XIcon size={20} />
              </button>
              
              <div className="p-8 md:p-10">
                                                <h3 className="font-serif text-3xl text-[#111] font-normal mb-3 leading-tight tracking-tight">How to donate</h3>
                <p className="text-gray-500 font-sans text-[15px] mb-8 leading-[1.65]">
                  Every contribution, regardless of its size, helps us educate a child, strengthen a family, and build healthier, more resilient communities
                </p>

                <div className="grid grid-cols-1 gap-4">
                  <div className="border border-gray-200 rounded-[1rem] p-5 hover:border-[#eb5e43]/30 transition-colors flex flex-col md:col-span-2">
                    <div className="flex flex-col gap-3 mb-auto">
                      <div className="w-10 h-10 rounded-full bg-[#fdf5f4] flex items-center justify-center text-[#eb5e43]">
                        <Heart size={18} className="fill-[#eb5e43]" />
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
                            {copiedBank === 'firstbank' ? <Check size={16} /> : <Copy size={16} />}
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
                    <Check size={16} className="text-[#eb5e43]" />
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
