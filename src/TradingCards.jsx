import React, { useState, useEffect, useRef } from 'react';

const MESSAGES = [
  {
    name: 'Rushil',
    initial: 'R',
    role: 'Founder & CEO',
    accent: '#FF6B2B',
    time: '9:41 AM',
    text: 'Where strategy meets execution.',
  },
  {
    name: 'Purva',
    initial: 'P',
    role: 'Founding Engineer',
    accent: '#64B4FF',
    time: '9:42 AM',
    text: 'Code. Create. Innovate.',
  },
  {
    name: 'Rutuja',
    initial: 'Ru',
    role: 'Legal Advisor',
    accent: '#34D399',
    time: '9:43 AM',
    text: 'Ensuring every step is secure.',
  },
];

const PHRASES = [
  "Hey, I'm interested!",
  "How does this work?",
  "Let's work together",
  "What can you build for us?",
  "Ready to automate 🚀",
];

const MEMBER_COLORS  = ['#FF6B2B', '#64B4FF', '#34D399'];
const MEMBER_INITIALS = ['R', 'P', 'Ru'];

function TypingIndicator({ msg }) {
  return (
    <div style={{ display: 'flex', gap: 9, alignItems: 'flex-end', animation: 'chatIn 0.3s ease both' }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
        background: `${msg.accent}1a`, border: `1.5px solid ${msg.accent}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: msg.initial.length > 1 ? 10 : 13, fontWeight: 800, color: msg.accent,
      }}>
        {msg.initial}
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 4,
        padding: '8px 12px',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14, borderBottomLeftRadius: 3,
      }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            width: 5, height: 5, borderRadius: '50%',
            background: msg.accent, opacity: 0.65,
            animation: `chatDot 1.1s ease-in-out ${i * 0.16}s infinite`,
          }} />
        ))}
      </div>
    </div>
  );
}

function MessageRow({ msg }) {
  return (
    <div style={{ display: 'flex', gap: 9, alignItems: 'flex-start', animation: 'chatIn 0.35s ease both' }}>
      <div style={{
        width: 30, height: 30, borderRadius: '50%', flexShrink: 0, marginTop: 20,
        background: `${msg.accent}1a`, border: `1.5px solid ${msg.accent}44`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: msg.initial.length > 1 ? 10 : 13, fontWeight: 800, color: msg.accent,
      }}>
        {msg.initial}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 12.5, fontWeight: 700, color: msg.accent }}>
            {msg.name}
            <span style={{ fontWeight: 400, color: 'rgba(148,163,184,0.5)', fontSize: 11 }}> · {msg.role}</span>
          </span>
          <span style={{ fontSize: 9.5, color: 'rgba(148,163,184,0.3)', flexShrink: 0, marginLeft: 8 }}>{msg.time}</span>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.055)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 14, borderTopLeftRadius: 3,
          padding: '9px 12px',
          fontSize: 13.5, color: 'rgba(226,232,240,0.88)', lineHeight: 1.5,
        }}>
          {msg.text}
        </div>
        <div style={{ fontSize: 9, color: 'rgba(148,163,184,0.25)', marginTop: 3, paddingLeft: 1 }}>Delivered</div>
      </div>
    </div>
  );
}

export default function TradingCards() {
  // Each slot: { id, kind: 'system'|'typing'|'message', member? }
  const [slots, setSlots] = useState([{ id: 'system', kind: 'system' }]);
  const [triggered, setTriggered] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const [inputText, setInputText] = useState('');
  const sectionRef  = useRef(null);
  const scrollRef   = useRef(null);

  // Scroll to bottom whenever slots change
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [slots]);

  // Trigger on scroll into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) setTriggered(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [triggered]);

  // Message reveal sequence
  useEffect(() => {
    if (!triggered) return;
    const timers = [];
    MESSAGES.forEach((msg, i) => {
      const base = i * 2600;
      timers.push(setTimeout(() => {
        setSlots(prev => [...prev, { id: `typing-${i}`, kind: 'typing', member: msg }]);
      }, base));
      timers.push(setTimeout(() => {
        setSlots(prev => [
          ...prev.filter(s => s.id !== `typing-${i}`),
          { id: `msg-${i}`, kind: 'message', member: msg },
        ]);
      }, base + 1550));
    });
    // Fire allDone 400ms after the last message lands
    const lastMessageAt = (MESSAGES.length - 1) * 2600 + 1550;
    timers.push(setTimeout(() => setAllDone(true), lastMessageAt + 400));
    return () => timers.forEach(clearTimeout);
  }, [triggered]);

  // Typewriter loop — only starts after all messages have landed
  useEffect(() => {
    if (!allDone) return;
    let phraseIdx = 0, charIdx = 0, deleting = false, timer;
    const tick = () => {
      const phrase = PHRASES[phraseIdx];
      if (!deleting) {
        charIdx++;
        setInputText(phrase.slice(0, charIdx));
        if (charIdx === phrase.length) { deleting = true; timer = setTimeout(tick, 2000); }
        else timer = setTimeout(tick, 65);
      } else {
        charIdx--;
        setInputText(phrase.slice(0, charIdx));
        if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % PHRASES.length; timer = setTimeout(tick, 450); }
        else timer = setTimeout(tick, 30);
      }
    };
    timer = setTimeout(tick, 1000);
    return () => clearTimeout(timer);
  }, [allDone]);

  const inputActive = inputText.length > 0;

  return (
    <>
      <style>{`
        @keyframes chatDot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        @keyframes chatIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; } 50% { opacity: 0; }
        }
        .chat-scroll::-webkit-scrollbar { display: none; }
      `}</style>

      <div ref={sectionRef} style={{ padding: '0 16px', maxWidth: 520, margin: '0 auto' }}>
        <div style={{
          background: '#0c1420',
          border: '1px solid rgba(255,255,255,0.07)',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
        }}>

          {/* Header */}
          <div style={{
            background: 'rgba(255,255,255,0.035)',
            borderBottom: '1px solid rgba(255,255,255,0.065)',
            padding: '12px 16px',
            display: 'flex', alignItems: 'center', gap: 11,
          }}>
            {/* Stacked avatars */}
            <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {MEMBER_COLORS.map((c, i) => (
                <div key={i} style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: `${c}22`, border: `2.5px solid #0c1420`,
                  marginLeft: i === 0 ? 0 : -10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: MEMBER_INITIALS[i].length > 1 ? 9 : 11,
                  fontWeight: 800, color: c,
                  zIndex: MEMBER_COLORS.length - i, position: 'relative',
                }}>
                  {MEMBER_INITIALS[i]}
                </div>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Sociovate Team</div>
              <div style={{ fontSize: 10.5, color: 'rgba(148,163,184,0.5)', display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#34d399', boxShadow: '0 0 6px #34d39977', flexShrink: 0 }} />
                3 members · Active now
              </div>
            </div>
          </div>

          {/* Fixed-height scrollable messages area */}
          <div
            ref={scrollRef}
            className="chat-scroll"
            style={{
              height: 300,
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              padding: '14px 14px',
              display: 'flex',
              flexDirection: 'column',
              gap: 14,
              justifyContent: 'flex-end',
            }}
          >
            {/* Spacer to push content down on first load */}
            <div style={{ flex: 1, minHeight: 0 }} />

            {slots.map(slot => {
              if (slot.kind === 'system') return (
                <div key="system" style={{
                  textAlign: 'center', fontSize: 11,
                  color: 'rgba(148,163,184,0.35)', padding: '4px 0',
                  animation: 'chatIn 0.3s ease both',
                }}>
                  You joined the group chat
                </div>
              );
              if (slot.kind === 'typing')  return <TypingIndicator key={slot.id} msg={slot.member} />;
              if (slot.kind === 'message') return <MessageRow      key={slot.id} msg={slot.member} />;
              return null;
            })}
          </div>

          {/* Input bar */}
          <div style={{
            borderTop: '1px solid rgba(255,255,255,0.055)',
            padding: '10px 12px',
            display: 'flex', alignItems: 'center', gap: 9,
            background: 'rgba(0,0,0,0.12)',
          }}>
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 22, padding: '9px 15px',
              fontSize: 13.5,
              color: inputActive ? 'rgba(226,232,240,0.85)' : 'rgba(148,163,184,0.28)',
              userSelect: 'none', pointerEvents: 'none',
              minHeight: 38, display: 'flex', alignItems: 'center',
            }}>
              {inputActive ? inputText : 'Message Sociovate Team...'}
              {inputActive && (
                <span style={{
                  display: 'inline-block', width: 1.5, height: 14,
                  background: '#FF6B2B', marginLeft: 2, verticalAlign: 'middle',
                  animation: 'cursorBlink 0.85s step-end infinite',
                }} />
              )}
            </div>
            <div style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: inputActive ? 'linear-gradient(135deg, #FF6B2B, #FF8C42)' : 'rgba(255,255,255,0.07)',
              border: inputActive ? 'none' : '1px solid rgba(255,255,255,0.1)',
              boxShadow: inputActive ? '0 0 18px rgba(255,107,43,0.5)' : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.3s ease',
            }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke={inputActive ? 'white' : 'rgba(148,163,184,0.35)'} strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke={inputActive ? 'white' : 'rgba(148,163,184,0.35)'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
