import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [follower, setFollower] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const posRef = useRef({ x: -100, y: -100 });
  const followRef = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('[data-cursor-action], button, a, [role="button"], input, select');
      if (interactive) {
        setIsHovered(true);
        const actionText = interactive.getAttribute('data-cursor-action');
        setCursorText(actionText || null);
      } else {
        setIsHovered(false);
        setCursorText(null);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Smooth follower interpolation loop
    const animate = () => {
      followRef.current.x += (posRef.current.x - followRef.current.x) * 0.16;
      followRef.current.y += (posRef.current.y - followRef.current.y) * 0.16;
      setFollower({ x: followRef.current.x, y: followRef.current.y });
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Precision inner core point */}
      <div
        className="fixed pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className={`rounded-full bg-cyan-300 shadow-[0_0_8px_#00f0ff] transition-all duration-200 ${
          isHovered ? 'w-2 h-2 opacity-90' : 'w-1.5 h-1.5 opacity-100'
        }`} />
      </div>

      {/* Trailing luminous scanner ring with magnetic label */}
      <div
        className="fixed pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 will-change-transform flex items-center justify-center transition-all duration-300"
        style={{
          left: `${follower.x}px`,
          top: `${follower.y}px`,
          width: isHovered ? (cursorText ? '80px' : '48px') : '32px',
          height: isHovered ? (cursorText ? '80px' : '48px') : '32px',
        }}
      >
        <div
          className={`w-full h-full rounded-full border border-cyan-400/60 transition-all duration-300 flex items-center justify-center ${
            isHovered
              ? 'bg-cyan-500/10 border-cyan-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] backdrop-blur-[1px] scale-105'
              : 'border-cyan-500/30'
          }`}
        >
          {cursorText && (
            <span className="font-vazir text-[10px] tracking-wider text-emerald-200 font-bold px-1 text-center select-none whitespace-nowrap">
              {cursorText}
            </span>
          )}
        </div>
      </div>
    </>
  );
};
