'use client';

import { useRef, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

// Object names in the scene that should trigger the terminal
const CLICK_TARGETS = ['Text', 'screen', 'body', 'computer', 'Screen code'];

export default function SplineRoom({ onComputerClick, onSceneLoad }) {
  const containerRef = useRef(null);

  // Intercept wheel events in capture phase so they never reach Spline's canvas,
  // but don't preventDefault so the browser still scrolls the page normally.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e) => { e.stopPropagation(); };
    el.addEventListener('wheel', onWheel, { capture: true });
    return () => el.removeEventListener('wheel', onWheel, { capture: true });
  }, []);

  function handleLoad(spline) {
    const orbit = spline?.controls?.orbitControls;
    if (orbit) {
      orbit.enableZoom = false;
      orbit.enableRotate = false;
      orbit.enablePan = false;
    }
    onSceneLoad?.();
  }

  function handleMouseDown(e) {
    const name = e?.target?.name ?? '';
    // Log in dev to help identify object names
    if (process.env.NODE_ENV === 'development') {
      console.log('[SplineRoom] clicked:', name);
    }
    const lower = name.toLowerCase();
    if (
      CLICK_TARGETS.includes(name) ||
      lower.includes('screen') ||
      lower.includes('monitor') ||
      lower.includes('computer') ||
      lower.includes('rectangle 6') ||
      lower.includes('rectangle 61')
    ) {
      onComputerClick?.();
    }
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%' }}>
      <Spline
        scene="https://prod.spline.design/O8AEuAkG6KGKp0p4/scene.splinecode"
        onSplineMouseDown={handleMouseDown}
        onLoad={handleLoad}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
