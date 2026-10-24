import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DynamicIcon, { Sparkles, Loader2 } from '../ui/DynamicIcon';
import { categories } from '../../data/categories';

const WebGLHero = lazy(() => import('./WebGLHero'));

const categoryPositions = [
  { x: 0, y: -140, z: 30, delay: 0 },
  { x: 130, y: -60, z: 20, delay: 0.8 },
  { x: 130, y: 70, z: 25, delay: 1.6 },
  { x: 0, y: 140, z: 15, delay: 2.4 },
  { x: -130, y: 70, z: 20, delay: 0.4 },
  { x: -130, y: -60, z: 25, delay: 1.2 },
];

export default function Hero3DScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isReduced, setIsReduced] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [mode, setMode] = useState<'css' | 'webgl'>('css');

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsReduced(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isReduced || mode !== 'css') return;
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      setMousePos({
        x: ((e.clientX - cx) / rect.width) * 15,
        y: ((e.clientY - cy) / rect.height) * 15,
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isReduced, mode]);

  return (
    <div className="relative w-full max-w-[480px] mx-auto">
      {/* Mode switcher badge */}
      <div className="flex items-center justify-end mb-3">
        <div className="inline-flex items-center gap-1 p-1 bg-white/80 backdrop-blur-sm border border-brand-100 rounded-full shadow-sm text-xs">
          <button
            type="button"
            onClick={() => setMode('css')}
            className={`px-3 py-1 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              mode === 'css'
                ? 'bg-brand-700 text-white shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Interactive CSS
          </button>
          <button
            type="button"
            onClick={() => setMode('webgl')}
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full font-medium transition-all duration-200 cursor-pointer ${
              mode === 'webgl'
                ? 'bg-brand-700 text-white shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <Sparkles size={11} />
            WebGL 3D
          </button>
        </div>
      </div>

      {mode === 'webgl' ? (
        <div className="relative w-full aspect-square rounded-3xl bg-radial from-brand-50/60 to-transparent p-2">
          <Suspense
            fallback={
              <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                <Loader2 className="animate-spin text-brand-700" size={32} />
                <span className="text-xs text-text-muted">Initializing 3D Canvas...</span>
              </div>
            }
          >
            <WebGLHero onCategoryClick={(slug) => navigate(`/categories/${slug}`)} />
          </Suspense>
          <p className="text-[11px] text-center text-text-muted mt-2">
            Tip: Move cursor to tilt camera · Click any 3D card to navigate
          </p>
        </div>
      ) : (
        <div
          ref={containerRef}
          className="relative w-full max-w-[440px] aspect-square mx-auto"
          style={{ perspective: '900px' }}
          aria-hidden="true"
        >
          {/* Central Hub */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{
              transform: isReduced
                ? 'none'
                : `rotateY(${mousePos.x * 0.5}deg) rotateX(${-mousePos.y * 0.5}deg)`,
              transition: 'transform 0.3s ease-out',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Glow ring */}
            <div className="absolute w-28 h-28 rounded-full bg-brand-200/30 blur-xl" />
            
            {/* Hub sphere */}
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 shadow-xl flex items-center justify-center z-10">
              <span className="text-white text-lg font-extrabold tracking-tighter">
                360°
              </span>
              {/* Inner shine */}
              <div className="absolute top-1.5 left-3 w-6 h-3 rounded-full bg-white/25 blur-[2px]" />
            </div>

            {/* Connection lines */}
            {categoryPositions.map((pos, idx) => (
              <svg
                key={`line-${idx}`}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ zIndex: 1 }}
              >
                <line
                  x1="50%"
                  y1="50%"
                  x2={`calc(50% + ${pos.x}px)`}
                  y2={`calc(50% + ${pos.y}px)`}
                  stroke="url(#lineGrad)"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                  opacity={hoveredIdx === idx ? 0.6 : 0.2}
                  className="transition-opacity duration-300"
                />
                <defs>
                  <linearGradient id="lineGrad">
                    <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#14B8A6" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            ))}

            {/* Category Nodes */}
            {categories.map((cat, idx) => {
              const pos = categoryPositions[idx];
              const isHovered = hoveredIdx === idx;
              return (
                <Link
                  key={cat.id}
                  to={`/categories/${cat.slug}`}
                  className="absolute group focus:outline-none"
                  style={{
                    left: `calc(50% + ${pos.x}px)`,
                    top: `calc(50% + ${pos.y}px)`,
                    transform: `translate(-50%, -50%) translateZ(${pos.z}px) ${
                      isHovered ? 'scale(1.12)' : 'scale(1)'
                    }`,
                    zIndex: isHovered ? 20 : 5,
                    transition: 'transform 0.3s var(--ease-spring)',
                    animation: isReduced
                      ? 'none'
                      : `float ${6 + idx}s ease-in-out ${pos.delay}s infinite`,
                  }}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  onFocus={() => setHoveredIdx(idx)}
                  onBlur={() => setHoveredIdx(null)}
                  aria-label={`${cat.name}: ${cat.description}`}
                >
                  {/* Card */}
                  <div
                    className={`
                      relative flex flex-col items-center gap-1.5 px-4 py-3 rounded-2xl
                      bg-white/90 backdrop-blur-sm border border-white/60
                      shadow-card transition-all duration-300
                      group-hover:shadow-card-hover group-focus-visible:shadow-card-hover
                      group-focus-visible:ring-2 group-focus-visible:ring-brand-500 group-focus-visible:ring-offset-2
                    `}
                  >
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300"
                      style={{
                        backgroundColor: isHovered ? cat.color : cat.colorLight,
                      }}
                    >
                      <DynamicIcon
                        name={cat.icon}
                        size={20}
                        style={{ color: isHovered ? '#fff' : cat.color }}
                        className="transition-colors duration-300"
                      />
                    </div>
                    {/* Label */}
                    <span className="text-xs font-semibold text-text-primary whitespace-nowrap">
                      {cat.shortName}
                    </span>
                  </div>

                  {/* Tooltip on hover */}
                  <div
                    className={`
                      absolute left-1/2 -translate-x-1/2 top-full mt-2
                      px-3 py-2 rounded-lg bg-gray-900 text-white text-xs
                      whitespace-nowrap shadow-lg pointer-events-none
                      transition-all duration-200
                      ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'}
                    `}
                  >
                    {cat.name}
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
