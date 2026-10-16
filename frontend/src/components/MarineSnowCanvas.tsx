import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  alpha: number;
  speedY: number;
  speedX: number;
  pulseSpeed: number;
  isBioluminescent: boolean;
}

export const MarineSnowCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Generate particles
    const particleCount = Math.min(140, Math.floor((width * height) / 12000));
    let particles: Particle[] = [];

    const biolumeColors = [
      'rgba(0, 240, 255, ',   // Cyan
      'rgba(16, 255, 160, ',  // Neon Green
      'rgba(168, 85, 247, ',  // Biolume Violet
      'rgba(255, 255, 255, '   // Marine Snow
    ];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const isBioluminescent = Math.random() < 0.28;
        const colorBase = isBioluminescent
          ? biolumeColors[Math.floor(Math.random() * (biolumeColors.length - 1))]
          : biolumeColors[3];

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: isBioluminescent ? Math.random() * 2.2 + 1.2 : Math.random() * 1.6 + 0.6,
          color: colorBase,
          alpha: Math.random() * 0.6 + 0.2,
          speedY: Math.random() * 0.45 + 0.15,
          speedX: (Math.random() - 0.5) * 0.25,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          isBioluminescent
        });
      }
    };

    initParticles();

    let step = 0;
    const render = () => {
      step += 0.01;
      ctx.clearRect(0, 0, width, height);

      // Deep water column gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, height);
      gradient.addColorStop(0, 'rgba(4, 11, 20, 0.4)');
      gradient.addColorStop(1, 'rgba(2, 4, 8, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw & update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speedY;
        p.x += p.speedX + Math.sin(step + i) * 0.15;

        // Wrap around screen
        if (p.y > height + 10) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Subtle repulsion from mouse
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.5;
          p.y += (dy / dist) * force * 1.5;
        }

        // Pulse alpha
        const currentAlpha = p.alpha + Math.sin(step * 3 + i) * 0.15;
        const clampedAlpha = Math.max(0.08, Math.min(0.9, currentAlpha));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isBioluminescent) {
          ctx.shadowBlur = p.radius * 6;
          ctx.shadowColor = p.color + '0.9)';
          ctx.fillStyle = p.color + clampedAlpha + ')';
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = p.color + (clampedAlpha * 0.6) + ')';
        }

        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
