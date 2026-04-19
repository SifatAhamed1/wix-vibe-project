import { useEffect, useRef, useState } from "react";

/* ═══════════════════════════════════════════════════════════
   HAWSHome.jsx — Houston AI Web Studio
   Cinematic single-page hero component for Wix Vibe
   
   Sections:
   1. Particle Hero         — animated particles + headline
   2. Marquee Ticker        — scrolling services strip
   3. Sticky Orb Scroll     — 600vh pinned scroll sequence
   4. Service Cards         — 6 cards with hover effects
   5. Stats Counter         — animated number counters
   6. Ring CTA              — pulsing call-to-action section

   Fonts:    Bebas Neue (display) / Playfair Display (accent) / DM Sans (body)
   Colors:   Cyan #00F0FF · Purple #A855F7 · Pink #FF2D78 · Lime #39FF14
   Export:   default HAWSHome
═══════════════════════════════════════════════════════════ */

// ── FONT LOADER ──────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Playfair+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
  `}</style>
);

// ── CSS VARIABLES + GLOBAL STYLES ────────────────────────
const GlobalStyles = () => (
  <style>{`
    :root {
      --cyan:   #00F0FF;
      --purple: #A855F7;
      --pink:   #FF2D78;
      --lime:   #39FF14;
      --dark:   #030812;
      --dark2:  #080d1f;
      --glass:  rgba(255,255,255,0.04);
    }

    .haws-root {
      background: var(--dark);
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      overflow-x: hidden;
      width: 100%;
    }

    /* ── HERO ── */
    .haws-hero {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .haws-hero-canvas {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .haws-hero-content {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 0 24px;
      max-width: 900px;
    }
    .haws-eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: rgba(0,240,255,0.07);
      border: 1px solid rgba(0,240,255,0.2);
      border-radius: 100px;
      padding: 6px 18px;
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--cyan);
      margin-bottom: 28px;
    }
    .haws-eyebrow-dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--cyan);
      animation: haws-pulse 2s ease-in-out infinite;
    }
    .haws-hero-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(56px, 10vw, 120px);
      line-height: 0.95;
      letter-spacing: 2px;
      margin-bottom: 24px;
    }
    .haws-gradient-text {
      background: linear-gradient(135deg, #fff 0%, var(--cyan) 30%, var(--purple) 60%, var(--pink) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .haws-hero-sub {
      font-size: clamp(15px, 2vw, 19px);
      color: rgba(255,255,255,0.45);
      line-height: 1.7;
      max-width: 540px;
      margin: 0 auto 40px;
      font-weight: 300;
    }
    .haws-hero-ctas {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }
    .haws-btn-primary {
      padding: 16px 36px;
      border-radius: 100px;
      border: none;
      cursor: pointer;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 18px;
      letter-spacing: 2px;
      background: linear-gradient(135deg, var(--cyan), var(--purple));
      color: #000;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 0 30px rgba(0,240,255,0.25);
    }
    .haws-btn-primary:hover {
      transform: scale(1.05);
      box-shadow: 0 0 50px rgba(0,240,255,0.4);
    }
    .haws-btn-secondary {
      padding: 16px 36px;
      border-radius: 100px;
      cursor: pointer;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 18px;
      letter-spacing: 2px;
      background: transparent;
      border: 1px solid rgba(255,255,255,0.15);
      color: #fff;
      transition: all 0.2s;
    }
    .haws-btn-secondary:hover {
      background: rgba(255,255,255,0.06);
      border-color: rgba(255,255,255,0.3);
    }
    .haws-price-badge {
      margin-top: 32px;
      font-size: 13px;
      color: rgba(255,255,255,0.3);
      letter-spacing: 1px;
    }
    .haws-price-badge span {
      color: var(--cyan);
      font-weight: 600;
    }

    /* ── MARQUEE ── */
    .haws-marquee-wrap {
      overflow: hidden;
      border-top: 1px solid rgba(255,255,255,0.06);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      background: rgba(255,255,255,0.02);
      padding: 14px 0;
    }
    .haws-marquee-track {
      display: flex;
      gap: 0;
      animation: haws-marquee 28s linear infinite;
      white-space: nowrap;
      width: max-content;
    }
    .haws-marquee-item {
      display: inline-flex;
      align-items: center;
      gap: 12px;
      padding: 0 32px;
      font-family: 'Bebas Neue', sans-serif;
      font-size: 16px;
      letter-spacing: 2px;
      color: rgba(255,255,255,0.35);
    }
    .haws-marquee-item:nth-child(3n+1) .haws-marquee-dot { background: var(--cyan); }
    .haws-marquee-item:nth-child(3n+2) .haws-marquee-dot { background: var(--purple); }
    .haws-marquee-item:nth-child(3n+3) .haws-marquee-dot { background: var(--pink); }
    .haws-marquee-dot {
      width: 5px; height: 5px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    /* ── STICKY ORB SECTION ── */
    .haws-sticky-outer {
      position: relative;
      height: 600vh;
    }
    .haws-sticky-inner {
      position: sticky;
      top: 0;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }
    .haws-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(60px);
      pointer-events: none;
      transition: all 0.1s ease-out;
    }
    .haws-orb-1 {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(0,240,255,0.15), transparent 70%);
    }
    .haws-orb-2 {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(168,85,247,0.2), transparent 70%);
      right: 10%; top: 20%;
    }
    .haws-orb-3 {
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(255,45,120,0.15), transparent 70%);
      left: 15%; bottom: 20%;
    }
    .haws-sticky-text {
      position: relative;
      z-index: 2;
      text-align: center;
      padding: 0 24px;
    }
    .haws-sticky-label {
      font-size: 11px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--cyan);
      margin-bottom: 20px;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease;
    }
    .haws-sticky-label.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .haws-sticky-headline {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(40px, 7vw, 88px);
      line-height: 1;
      letter-spacing: 1px;
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.7s ease 0.1s;
    }
    .haws-sticky-headline.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .haws-sticky-sub {
      font-size: clamp(14px, 1.8vw, 18px);
      color: rgba(255,255,255,0.4);
      margin-top: 16px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.7;
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.7s ease 0.2s;
    }
    .haws-sticky-sub.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ── SECTION WRAPPER ── */
    .haws-section {
      padding: 100px 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .haws-section-label {
      font-size: 11px;
      letter-spacing: 4px;
      text-transform: uppercase;
      color: var(--cyan);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .haws-section-label::before {
      content: '';
      width: 24px;
      height: 1px;
      background: var(--cyan);
    }
    .haws-section-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(36px, 5vw, 64px);
      line-height: 1.05;
      margin-bottom: 16px;
      letter-spacing: 1px;
    }
    .haws-section-sub {
      font-size: 16px;
      color: rgba(255,255,255,0.4);
      max-width: 480px;
      line-height: 1.7;
      margin-bottom: 60px;
      font-weight: 300;
    }

    /* ── SERVICE CARDS ── */
    .haws-cards-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    .haws-card {
      background: var(--glass);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 20px;
      padding: 32px;
      cursor: pointer;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    .haws-card::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 20px;
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .haws-card:nth-child(1)::before { background: radial-gradient(circle at 30% 30%, rgba(0,240,255,0.08), transparent 60%); }
    .haws-card:nth-child(2)::before { background: radial-gradient(circle at 30% 30%, rgba(168,85,247,0.08), transparent 60%); }
    .haws-card:nth-child(3)::before { background: radial-gradient(circle at 30% 30%, rgba(255,45,120,0.08), transparent 60%); }
    .haws-card:nth-child(4)::before { background: radial-gradient(circle at 30% 30%, rgba(57,255,20,0.08), transparent 60%); }
    .haws-card:nth-child(5)::before { background: radial-gradient(circle at 30% 30%, rgba(0,240,255,0.08), transparent 60%); }
    .haws-card:nth-child(6)::before { background: radial-gradient(circle at 30% 30%, rgba(168,85,247,0.08), transparent 60%); }
    .haws-card:hover {
      transform: translateY(-6px);
      border-color: rgba(255,255,255,0.12);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4);
    }
    .haws-card:hover::before { opacity: 1; }
    .haws-card-icon {
      font-size: 32px;
      margin-bottom: 20px;
      display: block;
    }
    .haws-card-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 11px;
      letter-spacing: 3px;
      color: rgba(255,255,255,0.2);
      margin-bottom: 8px;
    }
    .haws-card-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 26px;
      letter-spacing: 1px;
      margin-bottom: 10px;
    }
    .haws-card-desc {
      font-size: 14px;
      color: rgba(255,255,255,0.4);
      line-height: 1.65;
      font-weight: 300;
    }
    .haws-card-arrow {
      margin-top: 24px;
      font-size: 20px;
      opacity: 0;
      transform: translateX(-8px);
      transition: all 0.3s ease;
    }
    .haws-card:hover .haws-card-arrow {
      opacity: 1;
      transform: translateX(0);
    }

    /* ── STATS ── */
    .haws-stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 2px;
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 20px;
      overflow: hidden;
      background: rgba(255,255,255,0.03);
    }
    .haws-stat {
      padding: 40px 32px;
      text-align: center;
      border-right: 1px solid rgba(255,255,255,0.06);
      background: var(--dark2);
    }
    .haws-stat:last-child { border-right: none; }
    .haws-stat-num {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(48px, 6vw, 80px);
      line-height: 1;
      letter-spacing: 2px;
      display: block;
    }
    .haws-stat-num.cyan   { color: var(--cyan); }
    .haws-stat-num.purple { color: var(--purple); }
    .haws-stat-num.pink   { color: var(--pink); }
    .haws-stat-num.lime   { color: var(--lime); }
    .haws-stat-label {
      font-size: 12px;
      color: rgba(255,255,255,0.35);
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-top: 8px;
      display: block;
    }

    /* ── RING CTA ── */
    .haws-cta-section {
      padding: 120px 24px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .haws-ring {
      position: absolute;
      border-radius: 50%;
      border: 1px solid;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      animation: haws-ring-pulse 4s ease-in-out infinite;
    }
    .haws-ring-1 {
      width: 300px; height: 300px;
      border-color: rgba(0,240,255,0.15);
      animation-delay: 0s;
    }
    .haws-ring-2 {
      width: 500px; height: 500px;
      border-color: rgba(168,85,247,0.1);
      animation-delay: 0.5s;
    }
    .haws-ring-3 {
      width: 700px; height: 700px;
      border-color: rgba(255,45,120,0.07);
      animation-delay: 1s;
    }
    .haws-ring-4 {
      width: 900px; height: 900px;
      border-color: rgba(0,240,255,0.04);
      animation-delay: 1.5s;
    }
    .haws-cta-content {
      position: relative;
      z-index: 2;
    }
    .haws-cta-italic {
      font-family: 'Playfair Display', serif;
      font-style: italic;
      font-size: clamp(16px, 2vw, 22px);
      color: rgba(255,255,255,0.4);
      margin-bottom: 24px;
    }
    .haws-cta-title {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(48px, 8vw, 100px);
      letter-spacing: 2px;
      line-height: 0.95;
      margin-bottom: 32px;
    }
    .haws-cta-phone {
      font-family: 'Bebas Neue', sans-serif;
      font-size: clamp(24px, 4vw, 48px);
      letter-spacing: 4px;
      color: var(--cyan);
      display: block;
      margin-bottom: 8px;
      text-decoration: none;
      transition: color 0.2s;
    }
    .haws-cta-phone:hover { color: #fff; }
    .haws-cta-tagline {
      font-size: 14px;
      color: rgba(255,255,255,0.3);
      letter-spacing: 2px;
      margin-bottom: 40px;
    }

    /* ── FOOTER ── */
    .haws-footer {
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 40px 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .haws-footer-logo {
      font-family: 'Bebas Neue', sans-serif;
      font-size: 22px;
      letter-spacing: 2px;
      background: linear-gradient(135deg, var(--cyan), var(--purple));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .haws-footer-copy {
      font-size: 12px;
      color: rgba(255,255,255,0.2);
      letter-spacing: 1px;
    }

    /* ── KEYFRAMES ── */
    @keyframes haws-pulse {
      0%,100% { opacity:1; transform:scale(1); }
      50%      { opacity:.4; transform:scale(1.6); }
    }
    @keyframes haws-marquee {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes haws-ring-pulse {
      0%,100% { opacity:1; transform: translate(-50%,-50%) scale(1); }
      50%      { opacity:.5; transform: translate(-50%,-50%) scale(1.05); }
    }
    @keyframes haws-counter { from { opacity:0; } to { opacity:1; } }

    /* ── RESPONSIVE ── */
    @media (max-width: 768px) {
      .haws-cards-grid { grid-template-columns: 1fr; }
      .haws-stats-grid { grid-template-columns: 1fr 1fr; }
      .haws-stat { border-right: none; border-bottom: 1px solid rgba(255,255,255,0.06); }
      .haws-footer { justify-content: center; text-align: center; }
    }
    @media (max-width: 480px) {
      .haws-stats-grid { grid-template-columns: 1fr; }
      .haws-hero-ctas { flex-direction: column; align-items: center; }
    }
  `}</style>
);

// ── PARTICLE CANVAS ────────────────────────────────────────
const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], raf;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const COLORS = [
      "rgba(0,240,255",
      "rgba(168,85,247",
      "rgba(255,45,120",
      "rgba(57,255,20",
    ];

    class P {
      constructor() { this.reset(); }
      reset() {
        this.x  = Math.random() * W;
        this.y  = Math.random() * H;
        this.r  = Math.random() * 1.8 + 0.3;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.c  = COLORS[Math.floor(Math.random() * COLORS.length)];
        this.life  = Math.random();
        this.speed = 0.003 + Math.random() * 0.006;
      }
      tick() {
        this.x += this.vx;
        this.y += this.vy;
        this.life += this.speed;
        if (this.life > 1) this.life = 0;
        if (this.x < 0 || this.x > W) this.vx *= -1;
        if (this.y < 0 || this.y > H) this.vy *= -1;
      }
      draw() {
        const a = Math.sin(this.life * Math.PI) * 0.65;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${this.c},${a})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < 90; i++) particles.push(new P());

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.tick(); p.draw(); });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="haws-hero-canvas"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

// ── ANIMATED COUNTER ──────────────────────────────────────
const Counter = ({ target, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(tick);
            else setCount(target);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

// ── STICKY ORB SECTION ────────────────────────────────────
const StickyOrb = () => {
  const outerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const slides = [
    {
      label: "The Process",
      headline: "BRIEFING TO\nBROWSER IN 48",
      sub: "You tell us your business. We build your site. You're live in 48 hours — or we work until you are.",
    },
    {
      label: "The Design",
      headline: "BUILT FOR\nYOUR INDUSTRY",
      sub: "Every site is custom-designed for your specific business type — not a template with your logo slapped on it.",
    },
    {
      label: "The Price",
      headline: "STARTING\nAT $199",
      sub: "Professional website, mobile-ready, SEO-optimized. No monthly fees unless you want our Care Plan.",
    },
    {
      label: "The Result",
      headline: "CLIENTS FIND\nYOU ONLINE",
      sub: "Google indexes your site within days. New customers start finding you before your competitors do.",
    },
  ];

  const slideIndex = Math.min(
    Math.floor(progress * slides.length),
    slides.length - 1
  );
  const slide = slides[slideIndex];

  useEffect(() => {
    const handleScroll = () => {
      if (!outerRef.current) return;
      const rect = outerRef.current.getBoundingClientRect();
      const total = outerRef.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
      setVisible(p > 0.02);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const orbX = `${20 + progress * 60}%`;
  const orbY = `${30 + Math.sin(progress * Math.PI) * 40}%`;

  return (
    <div ref={outerRef} className="haws-sticky-outer">
      <div className="haws-sticky-inner">
        <div
          className="haws-orb haws-orb-1"
          style={{ left: orbX, top: orbY, transform: "translate(-50%,-50%)" }}
        />
        <div className="haws-orb haws-orb-2" />
        <div className="haws-orb haws-orb-3" />
        <div className="haws-sticky-text">
          <div className={`haws-sticky-label ${visible ? "visible" : ""}`}>
            {slide.label}
          </div>
          <div
            className={`haws-sticky-headline haws-gradient-text ${visible ? "visible" : ""}`}
            style={{ whiteSpace: "pre-line" }}
          >
            {slide.headline}
          </div>
          <div className={`haws-sticky-sub ${visible ? "visible" : ""}`}>
            {slide.sub}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── MARQUEE ───────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "Restaurant Websites", "Contractor Sites", "Salon Booking Pages",
  "Auto Shop Portfolios", "Med Spa Designs", "Food Truck Pages",
  "Real Estate Sites", "Cleaning Service Sites", "Landscaping Pages",
  "Barbershop Booking", "48-Hour Delivery", "Starting at $199",
  "Free Custom Mockup", "Houston TX Based", "Mobile-First Design",
];

const Marquee = () => {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div className="haws-marquee-wrap">
      <div className="haws-marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="haws-marquee-item">
            <span className="haws-marquee-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── SERVICES DATA ─────────────────────────────────────────
const SERVICES = [
  {
    icon: "⚡",
    title: "48-Hour Delivery",
    desc: "Most agencies take weeks. We take 48 hours from briefing to live website — or we keep working until it's done.",
  },
  {
    icon: "🎨",
    title: "Custom Design",
    desc: "Not a template. Every site is built from scratch for your specific industry, brand, and clientele.",
  },
  {
    icon: "📱",
    title: "Mobile-First",
    desc: "Over 70% of local searches happen on phones. Every site we build looks perfect on every screen size.",
  },
  {
    icon: "🔍",
    title: "SEO Optimized",
    desc: "Your site gets found on Google. We handle meta tags, page speed, schema markup, and local SEO from day one.",
  },
  {
    icon: "🔧",
    title: "Care Plan",
    desc: "For $49/month we handle all your content updates, security monitoring, and priority support. Set it and forget it.",
  },
  {
    icon: "💬",
    title: "Local Houston Team",
    desc: "We're based right here in Baytown. You can reach us by phone, text, or email — no ticket queues, no outsourcing.",
  },
];

// ── STATS DATA ────────────────────────────────────────────
const STATS = [
  { num: 48, suffix: "hr",  label: "Delivery Time",    color: "cyan"   },
  { num: 199, suffix: "+",  label: "Starting Price $", color: "purple" },
  { num: 12, suffix: "",    label: "Design Styles",    color: "pink"   },
  { num: 100, suffix: "%",  label: "Houston Local",    color: "lime"   },
];

// ── MAIN COMPONENT ────────────────────────────────────────
export default function HAWSHome() {
  return (
    <div className="haws-root">
      <FontLoader />
      <GlobalStyles />

      {/* ── HERO ── */}
      <section className="haws-hero">
        <ParticleCanvas />
        <div className="haws-hero-content">
          <div className="haws-eyebrow">
            <span className="haws-eyebrow-dot" />
            Houston AI Website Studio
          </div>
          <h1 className="haws-hero-title haws-gradient-text">
            YOUR SITE.<br />48 HOURS.
          </h1>
          <p className="haws-hero-sub">
            Professional websites for Houston small businesses.
            Custom-built, mobile-ready, and delivered faster than
            any agency in the city.
          </p>
          <div className="haws-hero-ctas">
            <button
              className="haws-btn-primary"
              onClick={() => window.location.href = "tel:8329327483"}
            >
              GET FREE MOCKUP
            </button>
            <button className="haws-btn-secondary">
              SEE OUR WORK ↓
            </button>
          </div>
          <p className="haws-price-badge">
            Starting at <span>$199</span> · No hidden fees · Yours after delivery
          </p>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee />

      {/* ── STICKY ORB ── */}
      <StickyOrb />

      {/* ── SERVICES ── */}
      <section className="haws-section">
        <div className="haws-section-label">What We Do</div>
        <h2 className="haws-section-title haws-gradient-text">
          EVERYTHING YOUR<br />SITE NEEDS
        </h2>
        <p className="haws-section-sub">
          From design to launch, we handle every detail so you can
          focus on running your business.
        </p>
        <div className="haws-cards-grid">
          {SERVICES.map((s, i) => (
            <div key={i} className="haws-card">
              <span className="haws-card-icon">{s.icon}</span>
              <div className="haws-card-num">0{i + 1}</div>
              <div className="haws-card-title">{s.title}</div>
              <div className="haws-card-desc">{s.desc}</div>
              <div className="haws-card-arrow">→</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="haws-section" style={{ paddingTop: 0 }}>
        <div className="haws-stats-grid">
          {STATS.map((s, i) => (
            <div key={i} className="haws-stat">
              <span className={`haws-stat-num ${s.color}`}>
                <Counter target={s.num} suffix={s.suffix} />
              </span>
              <span className="haws-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── RING CTA ── */}
      <section className="haws-cta-section">
        <div className="haws-ring haws-ring-1" />
        <div className="haws-ring haws-ring-2" />
        <div className="haws-ring haws-ring-3" />
        <div className="haws-ring haws-ring-4" />
        <div className="haws-cta-content">
          <p className="haws-cta-italic">Ready when you are.</p>
          <h2 className="haws-cta-title haws-gradient-text">
            LET'S BUILD<br />YOUR SITE.
          </h2>
          <a className="haws-cta-phone" href="tel:8329327483">
            832-932-7483
          </a>
          <p className="haws-cta-tagline">
            FREE MOCKUP · NO OBLIGATION · 48-HOUR DELIVERY
          </p>
          <button
            className="haws-btn-primary"
            onClick={() => window.location.href = "tel:8329327483"}
          >
            CALL OR TEXT NOW
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <div className="haws-footer">
          <div className="haws-footer-logo">HOUSTON AI WEB STUDIO</div>
          <div className="haws-footer-copy">
            © {new Date().getFullYear()} · Baytown, TX · houstonaiwebstudio.com
          </div>
        </div>
      </footer>
    </div>
  );
}
