// ScrollTimeline.jsx — Scroll-driven vertical timeline replacing card stacks
import React, { useState, useEffect, useRef } from 'react';

export default function ScrollTimeline({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef([]);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Activate whichever step top is closest to 38% down viewport
      const target = window.innerHeight * 0.38;
      let best = 0;
      let bestDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const dist = Math.abs(rect.top - target);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      setActiveIndex(best);
    };

    handleScroll(); // run once on mount
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fillPct = items.length > 1
    ? (activeIndex / (items.length - 1)) * 100
    : 0;

  return (
    <div ref={sectionRef} className="relative max-w-2xl mx-auto md:max-w-3xl">

      {/* Vertical progress line */}
      <div
        className="absolute rounded-full"
        style={{
          left: 7, top: 10, bottom: 10, width: 2,
          background: 'rgba(255,255,255,0.07)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: `${fillPct}%`,
            borderRadius: '999px',
            background: 'linear-gradient(180deg, #FF6B2B 0%, #FF8C42 100%)',
            boxShadow: '0 0 12px rgba(255,107,43,0.7), 0 0 28px rgba(255,107,43,0.3)',
            transition: 'height 0.55s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>

      {/* Steps */}
      {items.map((item, i) => {
        const isActive = i === activeIndex;
        const isPast   = i < activeIndex;

        return (
          <div
            key={i}
            ref={el => stepRefs.current[i] = el}
            className="flex gap-5 md:gap-8 pb-10 last:pb-0"
          >
            {/* Dot column */}
            <div className="flex-shrink-0 flex flex-col items-center" style={{ width: 16 }}>
              <div
                style={{
                  width:      isActive ? 16 : 10,
                  height:     isActive ? 16 : 10,
                  marginTop:  isActive ? 2  : 5,
                  marginLeft: isActive ? 0  : 3,
                  borderRadius: '50%',
                  background: isActive
                    ? '#FF6B2B'
                    : isPast
                      ? 'rgba(255,107,43,0.45)'
                      : 'rgba(255,255,255,0.15)',
                  border: `2px solid ${isActive ? '#FF8C42' : 'transparent'}`,
                  boxShadow: isActive
                    ? '0 0 0 5px rgba(255,107,43,0.15), 0 0 18px rgba(255,107,43,0.6)'
                    : 'none',
                  transition: 'all 0.45s cubic-bezier(0.34,1.56,0.64,1)',
                  position: 'relative',
                  zIndex: 2,
                }}
              />
            </div>

            {/* Content */}
            <div
              className="flex-1 min-w-0"
              style={{
                opacity: isActive ? 1 : isPast ? 0.5 : 0.32,
                transition: 'opacity 0.45s ease',
              }}
            >
              {/* Active card background on desktop */}
              <div
                className="rounded-xl transition-all duration-500"
                style={{
                  background: isActive
                    ? 'linear-gradient(135deg, rgba(255,107,43,0.06) 0%, rgba(255,140,66,0.03) 100%)'
                    : 'transparent',
                  border: isActive ? '1px solid rgba(255,107,43,0.18)' : '1px solid transparent',
                  padding: isActive ? '16px 18px' : '0 0 0 2px',
                  transition: 'all 0.5s ease',
                }}
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-3 mb-1.5">
                  <span
                    style={{
                      color: isActive ? '#FF6B2B' : 'rgba(255,255,255,0.28)',
                      transition: 'color 0.4s',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  <h3
                    className="font-bold leading-snug"
                    style={{
                      fontSize: isActive ? '1.05rem' : '0.97rem',
                      color: isActive ? '#fff' : 'rgba(255,255,255,0.5)',
                      transition: 'all 0.4s ease',
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {/* Expandable body */}
                <div
                  style={{
                    maxHeight: isActive ? '500px' : '1.4rem',
                    overflow: 'hidden',
                    transition: 'max-height 0.55s cubic-bezier(0.4,0,0.2,1)',
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.875rem',
                      lineHeight: 1.65,
                      margin: '4px 0 0',
                      color: isActive ? 'rgb(148,163,184)' : 'rgba(148,163,184,0.38)',
                      transition: 'color 0.4s',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: isActive ? 'unset' : 1,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.desc}
                  </p>

                  {/* Tags — active only */}
                  {item.tags && (
                    <div
                      className="flex flex-wrap gap-2"
                      style={{
                        marginTop: 12,
                        opacity: isActive ? 1 : 0,
                        transition: 'opacity 0.35s ease 0.15s',
                      }}
                    >
                      {item.tags.map(tag => (
                        <span
                          key={tag}
                          className="font-medium"
                          style={{
                            padding: '2px 10px',
                            borderRadius: 6,
                            fontSize: '11px',
                            background: 'rgba(255,107,43,0.09)',
                            border: '1px solid rgba(255,107,43,0.22)',
                            color: '#FF8C42',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
