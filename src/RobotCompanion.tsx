import { useEffect, useRef, useState } from 'react';
import { motion, type MotionValue, useReducedMotion } from 'framer-motion';

// Match the illustration's cover crop so the puppet stays attached to its arm
// at every viewport size, including the separately framed mobile landscape.
export function RobotCompanion({ y }: { y: MotionValue<number> | number }) {
  const container = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState({ width: 1536, height: 1024, left: 0, top: 0 });
  const reduced = useReducedMotion();
  useEffect(() => {
    const scene = container.current?.parentElement;
    if (!scene) return;
    const fit = () => {
      const { width, height } = scene.getBoundingClientRect();
      const scale = Math.max(width / 1536, height / 1024);
      const mobile = window.matchMedia('(max-width: 640px)').matches;
      setFrame({ width: 1536 * scale, height: 1024 * scale,
        left: (width - 1536 * scale) * (mobile ? .88 : .5),
        top: (height - 1024 * scale) * (mobile ? .5 : .57) });
    };
    const observer = new ResizeObserver(fit);
    observer.observe(scene);
    fit();
    return () => observer.disconnect();
  }, []);
  if (reduced) return <div ref={container} className="robot-companion" />;
  return <motion.div ref={container} className="robot-companion" style={{ y }} aria-hidden="true">
    <svg viewBox="0 0 1536 1024" style={frame} className="robot-art">
      <defs>
        <radialGradient id="robot-feather">
          <stop offset="78%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </radialGradient>
        <mask id="robot-head-mask">
          <ellipse cx="1281" cy="603" rx="61" ry="49" fill="url(#robot-feather)" />
        </mask>
      </defs>
      <g className="robot-nod">
        <image href="./assets/valley.webp" width="1536" height="1024" mask="url(#robot-head-mask)" />
        <ellipse className="robot-eye-glow" cx="1259" cy="600" rx="7" ry="11" fill="#70e7ff" />
        <ellipse className="robot-blink" cx="1259" cy="600" rx="10" ry="15" fill="#173643" />
      </g>
    </svg>
  </motion.div>;
}
