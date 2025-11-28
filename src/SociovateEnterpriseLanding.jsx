// SociovateEnterpriseLanding.jsx
// Fresh file — premium, futuristic, blue‑neon enterprise layout (RapidXAI inspired)
// Hero + CTA split, animated lightning placeholder, enterprise sections
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

  // Mobile scroll animation for featured case study - DISABLED
  // useEffect(() => {
  //   const isMobile = window.innerWidth <= 768;
  //   if (!isMobile || !featuredCaseRef.current) return;

  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const card = entry.target;
            
  //           // Animate card entrance
  //           gsap.fromTo(
  //             card,
  //             { 
  //               opacity: 0, 
  //               y: 30,
  //               boxShadow: '0 0 0 rgba(56, 189, 248, 0)'
  //             },
  //             {
  //               opacity: 1,
  //               y: 0,
  //               duration: 0.5,
  //               ease: 'power3.out'
  //             }
  //           );

  //           // Animate border glow
  //           gsap.to(card, {
  //             '--glow-intensity': 1,
  //             duration: 1.5,
  //             ease: 'power2.inOut',
  //             delay: 0.3
  //           });

  //           // Add box shadow glow
  //           gsap.to(card, {
  //             boxShadow: '0 8px 32px rgba(56, 189, 248, 0.25), 0 0 60px rgba(56, 189, 248, 0.15)',
  //             duration: 1,
  //             ease: 'power2.out',
  //             delay: 0.5
  //           });

  //           observer.unobserve(card);
  //         }
  //       });
  //     },
  //     {
  //       threshold: 0.3,
  //       rootMargin: '-30px'
  //     }
  //   );

  //   observer.observe(featuredCaseRef.current);

  //   return () => observer.disconnect();
  // }, []);

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
    <div className="min-h-screen w-full bg-[#030712] text-white relative">
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
        parallaxOn={true}
      />
      
      {/* Global Animated Grid Background */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <Squares
          speed={0.3}
          squareSize={50}
          direction="diagonal"
          borderColor="rgba(56, 189, 248, 0.3)"
          hoverFillColor="rgba(56, 189, 248, 0.1)"
        />
      </div>

      {/* NAVBAR */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl flex items-center justify-between px-6 md:px-8 py-3 bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl z-50 shadow-2xl">
        <div className="flex items-center gap-3">
          <img src="/logu.svg" alt="Sociovate" className="w-10 h-10 rounded-xl shadow-lg" />
          <div className="font-semibold tracking-wide text-white text-lg">Sociovate</div>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm text-slate-300 font-medium">
          <a href="#home" className="hover:text-white transition-colors cursor-target">Home</a>
          <a href="#services" className="hover:text-white transition-colors cursor-target">Services</a>
          <a href="#cases" className="hover:text-white transition-colors cursor-target">Case Studies</a>
          <a href="#team" className="hover:text-white transition-colors cursor-target">Team</a>
          <a href="#socials" className="hover:text-white transition-colors cursor-target">Socials</a>
        </div>

        <div className="flex items-center gap-4">
          <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" className="hidden sm:block px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all text-sm relative overflow-hidden group cursor-target">
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
        <div ref={dropdownRef} className="md:hidden absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[95%] max-w-7xl bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl z-50 shadow-2xl overflow-hidden pointer-events-none" style={{ height: 0, opacity: 0 }}>
          <div className="p-4 relative pointer-events-auto">
              {/* close button removed per request (use hamburger to toggle) */}
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
                <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className="block w-full text-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold shadow-lg shadow-blue-500/30">
                  Book Discovery Call
                </a>
              </div>
            </div>
          </div>
      </nav>

      {/* HERO SECTION */}
      <section id="home" className="w-full relative pt-32 pb-20 px-6 md:px-16 overflow-hidden">
        {/* Aurora Background Effect */}
        <div className="absolute inset-0 opacity-40 pointer-events-none z-10">
          <Aurora
            colorStops={["#38bdf8", "#FFFFFF", "#38bdf8"]}
            blend={0.6}
            amplitude={1.5}
            speed={0.5}
          />
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        <span className="block">Automate Smarter.</span>
            <span className="block mt-2">
                <span className="font-extrabold text-[1.15em] text-[#5fd6fb] shimmer-text inline-block relative overflow-hidden">
                  Convert Faster.
                </span>
            </span>
            <span className="block">Scale Effortlessly.</span>
          </h1>
      {/* HERO SHIMMER TEXT EFFECT - Cartoon sword shine on letters */}
      <style>{`
        .shimmer-text {
          background: linear-gradient(
            90deg,
            #5fd6fb 0%,
            #5fd6fb 40%,
            #ffffff 50%,
            #5fd6fb 60%,
            #5fd6fb 100%
          );
          background-size: 200% 100%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine-sweep 2.2s linear infinite;
          font-weight: 800;
        }
        @keyframes shine-sweep {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
        
        /* Dramatic button shine effect */
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
        
        /* Blockchain-style grid pattern */
        .grid-pattern {
          background-image: 
            linear-gradient(rgba(96, 165, 250, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(96, 165, 250, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: grid-move 20s linear infinite;
        }
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.1);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
      `}</style>

          <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-sm leading-relaxed">
            AI agents that qualify, book, follow-up, and close — while you run your business.<br />
            Built for enterprise teams, fast‑growing companies, and modern clinics.
          </p>

          <div className="mt-14 flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-12 max-w-4xl mx-auto">
            {/* FOR BUSINESSES */}
            <div className="flex flex-col items-center text-center flex-1 w-full">
              <div className="flex items-center justify-center gap-2 lg:block lg:text-center mb-3">
                <BriefcaseIcon aria-hidden="true" className="w-4 h-4 text-blue-400 lg:inline-block lg:mr-2 lg:-mt-0.5" />
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-semibold lg:inline">For Businesses</p>
              </div>
              <p className="text-slate-300 text-base mb-6 px-4 lg:px-0 leading-relaxed lg:min-h-[48px] lg:flex lg:items-center lg:justify-center">Ready to automate and scale? Let's build your AI solution.</p>
              <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 transition-all text-base relative overflow-hidden group cursor-target">
                <span className="relative z-10">Book a Discovery Call</span>
                <span className="absolute inset-0 shine-effect"></span>
              </a>
            </div>

            {/* FOR LEARNERS */}
            <div className="flex flex-col items-center text-center flex-1 w-full">
              <div className="flex items-center justify-center gap-2 lg:block lg:text-center mb-3 lg:mb-2">
                <AcademicCapIcon aria-hidden="true" className="w-4 h-4 text-blue-300 lg:inline-block lg:mr-2 lg:-mt-0.5" />
                <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-semibold lg:inline">For Learners</p>
              </div>
              <p className="text-slate-300 text-base mb-6 lg:mb-4 px-4 lg:px-0 leading-relaxed lg:min-h-[48px] lg:flex lg:items-center lg:justify-center">Want to understand AI & automation?</p>
              <a href="https://cal.id/sociovate/connect-with-rushil" target="_blank" rel="noopener noreferrer" className="w-full max-w-xs px-8 py-4 rounded-full border-2 border-blue-500/50 bg-white/5 backdrop-blur-sm font-medium hover:bg-blue-500/10 hover:border-blue-500 transition-all text-base cursor-target">
                Book a Consult
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE SECTION */}
      <section className="px-6 md:px-16 pt-10 pb-20" id="why">
        <h2 className="text-center text-3xl md:text-4xl font-bold mb-12">Why Choose Sociovate?</h2>

        <div className="max-w-6xl mx-auto">
          <MagicBento
            cards={[
              {
                title: "End-to-End Systems",
                desc: "Done-for-you systems built for reliability, uptime, and consistency.",
                icon: <ShieldCheckIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19"
              },
              {
                title: "24/7 Automations",
                desc: "Agents that qualify, book, follow-up and handle ops around the clock.",
                icon: <ClockIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19"
              },
              {
                title: "Fast Deployment",
                desc: "Designed for businesses, tech firms, and companies that need less friction.",
                icon: <RocketLaunchIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19"
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
            glowColor="56, 189, 248"
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
                icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19"
              },
              {
                title: "MVP & Micro‑SaaS Builds",
                desc: "Fastest route from idea → live product. Clean UI, auth, integrations, dashboards, and conversion‑ready experiences.",
                icon: <CodeBracketIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19"
              },
              {
                title: "AI Infrastructure & Automation Systems",
                desc: "Backend workflows, pipelines, and integrations that keep your operations running smoothly. AI powered automations, CRM flows, reminders, lead pipelines, dashboards, and business logic stitched end-to-end.",
                icon: <ServerIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19"
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
            glowColor="56, 189, 248"
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
            className="relative magic-bento-card magic-bento-card--border-glow bg-gradient-to-br from-[#0b0f19] to-[#0a0d16] border border-white/10 rounded-2xl overflow-hidden p-0 featured-case-study" 
            style={{'--glow-x': '50%', '--glow-y': '50%', '--glow-intensity': '0', '--glow-radius': '200px', '--glow-color': '56, 189, 248'}}
          >
            {/* Mobile Collapsed View */}
            <div className={`md:hidden ${expandedCases['featured'] ? 'hidden' : 'block'}`}>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                    Featured Project
                  </div>
                </div>
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center flex-shrink-0">
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
                    <div className="text-xl font-bold text-blue-400 mb-1">55%</div>
                    <div className="text-xs text-slate-400">Less Lead Loss</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-cyan-400 mb-1">4x</div>
                    <div className="text-xs text-slate-400">Increased Productivity</div>
                  </div>
                  <div>
                    <div className="text-xl font-bold text-emerald-400 mb-1">24/7</div>
                    <div className="text-xs text-slate-400">Active Calling</div>
                  </div>
                </div>

                <button
                  onClick={() => toggleCaseExpansion('featured')}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 text-blue-400 font-medium text-sm hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-target"
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
                    <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
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
                    <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs">Vapi</span>
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-blue-400 mb-1">55%</div>
                    <div className="text-xs text-slate-400">Less Lead Loss</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">4x</div>
                    <div className="text-xs text-slate-400">Increase in Productivity</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-emerald-400 mb-1">24/7</div>
                    <div className="text-xs text-slate-400">Active Calling</div>
                  </div>
                </div>
              </div>

              {/* Right: Visual/Screenshot Placeholder */}
              <div className="relative rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/10 overflow-hidden min-h-[300px] md:min-h-[400px]">
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
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 text-blue-400 font-medium text-sm hover:bg-blue-500/20 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/20 transition-all cursor-target"
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
                icon: <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19",
                fullDesc: "Built an AI-powered, multilingual WhatsApp support system for a platform to automate user support, ticketing, and issue resolution across English, Hindi, and Gujarati. The system handles user verification, dynamic language locking, knowledge-based resolution, and automated escalation for technical and physical issues — all synced with Google Sheets as a live backend.",
                metrics: [
                  { value: "40%+", label: "Manpower Cost Reduced" },
                  { value: "24/7", label: "Automated Support" },
                  { value: "3", label: "Languages Live" }
                ],
                tech: ["n8n", "WhatsApp API", "OpenAI", "Google Sheets", "Node.js"]
              },
              {
                id: "ecommerce-automation",
                title: "Shopify & E-commerce Order Automation",
                desc: "End-to-end WhatsApp automation system for Shopify stores handling order confirmations, COD verification, and shipping updates automatically.",
                icon: <Cog8ToothIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19",
                fullDesc: "Built an end-to-end WhatsApp automation system for Shopify stores to handle order confirmations, COD verification, shipping updates, and customer notifications automatically. As soon as an order is placed, customers receive instant WhatsApp updates. For COD orders, users get a one-click confirmation link — only confirmed orders are pushed to the backend team for fulfillment, reducing fake and high-risk shipments.",
                metrics: [
                  { value: "80%", label: "Reduction in RTO" },
                  { value: "100+", label: "High-Risk Orders Blocked" },
                  { value: "10/10", label: "Customer Experience" }
                ],
                tech: ["Shopify", "WhatsApp Business API", "OpenAI", "React.js"]
              },
              {
                id: "lead-gen",
                title: "Lead Gen Pipeline",
                desc: "AI-powered lead qualification system. 5x increase in qualified demo bookings with zero manual work.",
                icon: <UserGroupIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19",
                fullDesc: "Developed an intelligent lead qualification and nurturing system powered by AI. Automatically scores leads, sends personalized follow-ups, and books qualified demos directly into calendars.",
                metrics: [
                  { value: "5x", label: "More Demos" },
                  { value: "92%", label: "Lead Quality" },
                  { value: "70%", label: "Less Manual Work" }
                ],
                tech: ["OpenAI", "HubSpot API", "Calendly", "Python", "MongoDB"]
              },
              {
                id: "mass-audio-broadcast",
                title: "Mass Audio Broadcast Calling System",
                desc: "Scalable mass voice broadcast system automating outbound calls using Excel contact lists with scheduled campaigns and IVR responses.",
                icon: <RocketLaunchIcon className="w-6 h-6 text-blue-400" aria-hidden="true" />,
                color: "#0b0f19",
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
            glowColor="56, 189, 248"
            expandable={true}
            expandedCases={expandedCases}
            onToggleExpand={toggleCaseExpansion}
            />
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="relative py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-blue-100 to-slate-300 bg-clip-text text-transparent">
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
                  color: "#0b0f19"
                },
                {
                  title: "Purva",
                  desc: "CTO & Product Lead",
                  quote: "Code. Create. Innovate.",
                  color: "#0b0f19"
                },
                {
                  title: "Rutuja",
                  desc: "Legal Advisor",
                  quote: "Ensuring every step is secure.",
                  color: "#0b0f19"
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
              glowColor="56, 189, 248"
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
        <a href="https://calendar.app.google/e9P3qXjnszhk2NWt7" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 font-semibold shadow-lg shadow-blue-500/40 hover:shadow-blue-500/60 hover:scale-105 transition-all cursor-target">
          Book Your Discovery Call
        </a>
      </section>

      {/* CONSULT */}
      <section id="consult" className="px-6 md:px-16 py-12 md:py-14 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Want 1:1 Guidance?</h2>
        <p className="text-slate-300 text-sm md:text-base max-w-xl mx-auto mb-6 md:mb-8">
          Deep‑dive consult with Rushil. Breakdown of your systems, workflows, automations, and AI leverage.
        </p>
        <a href="https://cal.id/sociovate/connect-with-rushil" target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-4 rounded-full border-2 border-blue-500/50 bg-white/5 backdrop-blur-sm font-medium hover:bg-blue-500/10 hover:border-blue-500 transition-all cursor-target">
          Book a Consult
        </a>
      </section>

      {/* Floating WhatsApp widget (site-wide) */}
      <WhatsAppWidget phone="+919876543210" message="Hi! I'm interested in Sociovate's automations." />
      {/* Chatbase AI chat widget (injects chatbase embed script) */}
      <ChatbaseWidget />

      <PublicFooter />
    </div>
  );
}