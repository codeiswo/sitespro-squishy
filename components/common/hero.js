'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Shield, Droplets, Award } from 'lucide-react';

export default function Hero({ settings = {} }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;

      heroRef.current.style.setProperty('--mouse-x', `${x}px`);
      heroRef.current.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const heroDesc = settings.hero_description || 'Crystal-clear, great-tasting water for your family. Compatible with Samsung, GE, LG, Whirlpool, and all major brands. Up to 60% savings vs. OEM filters.';
  const btnText = settings.hero_button_text || 'Shop All Filters';
  const btnUrl = settings.hero_button_url || '/products';

  const renderTitle = () => {
    if (settings.hero_title) {
      // Check if it has [accent]...[/accent] tags for special styling
      const match = settings.hero_title.match(/(.*)\[accent\](.*)\[\/accent\](.*)/);
      if (match) {
        return (
          <>
            {match[1]}
            <span className="relative inline-block">
              <span className="relative z-10">{match[2]}</span>
              <span className="absolute -bottom-2 left-0 w-full h-3 bg-accent/30 rounded-full" />
            </span>
            {match[3]}
          </>
        );
      }
      return settings.hero_title;
    }
    
    // Default fallback
    return (
      <>
        Premium{' '}
        <span className="relative inline-block">
          <span className="relative z-10">Water Filter</span>
          <span className="absolute -bottom-2 left-0 w-full h-3 bg-accent/30 rounded-full" />
        </span>
        <br />
        Replacements
      </>
    );
  };

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="relative min-h-[100vh] flex items-center overflow-hidden"
      style={{ '--mouse-x': '0px', '--mouse-y': '0px' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient dark:bg-hero-gradient-dark" />

      {/* Animated water particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-10"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              background: 'radial-gradient(circle, rgba(72, 202, 228, 0.4) 0%, transparent 70%)',
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animation: `waterWave ${6 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Mesh gradient overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(circle at 30% 50%, rgba(0, 180, 216, 0.3) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(212, 168, 75, 0.15) 0%, transparent 40%)',
          transform: 'translate(var(--mouse-x), var(--mouse-y))',
          transition: 'transform 0.3s ease-out',
        }}
      />

      {/* Content */}
      <div className="container-custom relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm mb-8 animate-fade-in">
            <Award className="w-4 h-4 text-gold" />
            <span>NSF 42 & 53 Certified Filters</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-6 animate-fade-in-up">
            {renderTitle()}
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
            {heroDesc}
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link
              href={btnUrl}
              id="hero-shop-now"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-white text-primary font-bold text-lg shadow-premium hover:shadow-glow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {btnText}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/about"
              id="hero-learn-more"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
            >
              Why {settings.site_name || 'FiltersPro'}?
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
            {[
              { icon: Shield, label: 'NSF Certified', desc: 'Tested & verified safe' },
              { icon: Droplets, label: '99% Pure', desc: 'Removes contaminants' },
              { icon: Award, label: '30-Day Guarantee', desc: 'Full satisfaction' },
            ].map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/15 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-accent" />
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{label}</p>
                  <p className="text-white/60 text-xs">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full">
          <path
            d="M0 60L48 55C96 50 192 40 288 35C384 30 480 30 576 38C672 46 768 62 864 68C960 74 1056 70 1152 62C1248 54 1344 42 1392 36L1440 30V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0V60Z"
            className="fill-surface dark:fill-surface-dark"
          />
        </svg>
      </div>
    </section>
  );
}
