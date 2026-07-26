import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, CheckCircle2, Phone, MapPin, Shield, Star, Home, Clock, Menu, X, ArrowRight, Heart } from 'lucide-react';
import SideRays from './SideRays';

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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'py-2' : 'py-4'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-10 lg:px-16 flex items-center justify-between">
          {/* Nav Container */}
          <div className={`w-full flex items-center justify-between px-6 py-2 rounded-full transition-all duration-500 shadow-sm ${isScrolled ? 'bg-white/95 backdrop-blur-xl border border-primary/10 shadow-primary/5' : 'bg-white/80 backdrop-blur-md border border-white/50'}`}>
            
            {/* Logo Image */}
            <a href="#top" className="flex items-center group">
              <img 
                src="/LOGO CLEAN HOUSE BY NADIA CIPRI.png" 
                alt="Cleaning House by Nadia & Cipri Logo" 
                className="h-20 w-auto group-hover:scale-105 transition-transform duration-300 -my-2"
              />
            </a>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-8">
              {['Services', 'Process', 'Short-Term Rentals', 'Contact'].map((item) => (
                <a 
                  key={item} 
                  href={item === 'Short-Term Rentals' ? '#airbnb' : `#${item.toLowerCase()}`} 
                  className="text-sm font-bold text-ink/70 hover:text-primary transition-colors"
                >
                  {item}
                </a>
              ))}
              <a href="#contact" className="bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-primary-dark hover:scale-105 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2 border border-primary-light/50">
                <Phone className="w-4 h-4 text-gold" /> Contact Us
              </a>
            </div>

            {/* Mobile Toggle */}
            <button className="lg:hidden text-primary p-2 bg-primary/5 rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-40 bg-white/98 backdrop-blur-2xl transition-all duration-400 flex flex-col justify-center items-center gap-8 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        {['Services', 'Process', 'Short-Term Rentals', 'Contact'].map((item, i) => (
          <a 
            key={item} 
            href={item === 'Short-Term Rentals' ? '#airbnb' : `#${item.toLowerCase()}`} 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-4xl font-serif italic text-primary hover:text-primary-dark transition-colors"
            style={{ transitionDelay: `${i * 50}ms` }}
          >
            {item}
          </a>
        ))}
      </div>

      {/* 2. HERO SECTION */}
      <header id="top" className="relative min-h-screen flex items-center pt-24 overflow-hidden bg-surface">
        {/* BG Image */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-surface">
          {/* Bright, clean white overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-surface/95 via-surface/70 to-surface z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-surface/95 via-surface/40 to-surface/80 z-10" />
          
          <img 
            src="/pexels-liliana-drew-9462096.jpg" 
            alt="Smiling cleaning professionals" 
            className="hero-bg w-full h-full object-cover object-center opacity-70"
            style={{ transformOrigin: 'top center' }}
          />
        </div>

        {/* Signature Animation: Side Rays */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-60">
          <SideRays
            speed={2.5}
            rayColor1="#C98729"
            rayColor2="#0F3562"
            intensity={2}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1.5}
            blend={0.75}
            falloff={1.6}
            opacity={1}
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-30 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 w-full mt-10">
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-3 mb-8">
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-gold/40">
                <Heart className="w-4 h-4 text-gold fill-gold" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary-dark">Family Business</span>
              </div>
              <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md border border-primary/20">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-widest text-primary-dark">Ayia Napa • Paralimni • Kapparis</span>
              </div>
            </div>
            
            <h1 className="hero-title text-6xl sm:text-7xl lg:text-8xl font-display font-extrabold text-ink leading-tight mb-6 flex flex-wrap gap-x-4 overflow-visible drop-shadow-sm pb-4">
              <span className="block pb-2">Bringing</span> 
              <span className="block font-serif italic text-gold font-medium pb-2">warmth</span> 
              <span className="block pb-2">& shine</span> 
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-light pb-4">to your home.</span>
            </h1>
            
            <p className="hero-desc text-lg sm:text-xl text-ink/80 mb-10 max-w-xl font-body leading-relaxed bg-white/60 p-4 rounded-xl backdrop-blur-md border border-white inline-block shadow-lg shadow-primary/5">
              With 10 years of trusted experience, our family team brings impeccable quality, professional care, and absolute peace of mind to your sanctuary.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="hero-cta bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark hover:-translate-y-1 transition-all duration-300 shadow-xl shadow-primary/30 flex items-center gap-2 text-lg border border-primary-light/50">
                <Phone className="w-5 h-5 text-gold" /> Contact Us
              </a>
              <a href="#services" className="hero-cta px-8 py-4 rounded-full font-bold text-primary-dark bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 text-lg border border-gold/30">
                See How We Help <ArrowRight className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 3. FEATURES (Trust Signals) */}
      <section className="py-24 bg-surface-dark relative z-30">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Heart, title: "Caring & Trusted", desc: "A husband & wife team. We treat your home, your family, and your pets with absolute love and respect." },
              { icon: Sparkles, title: "Spotless Quality", desc: "10 years of experience means we know exactly where the dust hides. Meticulous cleaning every time." },
              { icon: CheckCircle2, title: "Always Ready", desc: "Equipped with professional-grade tools and safe products. We come fully prepared so you can relax." }
            ].map((feat, i) => (
              <div key={i} className="fade-up bg-white p-10 rounded-[2rem] hover:-translate-y-3 transition-transform duration-500 shadow-xl shadow-primary/5 border border-primary/10 group">
                <div className={`w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500`}>
                  <feat.icon className={`w-8 h-8 text-primary`} />
                </div>
                <h3 className="text-2xl font-bold font-display text-primary-dark mb-3">{feat.title}</h3>
                <p className="text-ink/70 text-base leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SERVICES GRID */}
      <section id="services" className="py-32 bg-white">
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
              { name: "Deep Home Clean", icon: Home, image: "/pexels-tima-miroshnichenko-6195122.jpg", desc: "A top-to-bottom scrub hitting every overlooked corner. Perfect for spring cleaning or special occasions." },
              { name: "Move In / Move Out", icon: ArrowRight, image: "/pexels-antonius-ferret-6223025.jpg", desc: "Stress-free transitions. We make old homes feel new and ensure your new house is perfectly sanitized." },
              { name: "Offices & Shops", icon: Shield, image: "/office.jpg", desc: "A welcoming, fresh environment for your clients and a healthy, inspiring workspace for your team." },
              { name: "Hotel-Style Cleaning", icon: Star, image: "/hotel style cleaning.jpg", desc: "Immaculate, detailed turnovers. We prepare your property to premium standards, ready to wow your next guests." },
              { name: "Upholstery & Carpets", icon: Sparkles, image: "/carpets.jpg", desc: "Professional extraction cleaning to remove deep dirt, allergens, and spots from your favorite furniture." },
              { name: "Routine Maintenance", icon: Clock, image: "/pexels-liliana-drew-9462105.jpg", desc: "Flexible weekly or bi-weekly visits. Come home to a beautifully clean house, exactly the way you like it." }
            ].map((srv, i) => (
              <div key={i} className="fade-up group relative h-80 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-primary/20 overflow-hidden cursor-pointer border border-primary/10">
                {/* Background Image */}
                <img 
                  src={srv.image} 
                  alt={srv.name} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary-dark/50 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-0 bg-primary-dark/30 group-hover:opacity-0 transition-opacity duration-500" />
                
                {/* Content */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30">
                      <srv.icon className="w-6 h-6 text-gold" />
                    </div>
                    <h4 className="text-2xl font-bold font-display text-white mb-2">{srv.name}</h4>
                    <p className="text-sm text-white/90 leading-relaxed opacity-0 h-0 group-hover:opacity-100 group-hover:h-auto transition-all duration-500">{srv.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PROTOCOL (Process) - Sticky Stack */}
      <section id="process" className="py-32 bg-surface-dark text-ink relative overflow-hidden">
        {/* Ambient background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10">
          <div className="mb-20 fade-up text-center">
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">How It Works</h2>
            <p className="text-4xl sm:text-5xl font-display font-extrabold leading-tight text-primary-dark">
              A simple, friendly <span className="font-serif italic font-normal text-gold">process.</span>
            </p>
          </div>

          <div className="relative">
            {[
              { step: "1", title: "Say Hello", desc: "Drop us a message on WhatsApp. Tell us what you need, where you live, and we'll figure out a friendly quote and time that works for you." },
              { step: "2", title: "We Bring The Magic", desc: "Nadia and Cipri arrive with all the professional equipment and supplies needed. You can relax while we meticulously clean your space." },
              { step: "3", title: "Enjoy Your Home", desc: "Walk into a house that smells fresh, looks sparkling, and feels incredibly welcoming. Your peace of mind is our final result." }
            ].map((step, i) => (
              <div key={i} className="protocol-card sticky top-32 bg-white text-primary-dark p-10 md:p-16 rounded-[2.5rem] mb-24 last:mb-0 shadow-2xl shadow-primary/10 border border-primary/5">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center font-display font-extrabold text-3xl text-white shadow-md shadow-primary/20">
                    {step.step}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-bold">{step.title}</h3>
                </div>
                <p className="text-ink/80 text-xl leading-relaxed pl-22">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5 AIRBNB & BOOKING HOSTS SECTION */}
      <section id="airbnb" className="py-32 bg-surface-dark relative overflow-hidden border-b border-primary/5">
        <div className="absolute right-0 top-0 w-1/3 h-full bg-primary/5 -skew-x-12 translate-x-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            {/* Image Side */}
            <div className="w-full lg:w-1/2 relative fade-up">
              <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-primary/10">
                <img 
                  src="/hotel style cleaning.jpg" 
                  alt="Perfectly made hotel bed" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl shadow-primary/10 border border-primary/5 hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
                </div>
                <p className="font-display font-bold text-primary-dark">5-Star Cleanliness</p>
                <p className="text-sm text-ink/60">Superhost Standard</p>
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 fade-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold/10 text-gold-dark font-bold text-xs uppercase tracking-widest mb-6">
                <MapPin className="w-4 h-4" /> Short-Term Rentals
              </div>
              
              <h2 className="text-4xl sm:text-5xl font-display font-extrabold text-primary-dark leading-tight mb-6">
                Turnover services for <span className="text-primary font-serif italic font-normal">Airbnb & Booking</span> hosts.
              </h2>
              
              <p className="text-lg text-ink/70 leading-relaxed mb-8">
                Managing a short-term rental is stressful enough without worrying about the cleaning. We provide hotel-standard turnovers that guarantee 5-star cleanliness reviews from your guests. 
              </p>

              <ul className="space-y-4 mb-10">
                {[
                  "Fast, reliable turnovers between check-ins",
                  "Linen changes and professional bed-making",
                  "Restocking of essentials (toiletries, coffee, etc.)",
                  "Damage reporting and visual checks post-checkout"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#20BD5A] shrink-0" />
                    <span className="text-ink/80 font-medium">{item}</span>
                  </li>
                ))}
              </ul>

              <a href="https://wa.me/35797898105" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold hover:bg-primary-dark transition-all duration-300 shadow-xl shadow-primary/20">
                Partner With Us <ArrowRight className="w-5 h-5 text-gold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT CTA */}
      <section id="contact" className="py-32 bg-primary relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary-light/30 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-dark/40 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl shadow-primary-dark/20 mb-8 fade-up">
            <Heart className="w-10 h-10 text-gold fill-gold" />
          </div>
          <h2 className="text-4xl sm:text-6xl font-display font-extrabold text-white mb-6 fade-up">
            Let's make your home shine!
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto font-body fade-up">
            Reach out directly to Nadia or Ciprian for a customized quote. We reply fast, chat friendly, and can't wait to help you love your space again.
          </p>
          
          <div className="fade-up flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 hover:bg-white/20 transition-all shadow-xl w-full md:w-auto">
              <span className="text-gold font-bold uppercase tracking-widest text-sm mb-4">Contact Nadia</span>
              <a 
                href="https://wa.me/35799136428" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-[#20BD5A] transition-all duration-300 flex items-center justify-center gap-3 mb-4 shadow-lg shadow-[#25D366]/20"
              >
                <Phone className="w-5 h-5" /> WhatsApp Nadia
              </a>
              <span className="text-white font-mono text-lg font-medium">+357 99 136 428</span>
            </div>

            <div className="flex flex-col items-center bg-white/10 backdrop-blur-md p-8 rounded-[2rem] border border-white/20 hover:bg-white/20 transition-all shadow-xl w-full md:w-auto">
              <span className="text-gold font-bold uppercase tracking-widest text-sm mb-4">Contact Ciprian</span>
              <a 
                href="https://wa.me/35797898105" 
                target="_blank" 
                rel="noreferrer"
                className="w-full bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold text-lg hover:bg-[#20BD5A] transition-all duration-300 flex items-center justify-center gap-3 mb-4 shadow-lg shadow-[#25D366]/20"
              >
                <Phone className="w-5 h-5" /> WhatsApp Ciprian
              </a>
              <span className="text-white font-mono text-lg font-medium">+357 97 898 105</span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="bg-surface text-ink/80 py-16 border-t border-primary/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col items-center md:items-start gap-3">
            <img 
              src="/LOGO CLEAN HOUSE BY NADIA CIPRI.png" 
              alt="Cleaning House by Nadia & Cipri Logo" 
              className="h-10 w-auto mix-blend-multiply opacity-80"
            />
            <p className="text-ink/60 text-sm">Quality family cleaning in Cyprus.</p>
          </div>
          
          <div className="flex items-center gap-6 bg-white px-6 py-3 rounded-full border border-primary/10 shadow-sm shadow-primary/5">
            <span className="flex items-center gap-3 text-sm font-medium text-primary-dark">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#20BD5A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
              </span>
              Accepting clients in Famagusta area
            </span>
          </div>

          <div className="text-sm font-body opacity-60 text-primary-dark font-medium">
            &copy; {new Date().getFullYear()} Cleaning House by Nadia & Cipri.
          </div>
        </div>
      </footer>

    </div>
  );
}
