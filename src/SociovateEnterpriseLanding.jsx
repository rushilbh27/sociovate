// SociovateEnterpriseLanding.jsx
// Core Black (#050E12) + Plasma Orange (#FF6B2B) palette
// TailwindCSS required

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Aurora from './Aurora';
import SpotlightCard from './SpotlightCard';
import Squares from './Squares';
import GlassCursor from './GlassCursor';
import PublicFooter from './PublicFooter';
import MagicBento from './MagicBento';
import ScrollTimeline from './ScrollTimeline';
import TradingCards from './TradingCards';
import TargetCursor from './TargetCursor';
import ProfileCard from './ProfileCard';
import WhatsAppWidget from './WhatsAppWidget';
import EmailWidget from './EmailWidget';
import ChatbaseWidget from './ChatbaseWidget';
import {
  BriefcaseIcon,
  AcademicCapIcon,
  HomeIcon,
  Cog8ToothIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UsersIcon,
  Squares2X2Icon,
  ShieldCheckIcon,
  ClockIcon,
  RocketLaunchIcon,
  ChatBubbleLeftRightIcon,
  CodeBracketIcon,
  ServerIcon,
  ArrowTopRightOnSquareIcon,
  ChartBarIcon,
  UserGroupIcon,
  GlobeAltIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';

const CALLS_BASE = 328;
const CALLS_MAX  = 399;

export default function SociovateEnterpriseLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timelineRef = useRef(null);
  const menuItemsRef = useRef([]);
  const featuredCaseRef = useRef(null);
  const [expandedCases, setExpandedCases] = useState({});
  const [openCaseIds, setOpenCaseIds] = useState({});
  const caseRowRefs = useRef([]);
  const navRef = useRef(null);
  const statsRef = useRef(null);

  // ── Live dashboard state ──────────────────────────────────────────
  const NEW_LEAD_POOL = [
    { name: 'Priya Mehta',    company: 'HealthTech Mumbai',   status: 'Appointment Booked',   sc: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'Vikram Shah',    company: 'PropTech Pune',       status: 'Qualified',             sc: 'text-[#FF6B2B] bg-[#FF6B2B]/10 border-[#FF6B2B]/20' },
    { name: 'Ananya Roy',     company: 'EdTech Delhi',        status: 'Follow-up Scheduled',   sc: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
    { name: 'Rahul Gupta',    company: 'FinTech Hyderabad',   status: 'Appointment Booked',   sc: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { name: 'Meera Krishnan', company: 'Clinic Chennai',      status: 'Qualified',             sc: 'text-[#FF6B2B] bg-[#FF6B2B]/10 border-[#FF6B2B]/20' },
    { name: 'Arjun Nair',     company: 'SaaS Bangalore',      status: 'Follow-up Scheduled',   sc: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
  ];
  const [dashMetrics, setDashMetrics] = useState({ calls: CALLS_BASE, connected: 87, booked: 26, conversion: 7.9 });
  const [dashLeads, setDashLeads] = useState([
    { name: 'Rajesh Kumar', company: 'PropTech Delhi',     status: 'Appointment Booked',  sc: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', isNew: false, uid: 0 },
    { name: 'Sneha Patel',  company: 'E-Commerce Mumbai',  status: 'Qualified',            sc: 'text-[#FF6B2B] bg-[#FF6B2B]/10 border-[#FF6B2B]/20',       isNew: false, uid: 1 },
    { name: 'Arjun Singh',  company: 'SaaS, Bangalore',    status: 'Follow-up Scheduled', sc: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',     isNew: false, uid: 2 },
  ]);
  const [dashToast, setDashToast] = useState(null);
  const leadPoolIndex = useRef(0);
  const leadUid = useRef(3);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (dropdownRef.current) {
        gsap.set(dropdownRef.current, { height: 0, opacity: 0 });
        gsap.set(menuItemsRef.current, { opacity: 0, y: 20 });

        timelineRef.current = gsap.timeline({ paused: true })
          .to(dropdownRef.current,
            {
              height: 'auto',
              opacity: 1,
              duration: 0.4,
              ease: 'power3.out',
              onStart: () => {
                dropdownRef.current.style.pointerEvents = 'auto';
              },
              onReverseComplete: () => {
                dropdownRef.current.style.pointerEvents = 'none';
              }
            }
          )
          .to(menuItemsRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3,
            stagger: 0.08,
            ease: 'power2.out'
          }, '-=0.2');
      }
    });

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (timelineRef.current) {
      if (mobileMenuOpen) {
        timelineRef.current.play();
      } else {
        timelineRef.current.reverse();
      }
    }
  }, [mobileMenuOpen]);

  // Hero entrance animation — synced to splash fade-out at ~2.1s
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-line', { y: 80, opacity: 0 });
      gsap.set(['.hero-subtitle', '.hero-cta-col', '.dashboard-mockup'], { y: 44, opacity: 0 });

      gsap.timeline({ delay: 2.15 })
        .to('.hero-line', {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.18, ease: 'power4.out',
        })
        .to('.hero-subtitle', {
          y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
        }, '-=0.55')
        .to('.hero-cta-col', {
          y: 0, opacity: 1, duration: 0.55, stagger: 0.11, ease: 'back.out(1.6)',
        }, '-=0.45')
        .to('.dashboard-mockup', {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        }, '-=0.35');
    });
    return () => ctx.revert();
  }, []);

  // Scroll-driven animations: navbar shrink, section reveals, stats counter
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Navbar compact on scroll
      ScrollTrigger.create({
        start: 'top -70',
        end: 99999,
        onUpdate(self) {
          if (!navRef.current) return;
          navRef.current.style.transition = 'padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease';
          if (self.isActive) {
            navRef.current.style.paddingTop = '8px';
            navRef.current.style.paddingBottom = '8px';
            navRef.current.style.background = 'rgba(5, 14, 18, 0.98)';
            navRef.current.style.boxShadow = '0 4px 40px rgba(255,107,43,0.08)';
          } else {
            navRef.current.style.paddingTop = '';
            navRef.current.style.paddingBottom = '';
            navRef.current.style.background = '';
            navRef.current.style.boxShadow = '';
          }
        }
      });

      // Section heading + content reveals
      gsap.utils.toArray('.reveal-section').forEach(el => {
        gsap.fromTo(el,
          { y: 48, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.85, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
      });

      // Stats counter
      if (statsRef.current) {
        ScrollTrigger.create({
          trigger: statsRef.current,
          start: 'top 82%',
          once: true,
          onEnter() {
            statsRef.current.querySelectorAll('.stat-number[data-to]').forEach(el => {
              const to = parseFloat(el.dataset.to);
              const suffix = el.dataset.suffix || '';
              if (isNaN(to)) return;
              const obj = { val: 0 };
              gsap.to(obj, {
                val: to, duration: 2.2, ease: 'power2.out',
                onUpdate() { el.textContent = Math.round(obj.val) + suffix; },
              });
            });
            // Reveal the static 24/7 stat
            statsRef.current.querySelectorAll('.stat-number[data-static]').forEach(el => {
              gsap.from(el, { scale: 0.7, opacity: 0, duration: 0.6, ease: 'back.out(1.8)' });
            });
          }
        });
      }
    });
    return () => ctx.revert();
  }, []);

  // Desktop hover effect for featured case study
  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    if (isMobile || !featuredCaseRef.current) return;

    const card = featuredCaseRef.current;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const relativeX = (x / rect.width) * 100;
      const relativeY = (y / rect.height) * 100;

      card.style.setProperty('--glow-x', `${relativeX}%`);
      card.style.setProperty('--glow-y', `${relativeY}%`);
    };

    const handleMouseEnter = () => {
      gsap.to(card, {
        '--glow-intensity': 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        '--glow-intensity': 0,
        duration: 0.5,
        ease: 'power2.in'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Animate case study expansion/collapse
  useEffect(() => {
    if (!featuredCaseRef.current) return;

    const expandedView = featuredCaseRef.current.querySelector('.expanded-content');
    if (!expandedView) return;

    if (expandedCases['featured']) {
      gsap.fromTo(expandedView,
        { height: 0, opacity: 0 },
        { height: 'auto', opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, [expandedCases]);

  // ── Live dashboard intervals ──────────────────────────────────────
  useEffect(() => {
    // New lead every 3s
    const leadTimer = setInterval(() => {
      const poolEntry = NEW_LEAD_POOL[leadPoolIndex.current % NEW_LEAD_POOL.length];
      leadPoolIndex.current += 1;
      const uid = leadUid.current++;
      const lead = { ...poolEntry, isNew: true, uid };

      setDashLeads(prev => [lead, ...prev.slice(0, 2)]);
      // Reset calls to base once it hits max, otherwise increment
      setDashMetrics(prev => ({
        ...prev,
        calls: prev.calls >= CALLS_MAX ? CALLS_BASE : prev.calls + 1,
      }));

      setDashToast(lead);
      setTimeout(() => setDashToast(null), 2400);
      setTimeout(() => {
        setDashLeads(prev => prev.map(l => l.uid === uid ? { ...l, isNew: false } : l));
      }, 1000);
    }, 3000);

    // Tick booked + conversion every 5s — both capped
    const metricTimer = setInterval(() => {
      setDashMetrics(prev => ({
        ...prev,
        booked:     prev.booked >= 45 ? 26 : prev.booked + (Math.random() > 0.55 ? 1 : 0),
        conversion: parseFloat(Math.min(prev.conversion + (Math.random() > 0.5 ? 0.1 : 0), 11.5).toFixed(1)),
      }));
    }, 5000);

    return () => { clearInterval(leadTimer); clearInterval(metricTimer); };
  }, []);

  const toggleCaseExpansion = (caseId) => {
    setExpandedCases(prev => ({
      ...prev,
      [caseId]: !prev[caseId]
    }));
  };

  // Auto-open case rows on scroll (open only, never auto-close)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.caseId;
          if (id) setOpenCaseIds(prev => ({ ...prev, [id]: true }));
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -22% 0px' });

    caseRowRefs.current.slice(0, 4).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#050E12] text-white relative">
      <TargetCursor
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />

      {/* Global Background — dot grid + floating orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">

        {/* Dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,107,43,0.07) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }} />

        {/* Orb 1 — top left, warm orange */}
        <div className="absolute orb-float" style={{
          top: '-15%', left: '-10%',
          width: '650px', height: '650px',
          background: 'radial-gradient(circle, rgba(255,107,43,0.14) 0%, transparent 70%)',
          filter: 'blur(48px)',
          animationDuration: '12s',
        }} />

        {/* Orb 2 — top right, amber */}
        <div className="absolute orb-float" style={{
          top: '-5%', right: '-12%',
          width: '550px', height: '550px',
          background: 'radial-gradient(circle, rgba(245,158,11,0.10) 0%, transparent 70%)',
          filter: 'blur(48px)',
          animationDuration: '16s',
          animationDirection: 'reverse',
        }} />

        {/* Orb 3 — mid bottom, deep ember */}
        <div className="absolute orb-float" style={{
          bottom: '10%', left: '35%',
          width: '480px', height: '480px',
          background: 'radial-gradient(circle, rgba(220,38,38,0.06) 0%, transparent 70%)',
          filter: 'blur(60px)',
          animationDuration: '20s',
          animationDelay: '4s',
        }} />
      </div>

      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33%       { transform: translate(28px, -24px) scale(1.04); }
          66%       { transform: translate(-18px, 18px) scale(0.97); }
        }
        .orb-float {
          animation: orb-float linear infinite;
          animation-timing-function: ease-in-out;
        }
      `}</style>

      {/* NAVBAR */}
      <nav ref={navRef} className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl flex items-center justify-between px-6 md:px-8 py-3 bg-[#050E12]/90 backdrop-blur-xl border border-white/10 rounded-2xl z-50 shadow-2xl">
        <div className="flex items-center gap-3">
          <img src="/logoo.svg" alt="Sociovate" className="w-10 h-10 rounded-xl shadow-lg" />
          <div className="brand-cursive text-2xl text-white">Sociovate</div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300 font-medium">
          <a href="#home" className="hover:text-white transition-colors cursor-target">Home</a>
          <a href="#services" className="hover:text-white transition-colors cursor-target">Services</a>
          <a href="#cases" className="hover:text-white transition-colors cursor-target">Case Studies</a>
          <a href="#team" className="hover:text-white transition-colors cursor-target">Team</a>
          <a href="#socials" className="hover:text-white transition-colors cursor-target">Socials</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" className="hidden sm:block px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B2B] to-[#FF8C42] font-semibold shadow-lg shadow-[#FF6B2B]/30 hover:shadow-[#FF6B2B]/50 hover:scale-105 transition-all text-sm relative overflow-hidden group cursor-target">
            <span className="relative z-10">Book Discovery Call</span>
            <span className="absolute inset-0 shine-effect"></span>
          </a>

          {/* Mobile Menu Button (two-line hamburger) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden flex flex-col gap-1.5 p-2 cursor-target ${mobileMenuOpen ? 'hamburger-open' : ''}`}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="w-6 h-0.5 bg-white rounded hamburger-line"></span>
            <span className="w-6 h-0.5 bg-white rounded hamburger-line"></span>
          </button>
        </div>

        {/* Mobile Menu Dropdown (attached to navbar) */}
        <div ref={dropdownRef} className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[95%] max-w-7xl bg-[#050E12]/90 backdrop-blur-xl border border-white/10 rounded-2xl z-50 shadow-2xl overflow-hidden pointer-events-none" style={{ height: 0, opacity: 0 }}>
          <div className="p-4 relative pointer-events-auto">
              <nav className="divide-y divide-white/6">
                <div ref={el => menuItemsRef.current[0] = el} className="py-3">
                  <ul className="space-y-3">
                    <li>
                      <a href="#home" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors py-2">
                        <HomeIcon className="w-5 h-5 text-slate-300" aria-hidden="true" />
                        Home
                      </a>
                    </li>
                    <li>
                      <a href="#services" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors py-2">
                        <Cog8ToothIcon className="w-5 h-5 text-slate-300" aria-hidden="true" />
                        Services
                      </a>
                    </li>
                    <li>
                      <a href="#cases" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors py-2">
                        <DocumentTextIcon className="w-5 h-5 text-slate-300" aria-hidden="true" />
                        Case Studies
                      </a>
                    </li>
                  </ul>
                </div>

                <div ref={el => menuItemsRef.current[1] = el} className="py-3">
                  <ul className="space-y-3">
                    <li>
                      <a href="#team" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors py-2">
                        <UsersIcon className="w-5 h-5 text-slate-300" aria-hidden="true" />
                        Team
                      </a>
                    </li>
                    <li>
                      <a href="#socials" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors py-2">
                        <Squares2X2Icon className="w-5 h-5 text-slate-300" aria-hidden="true" />
                        Socials
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* CTA */}
              <div ref={el => menuItemsRef.current[2] = el} className="mt-5 border-t border-white/8 pt-4">
                <div className="text-slate-400 uppercase tracking-wide text-xs mb-2">Get Started</div>
                <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-[#FF6B2B] to-[#FF8C42] font-semibold shadow-lg shadow-[#FF6B2B]/30">
                  Book Discovery Call
                </a>
              </div>
            </div>
          </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="w-full relative pt-28 pb-0 px-6 md:px-16 overflow-hidden">
        {/* Aurora Background Effect */}
        <div className="absolute inset-0 opacity-40 pointer-events-none z-10">
          <Aurora
            colorStops={["#FF6B2B", "#FFFFFF", "#FF8C42"]}
            blend={0.6}
            amplitude={1.5}
            speed={0.5}
          />
        </div>

        {/* Radial spotlight behind headline */}
        <div className="absolute pointer-events-none z-10" style={{
          top: '0',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '900px',
          height: '500px',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(255,107,43,0.10) 0%, transparent 70%)',
          filter: 'blur(10px)',
        }} />

        <style>{`
          .shimmer-text {
            color: #FF6B2B;
            font-weight: 700;
          }
          .shine-effect {
            background: linear-gradient(75deg, transparent 0%, rgba(255,255,255,0.9) 45%, rgba(255,255,255,0.6) 50%, transparent 55%);
            filter: blur(2px);
            opacity: 0;
            transform: translateX(-150%) scale(1);
            transition: opacity 0.3s, transform 0.8s ease-in-out;
          }
          .group:hover .shine-effect {
            opacity: 1;
            transform: translateX(150%) scale(1.2);
          }
          .grid-pattern {
            background-image:
              linear-gradient(rgba(255, 107, 43, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 107, 43, 0.03) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: grid-move 20s linear infinite;
          }
          @keyframes grid-move {
            0% { transform: translate(0, 0); }
            100% { transform: translate(50px, 50px); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.6; transform: scale(1.1); }
          }
          .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
          .dashboard-fade {
            mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
            -webkit-mask-image: linear-gradient(to bottom, black 55%, transparent 100%);
          }
        `}</style>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="font-black tracking-tight" style={{ lineHeight: 1.15 }}>
            <span className="block text-white hero-line" style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}>
              Automate{' '}
              <span className="shimmer-text" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: '1.15em' }}>
                Smarter.
              </span>
            </span>
            <span className="block text-white hero-line" style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}>
              Convert{' '}
              <span className="shimmer-text" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: '1.15em', animationDelay: '1s' }}>
                Faster.
              </span>
            </span>
            <span className="block text-white hero-line" style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}>
              Scale{' '}
              <span className="shimmer-text" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: '1.15em', animationDelay: '2s' }}>
                Effortlessly.
              </span>
            </span>
          </h1>

          <p className="mt-8 text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed hero-subtitle">
            AI agents that qualify, book, follow-up, and close while you run your business.<br />
            Built for enterprise teams, fast-growing companies, and modern clinics!
          </p>

          <div className="mt-14 flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12 max-w-4xl mx-auto mb-16">
            {/* FOR BUSINESSES */}
            <div className="flex flex-col items-center text-center flex-1 w-full hero-cta-col">
              <div className="flex items-center justify-center gap-2 lg:block lg:text-center mb-3">
                <BriefcaseIcon aria-hidden="true" className="w-4 h-4 text-[#FF6B2B] lg:inline-block lg:mr-2 lg:-mt-0.5" />
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-semibold lg:inline">For Businesses</p>
              </div>
              <p className="text-slate-300 text-base mb-6 px-4 lg:px-0 leading-relaxed lg:min-h-[48px] lg:flex lg:items-center lg:justify-center">Ready to automate and scale? Let's build your AI solution.</p>
              <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B2B] to-[#FF8C42] font-semibold shadow-lg shadow-[#FF6B2B]/40 hover:shadow-[#FF6B2B]/60 hover:scale-105 transition-all text-base relative overflow-hidden group cursor-target cta-pulse">
                <span className="relative z-10">Book a Discovery Call</span>
                <span className="absolute inset-0 shine-effect"></span>
              </a>
            </div>

            {/* FOR LEARNERS */}
            <div className="flex flex-col items-center text-center flex-1 w-full hero-cta-col">
              <div className="flex items-center justify-center gap-2 lg:block lg:text-center mb-3 lg:mb-2">
                <AcademicCapIcon aria-hidden="true" className="w-4 h-4 text-[#FF8C42] lg:inline-block lg:mr-2 lg:-mt-0.5" />
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-semibold lg:inline">For Learners</p>
              </div>
              <p className="text-slate-300 text-base mb-6 lg:mb-4 px-4 lg:px-0 leading-relaxed lg:min-h-[48px] lg:flex lg:items-center lg:justify-center">Want to understand AI & automation?</p>
              <a href="https://cal.id/sociovate/connect-with-rushil" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs px-8 py-4 rounded-full border-2 border-[#FF6B2B]/50 bg-white/5 backdrop-blur-sm font-medium hover:bg-[#FF6B2B]/10 hover:border-[#FF6B2B] transition-all text-base cursor-target">
                Book a Consult
              </a>
            </div>
          </div>

          {/* Dashboard Mockup — LIVE */}
          <div className="relative mx-auto max-w-3xl dashboard-fade dashboard-mockup">
            <div className="bg-[#060e14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-[#FF6B2B]/5 relative">

              {/* Toast notification */}
              {dashToast && (
                <div
                  key={dashToast.name + Date.now()}
                  className="dash-toast-enter absolute top-12 right-2 sm:right-3 z-20 flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[#FF6B2B]/30 bg-[#0a1520]/95 backdrop-blur-sm shadow-lg shadow-[#FF6B2B]/10"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B2B] animate-pulse flex-shrink-0" />
                  <span className="text-[10px] sm:text-xs text-white font-medium whitespace-nowrap">{dashToast.name}</span>
                  <span className={`text-[9px] sm:text-[10px] px-1.5 py-0.5 rounded-full border font-semibold whitespace-nowrap ${dashToast.sc}`}>{dashToast.status}</span>
                </div>
              )}

              {/* Browser title bar */}
              <div className="flex items-center gap-3 px-3 sm:px-5 py-2.5 sm:py-3.5 bg-[#081017] border-b border-white/8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Sociovate Dashboard — Q1 Outbound</span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                {/* Live metrics */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { label: 'Calls Made',  value: dashMetrics.calls,              suffix: '',   change: '+18%' },
                    { label: 'Connected',   value: dashMetrics.connected,           suffix: '%',  change: '+5%'  },
                    { label: 'Booked',      value: dashMetrics.booked,              suffix: '',   change: '+14%' },
                    { label: 'Conversion',  value: dashMetrics.conversion,          suffix: '%',  change: '+2.1%'},
                  ].map((m) => (
                    <div key={m.label} className="bg-white/4 border border-white/8 rounded-lg sm:rounded-xl p-2.5 sm:p-3.5">
                      <div className="text-[10px] sm:text-xs text-slate-500 mb-1 sm:mb-2">{m.label}</div>
                      <div key={`${m.label}-${m.value}`} className="text-lg sm:text-xl font-bold text-white mb-0.5 metric-tick">
                        {m.value}{m.suffix}
                      </div>
                      <div className="text-[10px] sm:text-xs text-emerald-400 font-medium">{m.change}</div>
                    </div>
                  ))}
                </div>

                {/* Live Recent Calls */}
                <div className="bg-white/3 border border-white/8 rounded-lg sm:rounded-xl overflow-hidden text-left">
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-medium text-slate-300">Recent Calls</span>
                      <span className="text-[10px] text-emerald-400 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-semibold flex items-center gap-1">
                        <span className="live-badge-dot" />Live
                      </span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-slate-500">{dashMetrics.calls} total</span>
                  </div>
                  {dashLeads.map((call) => (
                    <div
                      key={call.uid}
                      className={`flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/5 last:border-0 ${call.isNew ? 'new-lead-row' : ''}`}
                    >
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#FF6B2B] to-[#FF8C42] flex items-center justify-center text-[10px] sm:text-xs font-bold flex-shrink-0">
                        {call.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs sm:text-sm font-medium text-white truncate">{call.name}</div>
                        <div className="text-[10px] sm:text-xs text-slate-500 truncate">{call.company}</div>
                      </div>
                      <span className={`hidden sm:inline-block text-xs px-2 py-1 rounded-full border font-medium whitespace-nowrap flex-shrink-0 ${call.sc}`}>
                        {call.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* WHY CHOOSE SECTION */}
      <section className="px-6 md:px-16 pt-10 pb-10" id="why">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 reveal-section">Why Choose <span className="brand-cursive" style={{ color: '#FF6B2B' }}>Sociovate</span>?</h2>

        <div className="max-w-2xl mx-auto md:max-w-3xl px-2">
          <ScrollTimeline items={[
            {
              title: "End-to-End Systems",
              desc: "Done-for-you systems built for reliability, uptime, and consistency. We handle the full build — architecture, integrations, and delivery.",
              icon: <ShieldCheckIcon className="w-5 h-5" aria-hidden="true" />,
              tags: ["Reliability", "Zero Downtime", "Full Build"],
            },
            {
              title: "24/7 Automations",
              desc: "Agents that qualify, book, follow-up and handle ops around the clock. No human staff needed — your pipeline never sleeps.",
              icon: <ClockIcon className="w-5 h-5" aria-hidden="true" />,
              tags: ["Always Active", "No Staff Needed", "Instant Response"],
            },
            {
              title: "Fast Deployment",
              desc: "Designed for businesses, tech firms, and companies that need less friction. From kickoff to live system in days, not months.",
              icon: <RocketLaunchIcon className="w-5 h-5" aria-hidden="true" />,
              tags: ["Quick Setup", "Low Friction", "Enterprise Ready"],
            },
          ]} />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-16 pt-12 pb-10">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 reveal-section">Our Core Services</h2>

        <div className="max-w-2xl mx-auto md:max-w-3xl px-2">
          <ScrollTimeline items={[
            {
              title: "AI Voice & Chat Agents",
              desc: "Your 24/7 chat + voice call agent. Handles inbound, outbound, reminders, FAQ, qualification, routing & scheduling — across WhatsApp and phone calls.",
              icon: <ChatBubbleLeftRightIcon className="w-5 h-5" aria-hidden="true" />,
              tags: ["WhatsApp", "Voice AI", "Inbound & Outbound", "24/7"],
            },
            {
              title: "MVP & Micro‑SaaS Builds",
              desc: "Fastest route from idea → live product. Clean UI, auth, integrations, dashboards, and conversion‑ready experiences built to ship fast.",
              icon: <CodeBracketIcon className="w-5 h-5" aria-hidden="true" />,
              tags: ["React", "Auth", "Dashboards", "Fast Launch"],
            },
            {
              title: "AI Infrastructure & Automation",
              desc: "Backend workflows, pipelines, and integrations that keep your operations running smoothly. CRM flows, reminders, lead pipelines, and business logic stitched end-to-end.",
              icon: <ServerIcon className="w-5 h-5" aria-hidden="true" />,
              tags: ["CRM Flows", "n8n", "Pipelines", "API Integration"],
            },
          ]} />
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="cases" className="px-6 md:px-16 pt-12 pb-14">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-14 reveal-section">Case Studies</h2>

        <div className="max-w-3xl mx-auto">

          {/* ── FEATURED ── */}
          <div className="mb-10 rounded-2xl overflow-hidden bg-gradient-to-br from-[#0d1820] to-[#0a1218]"
               style={{ borderLeft: '3px solid #FF6B2B', border: '1px solid rgba(255,107,43,0.22)', borderLeftWidth: 3 }}>
            <div className="p-6 sm:p-8">
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-[#FF6B2B] px-2.5 py-1 rounded-full bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 mb-4">
                Featured
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug">
                Multilingual Outbound Calling Agents
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                Live AI agents handling sales, cold outreach, and debt collection calls across multiple clients and languages simultaneously.
              </p>
              <div className="grid grid-cols-3 gap-3 py-4 border-y border-white/8 mb-5">
                {[
                  { value: '24/7', label: 'Active Calling' },
                  { value: 'Zero', label: 'Human Agents' },
                  { value: 'Multi', label: 'Language' },
                ].map(m => (
                  <div key={m.label}>
                    <div className="text-xl sm:text-2xl font-black text-[#FF6B2B] mb-0.5">{m.value}</div>
                    <div className="text-xs text-slate-400">{m.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {['Ultravox', 'SIP Telephony', 'Supabase', 'Node.js'].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-md text-xs bg-white/5 border border-white/10 text-slate-300">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── NUMBERED LIST ── */}
          <div className="border-t border-white/8">
            {[
              {
                id: 'lead-gen', num: '01', title: 'Lead Gen Pipeline',
                keyMetric: '5× More Demos',
                desc: 'Automatically qualifies leads, sends personalized follow-ups, and books demos into your calendar without any manual work.',
                metrics: [{ value: '5x', label: 'More Demos' }, { value: '92%', label: 'Lead Quality' }, { value: '70%', label: 'Less Manual Work' }],
                tech: ['OpenAI', 'Apify', 'Calendly', 'Apollo.io', 'MongoDB'],
              },
              {
                id: 'shopify', num: '02', title: 'Shopify & E-commerce Order Automation',
                keyMetric: '+40% Less RTO',
                desc: 'Confirms COD orders instantly via WhatsApp and blocks high-risk shipments before they reach your fulfillment team.',
                metrics: [{ value: '+40%', label: 'Reduction in RTO' }, { value: '90%', label: 'High-Risk Blocked' }, { value: '10/10', label: 'Customer Experience' }],
                tech: ['Shopify', 'WhatsApp Business API', 'OpenAI', 'React.js'],
              },
              {
                id: 'whatsapp-bot', num: '03', title: 'Multilingual WhatsApp Support Bot',
                keyMetric: '40%+ Cost Saved',
                desc: 'Resolves customer support tickets automatically across 3 languages, escalating only what truly needs a human.',
                metrics: [{ value: '40%+', label: 'Manpower Cost Reduced' }, { value: '24/7', label: 'Automated Support' }, { value: '3', label: 'Languages Live' }],
                tech: ['n8n', 'WhatsApp API', 'OpenAI', 'Google Sheets'],
              },
              {
                id: 'call-intelligence', num: '04', title: 'Call Intelligence & Coaching System',
                keyMetric: 'Zero API Costs',
                desc: 'Turns every recorded sales call into a structured coaching report — flagging weak reps, missed opportunities, and recurring objections automatically.',
                metrics: [{ value: 'Zero', label: 'API Costs' }, { value: 'CRM-Ready', label: 'Output' }, { value: 'Full Team', label: 'Coverage' }],
                tech: ['Faster-Whisper', 'n8n', 'FastAPI', 'Local LLM'],
              },
              {
                id: 'invoice-customs', num: '05', title: 'Invoice-to-Customs Automation Pipeline',
                keyMetric: '100% Field Accuracy',
                desc: 'Reads commercial invoices and generates complete customs clearance payloads automatically — zero manual data entry.',
                metrics: [{ value: '100%', label: 'Field Accuracy' }, { value: 'Import & Export', label: 'Ready' }, { value: 'Zero', label: 'Manual Entry' }],
                tech: ['n8n', 'Gemini OCR', 'eRoyal API'],
              },
              {
                id: 'hair-transplant', num: '06', title: 'AI Voice Agent for Hair Transplant Clinic',
                keyMetric: '55% Less Lead Loss',
                desc: 'Calls new leads within minutes, qualifies patients, and books consultations 24/7 — without a single staff member involved.',
                metrics: [{ value: '55%', label: 'Less Lead Loss' }, { value: '4x', label: 'Productivity Boost' }, { value: '24/7', label: 'Active Calling' }],
                tech: ['Eleven Labs AI', 'WhatsApp API', 'Calendar API', 'Omnidim.io'],
              },
            ].map((c, i) => {
              const isOpen = !!openCaseIds[c.id];
              return (
                <div key={c.id} ref={el => caseRowRefs.current[i] = el} data-case-id={c.id} className="border-b border-white/8">
                  {/* Row */}
                  <button
                    onClick={() => setOpenCaseIds(prev => ({ ...prev, [c.id]: !prev[c.id] }))}
                    className="w-full flex items-center gap-4 py-5 text-left group cursor-target"
                  >
                    <span className="font-mono font-bold text-sm flex-shrink-0 w-7 transition-colors duration-300"
                          style={{ color: isOpen ? '#FF6B2B' : 'rgba(255,107,43,0.55)' }}>
                      {c.num}
                    </span>
                    <span className="flex-1 font-semibold text-sm sm:text-base leading-snug transition-colors duration-200"
                          style={{ color: isOpen ? '#fff' : 'rgba(255,255,255,0.75)' }}>
                      {c.title}
                    </span>
                    <span className="hidden sm:block text-xs text-slate-500 flex-shrink-0 mr-2 transition-opacity duration-200"
                          style={{ opacity: isOpen ? 0 : 1 }}>
                      {c.keyMetric}
                    </span>
                    <ChevronDownIcon
                      className="w-4 h-4 flex-shrink-0 transition-all duration-300"
                      style={{ color: isOpen ? '#FF6B2B' : 'rgba(100,116,139,0.7)', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                    />
                  </button>

                  {/* Expand panel */}
                  <div style={{ maxHeight: isOpen ? '420px' : '0', overflow: 'hidden', transition: 'max-height 0.45s cubic-bezier(0.4,0,0.2,1)' }}>
                    <div className="pb-6 pl-11 pr-1">
                      <p className="text-slate-400 text-sm leading-relaxed mb-4">{c.desc}</p>
                      <div className="flex flex-wrap gap-x-5 gap-y-2 mb-4">
                        {c.metrics.map(m => (
                          <div key={m.label}>
                            <div className="text-base font-bold text-[#FF6B2B]">{m.value}</div>
                            <div className="text-xs text-slate-500">{m.label}</div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {c.tech.map(t => (
                          <span key={t} className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10 text-slate-400">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative pt-10 pb-6 md:pt-14 md:pb-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/10 to-transparent pointer-events-none"></div>
        <div className="text-center mb-10 px-6">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-orange-100 to-slate-300 bg-clip-text text-transparent reveal-section">
            Meet The Team
          </h2>
          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            The people building your unfair advantage.
          </p>
        </div>
        <TradingCards />
      </section>

      {/* BOOK CALL SECTION */}
      <section id="book" className="px-6 md:px-16 pt-8 pb-10 md:pt-10 md:pb-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 reveal-section">Ready to Automate?</h2>
        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-6 md:mb-8">
          Book a discovery call and we'll map the exact automations your business needs.
        </p>
        <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B2B] to-[#FF8C42] font-semibold shadow-lg shadow-[#FF6B2B]/40 hover:shadow-[#FF6B2B]/60 hover:scale-105 transition-all cursor-target relative overflow-hidden group">
          <span className="relative z-10">Book Your Discovery Call</span>
          <span className="absolute inset-0 shine-effect"></span>
        </a>
      </section>

      {/* CONSULT */}
      <section id="consult" className="px-6 md:px-16 pt-6 pb-8 md:pt-8 md:pb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 reveal-section">Want 1:1 Guidance?</h2>
        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-6 md:mb-8">
          Deep‑dive consult with Rushil. Breakdown of your systems, workflows, automations, and AI leverage.
        </p>
        <a href="https://cal.id/sociovate/connect-with-rushil" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full border-2 border-[#FF6B2B]/50 bg-white/5 backdrop-blur-sm font-medium hover:bg-[#FF6B2B]/10 hover:border-[#FF6B2B] transition-all cursor-target">
          Book a Consult
        </a>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="px-6 md:px-16 pt-6 pb-8 text-center max-w-5xl mx-auto mb-4 flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white tracking-tight">Contact Us</h2>
        <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto mb-6">
          Have questions, ideas, or want to collaborate? Reach out directly!
        </p>
        <a href="mailto:rushil@sociovate.com" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-r from-[#FF8C42] to-[#FF6B2B] text-white font-semibold shadow-md hover:scale-105 hover:shadow-[#FF6B2B]/40 transition-all duration-200 relative overflow-hidden group cursor-target">
          <span className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-.659 1.591l-7.5 7.5a2.25 2.25 0 01-3.182 0l-7.5-7.5A2.25 2.25 0 012.25 6.993V6.75" />
            </svg>
          </span>
          <span className="relative z-10">rushil@sociovate.com</span>
          <span className="absolute inset-0 shine-effect"></span>
        </a>
      </section>

      {/* Floating Email widget */}
      <EmailWidget email="rushil@sociovate.com" subject="Inquiry from Sociovate Website" />

      {/* Floating WhatsApp widget (site-wide) */}
      <WhatsAppWidget phone="+919876543210" message="Hi! I'm interested in Sociovate's automations." />
      {/* Chatbase AI chat widget (injects chatbase embed script) */}
      <ChatbaseWidget />

      <PublicFooter />
    </div>
  );
}
