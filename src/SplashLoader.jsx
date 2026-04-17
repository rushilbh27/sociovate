// SplashLoader.jsx — Animated circuit/nodes loading screen for Sociovate
// Single-phase splash: brand-themed automation network graph that "builds itself"

import React, { useEffect } from 'react';

export default function SplashLoader({ onDone }) {
  useEffect(() => {
    const t = setTimeout(() => onDone?.(), 2600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#050E12',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      animation: 'sl-fadeout .5s ease 2.1s both',
    }}>
      <style>{`
        @keyframes sl-fadeout { to { opacity: 0; visibility: hidden; } }
        @keyframes sl-orb    { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(22px,-18px) scale(1.05)} 66%{transform:translate(-14px,14px) scale(.96)} }
        @keyframes sl-up     { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:none} }
        @keyframes sl-bar    { from{width:0} to{width:100%} }

        /* Node draw-in */
        @keyframes sl-node   { 0%{opacity:0;transform:scale(.3)} 60%{transform:scale(1.15)} 100%{opacity:1;transform:scale(1)} }
        /* Node pulse after draw-in */
        @keyframes sl-pulse  { 0%,100%{filter:drop-shadow(0 0 4px rgba(255,107,43,.5))} 50%{filter:drop-shadow(0 0 14px rgba(255,107,43,1)) drop-shadow(0 0 28px rgba(255,107,43,.4))} }
        /* Circuit line draw-in */
        @keyframes sl-draw   { to { stroke-dashoffset: 0; } }
        /* Energy pulse traveling along paths */
        @keyframes sl-energy { 0%{stroke-dashoffset:0;opacity:0} 5%{opacity:1} 95%{opacity:1} 100%{stroke-dashoffset:-80;opacity:0} }
        /* Core ring pulse */
        @keyframes sl-core   { 0%,100%{transform:scale(1);opacity:.9} 50%{transform:scale(1.15);opacity:.4} }
        /* Core glow breathing */
        @keyframes sl-glow   { 0%,100%{filter:drop-shadow(0 0 18px rgba(255,107,43,.7)) drop-shadow(0 0 40px rgba(255,107,43,.3))} 50%{filter:drop-shadow(0 0 34px rgba(255,107,43,1)) drop-shadow(0 0 70px rgba(255,107,43,.5))} }
        /* Floating particle */
        @keyframes sl-flt    { 0%{opacity:.9;transform:translateY(0)} 100%{opacity:0;transform:translateY(-130px)} }

        .sl-node-a { animation: sl-node .55s cubic-bezier(0.34,1.3,0.64,1) both, sl-pulse 2.2s ease-in-out infinite; }
        .sl-line   { stroke-dasharray: 200; stroke-dashoffset: 200; animation: sl-draw .9s ease-out forwards; }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:'-12%', left:'-8%', width:600, height:600, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,107,43,.12) 0%, transparent 70%)', filter:'blur(48px)', animation:'sl-orb 14s ease-in-out infinite' }} />
        <div style={{ position:'absolute', bottom:'5%', right:'-6%', width:480, height:480, borderRadius:'50%', background:'radial-gradient(circle, rgba(255,140,66,.08) 0%, transparent 70%)', filter:'blur(48px)', animation:'sl-orb 18s ease-in-out infinite reverse' }} />
      </div>

      {/* Floating particles */}
      {[
        { l:'16%', t:'72%', s:5, d:3.1, del:0 },
        { l:'78%', t:'80%', s:4, d:4.3, del:.7 },
        { l:'48%', t:'88%', s:4, d:3.8, del:1.1 },
        { l:'90%', t:'65%', s:3, d:2.9, del:.3 },
        { l:'6%',  t:'58%', s:6, d:5.2, del:.9 },
        { l:'62%', t:'76%', s:4, d:3.5, del:1.5 },
        { l:'33%', t:'82%', s:3, d:4.0, del:.5 },
      ].map((p, i) => (
        <div key={i} style={{
          position:'absolute', left:p.l, top:p.t,
          width:p.s, height:p.s, borderRadius:'50%',
          background:'#FF6B2B', pointerEvents:'none',
          animation:`sl-flt ${p.d}s linear ${p.del}s infinite`,
        }} />
      ))}

      {/* ── CIRCUIT / NODE NETWORK ── */}
      <svg width="360" height="260" viewBox="0 0 360 260" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Gradient for core */}
          <radialGradient id="coreGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF8C42" />
            <stop offset="60%" stopColor="#FF6B2B" />
            <stop offset="100%" stopColor="#c94a12" />
          </radialGradient>
          {/* Filter for node glow */}
          <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* ── Circuit connecting lines (draw in order) ── */}
        {/* Core → Node 1 (top-left) */}
        <path className="sl-line" d="M180,130 L70,50" stroke="rgba(255,107,43,.55)" strokeWidth="1.5" fill="none" style={{ animationDelay:'.5s' }}/>
        {/* Core → Node 2 (top-right) */}
        <path className="sl-line" d="M180,130 L290,50" stroke="rgba(255,107,43,.55)" strokeWidth="1.5" fill="none" style={{ animationDelay:'.6s' }}/>
        {/* Core → Node 3 (right) */}
        <path className="sl-line" d="M180,130 L320,130" stroke="rgba(255,107,43,.55)" strokeWidth="1.5" fill="none" style={{ animationDelay:'.7s' }}/>
        {/* Core → Node 4 (bottom-right) */}
        <path className="sl-line" d="M180,130 L290,210" stroke="rgba(255,107,43,.55)" strokeWidth="1.5" fill="none" style={{ animationDelay:'.8s' }}/>
        {/* Core → Node 5 (bottom-left) */}
        <path className="sl-line" d="M180,130 L70,210" stroke="rgba(255,107,43,.55)" strokeWidth="1.5" fill="none" style={{ animationDelay:'.9s' }}/>
        {/* Core → Node 6 (left) */}
        <path className="sl-line" d="M180,130 L40,130" stroke="rgba(255,107,43,.55)" strokeWidth="1.5" fill="none" style={{ animationDelay:'1s' }}/>

        {/* Inter-node secondary connections (circuit mesh) */}
        <path className="sl-line" d="M70,50 L40,130" stroke="rgba(255,107,43,.22)" strokeWidth="1" fill="none" style={{ animationDelay:'1.2s' }}/>
        <path className="sl-line" d="M290,50 L320,130" stroke="rgba(255,107,43,.22)" strokeWidth="1" fill="none" style={{ animationDelay:'1.3s' }}/>
        <path className="sl-line" d="M320,130 L290,210" stroke="rgba(255,107,43,.22)" strokeWidth="1" fill="none" style={{ animationDelay:'1.4s' }}/>
        <path className="sl-line" d="M40,130 L70,210" stroke="rgba(255,107,43,.22)" strokeWidth="1" fill="none" style={{ animationDelay:'1.5s' }}/>

        {/* Energy pulses traveling along primary lines */}
        <path d="M180,130 L70,50" stroke="#FF8C42" strokeWidth="2.5" fill="none" strokeDasharray="10 70" style={{ animation:'sl-energy 1.6s ease-in-out 1.4s infinite' }}/>
        <path d="M180,130 L290,50" stroke="#FF8C42" strokeWidth="2.5" fill="none" strokeDasharray="10 70" style={{ animation:'sl-energy 1.6s ease-in-out 1.6s infinite' }}/>
        <path d="M180,130 L320,130" stroke="#FF8C42" strokeWidth="2.5" fill="none" strokeDasharray="10 70" style={{ animation:'sl-energy 1.6s ease-in-out 1.8s infinite' }}/>
        <path d="M180,130 L290,210" stroke="#FF8C42" strokeWidth="2.5" fill="none" strokeDasharray="10 70" style={{ animation:'sl-energy 1.6s ease-in-out 1.5s infinite' }}/>
        <path d="M180,130 L70,210" stroke="#FF8C42" strokeWidth="2.5" fill="none" strokeDasharray="10 70" style={{ animation:'sl-energy 1.6s ease-in-out 1.7s infinite' }}/>
        <path d="M180,130 L40,130" stroke="#FF8C42" strokeWidth="2.5" fill="none" strokeDasharray="10 70" style={{ animation:'sl-energy 1.6s ease-in-out 1.9s infinite' }}/>

        {/* ── Outer nodes (draw in with staggered delays) ── */}
        {[
          { cx:70,  cy:50,  delay:'.9s' },
          { cx:290, cy:50,  delay:'1s'  },
          { cx:320, cy:130, delay:'1.1s'},
          { cx:290, cy:210, delay:'1.2s'},
          { cx:70,  cy:210, delay:'1.3s'},
          { cx:40,  cy:130, delay:'1.4s'},
        ].map((n, i) => (
          <g key={i} style={{ transformOrigin:`${n.cx}px ${n.cy}px`, animationDelay:n.delay }} className="sl-node-a">
            {/* Outer ring */}
            <circle cx={n.cx} cy={n.cy} r="12" fill="none" stroke="rgba(255,107,43,.35)" strokeWidth="1.2"/>
            {/* Inner dot */}
            <circle cx={n.cx} cy={n.cy} r="5" fill="#FF6B2B" filter="url(#nodeGlow)"/>
            {/* Core highlight */}
            <circle cx={n.cx} cy={n.cy} r="2" fill="#FFD4B8"/>
          </g>
        ))}

        {/* ── CORE (center) — pulsing main hub ── */}
        <g style={{ transformOrigin:'180px 130px', animation:'sl-glow 2.4s ease-in-out infinite' }}>
          {/* Outermost pulse ring */}
          <circle cx="180" cy="130" r="34" fill="none" stroke="rgba(255,107,43,.15)" strokeWidth="1" style={{ transformOrigin:'180px 130px', animation:'sl-core 2.4s ease-in-out infinite' }}/>
          {/* Middle ring */}
          <circle cx="180" cy="130" r="24" fill="none" stroke="rgba(255,107,43,.35)" strokeWidth="1.5" style={{ transformOrigin:'180px 130px', animation:'sl-core 2.4s ease-in-out .3s infinite' }}/>
          {/* Inner filled core with gradient */}
          <circle cx="180" cy="130" r="14" fill="url(#coreGrad)"/>
          {/* Highlight */}
          <circle cx="176" cy="126" r="4" fill="rgba(255,255,255,.45)"/>
        </g>

        {/* Small orbiting satellites around core */}
        <g>
          <circle r="2" fill="#FF8C42">
            <animateMotion dur="3s" repeatCount="indefinite" path="M 180,130 m -26,0 a 26,26 0 1,1 52,0 a 26,26 0 1,1 -52,0"/>
          </circle>
          <circle r="1.5" fill="#FFD4B8">
            <animateMotion dur="2.2s" repeatCount="indefinite" path="M 180,130 m -32,0 a 32,32 0 1,0 64,0 a 32,32 0 1,0 -64,0"/>
          </circle>
        </g>
      </svg>

      {/* Brand name + tagline */}
      <div style={{ fontFamily:"'Dancing Script', cursive", fontWeight:700, fontSize:28, color:'#fff', letterSpacing:'.5px', marginTop:16, animation:'sl-up .55s ease 1.5s both' }}>
        Sociovate
      </div>
      <div style={{ fontSize:11, color:'rgba(255,140,66,.7)', letterSpacing:'2.4px', textTransform:'uppercase', marginTop:8, animation:'sl-up .55s ease 1.7s both' }}>
        Automation &amp; Growth
      </div>

      {/* Progress bar */}
      <div style={{ width:160, height:2, background:'rgba(255,255,255,.06)', borderRadius:2, marginTop:30, overflow:'hidden', animation:'sl-up .5s ease 1.85s both' }}>
        <div style={{ height:'100%', borderRadius:2, background:'linear-gradient(90deg,#c94a12,#FF6B2B,#FF8C42)', animation:'sl-bar 1.4s ease-out 1.9s both' }} />
      </div>
    </div>
  );
}
