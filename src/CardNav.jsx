import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import {
  HomeIcon,
  Cog8ToothIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  UsersIcon,
  Squares2X2Icon,
  ArrowUpRightIcon
} from '@heroicons/react/24/outline';
import './CardNav.css';

const CardNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef(null);
  const cardsRef = useRef([]);
  const tlRef = useRef(null);

  const navItems = [
    {
      label: "Read",
      bgColor: "#0b0f19",
      textColor: "#fff",
      links: [
        { label: "Home", icon: HomeIcon, href: "#home" },
        { label: "Services", icon: Cog8ToothIcon, href: "#services" },
        { label: "Case Studies", icon: DocumentTextIcon, href: "#cases" }
      ]
    },
    {
      label: "Talk", 
      bgColor: "#0D1117",
      textColor: "#fff",
      links: [
        { label: "Pricing", icon: CurrencyDollarIcon, href: "#pricing" },
        { label: "Team", icon: UsersIcon, href: "#team" },
        { label: "Socials", icon: Squares2X2Icon, href: "#socials" }
      ]
    },
    {
      label: "Get Started",
      bgColor: "linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)",
      textColor: "#fff",
      links: [
        { label: "Book Discovery Call", icon: ArrowUpRightIcon, href: "#book", isHighlight: true }
      ]
    }
  ];

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 280;

    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) {
      const contentEl = navEl.querySelector('.card-nav-content');
      if (contentEl) {
        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;
        return topBar + contentHeight + padding;
      }
    }
    return 280;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    gsap.set(navEl, { height: 60, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease: 'power3.out'
    });

    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08 },
      '-=0.1'
    );

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navItems]);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsMenuOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsMenuOpen(false);
      tl.eventCallback('onReverseComplete', () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const setCardRef = i => el => {
    if (el) cardsRef.current[i] = el;
  };

  const handleLinkClick = () => {
    if (isExpanded) {
      toggleMenu();
    }
  };

  return (
    <nav
      ref={navRef}
      className={`card-nav ${isExpanded ? 'open' : ''}`}
    >
      <div className="card-nav-top">
        <div
          className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          role="button"
          aria-label={isExpanded ? 'Close menu' : 'Open menu'}
          aria-expanded={isExpanded}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMenu();
            }
          }}
        >
          <div className="hamburger-line" />
          <div className="hamburger-line" />
        </div>

        <div className="logo-container">
          <div className="logo-tile">S</div>
          <div className="logo-text">Sociovate</div>
        </div>

        <a
          href="#book"
          className="card-nav-cta-button"
        >
          Book Discovery Call
        </a>
      </div>

      <div className="card-nav-content" aria-hidden={!isExpanded}>
        {navItems.map((item, idx) => (
          <div
            key={`${item.label}-${idx}`}
            className="nav-card"
            ref={setCardRef(idx)}
            style={{
              background: item.bgColor,
              color: item.textColor
            }}
          >
            <div className="nav-card-label">{item.label}</div>
            <div className="nav-card-links">
              {item.links?.map((link, i) => {
                const Icon = link.icon;
                return (
                  <a
                    key={`${link.label}-${i}`}
                    className={`nav-card-link ${link.isHighlight ? 'highlight' : ''}`}
                    href={link.href}
                    onClick={handleLinkClick}
                  >
                    <Icon className="nav-card-link-icon" aria-hidden="true" />
                    {link.label}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default CardNav;
