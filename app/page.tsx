"use client";

import { useRef, useEffect, useState } from "react";
import { Menu, Play, ArrowUpRight, Heart, Smile, Sparkles, Grid, ChevronLeft, ChevronRight, ArrowRight, X, BookOpen, Users, GraduationCap, Twitter, Instagram, Linkedin } from "lucide-react";
import { motion, animate, useInView } from "motion/react";

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
  const sliderRef = useRef<HTMLElement>(null);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  useEffect(() => {
    const interval = setInterval(() => {
      if (sliderRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
        
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' }); // Cards are max 300px + gap of 16px
        }
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-[#eb5e43]/20 pb-20">
      {/* Header */}
      <header 
        className={`px-6 md:px-12 py-5 flex items-center justify-between fixed top-0 left-0 w-full z-50 bg-[#fafafa]/90 backdrop-blur-md transition-transform duration-300 ease-in-out ${showNav || isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="flex items-center gap-2 text-gray-900 relative z-50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#eb5e43" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2v20M2 12h20"/>
          </svg>
          <span className="font-serif font-normal text-[1.4rem] tracking-tight uppercase">AMAgada</span>
        </div>

        <nav className="hidden lg:flex items-center justify-center flex-1">
          <div className="flex items-center gap-10 text-[14.5px] font-medium text-gray-600">
            <span className="cursor-pointer text-gray-900 transition-colors">Home</span>
            <span className="cursor-pointer hover:text-gray-900 transition-colors">About</span>
            <span className="cursor-pointer hover:text-gray-900 transition-colors">Resources</span>
            <span className="cursor-pointer hover:text-gray-900 transition-colors">Contact</span>
          </div>
        </nav>

        <div className="flex items-center gap-4 relative z-50">
          <button className="hidden sm:block bg-[#1f1f1f] text-white px-5 py-2.5 rounded-[0.5rem] font-medium text-[14px] hover:bg-black transition-colors shadow-sm">
            Donate now
          </button>
          <button 
            className="lg:hidden p-2 text-gray-900 hover:bg-gray-200 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`fixed inset-0 bg-[#fafafa] z-40 lg:hidden transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="flex flex-col items-center justify-center h-full gap-8 text-[1.2rem] font-medium text-gray-900">
            <span className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</span>
            <span className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</span>
            <span className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Resources</span>
            <span className="cursor-pointer hover:text-[#eb5e43] transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Contact</span>
            <button className="mt-4 bg-[#1f1f1f] text-white px-8 py-3.5 rounded-[0.5rem] font-medium text-[16px] w-auto shadow-sm" onClick={() => setIsMobileMenuOpen(false)}>
              Donate now
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 md:pt-32 px-4 md:px-8 max-w-[1300px] mx-auto relative overflow-hidden lg:overflow-visible">
        {/* Hero Copy */}
        <section className="text-center max-w-4xl mx-auto mb-5 px-4 flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#eb5e43]" />
            <span className="text-[#eb5e43] text-[13px] font-medium tracking-wide">Social fundraising</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.05] text-[#111] font-normal tracking-[-0.035em] mb-4"
          >
            Great futures are built <br className="hidden md:block" /> with <span className="text-[#eb5e43]">basic education</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-gray-500 text-[15px] md:text-[1.05rem] max-w-2xl mx-auto leading-relaxed mb-6"
          >
            The AMAgada foundation is dedicated to providing quality <br className="hidden md:block" />
            basic education to underprivileged children across Nigeria
          </motion.p>
          
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="bg-[#1f1f1f] text-white p-1.5 pr-6 rounded-[0.8rem] font-medium text-[15px] flex items-center gap-3 hover:bg-[#2a2a2a] transition-colors shadow-lg"
          >
            <div className="w-9 h-9 rounded-[0.5rem] bg-gradient-to-br from-[#ff8c73] to-[#eb5e43] flex items-center justify-center">
              <Grid className="w-4 h-4 text-white stroke-[2.5]" />
            </div>
            Make a Donation
          </motion.button>
        </section>

        {/* Uniform Grid - Hypesonic style Slider */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full mt-4 group/slider"
        >
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md shadow-md p-3 rounded-full text-gray-800 opacity-0 group-hover/slider:opacity-100 transition-opacity disabled:opacity-0 hover:bg-white"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-md shadow-md p-3 rounded-full text-gray-800 opacity-0 group-hover/slider:opacity-100 transition-opacity disabled:opacity-0 hover:bg-white"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <section 
            ref={sliderRef}
            className="flex gap-4 w-full overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-2 md:px-4 cursor-grab active:cursor-grabbing [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {[
               { title: "258M children out of school", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" },
             { title: "70% lack basic reading skills", img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop" },
             { title: "1 in 5 drop out globally", img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" },
             { title: "67% illiterate are women", img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" },
             { title: "69M teachers needed by 2030", img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=800&auto=format&fit=crop" },
          ].map((item, i) => (
            <div 
              key={i} 
              className="snap-center w-[240px] md:w-[280px] lg:w-[300px] shrink-0 h-[300px] lg:h-[340px] rounded-3xl relative overflow-hidden group shadow-sm bg-gray-100 flex-col"
            >
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 right-4 z-10 flex text-left">
                <div className="bg-white/30 backdrop-blur-md rounded-full px-3 py-1.5 flex items-center gap-2 border border-white/30 shadow-sm">
                  <div className="w-5 h-5 rounded-full bg-black/60 flex items-center justify-center">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <span className="text-white text-[12px] font-medium tracking-wide truncate pr-2">{item.title}</span>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/10 pointer-events-none transition-colors group-hover:bg-transparent" />
            </div>
          ))}
          </section>
        </motion.div>

        {/* Trusted By Logos */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 md:mt-20 flex flex-col items-center opacity-70"
        >
          <p className="text-[10px] md:text-[11px] font-sans tracking-[0.2em] text-gray-500 uppercase mb-6 md:mb-8 text-center px-4">
            Trusted by reputable charities
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 max-w-4xl mx-auto px-4">
            <div className="flex items-center gap-2 text-gray-400 grayscale hover:grayscale-0 transition-all cursor-pointer hover:text-[#eb5e43]">
              <span className="font-bold text-[18px] md:text-[22px] tracking-tight font-serif uppercase">Unicef</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 grayscale hover:grayscale-0 transition-all cursor-pointer hover:text-[#eb5e43]">
              <span className="font-bold text-xl md:text-2xl tracking-tight uppercase font-serif">Red Cross</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 grayscale hover:grayscale-0 transition-all cursor-pointer hover:text-[#eb5e43]">
              <span className="font-bold text-lg md:text-xl tracking-wide uppercase font-sans">Oxfam</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 grayscale hover:grayscale-0 transition-all cursor-pointer hover:text-[#eb5e43]">
               <span className="font-bold text-[18px] md:text-[20px] tracking-tighter uppercase font-serif">Save the Children</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 grayscale hover:grayscale-0 transition-all cursor-pointer hover:text-[#eb5e43]">
              <span className="font-bold text-xl md:text-2xl tracking-widest uppercase font-serif">WHO</span>
            </div>
          </div>
        </motion.section>

        {/* About Us Section */}
        <motion.section className="my-16 lg:my-0 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center px-4 md:px-0 lg:h-screen lg:max-h-[850px] lg:min-h-[650px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          
          {/* Left Column */}
          <div className="flex flex-col justify-center py-6">
            <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-6 self-start">
              <Sparkles className="w-3.5 h-3.5 text-[#eb5e43]" />
              <span className="text-[#eb5e43] text-[13px] font-semibold tracking-wide">About us</span>
            </div>
            
            <h2 className="text-[3.2rem] md:text-[4rem] lg:text-[4rem] leading-[1.05] font-serif font-normal tracking-[-0.035em] text-[#111] mb-6 pr-4">
              Empowering the<br className="hidden lg:block"/> next generation
            </h2>
            
            <p className="text-gray-500 text-[16px] md:text-[17px] leading-[1.65] mb-10 font-sans max-w-lg">
              We believe every child deserves a chance to learn and thrive. By providing access to fundamental literacy and numeracy skills, we're building a brighter, more equitable future for Nigeria's underprivileged communities.
            </p>
            
            <button className="bg-[#1f1f1f] text-white p-1.5 pl-6 rounded-[0.8rem] font-medium text-[15px] flex items-center justify-between gap-6 hover:bg-[#2a2a2a] transition-colors shadow-lg w-max min-w-[170px] group/btn">
              Our history
              <div className="w-9 h-9 rounded-[0.5rem] bg-gradient-to-br from-[#ff8c73] to-[#eb5e43] flex items-center justify-center group-hover/btn:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
            </button>
          </div>

          {/* Right Column */}
          <div className="relative w-full h-[450px] md:h-[550px] lg:h-[80%] lg:max-h-[700px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-sm">
            <img 
              src="https://images.unsplash.com/photo-1577896849786-738ed6c78bd3?q=80&w=1200&auto=format&fit=crop" 
              alt="Children learning in classroom" 
              className="w-full h-full object-cover" 
            />
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button className="w-16 h-16 bg-[#111] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-xl pointer-events-auto">
                <Play className="w-6 h-6 text-white ml-1" fill="white" />
              </button>
            </div>
          </div>

        </motion.section>

        {/* Impact Goals Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 w-full max-w-7xl mx-auto px-4 md:px-0"
        >
          <div className="flex flex-col items-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#eb5e43]" />
              <span className="text-[#eb5e43] text-[13px] font-semibold tracking-wide">Our Impact</span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#111] font-normal tracking-[-0.03em]">
              Goals for the year
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {/* Stat 1 */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100/50 flex flex-col items-center text-center group hover:border-[#f3dcdb] transition-colors duration-300">
               <div className="w-14 h-14 rounded-2xl bg-[#fdf5f4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-7 h-7 text-[#eb5e43]" />
               </div>
               <div className="text-4xl md:text-5xl font-serif text-[#111] font-normal mb-3 flex items-center tracking-tight">
                 <AnimatedCounter from={0} to={50000} duration={2.5} />
                 <span className="text-[#eb5e43] ml-1">+</span>
               </div>
               <p className="text-gray-500 font-sans text-[15px] leading-relaxed">Educational materials & books<br/>distributed to rural schools</p>
            </div>

            {/* Stat 2 */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100/50 flex flex-col items-center text-center group hover:border-[#f3dcdb] transition-colors duration-300">
               <div className="w-14 h-14 rounded-2xl bg-[#fdf5f4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-[#eb5e43]" />
               </div>
               <div className="text-4xl md:text-5xl font-serif text-[#111] font-normal mb-3 flex items-center tracking-tight">
                 <AnimatedCounter from={0} to={100} duration={2.5} />
                 <span className="text-[#eb5e43] ml-1">k</span>
               </div>
               <p className="text-gray-500 font-sans text-[15px] leading-relaxed">Underprivileged children gaining<br/>access to basic education</p>
            </div>

            {/* Stat 3 */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100/50 flex flex-col items-center text-center group hover:border-[#f3dcdb] transition-colors duration-300">
               <div className="w-14 h-14 rounded-2xl bg-[#fdf5f4] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="w-7 h-7 text-[#eb5e43]" />
               </div>
               <div className="text-4xl md:text-5xl font-serif text-[#111] font-normal mb-3 flex items-center tracking-tight">
                 <AnimatedCounter from={0} to={200} duration={2.5} />
                 <span className="text-[#eb5e43] ml-1">+</span>
               </div>
               <p className="text-gray-500 font-sans text-[15px] leading-relaxed">Classrooms renovated, equipped<br/>and ready for learning</p>
            </div>
          </div>
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 w-full max-w-7xl mx-auto px-4 md:px-0"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 pt-10 border-t border-gray-100">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#eb5e43]" />
                <span className="text-[#eb5e43] text-[13px] font-semibold tracking-wide">Ongoing Projects</span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#111] font-normal tracking-[-0.03em] mb-4">
                Our projects in action
              </h2>
              <p className="text-gray-500 font-sans text-[16px] max-w-md leading-relaxed">
                Explore how we turn donations into positive change
              </p>
            </div>
            
            <button className="bg-[#1f1f1f] text-white p-1.5 pl-6 rounded-[0.8rem] font-medium text-[15px] flex items-center justify-between gap-6 hover:bg-[#2a2a2a] transition-colors shadow-lg w-max min-w-[170px] group/btn">
              View all
              <div className="w-9 h-9 rounded-[0.5rem] bg-gradient-to-br from-[#ff8c73] to-[#eb5e43] flex items-center justify-center group-hover/btn:scale-105 transition-transform">
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Project 1 */}
            <div className="group cursor-pointer bg-white p-4 md:p-5 rounded-[2rem] shadow-sm border border-gray-100/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-[#f3dcdb]/60 flex flex-col">
              <div className="relative w-full h-[240px] md:h-[260px] rounded-[1.5rem] overflow-hidden mb-5">
                <img src="https://images.unsplash.com/photo-1544252655-33924f7e25fb?q=80&w=800&auto=format&fit=crop" alt="Building new schools" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[12px] font-bold text-[#111] tracking-wide uppercase shadow-sm">
                  Education
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/20">
                  <div className="h-full bg-[#eb5e43]" style={{ width: '75%' }} />
                </div>
              </div>
              <div className="flex justify-between items-center mb-3 px-1">
                 <span className="text-gray-400 text-[13px] font-medium tracking-wide uppercase">Funding Goal</span>
                 <span className="text-[#eb5e43] text-[13px] font-bold">75% funded</span>
              </div>
              <h3 className="font-serif text-2xl text-[#111] font-normal mb-3 tracking-tight group-hover:text-[#eb5e43] transition-colors duration-300">
                Lagos Rural School Initiative
              </h3>
              <p className="text-gray-500 font-sans text-[15px] leading-relaxed line-clamp-2 md:mb-2">
                Constructing new classroom blocks and outfitting them with modern learning materials for over 500 students in rural Lagos.
              </p>
            </div>

            {/* Project 2 */}
            <div className="group cursor-pointer bg-white p-4 md:p-5 rounded-[2rem] shadow-sm border border-gray-100/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-[#f3dcdb]/60 flex flex-col">
              <div className="relative w-full h-[240px] md:h-[260px] rounded-[1.5rem] overflow-hidden mb-5">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" alt="Teacher training" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[12px] font-bold text-[#111] tracking-wide uppercase shadow-sm">
                  Training
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/20">
                  <div className="h-full bg-[#eb5e43]" style={{ width: '40%' }} />
                </div>
              </div>
              <div className="flex justify-between items-center mb-3 px-1">
                 <span className="text-gray-400 text-[13px] font-medium tracking-wide uppercase">Funding Goal</span>
                 <span className="text-[#eb5e43] text-[13px] font-bold">40% funded</span>
              </div>
              <h3 className="font-serif text-2xl text-[#111] font-normal mb-3 tracking-tight group-hover:text-[#eb5e43] transition-colors duration-300">
                Teacher Literacy Program
              </h3>
              <p className="text-gray-500 font-sans text-[15px] leading-relaxed line-clamp-2 md:mb-2">
                Providing intensive training programs to equip local teachers with advanced fundamental teaching methodologies.
              </p>
            </div>

            {/* Project 3 */}
            <div className="group cursor-pointer bg-white p-4 md:p-5 rounded-[2rem] shadow-sm border border-gray-100/50 transition-all duration-500 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-[#f3dcdb]/60 flex flex-col">
              <div className="relative w-full h-[240px] md:h-[260px] rounded-[1.5rem] overflow-hidden mb-5">
                <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop" alt="Reading materials" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[12px] font-bold text-[#111] tracking-wide uppercase shadow-sm">
                  Resources
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1.5 bg-black/20">
                  <div className="h-full bg-[#eb5e43]" style={{ width: '90%' }} />
                </div>
              </div>
              <div className="flex justify-between items-center mb-3 px-1">
                 <span className="text-gray-400 text-[13px] font-medium tracking-wide uppercase">Funding Goal</span>
                 <span className="text-[#eb5e43] text-[13px] font-bold">90% funded</span>
              </div>
              <h3 className="font-serif text-2xl text-[#111] font-normal mb-3 tracking-tight group-hover:text-[#eb5e43] transition-colors duration-300">
                Book Distribution Drive
              </h3>
              <p className="text-gray-500 font-sans text-[15px] leading-relaxed line-clamp-2 md:mb-2">
                Distributing thousands of textbooks, writing materials, and digital learning devices to remote communities.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-24 w-full max-w-7xl mx-auto px-4 md:px-0"
        >
          <div className="relative w-full h-[500px] md:h-[600px] rounded-[2rem] md:rounded-[3rem] overflow-hidden">
            <img 
               src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=1200&auto=format&fit=crop"
               alt="Group of diverse people smiling together"
               className="w-full h-full object-cover"
            />
            {/* Gradient Overlay for better readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/10"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-start text-center pt-16 md:pt-24 px-6 z-10">
              <div className="inline-flex items-center gap-2 bg-[#fdf5f4] border border-[#f3dcdb] px-3 py-1.5 rounded-full mb-6">
                <Heart className="w-3.5 h-3.5 text-[#eb5e43]" />
                <span className="text-[#eb5e43] text-[13px] font-semibold tracking-wide">Together, we grow hope</span>
              </div>
              
              <h2 className="text-[3rem] md:text-[4rem] lg:text-[4.5rem] leading-[1.05] font-serif font-normal tracking-[-0.035em] text-white mb-6 max-w-3xl drop-shadow-md">
                Your gift changes lives
              </h2>
              
              <p className="text-white/90 text-[16px] md:text-[17px] leading-[1.65] font-sans mb-10 max-w-2xl drop-shadow-sm font-medium">
                Choose between monthly or one-time donations to make a lasting impact in our community. Join us in our mission to provide basic education to the underprivileged.
              </p>
              
              <button className="bg-[#1f1f1f] text-white p-1.5 pl-6 rounded-[0.8rem] font-medium text-[15px] flex items-center justify-between gap-6 hover:bg-[#2a2a2a] transition-colors shadow-lg w-max min-w-[210px] group/cta">
                Make a Donation
                <div className="w-[40px] h-[40px] rounded-[0.5rem] bg-gradient-to-br from-[#ff8c73] to-[#eb5e43] flex items-center justify-center group-hover/cta:scale-105 transition-transform">
                  <ArrowRight className="w-5 h-5 text-white stroke-[2.5]" />
                </div>
              </button>
            </div>
            
            {/* Decorative SVGs for the CTA section to mimic the drawing overlays */}
            <svg className="absolute top-20 left-10 md:left-24 lg:left-32 w-16 h-16 md:w-24 md:h-24 opacity-80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M10 80 Q 20 60 50 70 T 90 20" stroke="#eb5e43" strokeWidth="2.5" strokeLinecap="round" fill="none" />
               <path d="M80 15 L 90 20 L 85 30" stroke="#eb5e43" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <svg className="absolute top-24 right-10 md:right-24 lg:right-32 w-16 h-16 md:w-24 md:h-24 opacity-60" viewBox="0 0 60 100" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M30 10 C 10 10, 10 30, 30 40 C 50 30, 50 10, 30 10 Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
               <path d="M30 40 Q 30 70 20 90" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </motion.section>

      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full bg-[#fffcfb] border-t border-[#f3dcdb]/40 pt-16 pb-8 px-4 md:px-0 mt-auto"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-24">
          {/* Brand & Mission */}
          <div className="max-w-md">
            <div className="font-serif text-2xl font-medium tracking-tight text-[#111] flex items-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-[#eb5e43]" />
              AMAgada Foundation
            </div>
            <p className="text-gray-500 font-sans text-[15.5px] leading-[1.7]">
              Dedicated to providing basic education to underprivileged children across Nigeria, transforming lives and building brighter futures one classroom at a time.
            </p>
          </div>
          
          <div className="flex-1 flex flex-col sm:flex-row gap-12 md:gap-24 justify-end">
            {/* Quick Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-[18px] text-[#111] mb-2 font-normal">Quick Links</h4>
              <a href="#" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Home
              </a>
              <a href="#" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Projects
              </a>
              <a href="#" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> About
              </a>
              <a href="#" className="text-gray-500 hover:text-[#eb5e43] font-sans text-[15px] transition-colors flex items-center gap-1 group">
                <span className="w-2 h-0.5 bg-[#eb5e43] opacity-0 group-hover:opacity-100 transition-opacity"></span> Contact
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex flex-col gap-4">
              <h4 className="font-serif text-[18px] text-[#111] mb-2 font-normal">Follow Us</h4>
              <div className="flex items-center gap-3">
                <a href="#" className="w-11 h-11 rounded-full bg-[#fdf5f4] border border-[#f3dcdb]/60 flex items-center justify-center text-[#eb5e43] hover:bg-[#eb5e43] hover:text-white transition-colors group">
                  <Twitter className="w-[18px] h-[18px] fill-current group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-[#fdf5f4] border border-[#f3dcdb]/60 flex items-center justify-center text-[#eb5e43] hover:bg-[#eb5e43] hover:text-white transition-colors group">
                  <Instagram className="w-[18px] h-[18px] group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-11 h-11 rounded-full bg-[#fdf5f4] border border-[#f3dcdb]/60 flex items-center justify-center text-[#eb5e43] hover:bg-[#eb5e43] hover:text-white transition-colors group">
                  <Linkedin className="w-[18px] h-[18px] fill-current group-hover:scale-110 transition-transform" />
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
      </motion.footer>
    </div>
  );
}


