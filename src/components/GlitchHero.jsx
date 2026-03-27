'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useSiteTheme } from '@/components/ThemeProvider';

const BOOT_LINES = [
  { id: 'boot', text: '> SYSTEM BOOT...' },
  { id: 'loading', isProgress: true },
  { id: 'kernel', text: '> KERNEL v3.2.1 INITIALIZED' },
  { id: 'user', text: '> USER    : Ryan Spreier' },
  { id: 'role', text: '> ROLE    : Full Stack Developer' },
  { id: 'status', text: '> STATUS  : Software Developer at ISL' },
];

// Delay (ms) before each line appears
const LINE_DELAYS = [0, 400, 1350, 1800, 2250, 2700];

function ProgressBar({ progress }) {
  const total = 20;
  const filled = Math.round((progress / 100) * total);
  return (
    <span>
      {'> LOADING '}
      <span style={{ letterSpacing: '1px' }}>
        {'['}{'█'.repeat(filled)}{'░'.repeat(total - filled)}{']'}
      </span>
      {' '}{progress}%
    </span>
  );
}

export default function GlitchHero({ onBack }) {
  const { theme } = useSiteTheme();
  const [visibleLines, setVisibleLines] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showCursor, setShowCursor] = useState(false);
  const [showCTAs, setShowCTAs] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timers = LINE_DELAYS.map((delay, i) =>
      setTimeout(() => setVisibleLines(i + 1), delay)
    );

    // Animate progress bar shortly after LOADING line appears
    let progressInterval;
    const progressStartTimer = setTimeout(() => {
      let p = 0;
      progressInterval = setInterval(() => {
        p = Math.min(p + 5, 100);
        setProgress(p);
        if (p >= 100) clearInterval(progressInterval);
      }, 42); // fills in ~840ms
    }, 460);

    const cursorTimer = setTimeout(() => setShowCursor(true), 3200);
    const ctaTimer = setTimeout(() => setShowCTAs(true), 3700);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(progressStartTimer);
      clearTimeout(cursorTimer);
      clearTimeout(ctaTimer);
      clearInterval(progressInterval);
    };
  }, []);

  // Mouse move → chromatic aberration via CSS custom property
  const handleMouseMove = useCallback((e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    el.style.setProperty('--mx', dx.toFixed(3));
  }, []);

  const isRetro = theme === 'retro';
  const textColor = isRetro ? '#9cff8b' : '#b794f4';
  const dimColor = isRetro ? 'rgba(156,255,139,0.55)' : 'rgba(183,148,244,0.55)';

  return (
    <div
      className={`relative flex min-h-screen items-center justify-center overflow-hidden${isRetro ? ' terminal-retro-glow' : ''}`}
      style={{ background: '#0a0a12' }}
      onMouseMove={handleMouseMove}
    >
      {/* Scanline overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            'repeating-linear-gradient(to bottom, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 2px, transparent 4px)',
          opacity: isRetro ? 0.85 : 0.38,
        }}
      />

      <div
        ref={containerRef}
        className="relative z-20 w-full max-w-2xl px-8 text-center"
        style={{ '--mx': '0' }}
      >
        {/* Terminal output */}
        <div
          className="font-mono select-none text-left"
          style={{
            fontSize: 'clamp(0.875rem, 1.8vw, 1.05rem)',
            lineHeight: '2',
            color: textColor,
          }}
        >
          {BOOT_LINES.slice(0, visibleLines).map((line) => (
            <div key={line.id} className="glitch-chromatic">
              {line.isProgress ? (
                <ProgressBar progress={progress} />
              ) : (
                line.text
              )}
            </div>
          ))}

          {showCursor && (
            <div>
              <span className="typewriter-cursor" style={{ color: textColor }}>
                _
              </span>
            </div>
          )}
        </div>

        {/* CTAs */}
        <AnimatePresence>
          {showCTAs && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mt-10 flex flex-wrap justify-center gap-4 font-mono"
            >
              <Link
                href="/projects"
                className="terminal-cta-btn"
                style={{ color: textColor, borderColor: textColor }}
              >
                [ View Projects ]
              </Link>
              <Link
                href="/contact"
                className="terminal-cta-btn"
                style={{ color: dimColor, borderColor: dimColor }}
              >
                [ Contact Me ]
              </Link>
              {onBack && (
                <button
                  onClick={onBack}
                  className="terminal-cta-btn"
                  style={{ color: dimColor, borderColor: dimColor }}
                >
                  [ ← Back ]
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
