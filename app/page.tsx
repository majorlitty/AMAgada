"use client";
import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, animate, useInView, AnimatePresence } from "motion/react";
import { Twitter, Instagram, Linkedin, Copy, Check, Menu, X as XIcon, Heart, Facebook } from "lucide-react";

function AnimatedCounter({ from, to, duration = 2 }: { from: number, to: number, duration?: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toLocaleString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, duration, isInView]);

  return <span ref={nodeRef}>{from}</span>;
}

export default function Home() {
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
  const [isDonateModalOpen, setIsDonateModalOpen] = useState(false);
  const [copiedBank, setCopiedBank] = useState<string | null>(null);
  const [isLeadershipExpanded, setIsLeadershipExpanded] = useState(false);
  
  const handleCopy = (text: string, bank: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBank(bank);
    setTimeout(() => setCopiedBank(null), 2000);
  };

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

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-[#eb5e43]/20 pb-20">
      {/* Header */}
      <header 
        className={`px-6 md:px-12 py-5 flex items-center justify-between fixed top-0 left-0 w-full z-50 bg-[#fafafa]/90 backdrop-blur-md transition-transform duration-300 ease-in-out ${showNav || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
                <Link href="/" className="flex items-center text-gray-900 relative z-50 hover:opacity-80 transition-opacity">
          <Image src="/Black and Red Charity Foundation Community Logo (1).svg" alt="AMAgada Foundation" width={320} height={110} className="h-14 md:h-20 w-auto" referrerPolicy="no-referrer" />
        </Link>

        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-10 text-[14.5px] font-medium text-gray-600">
            <Link href="/" className="cursor-pointer text-gray-900 transition-colors">Home</Link>
            <Link href="/our-story" className="cursor-pointer hover:text-gray-900 transition-colors">Our Story</Link>
            
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
          <Link href="/our-story" className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Our Story</Link>
          
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

      <main className="pt-24 md:pt-32 px-4 md:px-8 max-w-[1300px] mx-auto relative overflow-hidden lg:overflow-visible">
        {/* Hero Copy */}
        <section className="text-center max-w-4xl mx-auto mb-5 px-4 flex flex-col items-center">
          
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.05] text-[#111] font-normal tracking-[-0.035em] mb-4"
          >
            Great futures are built <br className="hidden md:block" /> with <span className="text-[#eb5e43]">basic education</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 text-[15px] md:text-[1.05rem] max-w-2xl mx-auto leading-relaxed mb-6"
          >
            The Abraham and Mary Agada Foundation known as the AMAgada Foundation was born out of a legacy of love, sacrifice, and an unwavering belief in the transformative power of education.
          </motion.p>
          
          <motion.button 
            onClick={() => setIsDonateModalOpen(true)}
            initial={{ opacity: 0, y: 30, filter: "blur(8px)", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#1f1f1f] text-white p-1.5 pl-6 rounded-[0.8rem] font-medium text-[15px] flex items-center justify-between gap-6 hover:bg-[#2a2a2a] transition-colors shadow-lg w-max min-w-[210px] group/cta cursor-pointer"
          >
            Make a Donation
            <div className="w-[40px] h-[40px] rounded-[0.5rem] bg-gradient-to-br from-[#ff8c73] to-[#eb5e43] flex items-center justify-center group-hover/cta:scale-105 transition-transform">
              <span>{"→"}</span>
            </div>
          </motion.button>
        </section>

        {/* Large Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.98 }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full mt-10 md:mt-14 h-[400px] md:h-[550px] lg:h-[650px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg"
        >
          <Image 
            src="/Hero image.avif" 
            alt="Children in classroom" 
            fill
            priority
            sizes="100vw"
            className="object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/5 pointer-events-none" />
        </motion.div>

        {/* About Us Section */}
        <motion.section className="my-16 lg:my-0 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center px-4 md:px-0 lg:h-screen lg:max-h-[850px] lg:min-h-[650px]"
          initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          
          {/* Left Column */}
          <div className="flex flex-col justify-center py-6">
            <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-6 self-start">
              <span className="text-[#eb5e43] text-[13px] font-semibold tracking-wide">About us</span>
            </div>
            
            <h2 className="text-[3.2rem] md:text-[4rem] lg:text-[4rem] leading-[1.05] font-serif font-normal tracking-[-0.035em] text-[#111] mb-6 pr-4">
              Empowering the<br className="hidden lg:block"/> next generation
            </h2>
            
            <p className="text-gray-500 text-[16px] md:text-[17px] leading-[1.65] mb-10 font-sans max-w-lg">
              The foundation honours the lives and vision of Elder Abraham Attah Agada and his beloved wife, Deaconess Mary Agada, two outstanding educators whose greatest passion is investing in people.
            </p>
            
            <Link href="/our-story" className="bg-[#1f1f1f] text-white p-1.5 pl-6 rounded-[0.8rem] font-medium text-[15px] flex items-center justify-between gap-6 hover:bg-[#2a2a2a] transition-colors shadow-lg w-max min-w-[170px] group/btn">
              Read Our Story
              <div className="w-9 h-9 rounded-[0.5rem] bg-gradient-to-br from-[#ff8c73] to-[#eb5e43] flex items-center justify-center group-hover/btn:scale-105 transition-transform">
                <span>{"→"}</span>
              </div>
            </Link>
          </div>

          {/* Right Column */}
          <div className="relative w-full h-[450px] md:h-[550px] lg:h-[80%] lg:max-h-[700px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
            <img 
              src="/Joy international comp.webp" 
              alt="Children learning in classroom" 
              className="w-full h-full object-cover" 
            />
            
          </div>

        </motion.section>

        {/* Our Work Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 w-full max-w-7xl mx-auto px-4 md:px-0"
        >
          <div className="flex flex-col items-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-4">
              <span className="text-[#eb5e43] text-[13px] font-semibold tracking-wide">Our Work</span>
            </div>
            <h2 className="text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-serif font-normal tracking-[-0.035em] text-[#111] text-center">
              Areas of Focus
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* Focus 1 */}
            <div className="relative group overflow-hidden rounded-[2rem] shadow-sm h-[320px] flex flex-col justify-end p-8 border border-gray-100/50 hover:border-[#f3dcdb] transition-all duration-300">
              <div className="absolute inset-0 w-full h-full">
                <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" alt="Scholarships & Education" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>
              <div className="relative z-10 text-white">
                <h3 className="font-serif text-2xl font-normal mb-2 text-white">Scholarships & Education</h3>
                <p className="text-white/80 font-sans text-[14.5px] leading-relaxed mb-5">
                  Providing scholarships and educational support for children and young people.
                </p>
              </div>
            </div>

            {/* Focus 2 */}
            <div className="relative group overflow-hidden rounded-[2rem] shadow-sm h-[320px] flex flex-col justify-end p-8 border border-gray-100/50 hover:border-[#f3dcdb] transition-all duration-300">
              <div className="absolute inset-0 w-full h-full">
                <img src="/mentorship2.webp" alt="Leadership Mentoring" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>
              <div className="relative z-10 text-white">
                <h3 className="font-serif text-2xl font-normal mb-2 text-white">Leadership Mentoring</h3>
                <p className="text-white/80 font-sans text-[14.5px] leading-relaxed mb-5">
                  Mentoring and developing future leaders to build stronger communities.
                </p>
              </div>
            </div>

            {/* Focus 3 */}
            <div className="relative group overflow-hidden rounded-[2rem] shadow-sm h-[320px] flex flex-col justify-end p-8 border border-gray-100/50 hover:border-[#f3dcdb] transition-all duration-300">
              <div className="absolute inset-0 w-full h-full">
                <img src="/social intervention2.webp" alt="Social Intervention" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>
              <div className="relative z-10 text-white">
                <h3 className="font-serif text-2xl font-normal mb-2 text-white">Social Intervention</h3>
                <p className="text-white/80 font-sans text-[14.5px] leading-relaxed mb-5">
                  Supporting vulnerable families and communities through social intervention programmes.
                </p>
              </div>
            </div>

            {/* Focus 4 */}
            <div className="relative group overflow-hidden rounded-[2rem] shadow-sm h-[320px] flex flex-col justify-end p-8 border border-gray-100/50 hover:border-[#f3dcdb] transition-all duration-300">
              <div className="absolute inset-0 w-full h-full">
                <img src="/community health.jpg" alt="Community Health" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>
              <div className="relative z-10 text-white">
                <h3 className="font-serif text-2xl font-normal mb-2 text-white">Community Health</h3>
                <p className="text-white/80 font-sans text-[14.5px] leading-relaxed mb-5">
                  Promoting community health, wellbeing, and social inclusion.
                </p>
              </div>
            </div>

            {/* Focus 5 */}
            <div className="relative group overflow-hidden rounded-[2rem] shadow-sm h-[320px] flex flex-col justify-end p-8 border border-gray-100/50 hover:border-[#f3dcdb] transition-all duration-300">
              <div className="absolute inset-0 w-full h-full">
                <img src="/girlchild empowerment2.webp" alt="Skills & Livelihoods" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>
              <div className="relative z-10 text-white">
                <h3 className="font-serif text-2xl font-normal mb-2 text-white">Skills & Livelihoods</h3>
                <p className="text-white/80 font-sans text-[14.5px] leading-relaxed mb-5">
                  Empowering women and young people with skills and opportunities for sustainable livelihoods.
                </p>
              </div>
            </div>

            {/* Focus 6 */}
            <div className="relative group overflow-hidden rounded-[2rem] shadow-sm h-[320px] flex flex-col justify-end p-8 border border-gray-100/50 hover:border-[#f3dcdb] transition-all duration-300">
              <div className="absolute inset-0 w-full h-full">
                <img src="/social change.jpg" alt="Lasting Social Change" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              </div>
              <div className="relative z-10 text-white">
                <h3 className="font-serif text-2xl font-normal mb-2 text-white">Lasting Social Change</h3>
                <p className="text-white/80 font-sans text-[14.5px] leading-relaxed mb-5">
                  Partnering with communities to address local challenges and create lasting social change.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Leadership Profile Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 md:mb-32 w-full max-w-6xl mx-auto px-4 md:px-6"
        >
          {/* Top Centered Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 md:mb-16">
            <h2 className="text-[2.25rem] md:text-[2.85rem] font-bold font-serif tracking-tight text-[#111] mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-gray-500 font-sans text-[15px] md:text-[16.5px] leading-[1.75]">
              Inspired by their parents&apos; extraordinary example, The AMAgada Foundation was established by their children to preserve and expand this legacy through education, mentorship, quality healthcare, and community empowerment.
            </p>
          </div>

          {/* Leadership Card Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center bg-white rounded-[2rem] p-6 md:p-10 border border-gray-100/90 shadow-sm">
            {/* Left Column: Portrait Card with badge */}
            <div className="lg:col-span-5 relative w-full h-[460px] md:h-[520px] rounded-[1.75rem] overflow-hidden bg-[#e8f1f5] border border-[#d9e6ec]">
              {/* Badge */}
              <div className="absolute bottom-5 left-5 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-sm border border-gray-100">
                <span className="text-[13px] font-semibold text-gray-800 tracking-wide">
                  Chairman, Board of trustees
                </span>
              </div>

              {/* Portrait Image */}
              <img 
                src="/Dr frank webp.webp" 
                alt="Dr. Frank Agada - ENT Surgeon and Foundation Leader" 
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Column: Bio & Experience Paragraphs */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              {/* Top Block: Name & Bio */}
              <div>
                <h3 className="text-2xl md:text-[1.85rem] font-bold text-[#111] tracking-tight mb-3">
                  Dr, Frank Agada
                </h3>
                <p className="text-gray-600 font-sans text-[15px] md:text-[15.5px] leading-[1.75]">
                  Dr Frank Agada brings a wealth of professional experience, leadership, and a deep commitment to education and community development to his role as Chairman of the Board of Trustees.
                </p>
              </div>

              {/* Subtle Divider */}
              <div className="w-full h-px bg-gray-100 my-6 md:my-7" />

              {/* Bottom Block: Experience Details with Read More */}
              <div>
                <h4 className="text-lg md:text-[1.25rem] font-bold text-[#111] tracking-tight mb-3">
                  Dr. Frank Agada Experience
                </h4>
                
                <div className="text-gray-600 font-sans text-[15px] md:text-[15.5px] leading-[1.75] space-y-4">
                  <p>
                    He previously served as Chairman of the Board of Trustees of Hope Aid Organisation, a Nigerian NGO dedicated to promoting the legal rights of women and children, with a particular focus on educational and economic empowerment. He has also served on the panel of experts for Kings and Goodman and is a member of the Medical Advisory Committee of The Duchy Hospital, Harrogate.
                  </p>

                  <AnimatePresence initial={false}>
                    {isLeadershipExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="space-y-4 overflow-hidden"
                      >
                        <p>
                          Dr Agada undertook a travelling fellowship to Johns Hopkins, Baltimore USA, and New York Hospitals in Head and Neck Surgery and is currently a member of the Advisory Committee at The Duchy Hospital.
                        </p>

                        <p>
                          He is committed to training the next generation of specialists and is the College Tutor for ENT in York and, since 2012, has been a faculty member on the FRCS Bradford course.
                        </p>

                        <p>
                         Dr Agada is passionate about ensuring that children from underprivileged backgrounds have the opportunity to continue their education and build brighter futures. He is equally committed to addressing social and community challenges and believes that sustainable change is achieved by empowering individuals and strengthening communities.
                         </p>

                         <p>
                        As Chairman of the Board of Trustees, Dr Agada provides strategic leadership and brings together his professional expertise, philanthropic experience, and enduring passion for education and social development in support of the Foundation's mission.
                       </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    onClick={() => setIsLeadershipExpanded(!isLeadershipExpanded)}
                    className="inline-flex items-center text-[#eb5e43] font-semibold hover:text-[#d44d34] transition-colors text-[14.5px] cursor-pointer pt-1"
                  >
                    {isLeadershipExpanded ? "Read less" : "Read more"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Donation Appeal Section */}
        <motion.section 
          initial={{ opacity: 0, y: 40, filter: "blur(8px)", scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 w-full max-w-7xl mx-auto px-4 md:px-0"
        >
          <div className="bg-gradient-to-br from-[#1f1f1f] to-[#111] rounded-[2.5rem] p-10 md:p-16 lg:p-20 relative overflow-hidden flex flex-col xl:flex-row items-center xl:items-start justify-between gap-12 shadow-xl">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#eb5e43]/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            
            <div className="flex-1 relative z-10 max-w-3xl">
              <h2 className="font-serif text-3xl md:text-[2.8rem] text-white font-normal leading-[1.15] tracking-tight mb-6">
                Help Us Continue a Legacy of Transforming Lives
              </h2>
              <div className="space-y-4 text-gray-300 font-sans text-[16px] md:text-[17px] leading-[1.7]">
                <p>
                  Every child deserves the opportunity to learn, dream, and build a brighter future. Yet for many children and families, poverty, limited access to education, and social challenges continue to stand in the way of their potential. Your donation is more than a financial gift—it is an investment in hope, opportunity, and a stronger future.
                </p>
                <p>
                  Your support helps provide school fees, books, uniforms, learning materials, mentorship, community outreach programmes, and practical support for vulnerable individuals and families.
                </p>
              </div>
            </div>

            <div className="relative z-10 shrink-0 w-full xl:w-auto xl:mt-8">
                            <button 
                onClick={() => setIsDonateModalOpen(true)}
                className="bg-[#1f1f1f] text-white p-1.5 pl-6 rounded-[0.8rem] font-medium text-[15px] flex items-center justify-between gap-6 hover:bg-[#2a2a2a] transition-colors shadow-lg w-full xl:w-max xl:min-w-[210px] group/cta cursor-pointer"
              >
                Make a Donation
                <div className="w-[40px] h-[40px] rounded-[0.5rem] bg-gradient-to-br from-[#ff8c73] to-[#eb5e43] flex items-center justify-center group-hover/cta:scale-105 transition-transform shrink-0">
                  <span>{"→"}</span>
                </div>
              </button>
            </div>
          </div>
        </motion.section>


      </main>

      {/* Footer */}
            <footer className="mt-20 pt-16 border-t border-gray-200/80 px-6 md:px-12 max-w-[1300px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-12 max-w-7xl mx-auto">
          {/* Brand & Mission */}
          <div className="max-w-md">
            <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-[#111] flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
              <Image src="/Black and Red Charity Foundation Community Logo (1).svg" alt="AMAgada Foundation" width={320} height={110} className="h-14 md:h-20 w-auto" referrerPolicy="no-referrer" />
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
                <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-6">
                  <Heart size={14} className="text-[#eb5e43] fill-[#eb5e43]" />
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
                <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-6">
                  <Heart size={14} className="text-[#eb5e43] fill-[#eb5e43]" />
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


