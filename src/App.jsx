import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, CheckCircle2, Phone, MapPin, Shield, Star, Home, Clock, Menu, X, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef(null);

  // GSAP Animations Setup
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero Animations
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
      tl.from('.hero-bg', { scale: 1.1, duration: 2, ease: 'power3.out' })
        .from('.hero-badge', { y: 20, opacity: 0, stagger: 0.1 }, '-=1.5')
        .from('.hero-title span', { y: 100, opacity: 0, stagger: 0.1, duration: 1 }, '-=1.4')
        .from('.hero-desc', { y: 20, opacity: 0 }, '-=1')
        .from('.hero-cta', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.8');

      // 2. Sticky Scroll Sections (Protocol)
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.95,
            opacity: 0.5,
            filter: 'blur(4px)',
            scrollTrigger: {
              trigger: card,
              start: 'top top+=100',
              end: 'bottom top+=100',
              scrub: true,
            }
          });
        }
      });

      // 3. Simple fade-ins for grid items
      gsap.utils.toArray('.fade-up').forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=100',
            toggleActions: 'play none none reverse'
          }
        });
      });
      
    }, mainRef);

    // Scroll listener for Navbar
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    return () => {
      ctx.revert();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const signatureSparks = Array.from({ length: 8 });

  return (
    <div ref={mainRef} className="relative w-full overflow-x-hidden selection:bg-accent selection:text-primary-dark">
      
      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Nav Container */}
          <div className={`w-full flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${isScrolled ? 'glass' : 'bg-transparent'}`}>
            
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2 group">
              <Sparkles className="w-5 h-5 text-primary group-hover:rotate-12 transition-transform" />
              <span className="font-display font-bold text-lg tracking-tight text-ink">
                CLEAN HOUSE <span className="font-serif italic text-primary font-normal text-xl ml-1">by Nadia & Cipri</span>
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {['Services', 'Process', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-ink/70 hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
              <a href="https://wa.me/35797898105" target="_blank" rel="noreferrer" className="bg-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/20 flex items-center gap-2">
                <Phone className="w-4 h-4" /> WhatsApp
              </a>
            </div>

            {/* Mobile Toggle */}
            <button className="lg:hidden text-ink" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl transition-all duration-300 flex flex-col justify-center items-center gap-8 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {['Services', 'Process', 'About', 'Contact'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-display font-bold text-ink">
            {item}
          </a>
        ))}
      </div>

      {/* 2. HERO SECTION */}
      <header id="top" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-surface-dark">
        {/* BG Image */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/40 to-surface z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-transparent to-surface z-10" />
          <img 
            src="https://images.unsplash.com/photo-1628177142898-93e46e46537a?auto=format&fit=crop&w=2000&q=80" 
            alt="Friendly cleaning professionals working together" 
            className="hero-bg w-full h-full object-cover object-center opacity-40"
          />
        </div>

        {/* Signature Animation: Floating Sparkles */}
        <div className="absolute top-1/4 right-10 lg:right-32 w-64 h-64 z-20 pointer-events-none hidden md:block opacity-60">
          {signatureSparks.map((_, i) => (
            <Sparkles 
              key={i}
              className={`absolute text-accent animate-float`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${16 + Math.random() * 24}px`,
                height: `${16 + Math.random() * 24}px`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
                <Star className="w-3.5 h-3.5 text-primary fill-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">10 Years of Excellence</span>
              </div>
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-white/40 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary">Ayia Napa • Paralimni • Kapparis</span>
              </div>
            </div>
            
            <h1 className="hero-title text-5xl sm:text-6xl lg:text-7xl font-display font-extrabold text-ink leading-[1.1] mb-6 flex flex-wrap gap-x-3 overflow-hidden">
              <span className="block">Elevate</span> <span className="block">Your</span> <span className="block text-gradient">Space.</span>
            </h1>
            
            <p className="hero-desc text-lg sm:text-xl text-ink/70 mb-10 max-w-xl font-body leading-relaxed">
              We are a dedicated family business serving the entire Famagusta area. We bring our professional team, impeccable quality standards, and <span className="font-serif italic text-primary">absolute peace of mind</span> to your home or office.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="https://wa.me/35797898105" target="_blank" rel="noreferrer" className="hero-cta bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20 flex items-center gap-2">
                <Phone className="w-5 h-5" /> Book via WhatsApp
              </a>
              <a href="#services" className="hero-cta px-8 py-4 rounded-full font-bold text-ink bg-white/50 backdrop-blur-md border border-white/40 hover:bg-white transition-all duration-300">
                Explore Services
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. FEATURES (Trust Signals) */}
      <section className="py-24 bg-surface relative z-30 -mt-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "Family Operated", desc: "Built on a decade of trust, treating your space with the same respect we treat our own." },
              { icon: Sparkles, title: "Uncompromising Quality", desc: "Meticulous attention to detail ensuring every corner meets our rigorous premium standards." },
              { icon: Home, title: "Professional Team", desc: "Equipped with industry-leading tools and eco-friendly products for a flawless, deep clean." }
            ].map((feat, i) => (
              <div key={i} className="fade-up glass p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-500">
                <div className="w-12 h-12 bg-accent-light rounded-2xl flex items-center justify-center mb-6">
                  <feat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-display text-ink mb-3">{feat.title}</h3>
                <p className="text-ink/60 text-sm leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES GRID */}
      <section id="services" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-20 fade-up">
            <h2 className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Our Expertise</h2>
            <p className="text-4xl sm:text-5xl font-display font-extrabold text-ink leading-tight">
              Tailored cleaning solutions for <span className="font-serif italic font-normal text-primary">every space.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Deep Residential Clean", icon: Home, desc: "A comprehensive, top-to-bottom scrub of your entire home, hitting the spots daily cleaning misses." },
              { name: "Move In / Move Out", icon: ArrowRight, desc: "Ensure a spotless transition. We prep homes for new occupants or restore them upon departure." },
              { name: "Premium Commercial", icon: Shield, desc: "Maintain a pristine, professional environment for your staff and visiting clients." },
              { name: "Post-Construction", icon: CheckCircle2, desc: "Thorough dust and debris removal following renovations, making the space instantly livable." },
              { name: "Upholstery & Carpets", icon: Sparkles, desc: "Deep extraction cleaning to revive fabrics, remove allergens, and restore original vibrancy." },
              { name: "Routine Maintenance", icon: Clock, desc: "Flexible weekly or bi-weekly schedules designed to keep your sanctuary effortlessly immaculate." }
            ].map((srv, i) => (
              <div key={i} className="fade-up group p-8 border border-surface-dark rounded-3xl hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 bg-surface/30">
                <srv.icon className="w-8 h-8 text-primary/40 group-hover:text-primary transition-colors mb-6" />
                <h4 className="text-lg font-bold font-display text-ink mb-2">{srv.name}</h4>
                <p className="text-sm text-ink/60 leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROTOCOL (Process) - Sticky Stack */}
      <section id="process" className="py-32 bg-ink text-surface relative">
        <div className="max-w-4xl mx-auto px-6 sm:px-10">
          <div className="mb-20 fade-up">
            <h2 className="text-xs font-bold uppercase tracking-widest text-accent mb-3">The Protocol</h2>
            <p className="text-4xl sm:text-5xl font-display font-extrabold leading-tight">
              How we deliver <span className="font-serif italic font-normal text-accent">perfection.</span>
            </p>
          </div>

          <div className="relative">
            {[
              { step: "01", title: "Consultation & Assessment", desc: "We evaluate your space via WhatsApp or in person to understand your specific needs, fragile surfaces, and scheduling preferences." },
              { step: "02", title: "The Deep Clean", desc: "Our experienced team arrives fully equipped. We execute our meticulous checklist, ensuring no detail is overlooked." },
              { step: "03", title: "Final Walkthrough", desc: "We review the space. You enjoy the unparalleled freshness and peace of mind that comes with a truly clean house." }
            ].map((step, i) => (
              <div key={i} className="protocol-card sticky top-32 glass-dark p-10 md:p-14 rounded-3xl mb-24 last:mb-0 border border-white/10 shadow-2xl">
                <span className="font-mono text-5xl font-light text-accent/20 absolute top-10 right-10">{step.step}</span>
                <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">{step.title}</h3>
                <p className="text-surface/70 text-lg leading-relaxed max-w-lg">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT CTA */}
      <section id="contact" className="py-32 bg-surface relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white shadow-lg mb-8 fade-up">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-ink mb-6 fade-up">
            Ready for a pristine home?
          </h2>
          <p className="text-lg sm:text-xl text-ink/70 mb-12 max-w-2xl mx-auto font-body fade-up">
            Reach out directly to Nadia & Cipri. We operate primarily via WhatsApp to ensure fast, personal communication.
          </p>
          
          <div className="fade-up flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="https://wa.me/35797898105" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#20BD5A] transition-all shadow-xl shadow-[#25D366]/20 flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" /> Chat on WhatsApp
            </a>
            <span className="text-ink/50 font-mono text-sm sm:ml-4">+357 97 898105</span>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-ink text-surface/60 py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="font-display font-bold text-surface tracking-wide">
              CLEAN HOUSE <span className="font-serif italic font-normal">by Nadia & Cipri</span>
            </span>
          </div>
          
          <div className="flex items-center gap-6 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" /> Serving the Famagusta area
            </span>
          </div>

          <div className="text-sm font-mono opacity-50">
            &copy; {new Date().getFullYear()} Clean House by Nadia & Cipri.
          </div>
        </div>
      </footer>

    </div>
  );
}
