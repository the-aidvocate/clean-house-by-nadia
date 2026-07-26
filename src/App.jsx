import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, CheckCircle2, Phone, MapPin, Shield, Star, Home, Clock, Menu, X, ArrowRight, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mainRef = useRef(null);

  // GSAP Animations Setup
  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Hero Animations (Bouncy & Elegant)
      const tl = gsap.timeline({ defaults: { ease: 'back.out(1.5)', duration: 1.2 } });
      
      // Parallax Background
      gsap.to('.hero-bg', {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: '#top',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      tl.from('.hero-badge', { y: 30, opacity: 0, scale: 0.8, stagger: 0.1 }, 0.2)
        .from('.hero-title span', { y: 60, opacity: 0, stagger: 0.1, duration: 1, ease: 'power3.out' }, '-=0.8')
        .from('.hero-desc', { y: 20, opacity: 0, ease: 'power3.out' }, '-=0.6')
        .from('.hero-cta', { y: 20, opacity: 0, scale: 0.9, stagger: 0.1 }, '-=0.6');

      // 2. Sticky Scroll Sections (Protocol)
      const cards = gsap.utils.toArray('.protocol-card');
      cards.forEach((card, i) => {
        if (i !== cards.length - 1) {
          gsap.to(card, {
            scale: 0.92,
            opacity: 0.4,
            filter: 'blur(8px)',
            scrollTrigger: {
              trigger: card,
              start: 'top top+=100',
              end: 'bottom top+=100',
              scrub: true,
            }
          });
        }
      });

      // 3. Simple fade-ins for grid items with slight scale
      gsap.utils.toArray('.fade-up').forEach((el) => {
        gsap.from(el, {
          y: 50,
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom-=50',
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

  const signatureSparks = Array.from({ length: 12 });

  return (
    <div ref={mainRef} className="relative w-full overflow-x-hidden selection:bg-gold selection:text-primary-dark">
      
      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Nav Container */}
          <div className={`w-full flex items-center justify-between px-6 py-3.5 rounded-full transition-all duration-500 shadow-sm ${isScrolled ? 'bg-primary-dark/95 backdrop-blur-xl border border-gold/20 shadow-gold/10' : 'bg-primary-dark/60 backdrop-blur-md border border-white/20'}`}>
            
            {/* Logo */}
            <a href="#top" className="flex items-center gap-2.5 group">
              <div className="bg-white p-1.5 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-white">
                CLEAN HOUSE <span className="font-serif italic text-gold font-normal text-xl ml-1">by Nadia & Cipri</span>
              </span>
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {['Services', 'Process', 'About', 'Contact'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/80 hover:text-gold transition-colors">
                  {item}
                </a>
              ))}
              <a href="https://wa.me/35797898105" target="_blank" rel="noreferrer" className="bg-gold text-primary-dark px-6 py-2.5 rounded-full text-sm font-bold hover:bg-gold-light hover:scale-105 hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 flex items-center gap-2">
                <Phone className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>

            {/* Mobile Toggle */}
            <button className="lg:hidden text-white p-2 bg-white/10 rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-5 h-5 text-gold" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-primary-dark/98 backdrop-blur-2xl transition-all duration-400 flex flex-col justify-center items-center gap-8 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {['Services', 'Process', 'About', 'Contact'].map((item, i) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`} 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-4xl font-serif italic text-gold hover:text-white transition-colors"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* 2. HERO SECTION */}
      <header id="top" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-primary-dark">
        {/* BG Image */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-primary-dark">
          {/* Deep Blue & Gold Gradients */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/90 via-primary-dark/70 to-surface z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/30 to-primary-dark/60 z-10" />
          
          <img 
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=80" 
            alt="Smiling cleaning professionals" 
            className="hero-bg w-full h-full object-cover object-center opacity-60"
            style={{ transformOrigin: 'top center' }}
          />
        </div>

        {/* Signature Animation: Floating Sparkles */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          {signatureSparks.map((_, i) => {
            const isGold = i % 2 === 0;
            return (
              <Sparkles 
                key={i}
                className={`absolute animate-float ${isGold ? 'text-gold' : 'text-primary-light'}`}
                style={{
                  top: `${10 + Math.random() * 80}%`,
                  left: `${5 + Math.random() * 90}%`,
                  width: `${16 + Math.random() * 32}px`,
                  height: `${16 + Math.random() * 32}px`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${5 + Math.random() * 5}s`,
                  opacity: 0.5 + Math.random() * 0.5
                }}
              />
            )
          })}
        </div>

        {/* Hero Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full mt-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md shadow-md border border-gold/40">
                <Heart className="w-4 h-4 text-gold fill-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-gold-light">Family Business</span>
              </div>
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md shadow-md border border-primary-light/40">
                <MapPin className="w-4 h-4 text-white" />
                <span className="text-xs font-bold uppercase tracking-widest text-white">Ayia Napa • Paralimni • Kapparis</span>
              </div>
            </div>
            
            <h1 className="hero-title text-6xl sm:text-7xl lg:text-8xl font-display font-extrabold text-white leading-[1.05] mb-6 flex flex-wrap gap-x-4 overflow-hidden drop-shadow-lg">
              <span className="block">Bringing</span> 
              <span className="block font-serif italic text-gold font-medium">warmth</span> 
              <span className="block">& shine</span> 
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white to-primary-light">to your home.</span>
            </h1>
            
            <p className="hero-desc text-lg sm:text-xl text-white/90 mb-10 max-w-xl font-body leading-relaxed bg-primary-dark/40 p-4 rounded-xl backdrop-blur-md border border-white/10 inline-block shadow-xl">
              With 10 years of trusted experience, our family team brings impeccable quality, professional care, and absolute peace of mind to your sanctuary.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="https://wa.me/35797898105" target="_blank" rel="noreferrer" className="hero-cta bg-gold text-primary-dark px-8 py-4 rounded-full font-bold hover:bg-gold-light hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-gold/30 flex items-center gap-2 text-lg">
                <Phone className="w-5 h-5" /> Say Hello on WhatsApp
              </a>
              <a href="#services" className="hero-cta px-8 py-4 rounded-full font-bold text-white bg-primary-dark/60 backdrop-blur-md border border-gold/40 shadow-md hover:shadow-xl hover:bg-primary-dark hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-lg">
                See How We Help <ArrowRight className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. FEATURES (Trust Signals) */}
      <section className="py-24 bg-surface relative z-30">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Caring & Trusted", desc: "A husband & wife team. We treat your home, your family, and your pets with absolute love and respect." },
              { icon: Sparkles, title: "Spotless Quality", desc: "10 years of experience means we know exactly where the dust hides. Meticulous cleaning every time." },
              { icon: CheckCircle2, title: "Always Ready", desc: "Equipped with professional-grade tools and safe products. We come fully prepared so you can relax." }
            ].map((feat, i) => (
              <div key={i} className="fade-up bg-white p-10 rounded-[2rem] hover:-translate-y-3 transition-transform duration-500 shadow-xl shadow-primary/5 border border-primary/10 group">
                <div className={`w-16 h-16 bg-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-gold/20 transition-all duration-500`}>
                  <feat.icon className={`w-8 h-8 text-gold`} />
                </div>
                <h3 className="text-2xl font-bold font-display text-primary-dark mb-3">{feat.title}</h3>
                <p className="text-ink/70 text-base leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES GRID */}
      <section id="services" className="py-32 bg-surface-dark">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="text-center max-w-2xl mx-auto mb-20 fade-up">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gold mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 text-gold" /> What We Do <Sparkles className="w-4 h-4 text-gold" />
            </h2>
            <p className="text-4xl sm:text-5xl font-display font-extrabold text-primary-dark leading-tight">
              Cleaning services made with <span className="font-serif italic font-normal text-primary">care & love.</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "Deep Home Clean", icon: Home, desc: "A top-to-bottom scrub hitting every overlooked corner. Perfect for spring cleaning or special occasions." },
              { name: "Move In / Move Out", icon: ArrowRight, desc: "Stress-free transitions. We make old homes feel new and ensure your new house is perfectly sanitized." },
              { name: "Offices & Shops", icon: Shield, desc: "A welcoming, fresh environment for your clients and a healthy, inspiring workspace for your team." },
              { name: "Post-Construction", icon: CheckCircle2, desc: "Say goodbye to fine dust and building debris. We transform construction sites back into beautiful living spaces." },
              { name: "Upholstery & Carpets", icon: Sparkles, desc: "Professional extraction cleaning to remove deep dirt, allergens, and spots from your favorite furniture." },
              { name: "Routine Maintenance", icon: Clock, desc: "Flexible weekly or bi-weekly visits. Come home to a beautifully clean house, exactly the way you like it." }
            ].map((srv, i) => (
              <div key={i} className="fade-up group p-10 bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-primary/15 border border-transparent hover:border-gold/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <srv.icon className="w-10 h-10 text-primary/30 group-hover:text-gold group-hover:scale-110 transition-all duration-500 mb-6" />
                  <h4 className="text-xl font-bold font-display text-primary-dark mb-3">{srv.name}</h4>
                  <p className="text-base text-ink/70 leading-relaxed">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROTOCOL (Process) - Sticky Stack */}
      <section id="process" className="py-32 bg-primary-dark text-surface relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/40 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="mb-20 fade-up text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-gold mb-4">How It Works</h2>
            <p className="text-4xl sm:text-5xl font-display font-extrabold leading-tight text-white">
              A simple, friendly <span className="font-serif italic font-normal text-gold-light">process.</span>
            </p>
          </div>

          <div className="relative">
            {[
              { step: "1", title: "Say Hello", desc: "Drop us a message on WhatsApp. Tell us what you need, where you live, and we'll figure out a friendly quote and time that works for you." },
              { step: "2", title: "We Bring The Magic", desc: "Nadia and Cipri arrive with all the professional equipment and supplies needed. You can relax while we meticulously clean your space." },
              { step: "3", title: "Enjoy Your Home", desc: "Walk into a house that smells fresh, looks sparkling, and feels incredibly welcoming. Your peace of mind is our final result." }
            ].map((step, i) => (
              <div key={i} className="protocol-card sticky top-32 bg-white text-primary-dark p-10 md:p-16 rounded-[2.5rem] mb-24 last:mb-0 shadow-2xl shadow-ink/20 border-t-4 border-gold">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center font-display font-extrabold text-3xl text-primary-dark">
                    {step.step}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold">{step.title}</h3>
                </div>
                <p className="text-ink/70 text-xl leading-relaxed pl-22">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CONTACT CTA */}
      <section id="contact" className="py-32 bg-surface relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl shadow-primary/10 mb-8 fade-up border border-gold/20">
            <Heart className="w-10 h-10 text-gold fill-gold" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-primary-dark mb-6 fade-up">
            Let's make your home shine!
          </h2>
          <p className="text-xl text-ink/70 mb-12 max-w-2xl mx-auto font-body fade-up">
            Reach out directly to Nadia & Cipri. We reply fast, chat friendly, and can't wait to help you love your space again.
          </p>
          
          <div className="fade-up flex flex-col sm:flex-row items-center justify-center gap-6">
            <a 
              href="https://wa.me/35797898105" 
              target="_blank" 
              rel="noreferrer"
              className="w-full sm:w-auto bg-[#25D366] text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-[#20BD5A] hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#25D366]/30 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <Phone className="w-6 h-6" /> Text Us on WhatsApp
            </a>
            <span className="text-primary-dark font-bold text-lg bg-white px-6 py-4 rounded-full shadow-sm border border-gold/30">
              +357 97 898105
            </span>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-primary-dark text-surface/80 py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-gold" />
              <span className="font-display font-bold text-xl text-white tracking-wide">
                CLEAN HOUSE <span className="font-serif italic text-gold font-normal">by Nadia & Cipri</span>
              </span>
            </div>
            <p className="text-surface/50 text-sm">Quality family cleaning in Cyprus.</p>
          </div>
          
          <div className="flex items-center gap-6 bg-white/5 px-6 py-3 rounded-full border border-gold/20">
            <span className="flex items-center gap-3 text-sm font-medium text-gold-light">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-gold"></span>
              </span>
              Accepting clients in Famagusta area
            </span>
          </div>

          <div className="text-sm font-body opacity-50 text-white">
            &copy; {new Date().getFullYear()} Clean House by Nadia & Cipri.
          </div>
        </div>
      </footer>

    </div>
  );
}
