// SociovateEnterpriseLanding.jsx
// Core Black (#050E12) + Plasma Orange (#FF6B2B) palette
// TailwindCSS required

import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { gsap } from 'gsap';
import Aurora from './Aurora';
import SpotlightCard from './SpotlightCard';
import Squares from './Squares';
import GlassCursor from './GlassCursor';
import PublicFooter from './PublicFooter';
import MagicBento from './MagicBento';
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
} from '@heroicons/react/24/outline';

export default function SociovateEnterpriseLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const timelineRef = useRef(null);
  const menuItemsRef = useRef([]);
  const featuredCaseRef = useRef(null);
  const [expandedCases, setExpandedCases] = useState({});

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

  const toggleCaseExpansion = (caseId) => {
    setExpandedCases(prev => ({
      ...prev,
      [caseId]: !prev[caseId]
    }));
  };

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
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl flex items-center justify-between px-6 md:px-8 py-3 bg-[#050E12]/90 backdrop-blur-xl border border-white/10 rounded-2xl z-50 shadow-2xl">
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
            background: linear-gradient(
              90deg,
              #FF6B2B 0%,
              #FF6B2B 40%,
              #ffffff 50%,
              #FF6B2B 60%,
              #FF6B2B 100%
            );
            background-size: 200% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shine-sweep 2.2s linear infinite;
            font-weight: 800;
          }
          @keyframes shine-sweep {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
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
            <span className="block text-white" style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}>
              Automate{' '}
              <span className="shimmer-text" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: '1.15em', animationDelay: '0s' }}>
                Smarter.
              </span>
            </span>
            <span className="block text-white" style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}>
              Convert{' '}
              <span className="shimmer-text" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: '1.15em', animationDelay: '0.75s' }}>
                Faster.
              </span>
            </span>
            <span className="block text-white" style={{ fontSize: 'clamp(2rem, 6vw, 3.8rem)' }}>
              Scale{' '}
              <span className="shimmer-text" style={{ fontFamily: "'Dancing Script', cursive", fontWeight: 700, fontSize: '1.15em', animationDelay: '1.5s' }}>
                Effortlessly.
              </span>
            </span>
          </h1>

          <p className="mt-8 text-slate-300 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            AI agents that qualify, book, follow-up, and close while you run your business.<br />
            Built for enterprise teams, fast-growing companies, and modern clinics!
          </p>

          <div className="mt-14 flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12 max-w-4xl mx-auto mb-16">
            {/* FOR BUSINESSES */}
            <div className="flex flex-col items-center text-center flex-1 w-full">
              <div className="flex items-center justify-center gap-2 lg:block lg:text-center mb-3">
                <BriefcaseIcon aria-hidden="true" className="w-4 h-4 text-[#FF6B2B] lg:inline-block lg:mr-2 lg:-mt-0.5" />
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-semibold lg:inline">For Businesses</p>
              </div>
              <p className="text-slate-300 text-base mb-6 px-4 lg:px-0 leading-relaxed lg:min-h-[48px] lg:flex lg:items-center lg:justify-center">Ready to automate and scale? Let's build your AI solution.</p>
              <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B2B] to-[#FF8C42] font-semibold shadow-lg shadow-[#FF6B2B]/40 hover:shadow-[#FF6B2B]/60 hover:scale-105 transition-all text-base relative overflow-hidden group cursor-target">
                <span className="relative z-10">Book a Discovery Call</span>
                <span className="absolute inset-0 shine-effect"></span>
              </a>
            </div>

            {/* FOR LEARNERS */}
            <div className="flex flex-col items-center text-center flex-1 w-full">
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

          {/* Dashboard Mockup */}
          <div className="relative mx-auto max-w-3xl dashboard-fade">
            <div className="bg-[#060e14] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-[#FF6B2B]/5">
              {/* Browser title bar */}
              <div className="flex items-center gap-3 px-3 sm:px-5 py-2.5 sm:py-3.5 bg-[#081017] border-b border-white/8">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="text-[10px] sm:text-xs text-slate-500 font-medium">Sociovate Dashboard — Q1 Outbound</span>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="p-3 sm:p-5 space-y-3 sm:space-y-4">
                {/* Metrics row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                  {[
                    { label: 'Calls Made', value: '328', change: '+18%' },
                    { label: 'Connected', value: '87%', change: '+5%' },
                    { label: 'Booked', value: '26', change: '+14%' },
                    { label: 'Conversion', value: '7.9%', change: '+2.1%' },
                  ].map((m) => (
                    <div key={m.label} className="bg-white/4 border border-white/8 rounded-lg sm:rounded-xl p-2.5 sm:p-3.5">
                      <div className="text-[10px] sm:text-xs text-slate-500 mb-1 sm:mb-2">{m.label}</div>
                      <div className="text-lg sm:text-xl font-bold text-white mb-0.5">{m.value}</div>
                      <div className="text-[10px] sm:text-xs text-emerald-400 font-medium">{m.change}</div>
                    </div>
                  ))}
                </div>

                {/* Recent Calls */}
                <div className="bg-white/3 border border-white/8 rounded-lg sm:rounded-xl overflow-hidden text-left">
                  <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/8">
                    <div className="flex items-center gap-2">
                      <span className="text-xs sm:text-sm font-medium text-slate-300">Recent Calls</span>
                      <span className="text-[10px] text-emerald-400 px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 font-semibold">+ Live</span>
                    </div>
                    <span className="text-[10px] sm:text-xs text-slate-500">328 total</span>
                  </div>
                  {[
                    { name: 'Rajesh Kumar', company: 'PropTech Delhi', status: 'Appointment Booked', sc: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
                    { name: 'Sneha Patel', company: 'E-Commerce Mumbai', status: 'Qualified', sc: 'text-[#FF6B2B] bg-[#FF6B2B]/10 border-[#FF6B2B]/20' },
                    { name: 'Arjun Singh', company: 'SaaS, Bangalore', status: 'Follow-up Scheduled', sc: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
                  ].map((call, i) => (
                    <div key={i} className="flex items-center gap-2.5 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-white/5 last:border-0">
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

      {/* STATS STRIP */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-16 pt-20 pb-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {[
            { value: '55%', label: 'Less Lead Loss' },
            { value: '4x', label: 'Productivity Boost' },
            { value: '24/7', label: 'Active Calling' },
            { value: '3+', label: 'Languages Supported' },
          ].map((stat) => (
            <div key={stat.label} className="py-6">
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-400">{stat.label}</div>
            </div>
          ))}
        </div>
        <div className="mt-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      </div>

      {/* WHY CHOOSE SECTION */}
      <section className="px-6 md:px-16 pt-10 pb-20" id="why">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">Why Choose <span className="brand-cursive" style={{ color: '#FF6B2B' }}>Sociovate</span>?</h2>

        <div className="max-w-6xl mx-auto">
          <MagicBento
            cards={[
              {
                title: "End-to-End Systems",
                desc: "Done-for-you systems built for reliability, uptime, and consistency.",
                icon: <ShieldCheckIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14"
              },
              {
                title: "24/7 Automations",
                desc: "Agents that qualify, book, follow-up and handle ops around the clock.",
                icon: <ClockIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14"
              },
              {
                title: "Fast Deployment",
                desc: "Designed for businesses, tech firms, and companies that need less friction.",
                icon: <RocketLaunchIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14"
              }
            ]}
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="255, 107, 43"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 md:px-16 py-20">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">Our Core Services</h2>

        <div className="max-w-6xl mx-auto">
          <MagicBento
            layoutStyle="asymmetric"
            cards={[
              {
                title: "AI Voice & Chat Agents",
                desc: "Your 24/7 chat + voice call agent. Handles inbound, outbound, reminders, FAQ, qualification, routing & scheduling — across WhatsApp, and Call.",
                icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14"
              },
              {
                title: "MVP & Micro‑SaaS Builds",
                desc: "Fastest route from idea → live product. Clean UI, auth, integrations, dashboards, and conversion‑ready experiences.",
                icon: <CodeBracketIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14"
              },
              {
                title: "AI Infrastructure & Automation Systems",
                desc: "Backend workflows, pipelines, and integrations that keep your operations running smoothly. AI powered automations, CRM flows, reminders, lead pipelines, dashboards, and business logic stitched end-to-end.",
                icon: <ServerIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14"
              }
            ]}
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="255, 107, 43"
          />
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="cases" className="px-6 md:px-16 py-20">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">Case Studies</h2>

        <div className="max-w-6xl mx-auto space-y-8">
          {/* Featured Case Study */}
          <div
            ref={featuredCaseRef}
            className="relative magic-bento-card magic-bento-card--border-glow bg-gradient-to-br from-[#0a1218] to-[#0d161c] border border-white/10 rounded-2xl overflow-hidden p-0 featured-case-study"
            style={{'--glow-x': '50%', '--glow-y': '50%', '--glow-intensity': '0', '--glow-radius': '200px', '--glow-color': '255, 107, 43'}}
          >
            {/* Mobile Collapsed View */}
            <div className={`md:hidden ${expandedCases['featured'] ? 'hidden' : 'block'}`}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 rounded-full bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 text-[#FF6B2B] text-xs font-semibold">
                    Featured Project
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#FF6B2B] to-[#FF8C42] flex items-center justify-center flex-shrink-0">
                    <ChatBubbleLeftRightIcon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    AI Voice Agent for Hair Transplant Clinic
                  </h3>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  24/7 AI calling system handling inbound patient calls, outbound lead follow-ups, and consultations. Calls new leads within minutes, qualifies patients, and books appointments automatically...
                </p>

                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div>
                    <div className="text-xl font-bold text-[#FF6B2B] mb-1">55%</div>
                    <div className="text-xs text-slate-400">Less Lead Loss</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-[#FF8C42] mb-1">4x</div>
                    <div className="text-xs text-slate-400">Increased Productivity</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-emerald-400 mb-1">24/7</div>
                    <div className="text-xs text-slate-400">Active Calling</div>
                  </div>
                </div>

                <button
                  onClick={() => toggleCaseExpansion('featured')}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#FF6B2B]/10 to-[#FF8C42]/10 border border-[#FF6B2B]/30 text-[#FF6B2B] font-medium text-sm hover:bg-[#FF6B2B]/20 hover:border-[#FF6B2B]/50 hover:shadow-lg hover:shadow-[#FF6B2B]/20 transition-all cursor-target"
                >
                  View Full Case Study
                </button>
              </div>
            </div>

            {/* Mobile Expanded View & Desktop View */}
            <div className={`expanded-content ${expandedCases['featured'] ? 'block' : 'hidden md:block'}`}>
              <div className="relative grid md:grid-cols-2 gap-8 p-8 md:p-12">
              {/* Left: Content */}
              <div className="flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="px-3 py-1 rounded-full bg-[#FF6B2B]/10 border border-[#FF6B2B]/20 text-[#FF6B2B] text-xs font-semibold">
                      Featured Project
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    AI Agent for Hair Transplant Clinic
                  </h3>

                  <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                    Built a 24/7 AI calling system that handles inbound patient calls and outbound lead follow-ups automatically. The agent calls new leads within minutes to prevent drop-offs, qualifies patients, collects scalp photo consent, and books consultations directly into the clinic's calendar. Also manages repeat inquiries, availability checks, and basic pre-consultation screening without any human staff.
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs">Eleven Labs AI</span>
                    <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs">WhatsApp API</span>
                    <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs">Calendar API</span>
                    <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs">Omnidim.io</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-[#FF6B2B] mb-1">55%</div>
                    <div className="text-xs text-slate-400">Less Lead Loss</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-[#FF8C42] mb-1">4x</div>
                    <div className="text-xs text-slate-400">Increase in Productivity</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1">24/7</div>
                    <div className="text-xs text-slate-400">Active Calling</div>
                  </div>
                </div>
              </div>

              {/* Right: Visual/Screenshot Placeholder */}
              <div className="relative rounded-xl bg-gradient-to-br from-[#FF6B2B]/10 to-[#FF8C42]/10 border border-white/10 overflow-hidden min-h-[300px] md:min-h-[400px]">
                <img
                  src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExYmh5cTNjaWY3eGd1Y2dzcmN4bHU1aDllZDFzcWVxOWEyaGdrZ3h6byZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/vEJGsXtEE1Sc8/giphy.gif"
                  alt="Person overwhelmed with phones"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Collapse Button (Mobile Only) */}
            {expandedCases['featured'] && (
              <div className="md:hidden p-6 pt-0">
                <button
                  onClick={() => toggleCaseExpansion('featured')}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-[#FF6B2B]/10 to-[#FF8C42]/10 border border-[#FF6B2B]/30 text-[#FF6B2B] font-medium text-sm hover:bg-[#FF6B2B]/20 hover:border-[#FF6B2B]/50 hover:shadow-lg hover:shadow-[#FF6B2B]/20 transition-all cursor-target"
                >
                  Show Less
                </button>
              </div>
            )}
            </div>
          </div>

          {/* Grid of Smaller Case Studies */}
          <div className="case-grid">
          <MagicBento
            cards={[
              {
                id: "multilingual-whatsapp-bot",
                title: "Multilingual WhatsApp Bot",
                desc: "AI-powered, multilingual WhatsApp support system automating user support, ticketing, and issue resolution across 3 languages.",
                icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14",
                fullDesc: "Built an AI-powered, multilingual WhatsApp support system for a platform to automate user support, ticketing, and issue resolution across English, Hindi, and Gujarati. The system handles user verification, dynamic language locking, knowledge-based resolution, and automated escalation for technical and physical issues — all synced with Google Sheets as a live backend.",
                metrics: [
                  { value: "40%+", label: "Manpower Cost Reduced" },
                  { value: "24/7", label: "Automated Support" },
                  { value: "3", label: "Languages Live" }
                ],
                tech: ["n8n", "WhatsApp API", "OpenAI", "Google Sheets"]
              },
              {
                id: "ecommerce-automation",
                title: "Shopify & E-commerce Order Automation",
                desc: "End-to-end WhatsApp automation system for Shopify stores handling order confirmations, COD verification, and shipping updates automatically.",
                icon: <Cog8ToothIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14",
                fullDesc: "Built an end-to-end WhatsApp automation system for Shopify stores to handle order confirmations, COD verification, shipping updates, and customer notifications automatically. As soon as an order is placed, customers receive instant WhatsApp updates. For COD orders, users get a one-click confirmation link — only confirmed orders are pushed to the backend team for fulfillment, reducing fake and high-risk shipments.",
                metrics: [
                  { value: "+40%", label: "Reduction in RTO" },
                  { value: "90%", label: "High-Risk Orders Blocked" },
                  { value: "10/10", label: "Customer Experience" }
                ],
                tech: ["Shopify", "WhatsApp Business API", "OpenAI", "React.js"]
              },
              {
                id: "lead-gen",
                title: "Lead Gen Pipeline",
                desc: "AI-powered lead qualification system. 5x increase in qualified demo bookings with zero manual work.",
                icon: <UserGroupIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14",
                fullDesc: "Developed an intelligent lead qualification and nurturing system powered by AI. Automatically scores leads, sends personalized follow-ups, and books qualified demos directly into calendars.",
                metrics: [
                  { value: "5x", label: "More Demos" },
                  { value: "92%", label: "Lead Quality" },
                  { value: "70%", label: "Less Manual Work" }
                ],
                tech: ["OpenAI", "Apify", "Calendly", "Apollo.io", "MongoDB"]
              },
              {
                id: "mass-audio-broadcast",
                title: "Mass Audio Broadcast Calling System",
                desc: "Scalable mass voice broadcast system automating outbound calls using Excel contact lists with scheduled campaigns and IVR responses.",
                icon: <RocketLaunchIcon className="w-6 h-6 text-[#FF6B2B]" aria-hidden="true" />,
                color: "#060e14",
                fullDesc: "Built a scalable mass voice broadcast system to automate outbound calls using uploaded Excel contact lists. The platform allows scheduled call campaigns, automatic audio playback upon call pickup, and interactive keypad responses (Press 1/2/etc.) for real-time user feedback. Used for political campaigns, public announcements, service promotions, and large-scale outreach.",
                metrics: [
                  { value: "1L+", label: "Calls per Campaign" },
                  { value: "Auto-Schedule", label: "Time-Based Triggering" },
                  { value: "IVR", label: "Keypad Enabled" }
                ],
                tech: ["Twilio", "Africa's Talking", "Exotel", "Claude", "React.js"]
              }
            ]}
            textAutoHide={false}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="255, 107, 43"
            expandable={true}
            expandedCases={expandedCases}
            onToggleExpand={toggleCaseExpansion}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-950/10 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-orange-100 to-slate-300 bg-clip-text text-transparent">
              Meet The Team
            </h2>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              The core team of passionate & experienced individuals.
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <MagicBento
              cards={[
                {
                  title: "Rushil",
                  desc: "Founder & CEO",
                  quote: "Where strategy meets execution.",
                  color: "#060e14"
                },
                {
                  title: "Purva",
                  desc: "Founding Engineer",
                  quote: "Code. Create. Innovate.",
                  color: "#060e14"
                },
                {
                  title: "Rutuja",
                  desc: "Legal Advisor",
                  quote: "Ensuring every step is secure.",
                  color: "#060e14"
                }
              ]}
              textAutoHide={false}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="255, 107, 43"
            />
          </div>
        </div>
      </section>

      {/* BOOK CALL SECTION */}
      <section id="book" className="px-6 md:px-16 py-12 md:py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Ready to Automate?</h2>
        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-6 md:mb-8">
          Book a discovery call and we'll map the exact automations your business needs.
        </p>
        <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B2B] to-[#FF8C42] font-semibold shadow-lg shadow-[#FF6B2B]/40 hover:shadow-[#FF6B2B]/60 hover:scale-105 transition-all cursor-target relative overflow-hidden group">
          <span className="relative z-10">Book Your Discovery Call</span>
          <span className="absolute inset-0 shine-effect"></span>
        </a>
      </section>

      {/* CONSULT */}
      <section id="consult" className="px-6 md:px-16 py-12 md:py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Want 1:1 Guidance?</h2>
        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-6 md:mb-8">
          Deep‑dive consult with Rushil. Breakdown of your systems, workflows, automations, and AI leverage.
        </p>
        <a href="https://cal.id/sociovate/connect-with-rushil" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full border-2 border-[#FF6B2B]/50 bg-white/5 backdrop-blur-sm font-medium hover:bg-[#FF6B2B]/10 hover:border-[#FF6B2B] transition-all cursor-target">
          Book a Consult
        </a>
      </section>

      {/* Contact Us Section */}
      <section id="contact" className="px-6 md:px-16 py-12 md:py-16 text-center max-w-5xl mx-auto mb-10 flex flex-col items-center justify-center">
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
