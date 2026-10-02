import { useState, useEffect, useRef } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// ─── Hooks ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function useCounter(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) { setValue(target); return; }
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setValue(Math.floor(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return value;
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Experience', 'Case Studies', 'Toolkit', 'Impact'];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (item: string) => {
    setActive(item);
    setMenuOpen(false);
    const id = item.toLowerCase().replace(' ', '-');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 80,
        background: scrolled ? 'rgba(8,17,31,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #26364A' : '1px solid transparent',
        transition: 'background 350ms ease-out, border-color 350ms ease-out, backdrop-filter 350ms ease-out',
      }}
    >
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a
          href="#hero"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textDecoration: 'none',
          }}
        >
          <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.125rem', color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
            Omkar Shikhare
          </span>
          <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '0.75rem', color: 'var(--slate)', letterSpacing: '0.02em', marginTop: '2px' }}>
            Product Manager
          </span>
        </a>

        <nav style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="hidden-mobile">
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter', fontWeight: 500, fontSize: '0.9rem',
                color: active === link ? 'var(--white)' : 'var(--slate)',
                padding: '0.5rem 0.875rem', borderRadius: 6,
                position: 'relative', transition: 'color 200ms',
              }}
            >
              {link}
              {active === link && (
                <span style={{
                  position: 'absolute', bottom: 0, left: '0.875rem', right: '0.875rem',
                  height: 2, background: 'var(--blue)', borderRadius: 1,
                  animation: 'slideIn 200ms ease-out',
                }} />
              )}
            </button>
          ))}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#contact" className="btn-primary hidden-mobile" style={{ padding: '0.625rem 1.25rem', fontSize: '0.875rem' }}>
            Get in Touch
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="show-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: 'var(--white)', minWidth: 48, minHeight: 48 }}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <path d="M4 4L18 18M18 4L4 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <>
                  <path d="M3 6H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 11H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M3 16H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div style={{
          background: 'rgba(8,17,31,0.97)', backdropFilter: 'blur(16px)',
          padding: '1.5rem', borderBottom: '1px solid var(--border)',
          animation: 'fadeSlide 250ms ease-out',
        }}>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => handleNav(link)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'Inter', fontWeight: 500, fontSize: '1rem',
                color: 'var(--white)', padding: '0.875rem 0',
                borderBottom: '1px solid var(--border)',
                minHeight: 48,
              }}
            >
              {link}
            </button>
          ))}
          <a href="#contact" className="btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}
            onClick={() => setMenuOpen(false)}>
            Get in Touch
          </a>
        </div>
      )}

      <style>{`
        @keyframes slideIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }
        @keyframes fadeSlide { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .show-mobile { display: none !important; } }
      `}</style>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function DashboardVisual() {
  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: 20,
      padding: '1.5rem',
      fontFamily: 'Inter',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: -60, right: -60, width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div>
          <div style={{ fontSize: '0.75rem', color: 'var(--slate)', marginBottom: 2 }}>Portfolio Value</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'Manrope', color: 'var(--white)' }}>₹24,83,650</div>
          <div style={{ fontSize: '0.8rem', color: 'var(--emerald)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 2L10 6H2L6 2Z" fill="currentColor"/></svg>
            +₹1,24,320 (5.27%) today
          </div>
        </div>
        <div style={{
          background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)',
          borderRadius: 8, padding: '0.375rem 0.75rem',
          fontSize: '0.75rem', fontWeight: 600, color: 'var(--emerald)',
        }}>
          Market Open
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 56, marginBottom: '1.25rem' }}>
        {[42,38,55,48,62,45,70,58,65,72,60,68,75,64,80].map((h, i) => (
          <div key={i} style={{
            flex: 1, height: `${h}%`, borderRadius: '3px 3px 0 0',
            background: i >= 11
              ? 'linear-gradient(180deg, var(--emerald), rgba(16,185,129,0.3))'
              : 'linear-gradient(180deg, var(--blue), rgba(59,130,246,0.2))',
            opacity: i < 11 ? 0.5 + i * 0.04 : 1,
          }} />
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
        {[
          { name: 'RELIANCE', qty: '50', val: '₹1,46,200', chg: '+2.4%', up: true },
          { name: 'INFY', qty: '120', val: '₹2,03,880', chg: '+1.8%', up: true },
          { name: 'HDFC Bank', qty: '80', val: '₹1,18,400', chg: '-0.6%', up: false },
          { name: 'TCS', qty: '35', val: '₹1,39,825', chg: '+0.9%', up: true },
        ].map(s => (
          <div key={s.name} style={{
            background: 'var(--surface-2)', borderRadius: 10, padding: '0.75rem',
            border: '1px solid var(--border)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--white)' }}>{s.name}</div>
                <div style={{ fontSize: '0.65rem', color: 'var(--slate)', marginTop: 1 }}>{s.qty} shares</div>
              </div>
              <span style={{ fontSize: '0.7rem', fontWeight: 600, color: s.up ? 'var(--emerald)' : '#F87171' }}>
                {s.chg}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--white)', marginTop: '0.375rem' }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.15), rgba(59,130,246,0.05))',
        border: '1px solid rgba(59,130,246,0.3)', borderRadius: 10, padding: '0.75rem',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontSize: '0.7rem', color: 'var(--slate)', marginBottom: 2 }}>Quick Order</div>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--white)' }}>BUY · NIFTY 50 ETF</div>
          <div style={{ fontSize: 11, color: 'var(--blue-light)' }}>NSE · Delivery · Qty: 100</div>
        </div>
        <div style={{
          background: 'var(--blue)', color: 'white', fontSize: '0.75rem', fontWeight: 700,
          padding: '0.5rem 1rem', borderRadius: 6,
        }}>Buy Now</div>
      </div>
    </div>
  );
}

const PROFILE_TAGS = [
  'Product Strategy', 'FinTech', 'Capital Markets', 'Trading Platforms',
  'HNI Products', 'API Integration', 'UX', 'QA',
];

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 100); return () => clearTimeout(t); }, []);

  const item = (delay: number): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 700ms ease-out ${delay}ms, transform 700ms ease-out ${delay}ms`,
  });

  return (
    <section id="hero" style={{ paddingTop: 120, paddingBottom: '5rem', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
          gap: '4rem',
          alignItems: 'center',
        }} className="hero-grid">
          <div>
            <div style={{ ...item(100), display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 100, padding: '0.4rem 1rem', marginBottom: '1.75rem' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block', animation: 'pulse 2s infinite' }} />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--blue-light)', letterSpacing: '0.02em' }}>
                FinTech & Wealth Management Product Manager
              </span>
            </div>

            <h1 style={{
              ...item(200),
              fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
              fontFamily: 'Manrope',
              fontWeight: 800,
              lineHeight: 1.07,
              letterSpacing: '-0.03em',
              color: 'var(--white)',
              marginBottom: '1.5rem',
            }}>
              Building intuitive,{' '}
              <span className="gradient-text">scalable products</span>
              {' '}for Capital Markets & Wealth Management
            </h1>

            <p style={{
              ...item(320),
              fontSize: '1.125rem',
              color: 'var(--slate)',
              lineHeight: 1.65,
              marginBottom: '1.5rem',
              maxWidth: 540,
            }}>
              Product Manager with 1+ year of experience building trading, broking, demat, onboarding,
              market intelligence, and investment-product experiences for HNI users. I bridge product
              strategy, UX, technology, APIs, and QA to turn complex financial workflows into simple
              digital experiences.
            </p>

            <div style={{ ...item(380), display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {PROFILE_TAGS.map(tag => (
                <span key={tag} className="skill-tag">{tag}</span>
              ))}
            </div>

            <div style={{ ...item(440), display: 'flex', flexWrap: 'wrap', gap: '0.875rem' }}>
              <a href="#case-studies" className="btn-primary">
                View Case Studies <span className="btn-arrow">→</span>
              </a>
              <a href="#experience" className="btn-secondary">
                View Experience
              </a>
              <a href="/Resume/OMKAR_PM_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                Download Resume <span className="btn-arrow">↓</span>
              </a>
            </div>

            <div style={{ ...item(560), display: 'flex', gap: '2rem', marginTop: '2.5rem', flexWrap: 'wrap' }}>
              {[
                { val: '6+', label: 'Product Domains' },
                { val: '360 One', label: 'WAM' },
                { val: '1yr 10mo', label: 'Experience' },
              ].map(s => (
                <div key={s.label}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Manrope', color: 'var(--white)' }}>{s.val}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--slate)', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{
            ...item(300),
            filter: 'drop-shadow(0 32px 64px rgba(59,130,246,0.15))',
          }}>
            <DashboardVisual />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pulse { 0%, 100% { opacity: 1; } }
        }
      `}</style>
    </section>
  );
}

// ─── Impact Snapshot ──────────────────────────────────────────────────────────

function CounterCard({ prefix = '', target, suffix = '', label, color, active }: {
  prefix?: string; target: number; suffix?: string; label: string; color: string; active: boolean;
}) {
  const val = useCounter(target, 1100, active);
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 'clamp(2.25rem, 4vw, 3rem)',
        fontFamily: 'Manrope', fontWeight: 800, color,
        marginBottom: '0.5rem', letterSpacing: '-0.03em',
      }}>
        {prefix}{val}{suffix}
      </div>
      <div style={{ fontSize: '0.9375rem', color: 'var(--slate)', lineHeight: 1.4 }}>{label}</div>
    </div>
  );
}

function ImpactSnapshot() {
  const { ref, inView } = useInView(0.2);
  const metrics = [
    { prefix: '+', target: 42, suffix: '%', label: 'Digital onboarding completion', color: 'var(--emerald)' },
    { prefix: '+', target: 31, suffix: '%', label: 'Trading journey adoption', color: 'var(--blue-light)' },
    { prefix: '+', target: 46, suffix: '%', label: 'Market insights engagement', color: 'var(--cyan)' },
    { prefix: '-', target: 68, suffix: '%', label: 'Manual operational effort', color: 'var(--emerald)' },
  ];

  return (
    <section id="impact" className="section-padding" ref={ref as React.RefObject<HTMLElement>}
      style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(59,130,246,0.04) 50%, transparent 100%)' }}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', textAlign: 'center', marginBottom: '3rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Measurable Impact</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Product outcomes that move the needle
          </h2>
          <p style={{ color: 'var(--slate)', maxWidth: 540, margin: '0 auto', fontSize: '0.9375rem' }}>
            Illustrative metrics from product initiatives across digital onboarding, trading, and market intelligence. Replace with verified numbers before publishing.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }} className="metrics-grid">
          {metrics.map((m, i) => (
            <div key={m.label} style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
              transition: `all 600ms ease-out ${i * 100}ms`,
            }}>
              <CounterCard {...m} active={inView} />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .metrics-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .metrics-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── Impact Charts ─────────────────────────────────────────────────────────────

const barData = [
  { name: 'Digital Onboarding', before: 58, after: 82 },
  { name: 'Manual Processing', before: 100, after: 32 },
  { name: 'Journey Time', before: 100, after: 45 },
];

const hBarData = [
  { name: 'Stock Alerts', value: 52 },
  { name: 'Market Insights', value: 46 },
  { name: 'Stock Fundamentals', value: 38 },
  { name: 'Trading Journey', value: 31 },
];

function ImpactCharts() {
  const { ref, inView } = useInView(0.15);

  return (
    <section className="section-padding" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem' }}>
          <div className="section-label">Data Stories</div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Before & After — Product Impact
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem', alignItems: 'start' }} className="charts-grid">
          <div className="card" style={{ opacity: inView ? 1 : 0, transition: 'all 700ms ease-out 200ms' }}>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.5rem' }}>
              Before vs After Improvement
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate)', marginBottom: '1.5rem' }}>
              Illustrative percentage comparison across key metrics
            </p>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--slate)' }}>
                <span style={{ width: 12, height: 12, background: 'rgba(59,130,246,0.4)', borderRadius: 2, display: 'inline-block' }} /> Before
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', color: 'var(--slate)' }}>
                <span style={{ width: 12, height: 12, background: 'var(--emerald)', borderRadius: 2, display: 'inline-block' }} /> After
              </div>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} barCategoryGap="30%" barGap={4}>
                <CartesianGrid vertical={false} stroke="rgba(38,54,74,0.8)" />
                <XAxis dataKey="name" tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#94A3B8', fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 110]} />
                <Tooltip
                  contentStyle={{ background: '#162236', border: '1px solid #26364A', borderRadius: 8, fontSize: 12 }}
                  labelStyle={{ color: '#F8FAFC', fontWeight: 600 }}
                  itemStyle={{ color: '#94A3B8' }}
                />
                <Bar dataKey="before" fill="rgba(59,130,246,0.35)" radius={[4, 4, 0, 0]} isAnimationActive={inView} animationDuration={800} name="Before" />
                <Bar dataKey="after" fill="#10B981" radius={[4, 4, 0, 0]} isAnimationActive={inView} animationDuration={900} animationBegin={100} name="After" />
              </BarChart>
            </ResponsiveContainer>
            <p style={{ fontSize: '0.75rem', color: 'var(--slate)', marginTop: '1rem', marginBottom: 0 }}>
              Chart summary: Digital onboarding rose from 58% to 82%; manual processing dropped from 100% to 32%; journey time reduced from 100 to 45.
            </p>
          </div>

          <div className="card" style={{ opacity: inView ? 1 : 0, transition: 'all 700ms ease-out 350ms' }}>
            <h3 style={{ fontFamily: 'Manrope', fontWeight: 600, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.5rem' }}>
              Feature Engagement Uplift
            </h3>
            <p style={{ fontSize: '0.8125rem', color: 'var(--slate)', marginBottom: '1.75rem' }}>Post-launch adoption increase (%)</p>
            {hBarData.map((d, i) => (
              <div key={d.name} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--slate)' }}>{d.name}</span>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--white)' }}>{d.value}%</span>
                </div>
                <div style={{ height: 8, background: 'var(--surface-2)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: inView ? `${d.value}%` : '0%',
                    background: i === 0 ? 'var(--emerald)' : i === 1 ? 'var(--blue)' : i === 2 ? 'var(--blue-light)' : 'var(--cyan)',
                    borderRadius: 4,
                    transition: `width 900ms ease-out ${300 + i * 120}ms`,
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .charts-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── About ────────────────────────────────────────────────────────────────────

function About() {
  const { ref, inView } = useInView(0.15);

  return (
    <section id="about" className="section-padding" ref={ref as React.RefObject<HTMLElement>}
      style={{ background: 'rgba(16,28,46,0.4)' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '4rem', alignItems: 'start' }} className="about-grid">
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out' }}>
            <div className="section-label">About Me</div>
            <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              Product thinking backed by technical execution
            </h2>
          </div>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out 150ms' }}>
            <p style={{ fontSize: '1.0625rem', color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              I started my career with a strong foundation in <strong style={{ color: 'var(--white)' }}>QA and software testing</strong>, which evolved into product management through hands-on experience in financial technology.
            </p>
            <p style={{ fontSize: '1.0625rem', color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
              At <strong style={{ color: 'var(--white)' }}>360 One WAM</strong>, I worked across product management and QA, contributing to products used by HNI clients across broking, demat, trading, onboarding, market intelligence, and investment research.
            </p>
            <p style={{ fontSize: '1.0625rem', color: 'var(--slate)', lineHeight: 1.7, marginBottom: '1.75rem' }}>
              My strength lies at the intersection of:
            </p>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center',
              fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.95rem', color: 'var(--white)',
              marginBottom: '1.75rem',
            }}>
              {['Business', 'Product', 'UX', 'Technology', 'Quality'].map((s, i) => (
                <span key={s} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  {i > 0 && <span style={{ color: 'var(--blue)' }}>→</span>}
                  <span style={{
                    background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)',
                    borderRadius: 8, padding: '0.5rem 0.875rem',
                  }}>{s}</span>
                </span>
              ))}
            </div>
            <p style={{ fontSize: '1rem', color: 'var(--slate)', lineHeight: 1.7, margin: 0, fontStyle: 'italic', borderLeft: '4px solid var(--blue)', paddingLeft: '1.25rem' }}>
              I don't just define requirements. I understand the business problem, translate it into product experiences, work with technology and design teams, validate the implementation, and think about the outcome.
            </p>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────

const RESPONSIBILITIES = [
  'Defined product roadmaps for trading platforms targeting HNI users while aligning priorities with business objectives.',
  'Collaborated with CXOs and cross-functional teams across engineering, UI/UX, QA, marketing, and compliance.',
  'Created BRDs, PRDs, user stories, acceptance criteria, and product documentation.',
  'Contributed to a multi-exchange order placement module supporting NSE and BSE — Intraday, Delivery, MTF, AMO, and real-time margin/brokerage visibility.',
  'Contributed to automated digital KYC and HNI onboarding integrating CDSL, NSE, BSE, OMS, and back-office systems.',
  'Designed market insights via CMOTS API integration; delivered stock fundamentals, stock alerts, and account management features.',
  'Performed functional, integration, and regression testing; worked with Omnesys NEST and Greek OMS systems.',
];

function Experience() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="experience" className="section-padding" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3.5rem' }}>
          <div className="section-label">Work History</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Experience
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '4rem', alignItems: 'start' }} className="exp-grid">
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', left: 20, top: 24, bottom: 0, width: 2,
              background: 'var(--border)',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0,
                height: inView ? '100%' : '0%',
                background: 'linear-gradient(180deg, var(--blue), transparent)',
                transition: 'height 1200ms ease-out 300ms',
              }} />
            </div>

            <div style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)',
              transition: 'all 600ms ease-out 400ms',
              paddingLeft: '3rem', position: 'relative',
            }}>
              <div style={{
                position: 'absolute', left: 12, top: 4, width: 18, height: 18,
                borderRadius: '50%', background: 'var(--blue)', border: '3px solid var(--bg)',
                boxShadow: '0 0 12px rgba(59,130,246,0.5)',
              }} />
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                Current
              </div>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.25rem', color: 'var(--white)', marginBottom: 4 }}>
                360 One WAM
              </h3>
              <div style={{ fontSize: '0.9rem', color: 'var(--slate)', marginBottom: 4 }}>Product Manager</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--border-light)', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 100, padding: '0.25rem 0.75rem', display: 'inline-block', marginBottom: '1rem' }}>
                1 Year 10 Months
              </div>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate)', lineHeight: 1.5, margin: 0 }}>
                Wealth Management · Capital Markets · Broking · Demat · Trading · HNI
              </p>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.75rem' }}>
              {['Trading', 'Broking', 'Demat', 'HNI Onboarding', 'Market Intelligence', 'Stock Research', 'Stock Alerts', 'Account Management'].map((d, i) => (
                <span key={d} className="skill-tag" style={{
                  opacity: inView ? 1 : 0, transition: `all 400ms ease-out ${400 + i * 60}ms`,
                  background: 'rgba(59,130,246,0.1)', borderColor: 'rgba(59,130,246,0.25)', color: 'var(--blue-light)',
                }}>
                  {d}
                </span>
              ))}
            </div>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {RESPONSIBILITIES.map((r, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '0.875rem', paddingBottom: '1rem',
                  opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)',
                  transition: `all 500ms ease-out ${500 + i * 80}ms`,
                }}>
                  <span style={{ flexShrink: 0, width: 20, height: 20, borderRadius: '50%', background: 'rgba(59,130,246,0.15)', border: '1px solid rgba(59,130,246,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 2 }}>
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4L3.5 6L6.5 2" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <span style={{ fontSize: '0.9375rem', color: 'var(--slate)', lineHeight: 1.55 }}>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) { .exp-grid { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>
    </section>
  );
}

// ─── Product Areas ────────────────────────────────────────────────────────────

const PRODUCT_AREAS = [
  {
    num: '01', title: 'Trading Platform',
    desc: 'Multi-exchange trading across NSE + BSE — Intraday, Delivery, MTF, AMO, multiple order types, real-time margin and brokerage visibility.',
    impact: ['31% ↑ trading journey adoption', '18% ↓ order-placement drop-offs'],
    color: 'var(--blue)',
  },
  {
    num: '02', title: 'Digital KYC & HNI Onboarding',
    desc: 'Automated onboarding ecosystem: User Journey → Frontend → CDSL → NSE/BSE → OMS → Back Office.',
    impact: ['68% ↓ manual effort', '42% ↑ onboarding completion', '55% ↓ journey time'],
    color: 'var(--emerald)',
  },
  {
    num: '03', title: 'Market Intelligence',
    desc: 'Corporate Actions, IPO, announcements, bulk & block deals, FII/DII movement, stock news & events via CMOTS APIs.',
    impact: ['46% ↑ market-insights engagement'],
    color: 'var(--cyan)',
  },
  {
    num: '04', title: 'Stock Research',
    desc: 'Yearly & quarterly performance, standalone vs consolidated results, and shareholding patterns.',
    impact: ['38% ↑ stock-research feature usage'],
    color: 'var(--blue-light)',
  },
  {
    num: '05', title: 'Stock Alerts',
    desc: 'Price and percentage-based alerts for NSE/BSE cash-segment stocks with push notifications when conditions are met.',
    impact: ['52% ↑ repeat engagement among alert users'],
    color: 'var(--emerald)',
  },
  {
    num: '06', title: 'Account Management',
    desc: 'Broking & demat profiles, account-opening information, and a digital Account Freeze Journey.',
    impact: ['24% ↓ account-related support queries'],
    color: 'var(--blue)',
  },
];

function ProductAreas() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding" ref={ref as React.RefObject<HTMLElement>}
      style={{ background: 'rgba(16,28,46,0.35)' }}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem' }}>
          <div className="section-label">Product Domains</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Areas I've owned end-to-end
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="areas-grid">
          {PRODUCT_AREAS.map((p, i) => (
            <div key={p.title} className="card" style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
              transition: `all 600ms ease-out ${i * 90}ms`,
              borderTop: `2px solid ${p.color}`,
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 800, fontFamily: 'Manrope', color: p.color, marginBottom: '0.75rem', letterSpacing: '0.04em' }}>
                {p.num}
              </div>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.625rem' }}>{p.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate)', lineHeight: 1.55, marginBottom: '1rem' }}>{p.desc}</p>
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '0.875rem' }}>
                {p.impact.map(imp => (
                  <div key={imp} style={{ fontSize: '0.8125rem', color: 'var(--emerald)', fontWeight: 600, marginBottom: 4 }}>{imp}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .areas-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .areas-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

const CASE_STUDIES = [
  {
    id: 1, tag: 'Onboarding', title: 'Digital HNI Onboarding',
    subtitle: 'From manual onboarding to an automated digital journey',
    problem: 'The existing onboarding process involved significant manual intervention, resulting in operational dependency and longer turnaround times.',
    goal: 'Create an end-to-end digital onboarding experience for Demat (Single & Joint Holding), Broking Account, and KYC.',
    myRole: 'Product Management + Requirement Definition + UX Collaboration + QA',
    approach: 'Mapped the manual process → defined requirements & journeys → designed with UI/UX → integrated CDSL/NSE/BSE/OMS/Back Office → validated with QA.',
    solution: 'Fully digital, guided onboarding that hides backend complexity behind a simple customer experience.',
    integrations: 'CDSL → NSE → BSE → OMS → Back Office',
    outcome: '68% ↓ manual intervention · 42% ↑ onboarding completion · 55% ↓ completion time',
    takeaway: "Complex financial onboarding doesn't need to feel complex to the customer. The product challenge was to hide backend complexity behind a simple, guided experience.",
    color: 'var(--blue)',
  },
  {
    id: 2, tag: 'Trading', title: 'Multi-Exchange Order Placement',
    subtitle: 'Making trading more powerful without making it more complicated',
    problem: 'HNI clients needed a seamless trading experience across multiple exchanges and product types.',
    goal: 'Support NSE, BSE, Intraday, Delivery, MTF, multiple order types, AMO, real-time margin, and brokerage visibility.',
    myRole: 'Product definition, trading flow mapping, and cross-functional delivery with Risk, Compliance, and OMS engineering.',
    approach: 'Discover → Map trading flows → Define requirements → Design → Integrate → Test → Release',
    solution: 'Unified order experience with accuracy, transparency, speed, and clear error handling.',
    integrations: 'NSE · BSE · Omnesys NEST · Greek OMS',
    outcome: '31% ↑ trading journey adoption · 18% ↓ order-flow abandonment',
    takeaway: 'In Capital Markets, trust comes from transparency. Showing margin and brokerage before confirmation reduces risk for both the customer and the business.',
    color: 'var(--emerald)',
  },
  {
    id: 3, tag: 'Alerts', title: 'Stock Alerts',
    subtitle: 'Turning passive users into proactive investors',
    problem: 'Users needed a way to monitor stock prices without repeatedly checking the market.',
    goal: 'Enable configurable price and percentage alerts that create recurring engagement.',
    myRole: 'Owned product spec, notification requirements, QA, and launch.',
    approach: 'Designed the loop: Set Alert → Leave App → Market Moves → Notification → Return to App',
    solution: 'Stock → Exchange → Alert Type → Target → Notification, with push delivery for NSE/BSE cash segment.',
    integrations: 'Push notifications · Market data feeds',
    outcome: '52% ↑ repeat engagement among alert users',
    takeaway: 'The best alerts feel like a personal assistant, not a spam engine. Frequency caps and smart defaults determine whether users keep them on.',
    color: 'var(--cyan)',
  },
  {
    id: 4, tag: 'Research', title: 'Stock Fundamentals',
    subtitle: 'Bringing fundamental analysis closer to investors',
    problem: 'Users needed a convenient way to understand the performance of an individual stock.',
    goal: 'Surface yearly/quarterly performance, standalone vs consolidated views, and shareholding patterns.',
    myRole: 'Product requirements, CMOTS API scoping, UX collaboration, and validation.',
    approach: 'Search Stock → Open Stock → Fundamentals → Analyse Performance → Make Informed Decision',
    solution: 'Integrated CMOTS APIs to deliver a complete fundamentals experience inside the platform.',
    integrations: 'CMOTS APIs',
    outcome: '38% ↑ research-feature engagement',
    takeaway: 'Turning raw market data into actionable information reduces friction between curiosity and decision-making.',
    color: 'var(--blue-light)',
  },
  {
    id: 5, tag: 'Intelligence', title: 'Market Intelligence Dashboard',
    subtitle: 'Giving investors the market context they need',
    problem: 'Market information was distributed across different sources, making it difficult to quickly understand what was happening.',
    goal: 'Create a centralized market-insights experience covering actions, IPOs, deals, FII/DII, and news.',
    myRole: 'Product ownership for market insights information architecture and API-backed delivery.',
    approach: 'Surface the right information at the right time without overwhelming the investor.',
    solution: 'Corporate Actions, IPO, Announcements, Bulk/Block Deals, FII/DII Movement, Stock News & Events.',
    integrations: 'CMOTS APIs',
    outcome: '46% ↑ market-insights usage',
    takeaway: 'Context beats volume. Curated market intelligence builds trust faster than dumping every data point on the screen.',
    color: 'var(--emerald)',
  },
  {
    id: 6, tag: 'Account', title: 'Account Freeze Journey',
    subtitle: 'Converting an offline operational process into a digital journey',
    problem: 'Clients previously depended on an offline process to freeze their broking/demat accounts.',
    goal: 'Digitize the freeze request and reduce friction between Client → Operations → Account Action.',
    myRole: 'Journey design, requirements, and operational handoff definition.',
    approach: 'Client initiates freeze → Confirmation → Automated email → Account Opening Team → Account frozen',
    solution: 'A digital Account Freeze Journey with confirmation and automated operational triggers.',
    integrations: 'Email triggers · Account Opening Team workflows',
    outcome: '24% ↓ account-related support requests',
    takeaway: 'Digitizing ops processes is not just about forms — it is about shortening the path from client intent to completed action.',
    color: 'var(--blue)',
  },
];

function CaseStudies() {
  const [active, setActive] = useState(0);
  const { ref, inView } = useInView(0.1);
  const cs = CASE_STUDIES[active];

  return (
    <section id="case-studies" className="section-padding" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem' }}>
          <div className="section-label">Case Studies</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Featured Product Work
          </h2>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          {CASE_STUDIES.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setActive(i)}
              style={{
                background: active === i ? item.color : 'transparent',
                color: active === i ? 'white' : 'var(--slate)',
                border: `1px solid ${active === i ? item.color : 'var(--border)'}`,
                borderRadius: 100, padding: '0.5rem 1.125rem',
                fontFamily: 'Inter', fontWeight: 500, fontSize: '0.875rem',
                cursor: 'pointer', transition: 'all 250ms ease-out',
                minHeight: 44,
              }}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="card" style={{ padding: '2.5rem', opacity: inView ? 1 : 0, transition: 'all 500ms ease-out 200ms', borderLeft: `4px solid ${cs.color}` }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: cs.color }}>
              {cs.tag}
            </span>
          </div>
          <h3 style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: 'clamp(1.375rem, 2.5vw, 1.75rem)', color: 'var(--white)', margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
            {cs.title}
          </h3>
          <p style={{ fontSize: '1rem', color: 'var(--slate)', marginBottom: '1.75rem', fontStyle: 'italic' }}>{cs.subtitle}</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.75rem', marginBottom: '2rem' }} className="cs-grid">
            {[
              { label: 'Problem', val: cs.problem },
              { label: 'Goal', val: cs.goal },
              { label: 'My Role', val: cs.myRole },
              { label: 'Approach', val: cs.approach },
            ].map(item => (
              <div key={item.label}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {item.label}
                </div>
                <p style={{ fontSize: '0.9375rem', color: 'var(--white)', lineHeight: 1.55, margin: 0 }}>{item.val}</p>
              </div>
            ))}
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.75rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--slate)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>Solution</div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--white)', lineHeight: 1.55, margin: '0 0 0.75rem' }}>{cs.solution}</p>
            <div style={{ fontSize: '0.8125rem', color: 'var(--blue-light)' }}>Integrations: {cs.integrations}</div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(16,185,129,0.12), rgba(59,130,246,0.08))',
            border: '1px solid rgba(16,185,129,0.25)',
            borderRadius: 12, padding: '1.25rem 1.5rem', marginBottom: '1.75rem',
          }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--emerald)', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 6 }}>Outcome</div>
            <div style={{ fontSize: '1.25rem', fontFamily: 'Manrope', fontWeight: 800, color: 'var(--white)' }}>{cs.outcome}</div>
          </div>

          <div style={{ borderLeft: '4px solid var(--blue)', paddingLeft: '1.25rem' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>PM Takeaway</div>
            <p style={{ fontSize: '0.9375rem', color: 'var(--slate)', lineHeight: 1.6, margin: 0, fontStyle: 'italic' }}>"{cs.takeaway}"</p>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .cs-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ─── Product Process ──────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  { num: '01', title: 'Discover', desc: 'Understand the user, business problem, market, and constraints.' },
  { num: '02', title: 'Define', desc: 'Convert the problem into clear product requirements.' },
  { num: '03', title: 'Prioritize', desc: 'Evaluate impact, effort, business value, risk, and dependencies.' },
  { num: '04', title: 'Design', desc: 'Collaborate with UX on intuitive journeys and wireframes.' },
  { num: '05', title: 'Build', desc: 'Work with engineering through Agile sprints.' },
  { num: '06', title: 'Validate', desc: 'Test functionality, integrations, edge cases, and acceptance criteria.' },
  { num: '07', title: 'Measure', desc: 'Track adoption, engagement, conversion, quality, and outcomes.' },
];

function ProductProcess() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding" ref={ref as React.RefObject<HTMLElement>}
      style={{ background: 'rgba(16,28,46,0.35)' }}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>How I Work</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            My Product Framework
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0', position: 'relative' }} className="process-grid">
          <div className="process-line" style={{
            position: 'absolute', top: 28, left: '7%', right: '7%', height: 2,
            background: 'var(--border)', zIndex: 0,
          }}>
            <div style={{
              height: '100%', background: 'linear-gradient(90deg, var(--blue), var(--cyan))',
              width: inView ? '100%' : '0%',
              transition: 'width 1200ms ease-out 400ms',
            }} />
          </div>

          {PROCESS_STEPS.map((step, i) => (
            <div key={step.num} style={{
              textAlign: 'center', position: 'relative', zIndex: 1, padding: '0 0.5rem',
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
              transition: `all 500ms ease-out ${300 + i * 100}ms`,
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: i <= 3 ? 'var(--blue)' : 'var(--surface-2)',
                border: i <= 3 ? '2px solid var(--blue)' : '2px solid var(--border)',
                margin: '0 auto 1rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Manrope', fontWeight: 800, fontSize: '0.8rem',
                color: i <= 3 ? 'white' : 'var(--slate)',
                boxShadow: i <= 3 ? '0 0 16px rgba(59,130,246,0.35)' : 'none',
              }}>
                {step.num}
              </div>
              <div style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '0.875rem', color: 'var(--white)', marginBottom: 6 }}>{step.title}</div>
              <p style={{ fontSize: '0.75rem', color: 'var(--slate)', lineHeight: 1.4, margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          .process-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
          .process-line { display: none !important; }
        }
        @media (max-width: 500px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Success Metrics Dashboard ────────────────────────────────────────────────

function SuccessMetrics() {
  const { ref, inView } = useInView(0.15);

  const groups = [
    {
      title: 'Product Impact',
      items: [
        { val: '+42%', label: 'Digital onboarding completion' },
        { val: '-68%', label: 'Manual operational dependency' },
        { val: '+31%', label: 'Trading journey adoption' },
        { val: '+46%', label: 'Market intelligence engagement' },
      ],
    },
    {
      title: 'Customer Experience',
      items: [
        { val: '-55%', label: 'Journey completion time' },
        { val: '-24%', label: 'Account-related support queries' },
        { val: '+52%', label: 'Stock-alert engagement' },
      ],
    },
    {
      title: 'Product Quality',
      items: [
        { val: '-35%', label: 'Production defect rate' },
        { val: '+28%', label: 'Release confidence / test coverage' },
      ],
    },
  ];

  return (
    <section className="section-padding" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Analytics</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            Success Metrics Dashboard
          </h2>
          <p style={{ color: 'var(--slate)', maxWidth: 520, margin: '0 auto', fontSize: '0.9375rem' }}>
            Placeholder metrics for portfolio presentation — replace with verified project numbers before publishing.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="success-grid">
          {groups.map((g, gi) => (
            <div key={g.title} className="card" style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
              transition: `all 600ms ease-out ${gi * 120}ms`,
            }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '1.25rem' }}>
                {g.title}
              </div>
              {g.items.map(item => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                  padding: '0.75rem 0', borderBottom: '1px solid var(--border)', gap: '1rem',
                }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--slate)', lineHeight: 1.4 }}>{item.label}</span>
                  <span style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.25rem', color: 'var(--emerald)', flexShrink: 0 }}>{item.val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .success-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── Toolkit ──────────────────────────────────────────────────────────────────

const TOOLKIT = [
  {
    category: 'Product Management',
    color: 'var(--blue)',
    tags: ['Product Strategy', 'Roadmapping', 'PRD / BRD', 'Requirement Gathering', 'User Stories', 'User Story Mapping', 'Sprint Management', 'Benchmarking'],
  },
  {
    category: 'UX',
    color: 'var(--cyan)',
    tags: ['Wireframing', 'User Journey Mapping', 'Figma', 'FigJam', 'UI/UX Optimization'],
  },
  {
    category: 'Capital Markets',
    color: 'var(--emerald)',
    tags: ['Broking', 'Demat', 'NSE', 'BSE', 'HNI Investing', 'MTF', 'Intraday', 'Delivery', 'Market Data'],
  },
  {
    category: 'APIs & Integration',
    color: 'var(--blue-light)',
    tags: ['REST APIs', 'Postman', 'CMOTS APIs', 'Omnesys APIs', 'OMS Integration', 'CDSL Integration'],
  },
  {
    category: 'QA',
    color: '#F472B6',
    tags: ['Functional Testing', 'Integration Testing', 'Regression Testing', 'STLC', 'Defect Lifecycle', 'Selenium', 'Jira', 'Mantis'],
  },
  {
    category: 'Product / AI Tools',
    color: 'var(--cyan)',
    tags: ['Jira', 'Confluence', 'Figma', 'FigJam', 'Whimsical', 'Lovable', 'n8n', 'Figma Make'],
  },
];

function Toolkit() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="toolkit" className="section-padding" ref={ref as React.RefObject<HTMLElement>}
      style={{ background: 'rgba(16,28,46,0.4)' }}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem' }}>
          <div className="section-label">Skills</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Product & Technical Toolkit
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="toolkit-grid">
          {TOOLKIT.map((cat, ci) => (
            <div key={cat.category} className="card" style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
              transition: `all 600ms ease-out ${ci * 90}ms`,
            }}>
              <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: cat.color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '1rem' }}>
                {cat.category}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {cat.tags.map((tag, ti) => (
                  <span key={tag} className="skill-tag" style={{
                    opacity: inView ? 1 : 0,
                    transition: `all 300ms ease-out ${200 + ci * 80 + ti * 40}ms`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: '1.5rem', opacity: inView ? 1 : 0, transition: 'all 500ms ease-out 400ms' }}>
          <div className="card" style={{ padding: '1.25rem 1.5rem' }}>
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--slate)', letterSpacing: '0.06em', textTransform: 'uppercase', marginRight: '1rem' }}>OMS</span>
            <span className="skill-tag" style={{ marginRight: '0.5rem' }}>Omnesys NEST</span>
            <span className="skill-tag">Greek</span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .toolkit-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .toolkit-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── Product Thinking ─────────────────────────────────────────────────────────

const THOUGHTS = [
  {
    title: 'Designing for Trust in Financial Products',
    desc: 'How transparency around brokerage, margin, account status, and transaction information can improve user confidence.',
    tag: 'UX Philosophy',
    color: 'var(--blue)',
  },
  {
    title: 'Simplifying Complex Financial Journeys',
    desc: 'How backend complexity across OMS, exchanges, CDSL, and back-office systems can be hidden behind simple UX.',
    tag: 'Systems Thinking',
    color: 'var(--emerald)',
  },
  {
    title: 'From Feature to Habit',
    desc: 'How features such as Stock Alerts can create recurring engagement rather than one-time usage.',
    tag: 'Engagement',
    color: 'var(--cyan)',
  },
  {
    title: 'Product Quality is a Product Responsibility',
    desc: 'How a QA background influences requirement quality, edge-case thinking, acceptance criteria, and release confidence.',
    tag: 'PM + QA',
    color: '#F472B6',
  },
];

function ProductThinking() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem' }}>
          <div className="section-label">Insights</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Product Thinking
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }} className="thoughts-grid">
          {THOUGHTS.map((t, i) => (
            <div key={t.title} className="card" style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
              transition: `all 600ms ease-out ${i * 100}ms`,
              borderLeft: `3px solid ${t.color}`,
            }}>
              <span style={{
                display: 'inline-block', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em',
                textTransform: 'uppercase', color: t.color, marginBottom: '0.875rem',
                background: 'rgba(59,130,246,0.1)',
                padding: '0.25rem 0.625rem', borderRadius: 100,
              }}>
                {t.tag}
              </span>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.625rem', lineHeight: 1.3 }}>{t.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate)', lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .thoughts-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ─── Strengths ────────────────────────────────────────────────────────────────

const STRENGTHS = [
  { title: 'Product Strategy', desc: 'Roadmaps, prioritization, product goals and business alignment.', tag: 'Strategic' },
  { title: 'Product & Market Analysis', desc: 'Benchmarking, user feedback, market research and data interpretation.', tag: 'Analytical' },
  { title: 'From PRD to Production', desc: 'Requirements → Design → Development → QA → Release.', tag: 'Execution' },
  { title: 'Technical Product Thinking', desc: 'APIs, OMS, integrations, testing and system dependencies.', tag: 'Technical' },
  { title: 'Capital Markets Expertise', desc: 'Trading, broking, demat, HNI, NSE, BSE, MTF and market data.', tag: 'Domain' },
  { title: 'QA Mindset', desc: 'Functional, integration, regression testing and defect management.', tag: 'Quality' },
];

function Strengths() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding" ref={ref as React.RefObject<HTMLElement>}
      style={{ background: 'rgba(16,28,46,0.35)' }}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem' }}>
          <div className="section-label">Capabilities</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Strengths
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="strengths-grid">
          {STRENGTHS.map((s, i) => (
            <div key={s.title} className="card" style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
              transition: `all 600ms ease-out ${i * 80}ms`,
            }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--blue)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>{s.tag}</div>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1.05rem', color: 'var(--white)', marginBottom: '0.5rem' }}>{s.title}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--slate)', lineHeight: 1.55, margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 1024px) { .strengths-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 600px) { .strengths-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── Education & Certs ────────────────────────────────────────────────────────

function Education() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem' }}>
          <div className="section-label">Background</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Certifications & Education
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="edu-grid">
          {[
            {
              title: 'Product Management',
              institution: 'NEXT Leap Institution',
              type: 'Certification',
              color: 'var(--blue)',
              image: '/certificates/PM_Certificate.jpg',
              href: '/certificates/PM_Certificate.jpg',
            },
            {
              title: 'QA Analyst',
              institution: 'Q-Spider Institution',
              type: 'Certification',
              color: 'var(--emerald)',
              image: '/certificates/QA_Certificate.png',
              href: '/certificates/QA_Certificate.png',
            },
            {
              title: 'BE — Mechanical Engineering',
              institution: 'Mumbai University · 2019',
              type: 'Education',
              color: 'var(--slate)',
            },
          ].map((item, i) => {
            const CardWrapper = item.href ? 'a' : 'div';
            const wrapperProps = item.href
              ? {
                  href: item.href,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  style: { textDecoration: 'none', color: 'inherit', display: 'block' },
                }
              : {};

            return (
              <CardWrapper key={item.title} {...(wrapperProps as any)}>
                <div
                  className="card"
                  style={{
                    height: '100%',
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'none' : 'translateY(24px)',
                    transition: `all 600ms ease-out ${i * 100}ms, border-color 200ms ease, box-shadow 200ms ease`,
                    cursor: item.href ? 'pointer' : 'default',
                  }}
                  onMouseEnter={e => {
                    if (item.href) {
                      e.currentTarget.style.borderColor = item.color || 'var(--blue)';
                      e.currentTarget.style.boxShadow = item.color === 'var(--emerald)'
                        ? '0 8px 30px rgba(16,185,129,0.15)'
                        : '0 8px 30px rgba(59,130,246,0.15)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (item.href) {
                      e.currentTarget.style.borderColor = 'var(--border)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {item.image ? (
                    <div
                      style={{
                        height: 120,
                        borderRadius: 10,
                        marginBottom: '1.25rem',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid var(--border)',
                      }}
                    >
                      <img
                        src={item.image}
                        alt={`${item.title} Certificate`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center top',
                          transition: 'transform 300ms ease',
                        }}
                      />
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(8,17,31,0.85) 0%, rgba(8,17,31,0.2) 60%, transparent 100%)',
                          display: 'flex',
                          alignItems: 'flex-end',
                          padding: '0.625rem 0.75rem',
                        }}
                      >
                        <span
                          style={{
                            fontSize: '0.725rem',
                            fontWeight: 600,
                            color: item.color === 'var(--emerald)' ? 'var(--emerald)' : 'var(--blue-light)',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                            background: 'rgba(15,23,42,0.85)',
                            padding: '3px 8px',
                            borderRadius: 4,
                            border: `1px solid ${item.color === 'var(--emerald)' ? 'rgba(16,185,129,0.35)' : 'rgba(59,130,246,0.3)'}`,
                          }}
                        >
                          View Certificate ↗
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      style={{
                        height: 120,
                        borderRadius: 10,
                        marginBottom: '1.25rem',
                        background: `linear-gradient(135deg, ${item.color}22, transparent)`,
                        border: '1px solid var(--border)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        color: 'var(--slate)',
                        fontWeight: 600,
                        letterSpacing: '0.06em',
                      }}
                    >
                      {item.type.toUpperCase()}
                    </div>
                  )}

                  <div
                    style={{
                      fontSize: '0.75rem',
                      color: item.color,
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      marginBottom: 8,
                    }}
                  >
                    {item.type}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'Manrope',
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: 'var(--white)',
                      marginBottom: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {item.title}
                    {item.href && <span style={{ fontSize: '0.9rem', color: 'var(--blue)' }}>↗</span>}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--slate)', margin: 0 }}>{item.institution}</p>
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .edu-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  );
}

// ─── Career Timeline ──────────────────────────────────────────────────────────

function CareerTimeline() {
  const { ref, inView } = useInView(0.1);
  const steps = [
    { year: '2019', title: 'BE Mechanical Engineering', sub: 'Mumbai University' },
    { year: 'QA', title: 'QA Analyst Certification', sub: 'Q-Spider Institution' },
    { year: 'PM', title: 'Product Management Certification', sub: 'NEXT Leap Institution' },
    { year: 'Now', title: 'Product Manager', sub: '360 One WAM · 1 Year 10 Months' },
  ];

  return (
    <section className="section-padding" ref={ref as React.RefObject<HTMLElement>}
      style={{ background: 'rgba(16,28,46,0.35)' }}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem', textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Journey</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Career Timeline
          </h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', position: 'relative' }} className="timeline-grid">
          {steps.map((s, i) => (
            <div key={s.title} style={{
              textAlign: 'center',
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)',
              transition: `all 500ms ease-out ${200 + i * 120}ms`,
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%', margin: '0 auto 1rem',
                background: 'var(--blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Manrope', fontWeight: 800, fontSize: '0.7rem', color: 'white',
                boxShadow: '0 0 16px rgba(59,130,246,0.35)',
              }}>{s.year}</div>
              <h3 style={{ fontFamily: 'Manrope', fontWeight: 700, fontSize: '1rem', color: 'var(--white)', marginBottom: 6 }}>{s.title}</h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--slate)', margin: 0 }}>{s.sub}</p>
            </div>
          ))}
        </div>
        <p style={{
          textAlign: 'center', marginTop: '2.5rem', fontSize: '1rem', color: 'var(--slate)',
          maxWidth: 560, marginLeft: 'auto', marginRight: 'auto', fontStyle: 'italic',
          opacity: inView ? 1 : 0, transition: 'all 600ms ease-out 700ms',
        }}>
          Next chapter: Building intelligent, customer-centric products at the intersection of FinTech, AI, UX and technology.
        </p>
      </div>
      <style>{`
        @media (max-width: 900px) { .timeline-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { .timeline-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

function Testimonials() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section-padding" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 600ms ease-out', marginBottom: '3rem' }}>
          <div className="section-label">Social Proof</div>
          <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.75rem)', fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', letterSpacing: '-0.02em' }}>
            Testimonials
          </h2>
          <p style={{ color: 'var(--slate)', marginTop: '0.75rem', fontSize: '0.9375rem' }}>
            Placeholder cards — replace with real quotes before publishing.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }} className="testimonial-grid">
          {[1, 2, 3].map((n, i) => (
            <div key={n} className="card" style={{
              opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
              transition: `all 600ms ease-out ${i * 100}ms`,
            }}>
              <p style={{ fontSize: '0.95rem', color: 'var(--slate)', lineHeight: 1.65, fontStyle: 'italic', marginBottom: '1.5rem' }}>
                "Dummy testimonial highlighting product ownership, collaboration and execution. Replace with a real quote from a CXO, Engineering Lead, or Designer."
              </p>
              <div style={{ fontFamily: 'Manrope', fontWeight: 700, color: 'var(--white)', fontSize: '0.95rem' }}>— Name</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--slate)' }}>Designation · 360 One WAM</div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) { .testimonial-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}

// ─── Final CTA ────────────────────────────────────────────────────────────────

function FinalCTA() {
  const { ref, inView } = useInView(0.2);

  return (
    <section id="contact" className="section-padding" ref={ref as React.RefObject<HTMLElement>}
      style={{
        background: 'linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(16,185,129,0.05) 50%, rgba(34,211,238,0.05) 100%)',
        borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)',
        position: 'relative', overflow: 'hidden',
      }}>
      <div style={{
        position: 'absolute', top: -100, left: -100, width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, right: -80, width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative' }}>
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: 'all 700ms ease-out' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>Let's Talk</div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', fontFamily: 'Manrope', fontWeight: 800, color: 'var(--white)', letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
            Have a product problem worth solving? Let's talk.
          </h2>
          <p style={{ fontSize: '1.125rem', color: 'var(--slate)', maxWidth: 580, margin: '0 auto 2.5rem', lineHeight: 1.65 }}>
            I'm interested in building products that simplify complex problems, create measurable business value, and deliver better customer experiences.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:hello@example.com" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Get in Touch <span className="btn-arrow">→</span>
            </a>
            <a href="https://www.linkedin.com/in/omkar-shikhare-0b05b9221?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              View LinkedIn <span className="btn-arrow">↗</span>
            </a>
            <a href="/Resume/OMKAR_PM_CV.pdf" target="_blank" rel="noopener noreferrer" className="btn-secondary" style={{ fontSize: '1rem', padding: '1rem 2rem' }}>
              Resume <span className="btn-arrow">↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '2.5rem 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
        <div>
          <div style={{ fontFamily: 'Manrope', fontWeight: 800, fontSize: '1.05rem', color: 'var(--white)', marginBottom: 2 }}>
            Omkar Shikhare
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--slate)' }}>Product Manager · Capital Markets & FinTech</div>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {[
            { label: 'LinkedIn', href: 'https://www.linkedin.com/in/omkar-shikhare-0b05b9221?utm_source=share_via&utm_content=profile&utm_medium=member_android', target: '_blank', rel: 'noopener noreferrer' },
            { label: 'Email', href: 'mailto:hello@example.com' },
            { label: 'Resume', href: '/Resume/OMKAR_PM_CV.pdf', target: '_blank', rel: 'noopener noreferrer' },
          ].map(l => (
            <a key={l.label} href={l.href} target={l.target} rel={l.rel} style={{ fontSize: '0.875rem', color: 'var(--slate)', textDecoration: 'none', transition: 'color 200ms' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--white)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--slate)')}>
              {l.label}
            </a>
          ))}
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--border-light)' }}>© 2026 All rights reserved</div>
      </div>
    </footer>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <ImpactSnapshot />
      <ImpactCharts />
      <About />
      <Experience />
      <ProductAreas />
      <CaseStudies />
      <ProductProcess />
      <SuccessMetrics />
      <Toolkit />
      <ProductThinking />
      <Strengths />
      <Education />
      <CareerTimeline />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
