import { useEffect, useRef } from 'react';
import './GlassCursor.css';

const GlassCursor = () => {
  const cursorRef = useRef(null);
  const cursorGlowRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorGlow = cursorGlowRef.current;

    const moveCursor = (e) => {
      const { clientX: x, clientY: y } = e;
      
      if (cursor) {
        cursor.style.transform = `translate(${x}px, ${y}px)`;
      }
      if (cursorGlow) {
        cursorGlow.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const handleMouseEnter = () => {
      cursor?.classList.add('cursor-active');
      cursorGlow?.classList.add('cursor-glow-active');
    };

    const handleMouseLeave = () => {
      cursor?.classList.remove('cursor-active');
      cursorGlow?.classList.remove('cursor-glow-active');
    };

    const handleLinkHover = () => {
      cursor?.classList.add('cursor-hover');
      cursorGlow?.classList.add('cursor-glow-hover');
    };

    const handleLinkLeave = () => {
      cursor?.classList.remove('cursor-hover');
      cursorGlow?.classList.remove('cursor-glow-hover');
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="glass-cursor"></div>
    </>
  );
};

export default GlassCursor;
