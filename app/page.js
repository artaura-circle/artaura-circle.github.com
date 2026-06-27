'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Menu, X, Mail, MapPin, Phone, Instagram, Facebook,
  Twitter, Calendar, Clock, Award, Quote, Send, Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

const LOGO_URL = 'https://customer-assets.emergentagent.com/job_9ba9acfc-99a8-4811-ba63-ab2fea2990fe/artifacts/46or4hrf_image.png';

const IMG = {
  hero: 'https://images.unsplash.com/photo-1561211950-8b1eb6114d6a?w=1800&q=85',
  art: [
    'https://images.unsplash.com/photo-1620121684840-edffcfc4b878?w=1200&q=85',
    'https://images.unsplash.com/photo-1602464729960-f95937746b68?w=1200&q=85',
    'https://images.unsplash.com/photo-1709377195538-5522ed0f9e10?w=1200&q=85',
    'https://images.unsplash.com/photo-1725794953948-5f38ad69d7f7?w=1200&q=85',
    'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1200&q=85',
    'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=1200&q=85',
  ],
  collections: [
    'https://images.unsplash.com/photo-1680456265112-e4115432ef23?w=1400&q=85',
    'https://images.unsplash.com/photo-1533208087231-c3618eab623c?w=1400&q=85',
    'https://images.unsplash.com/photo-1549817417-ba621645cbae?w=1400&q=85',
  ],
  workshops: [
    'https://images.unsplash.com/photo-1459908676235-d5f02a50184b?w=1400&q=85',
    'https://images.unsplash.com/photo-1644375391877-0ae77eeed8fc?w=1400&q=85',
    'https://images.unsplash.com/photo-1613746203812-717e6e5db3da?w=1400&q=85',
  ],
  journal: [
    'https://images.unsplash.com/photo-1663047617262-6edc28d503c6?w=1400&q=85',
    'https://images.unsplash.com/photo-1649479435119-1d987ed1ae36?w=1400&q=85',
    'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=1400&q=85',
  ],
  about: 'https://images.unsplash.com/photo-1675425206468-dc196f6decdc?w=1600&q=85',
};

const ARTWORKS = [
  { id: 'a1', title: 'Ember Reverie', medium: 'Oil on linen', year: 2024, dimensions: '120 × 90 cm', img: IMG.art[0], price: '$3,400', collection: 'Embers', desc: 'A meditation on warm dusk light moving across pigment — layers of ochre and burnt sienna folded into quiet rhythm.' },
  { id: 'a2', title: 'Threshold I', medium: 'Mixed media on paper', year: 2024, dimensions: '70 × 100 cm', img: IMG.art[1], price: '$1,950', collection: 'Quiet Geometries', desc: 'A study of the moment between attention and reverie — pencil, graphite and watercolour washes.' },
  { id: 'a3', title: 'Sienna Hours', medium: 'Acrylic on canvas', year: 2023, dimensions: '150 × 110 cm', img: IMG.art[2], price: '$4,200', collection: 'Embers', desc: 'Hand-mixed pigments and slow drying time render an atmosphere of late afternoon stillness.' },
  { id: 'a4', title: 'Folded Light', medium: 'Watercolour', year: 2024, dimensions: '56 × 76 cm', img: IMG.art[3], price: '$1,250', collection: 'Soft Cartography', desc: 'A folded landscape — terrain treated as fabric, pressed and warmed by sun.' },
  { id: 'a5', title: 'Aurora, Distant', medium: 'Oil & wax', year: 2023, dimensions: '90 × 90 cm', img: IMG.art[4], price: '$2,800', collection: 'Soft Cartography', desc: 'Encaustic finish over slow oil glazes; the surface holds a quiet glow.' },
  { id: 'a6', title: 'Untitled (Brushwork Study)', medium: 'Ink on rice paper', year: 2024, dimensions: '40 × 60 cm', img: IMG.art[5], price: '$780', collection: 'Quiet Geometries', desc: 'A gesture captured in a single breath. Made in the studio at first light.' },
];

const COLLECTIONS = [
  { id: 'c1', name: 'Embers', tagline: 'Warm light, slow time', count: 14, img: IMG.collections[0], year: 2024, desc: 'A series exploring the warmth that persists after a long day — oils, ochres and the colour of remembered evenings.' },
  { id: 'c2', name: 'Soft Cartography', tagline: 'Maps of feeling', count: 11, img: IMG.collections[1], year: 2024, desc: 'Landscapes treated as memory. Each piece in this collection is an attempt to draw something the body already knows.' },
  { id: 'c3', name: 'Quiet Geometries', tagline: 'Restraint as practice', count: 9, img: IMG.collections[2], year: 2023, desc: 'A minimal study in line, plane and pause. Works on paper made over a single winter in the studio.' },
];

const WORKSHOPS = [
  { id: 'w1', title: 'Watercolour for Stillness', date: 'Sat, 12 Jul 2025', time: '10:00 — 16:00', spots: 8, level: 'All levels', price: '$180', img: IMG.workshops[0], past: false, desc: 'A one-day workshop on slow watercolour technique. Includes materials, lunch and an afternoon studio tea.' },
  { id: 'w2', title: 'The Loose Brush', date: 'Sun, 03 Aug 2025', time: '11:00 — 17:00', spots: 6, level: 'Intermediate', price: '$220', img: IMG.workshops[1], past: false, desc: 'An exploration of gestural brushwork in acrylic and ink. Bring a small notebook and a willingness to make a mess.' },
  { id: 'w3', title: 'Pigment & Paper', date: 'Sat, 24 Aug 2025', time: '10:00 — 15:00', spots: 10, level: 'Beginner', price: '$140', img: IMG.workshops[2], past: false, desc: 'Hand-mixing pigments and preparing paper. A grounding session for those new to the craft.' },
  { id: 'w4', title: 'Winter Studio Intensive', date: 'Jan 2025', time: '3 days', spots: 0, level: 'Advanced', price: '$520', img: IMG.workshops[0], past: true, desc: 'Three days in the studio, working at scale. Completed cohort of 8.' },
];

const POSTS = [
  { id: 'b1', title: 'On the Discipline of Looking', category: 'Studio Notes', read: '6 min', date: '12 May 2025', img: IMG.journal[0], excerpt: 'How a single hour of sustained attention reshaped my approach to colour this season.' },
  { id: 'b2', title: 'Letters from the Studio', category: 'Journal', read: '4 min', date: '28 Apr 2025', img: IMG.journal[1], excerpt: 'Notes written between paintings — on rhythm, light, and the small rituals that hold a practice together.' },
  { id: 'b3', title: 'A Vocabulary of Earth Pigments', category: 'Craft', read: '9 min', date: '04 Apr 2025', img: IMG.journal[2], excerpt: 'From iron oxide to burnt sienna — a working glossary of the colours that built this body of work.' },
];

const TESTIMONIALS = [
  { quote: 'Her work feels lived-in. Each canvas holds a hush — like an afternoon you remember without quite knowing why.', name: 'Imani Okafor', role: 'Curator, North & Field' },
  { quote: 'The workshop was less a class and more a small reset. I left with a sketchbook and a clearer way of seeing.', name: 'Daniel Reyes', role: 'Workshop attendee' },
  { quote: 'A studio practice of unusual honesty. ARTAURA\u2019s collections quietly belong in any thoughtful collection.', name: 'Ellis Marchetti', role: 'Editor, Slowform Magazine' },
];

const TIMELINE = [
  { year: '2016', text: 'First studio established in a converted ceramics workshop.' },
  { year: '2018', text: 'Solo exhibition at North & Field — "Soft Cartography".' },
  { year: '2020', text: 'Founded the ARTAURA workshops; first cohort of twelve.' },
  { year: '2022', text: 'Awarded the Slowform Prize for emerging painters.' },
  { year: '2024', text: 'Released "Embers" — a sold-out series of fourteen works.' },
];

const NAV = ['Home', 'Gallery', 'Collections', 'Workshops', 'Journal', 'About', 'Contact'];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.08 } }),
};

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} custom={delay} className={className}>
      {children}
    </motion.div>
  );
}

function Ornament({ className = '' }) {
  return (
    <div className={`ornament ${className}`}>
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
        <path d="M3 7 L7 3 L11 7 L7 11 Z M9 7 L13 3 L17 7 L13 11 Z" stroke="currentColor" strokeWidth="0.8" />
      </svg>
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div className="flex items-center gap-3 text-sienna-200 uppercase tracking-[0.32em] text-xs font-medium">
      <span className="h-px w-8 bg-sienna-200/60" />
      <span>{children}</span>
    </div>
  );
}

function Brushstrokes({ variant = 'a' }) {
  if (variant === 'a') {
    return (
      <svg className="brush-stroke" width="800" height="600" viewBox="0 0 800 600" style={{ top: -40, left: -120 }} aria-hidden>
        <defs>
          <linearGradient id="bg1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#E5A781" stopOpacity="0.7" />
            <stop offset="1" stopColor="#C97F58" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        <path d="M120 60 C 220 200, 180 400, 260 540 C 280 560, 300 560, 320 540 C 360 480, 340 280, 280 120 C 260 60, 180 40, 120 60 Z" fill="url(#bg1)" />
        <path d="M380 90 C 460 220, 440 380, 500 520 C 520 540, 540 540, 560 520 C 600 460, 580 280, 520 140 C 500 80, 420 60, 380 90 Z" fill="#D89A78" opacity="0.35" />
      </svg>
    );
  }
  return (
    <svg className="brush-stroke" width="700" height="500" viewBox="0 0 700 500" style={{ bottom: -40, right: -80 }} aria-hidden>
      <path d="M80 100 C 200 220, 180 360, 260 460 C 280 480, 320 480, 340 460 C 380 400, 360 240, 280 120 C 240 80, 140 60, 80 100 Z" fill="#EFCDB0" opacity="0.55" />
    </svg>
  );
}

function Nav({ current, setCurrent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const go = (p) => { setCurrent(p); setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream-100/85 backdrop-blur-md border-b border-sienna-100/40' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between py-4">
        <button onClick={() => go('Home')} className="flex items-center gap-3" aria-label="ARTAURA home">
          <img src={LOGO_URL} alt="" width={44} height={44} style={{ mixBlendMode: 'multiply' }} />
          <span className="hidden sm:block font-display text-2xl tracking-wide text-sienna-500">ARTAURA</span>
        </button>
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <button key={n} onClick={() => go(n)} className={`link-underline text-sm tracking-wide ${current === n ? 'text-sienna-500 font-medium' : 'text-sienna-300'}`}>{n}</button>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button onClick={() => go('Contact')} variant="outline" className="border-sienna-500 text-sienna-500 hover:bg-sienna-500 hover:text-cream-100 rounded-full px-5">
            Visit Studio <ArrowUpRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
        <button className="md:hidden text-sienna-500" onClick={() => setOpen(true)} aria-label="Menu"><Menu /></button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-cream-100 paper-texture">
            <div className="container flex items-center justify-between py-5">
              <img src={LOGO_URL} alt="" width={48} height={48} style={{ mixBlendMode: 'multiply' }} />
              <button onClick={() => setOpen(false)} className="text-sienna-500" aria-label="Close"><X /></button>
            </div>
            <div className="container mt-10 flex flex-col gap-6">
              {NAV.map((n, i) => (
                <motion.button key={n} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.05 * i } }} onClick={() => go(n)} className="text-left font-display text-4xl text-sienna-500">{n}</motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero({ setCurrent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 pb-20">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={IMG.hero} alt="Featured artwork" className="h-full w-full object-cover" style={{ filter: 'saturate(0.85) brightness(1.05)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-100/85 to-cream-100/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/70 via-cream-100/40 to-cream-100" />
      </motion.div>
      <Brushstrokes variant="a" />
      <div className="container relative z-10 grid lg:grid-cols-12 gap-10 items-end min-h-[80svh] pt-10">
        <div className="lg:col-span-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <SectionLabel>Contemporary Art Collective · est. 2016</SectionLabel>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, delay: 0.15 }} className="mt-6 font-display text-[44px] leading-[1.02] sm:text-6xl lg:text-[88px] text-sienna-500">
            Art that <em className="font-script text-terracotta-600 not-italic">Inspires.</em><br />
            Stories that <span className="italic text-sienna-300">Last.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="mt-8 max-w-xl text-sienna-300 text-lg leading-relaxed">
            An art collective and creative studio devoted to slow craftsmanship, warm pigment and quiet storytelling — exhibited, taught and journaled from a single studio.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.7 }} className="mt-10 flex flex-wrap gap-4">
            <Button onClick={() => setCurrent('Gallery')} className="bg-sienna-500 hover:bg-sienna-600 text-cream-100 rounded-full px-7 py-6 text-base">
              Explore Gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button onClick={() => setCurrent('Workshops')} variant="outline" className="border-sienna-300 text-sienna-500 hover:bg-cream-200 rounded-full px-7 py-6 text-base">
              View Workshops
            </Button>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 0.8 }} className="lg:col-span-4 hidden lg:flex flex-col items-end gap-4 text-right">
          <div className="max-w-[260px] border-l border-sienna-200/60 pl-5">
            <p className="font-script text-2xl text-terracotta-600">— from the studio</p>
            <p className="mt-3 text-sm text-sienna-300 leading-relaxed">Every piece begins with a single mark. We work in small batches, in natural light, with hand-mixed pigment and unhurried attention.</p>
          </div>
          <div className="mt-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-sienna-200"><span>scroll</span><span className="h-px w-12 bg-sienna-200" /></div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCollections({ setCurrent, setActiveCollection }) {
  return (
    <section className="relative py-24 lg:py-32 paper-texture">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <SectionLabel>Featured Collections</SectionLabel>
            <Reveal><h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-2xl leading-tight">Bodies of work, built slowly over seasons.</h2></Reveal>
          </div>
          <Reveal delay={0.2}><button onClick={() => setCurrent('Collections')} className="link-underline text-sienna-300 text-sm tracking-[0.2em] uppercase">All Collections →</button></Reveal>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {COLLECTIONS.map((c, i) => (
            <Reveal key={c.id} delay={i}>
              <button onClick={() => { setActiveCollection(c.id); setCurrent('Collections'); }} className="group text-left w-full">
                <div className="art-zoom relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-200">
                  <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-sienna-700/40 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-cream-100">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-80">{c.count} works · {c.year}</p>
                    <p className="font-display text-3xl mt-1">{c.name}</p>
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <p className="text-sienna-300 italic">{c.tagline}</p>
                  <ArrowUpRight className="h-5 w-5 text-sienna-300 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedArtwork({ setCurrent, setActiveArt }) {
  return (
    <section className="relative py-24 lg:py-32 bg-cream-200 overflow-hidden">
      <Brushstrokes variant="b" />
      <div className="container relative">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <SectionLabel>Featured Artwork</SectionLabel>
            <Reveal><h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-2xl leading-tight">Pieces currently on view.</h2></Reveal>
          </div>
          <Reveal delay={0.2}><button onClick={() => setCurrent('Gallery')} className="link-underline text-sienna-300 text-sm tracking-[0.2em] uppercase">Visit the Gallery →</button></Reveal>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {ARTWORKS.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.5}>
              <button onClick={() => { setActiveArt(a.id); setCurrent('Gallery'); }} className="group block text-left w-full">
                <div className="art-zoom relative aspect-[3/4] rounded-sm overflow-hidden bg-cream-300">
                  <img src={a.img} alt={a.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-sienna-700/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-cream-100 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-80">{a.medium} · {a.year}</p>
                    <p className="font-display text-2xl">{a.title}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="font-display text-lg text-sienna-500">{a.title}</p>
                  <p className="text-sm text-sienna-200">{a.price}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function WorkshopsPreview({ setCurrent }) {
  const upcoming = WORKSHOPS.filter((w) => !w.past).slice(0, 3);
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <SectionLabel>Workshops</SectionLabel>
            <Reveal><h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-2xl leading-tight">Spend a day inside the studio.</h2></Reveal>
          </div>
          <Reveal delay={0.2}><button onClick={() => setCurrent('Workshops')} className="link-underline text-sienna-300 text-sm tracking-[0.2em] uppercase">All Workshops →</button></Reveal>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {upcoming.map((w, i) => (
            <Reveal key={w.id} delay={i}>
              <article className="group bg-cream-50 rounded-sm border border-sienna-100/40 overflow-hidden hover:shadow-[0_30px_60px_-30px_rgba(90,50,32,0.25)] transition-shadow">
                <div className="art-zoom aspect-[5/4] overflow-hidden"><img src={w.img} alt={w.title} className="h-full w-full object-cover" /></div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-sienna-200">
                    <Calendar className="h-3.5 w-3.5" />{w.date}
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-sienna-500">{w.title}</h3>
                  <div className="mt-3 flex items-center gap-4 text-sm text-sienna-300">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{w.time}</span>
                    <span>·</span>
                    <span>{w.level}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <p className="font-display text-xl text-terracotta-700">{w.price}</p>
                    <button onClick={() => setCurrent('Workshops')} className="text-sm text-sienna-500 link-underline">Register</button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function JournalPreview({ setCurrent }) {
  return (
    <section className="relative py-24 lg:py-32 bg-cream-200">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <SectionLabel>Artist Journal</SectionLabel>
            <Reveal><h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-2xl leading-tight">Notes from the studio.</h2></Reveal>
          </div>
          <Reveal delay={0.2}><button onClick={() => setCurrent('Journal')} className="link-underline text-sienna-300 text-sm tracking-[0.2em] uppercase">Read the Journal →</button></Reveal>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {POSTS.map((p, i) => (
            <Reveal key={p.id} delay={i}>
              <article className="group cursor-pointer" onClick={() => setCurrent('Journal')}>
                <div className="art-zoom aspect-[4/3] overflow-hidden rounded-sm"><img src={p.img} alt={p.title} className="h-full w-full object-cover" /></div>
                <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-terracotta-700">
                  <span>{p.category}</span><span className="text-sienna-200">·</span><span className="text-sienna-200">{p.read}</span>
                </div>
                <h3 className="mt-3 font-display text-2xl text-sienna-500 group-hover:text-terracotta-700 transition-colors">{p.title}</h3>
                <p className="mt-2 text-sienna-300 leading-relaxed">{p.excerpt}</p>
                <p className="mt-3 text-xs text-sienna-200">{p.date}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % TESTIMONIALS.length), 7000); return () => clearInterval(t); }, []);
  const t = TESTIMONIALS[i];
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <Brushstrokes variant="a" />
      <div className="container relative">
        <Reveal><div className="flex justify-center text-sienna-200"><Ornament /></div></Reveal>
        <Reveal delay={0.2}>
          <AnimatePresence mode="wait">
            <motion.blockquote key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.7 }} className="mt-10 mx-auto max-w-4xl text-center">
              <Quote className="mx-auto h-8 w-8 text-terracotta-400 mb-6" />
              <p className="font-display text-3xl md:text-4xl leading-[1.25] text-sienna-500">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-8"><p className="font-medium text-sienna-500">{t.name}</p><p className="text-sm text-sienna-300">{t.role}</p></footer>
            </motion.blockquote>
          </AnimatePresence>
        </Reveal>
        <div className="mt-10 flex justify-center gap-2">
          {TESTIMONIALS.map((_, idx) => (
            <button key={idx} onClick={() => setI(idx)} className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-10 bg-sienna-500' : 'w-4 bg-sienna-100'}`} aria-label={`Testimonial ${idx + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState('idle');
  const submit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    try {
      const r = await fetch('/api/subscribe', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email }) });
      if (!r.ok) throw new Error();
      setState('done'); setEmail('');
    } catch { setState('error'); }
  };
  return (
    <section className="relative py-24 lg:py-32 bg-sienna-500 text-cream-100 overflow-hidden">
      <div className="absolute inset-0 watercolor-bg opacity-30" />
      <div className="container relative grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <SectionLabel><span className="text-cream-200">The Letter</span></SectionLabel>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl leading-tight">A quarterly note from the studio.</h2>
          <p className="mt-6 text-cream-200/90 max-w-md">Studio notes, early access to new collections, and dates for upcoming workshops. Four issues a year. No noise.</p>
        </Reveal>
        <Reveal delay={0.2}>
          <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="your@email.com" className="bg-cream-100/10 border-cream-100/30 text-cream-100 placeholder:text-cream-200/60 h-14 rounded-full px-6" />
            <Button type="submit" disabled={state === 'loading'} className="bg-cream-100 text-sienna-500 hover:bg-cream-200 h-14 rounded-full px-7">
              {state === 'done' ? (<><Check className="h-4 w-4 mr-2" />Subscribed</>) : state === 'loading' ? 'Sending…' : (<>Subscribe <Send className="h-4 w-4 ml-2" /></>)}
            </Button>
          </form>
          {state === 'error' && <p className="text-sm text-terracotta-300 mt-3">Something went wrong. Try again.</p>}
          {state === 'done' && <p className="text-sm text-cream-200 mt-3 font-script text-xl">Thank you — see you in the letter.</p>}
        </Reveal>
      </div>
    </section>
  );
}

function Footer({ setCurrent }) {
  return (
    <footer className="bg-cream-200 paper-texture pt-20 pb-10">
      <div className="container grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3"><img src={LOGO_URL} alt="ARTAURA" width={56} height={56} style={{ mixBlendMode: 'multiply' }} /><span className="font-display text-3xl text-sienna-500">ARTAURA</span></div>
          <p className="mt-6 max-w-sm text-sienna-300 leading-relaxed">An independent art collective and creative studio. Original work, small-batch collections, and workshops held in a daylit studio.</p>
          <div className="mt-6 flex items-center gap-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="h-10 w-10 rounded-full border border-sienna-200 flex items-center justify-center text-sienna-300 hover:bg-sienna-500 hover:text-cream-100 transition"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </div>
        <div className="lg:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-sienna-200 mb-5">Explore</p>
          <ul className="space-y-3">{NAV.map((n) => (
            <li key={n}><button onClick={() => { setCurrent(n); window.scrollTo({ top: 0 }); }} className="link-underline text-sienna-500">{n}</button></li>
          ))}</ul>
        </div>
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.3em] text-sienna-200 mb-5">Studio</p>
          <ul className="space-y-3 text-sienna-500">
            <li className="flex items-start gap-3"><MapPin className="h-4 w-4 mt-1 text-terracotta-600" /> 14 Willow Lane, Studio 03 · Coastal District</li>
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-terracotta-600" /> hello@artaura.studio</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-terracotta-600" /> +1 (415) 555 0142</li>
          </ul>
        </div>
      </div>
      <div className="container mt-16 pt-8 border-t border-sienna-100/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sienna-200">
        <p>© {new Date().getFullYear()} ARTAURA. All works hand-made with care.</p>
        <p className="font-script text-lg text-terracotta-700">made slowly, in the studio.</p>
      </div>
    </footer>
  );
}

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="relative overflow-hidden">
      <Brushstrokes variant="a" />
      <div className="container relative pt-12">
        <Reveal><SectionLabel>{eyebrow}</SectionLabel></Reveal>
        <Reveal delay={0.1}><h1 className="mt-5 font-display text-5xl md:text-7xl text-sienna-500 leading-[1.05] max-w-4xl">{title}</h1></Reveal>
        {subtitle && <Reveal delay={0.2}><p className="mt-6 text-sienna-300 max-w-2xl leading-relaxed text-lg">{subtitle}</p></Reveal>}
      </div>
    </div>
  );
}

function ArtworkDetail({ art, onBack }) {
  const related = ARTWORKS.filter((a) => a.id !== art.id && a.collection === art.collection).slice(0, 3);
  return (
    <div className="pt-28 pb-24">
      <div className="container">
        <button onClick={onBack} className="text-sm text-sienna-300 link-underline mb-10">← Back to gallery</button>
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            <div className="art-zoom overflow-hidden rounded-sm bg-cream-200">
              <img src={art.img} alt={art.title} className="w-full h-auto object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>{art.collection}</SectionLabel>
            <h1 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 leading-tight">{art.title}</h1>
            <p className="mt-6 text-sienna-300 leading-relaxed">{art.desc}</p>
            <dl className="mt-10 grid grid-cols-2 gap-y-6 text-sm">
              {[['Medium', art.medium], ['Year', art.year], ['Dimensions', art.dimensions], ['Edition', 'Unique']].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-[0.25em] text-sienna-200">{k}</dt>
                  <dd className="mt-1 text-sienna-500">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex items-center justify-between border-t border-sienna-100/60 pt-6">
              <p className="font-display text-3xl text-terracotta-700">{art.price}</p>
              <Button className="bg-sienna-500 hover:bg-sienna-600 text-cream-100 rounded-full px-7">Enquire <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </div>
          </Reveal>
        </div>
        {related.length > 0 && (
          <div className="mt-28">
            <h3 className="font-display text-3xl text-sienna-500 mb-8">Related works from {art.collection}</h3>
            <div className="grid md:grid-cols-3 gap-6">{related.map((r) => (
              <div key={r.id} className="art-zoom overflow-hidden rounded-sm aspect-[3/4]"><img src={r.img} alt={r.title} className="h-full w-full object-cover" /></div>
            ))}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryPage({ activeArt, setActiveArt }) {
  const [filter, setFilter] = useState('All');
  const art = ARTWORKS.find((a) => a.id === activeArt);
  if (art) return <ArtworkDetail art={art} onBack={() => setActiveArt(null)} />;
  const filters = ['All', ...Array.from(new Set(ARTWORKS.map((a) => a.collection)))];
  const list = filter === 'All' ? ARTWORKS : ARTWORKS.filter((a) => a.collection === filter);
  return (
    <div className="pt-32 pb-24">
      <PageHeader eyebrow="Gallery" title="Original works on view." subtitle="A curated selection of paintings, works on paper and studies — each piece available for acquisition or commission." />
      <div className="container mt-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-5 py-2 rounded-full text-sm border transition ${filter === f ? 'bg-sienna-500 text-cream-100 border-sienna-500' : 'border-sienna-200 text-sienna-300 hover:border-sienna-300'}`}>{f}</button>
          ))}
        </div>
        <div className="masonry md:columns-2 lg:columns-3">
          {list.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.3}>
              <button onClick={() => setActiveArt(a.id)} className="group block w-full text-left">
                <div className="art-zoom overflow-hidden rounded-sm">
                  <img src={a.img} alt={a.title} className="w-full h-auto object-cover" style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/5' : '1/1' }} />
                </div>
                <div className="mt-3 flex items-baseline justify-between">
                  <div>
                    <p className="font-display text-xl text-sienna-500">{a.title}</p>
                    <p className="text-xs uppercase tracking-[0.2em] text-sienna-200 mt-1">{a.medium} · {a.year}</p>
                  </div>
                  <p className="text-sm text-terracotta-700">{a.price}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function CollectionsPage({ activeCollection, setActiveCollection, setCurrent, setActiveArt }) {
  if (activeCollection) {
    const c = COLLECTIONS.find((x) => x.id === activeCollection);
    const works = ARTWORKS.filter((a) => a.collection === c.name);
    return (
      <div className="pt-28 pb-24">
        <div className="relative h-[60svh] min-h-[420px] overflow-hidden">
          <img src={c.img} alt={c.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-sienna-700/30 via-sienna-700/20 to-cream-100" />
          <div className="container relative z-10 h-full flex items-end pb-16">
            <div className="text-cream-100">
              <button onClick={() => setActiveCollection(null)} className="text-sm link-underline mb-6">← All collections</button>
              <p className="font-script text-2xl text-terracotta-200">{c.tagline}</p>
              <h1 className="font-display text-6xl lg:text-7xl">{c.name}</h1>
              <p className="mt-3 text-cream-200/90">{c.count} works · {c.year}</p>
            </div>
          </div>
        </div>
        <div className="container mt-16">
          <p className="max-w-2xl text-sienna-300 text-lg leading-relaxed">{c.desc}</p>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">{works.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.3}>
              <button onClick={() => { setActiveArt(a.id); setCurrent('Gallery'); }} className="text-left w-full">
                <div className="art-zoom aspect-[3/4] overflow-hidden rounded-sm"><img src={a.img} alt={a.title} className="h-full w-full object-cover" /></div>
                <p className="mt-3 font-display text-xl text-sienna-500">{a.title}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-sienna-200">{a.medium}</p>
              </button>
            </Reveal>
          ))}</div>
        </div>
      </div>
    );
  }
  return (
    <div className="pt-32 pb-24">
      <PageHeader eyebrow="Collections" title="Bodies of work." subtitle="Each collection is a season, an idea, or a question worked through in pigment and paper." />
      <div className="container mt-16 space-y-24">
        {COLLECTIONS.map((c, i) => (
          <Reveal key={c.id}>
            <div className={`grid lg:grid-cols-12 gap-10 items-center`}>
              <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <button onClick={() => setActiveCollection(c.id)} className="art-zoom block w-full overflow-hidden rounded-sm aspect-[5/3]">
                  <img src={c.img} alt={c.name} className="h-full w-full object-cover" />
                </button>
              </div>
              <div className="lg:col-span-5">
                <SectionLabel>Collection {String(i + 1).padStart(2, '0')}</SectionLabel>
                <h2 className="mt-4 font-display text-5xl text-sienna-500">{c.name}</h2>
                <p className="mt-2 font-script text-2xl text-terracotta-600">{c.tagline}</p>
                <p className="mt-6 text-sienna-300 leading-relaxed">{c.desc}</p>
                <button onClick={() => setActiveCollection(c.id)} className="mt-8 inline-flex items-center gap-2 text-sienna-500 link-underline">View {c.count} works <ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function RegisterModal({ workshop, onClose }) {
  const [form, setForm] = useState({ name: '', email: '' });
  const [state, setState] = useState('idle');
  if (!workshop) return null;
  const submit = async (e) => {
    e.preventDefault(); setState('loading');
    try {
      const r = await fetch('/api/workshops/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ workshopId: workshop.id, ...form }) });
      if (!r.ok) throw new Error(); setState('done');
    } catch { setState('error'); }
  };
  return (
    <AnimatePresence>
      {workshop && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-sienna-700/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
          <motion.div initial={{ opacity: 0, y: 30, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 30, scale: 0.95 }} className="bg-cream-100 max-w-lg w-full rounded-sm p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={onClose} className="float-right text-sienna-300"><X /></button>
            <SectionLabel>Register</SectionLabel>
            <h3 className="mt-4 font-display text-3xl text-sienna-500">{workshop.title}</h3>
            <p className="text-sienna-300 text-sm mt-1">{workshop.date} · {workshop.time}</p>
            {state === 'done' ? (
              <div className="mt-10 text-center">
                <div className="mx-auto h-14 w-14 rounded-full bg-terracotta-100 flex items-center justify-center text-terracotta-700"><Check /></div>
                <p className="mt-4 font-display text-2xl text-sienna-500">You&rsquo;re on the list.</p>
                <p className="font-script text-xl text-terracotta-700 mt-1">See you in the studio.</p>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4">
                <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 bg-cream-50 border-sienna-100" />
                <Input type="email" required placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 bg-cream-50 border-sienna-100" />
                <Button type="submit" disabled={state === 'loading'} className="w-full h-12 bg-sienna-500 hover:bg-sienna-600 text-cream-100 rounded-full">{state === 'loading' ? 'Reserving…' : `Reserve seat · ${workshop.price}`}</Button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function WorkshopsPage() {
  const [selected, setSelected] = useState(null);
  const upcoming = WORKSHOPS.filter((w) => !w.past);
  const past = WORKSHOPS.filter((w) => w.past);
  return (
    <div className="pt-32 pb-24">
      <PageHeader eyebrow="Workshops" title="Days in the studio." subtitle="Small-group workshops held in a daylit studio. All materials, tea and a slow lunch included." />
      <div className="container mt-16">
        <h3 className="font-display text-3xl text-sienna-500 mb-8">Upcoming</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">{upcoming.map((w, i) => (
          <Reveal key={w.id} delay={i}>
            <article className="group bg-cream-50 rounded-sm border border-sienna-100/40 overflow-hidden">
              <div className="art-zoom aspect-[5/4] overflow-hidden"><img src={w.img} alt={w.title} className="h-full w-full object-cover" /></div>
              <div className="p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-sienna-200">
                  <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{w.date}</span>
                  <span>{w.spots} spots</span>
                </div>
                <h4 className="mt-3 font-display text-2xl text-sienna-500">{w.title}</h4>
                <p className="mt-3 text-sienna-300 leading-relaxed text-sm">{w.desc}</p>
                <div className="mt-5 flex items-center justify-between">
                  <p className="font-display text-xl text-terracotta-700">{w.price}</p>
                  <Button onClick={() => setSelected(w)} className="bg-sienna-500 hover:bg-sienna-600 text-cream-100 rounded-full px-5">Register</Button>
                </div>
              </div>
            </article>
          </Reveal>
        ))}</div>
        <h3 className="font-display text-3xl text-sienna-500 mt-24 mb-8">Past sessions</h3>
        <div className="grid md:grid-cols-3 gap-6">{past.map((w) => (
          <div key={w.id} className="opacity-70">
            <div className="art-zoom aspect-[5/4] overflow-hidden rounded-sm grayscale"><img src={w.img} alt={w.title} className="h-full w-full object-cover" /></div>
            <p className="mt-3 font-display text-xl text-sienna-500">{w.title}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-sienna-200">{w.date} · {w.level}</p>
          </div>
        ))}</div>
      </div>
      <RegisterModal workshop={selected} onClose={() => setSelected(null)} />
    </div>
  );
}

function JournalPage() {
  const [active, setActive] = useState(null);
  const cats = ['All', ...Array.from(new Set(POSTS.map((p) => p.category)))];
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? POSTS : POSTS.filter((p) => p.category === cat);
  if (active) {
    const p = POSTS.find((x) => x.id === active);
    return (
      <div className="pt-28 pb-24">
        <div className="container">
          <button onClick={() => setActive(null)} className="text-sm text-sienna-300 link-underline mb-8">← Back to journal</button>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta-700">{p.category} · {p.read} read</p>
            <h1 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 leading-tight">{p.title}</h1>
            <p className="mt-4 text-sm text-sienna-200">{p.date}</p>
          </div>
          <div className="mt-12 art-zoom aspect-[2/1] overflow-hidden rounded-sm max-w-5xl mx-auto"><img src={p.img} alt={p.title} className="h-full w-full object-cover" /></div>
          <div className="mt-12 max-w-2xl mx-auto text-sienna-500 leading-[1.85] space-y-6 text-lg">
            <p className="first-letter:font-display first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:text-terracotta-700">{p.excerpt} The studio is a quiet place at first light. A kettle, a small radio at its softest setting, and a row of jars holding the day&apos;s pigment.</p>
            <p>This week, I returned to a question I keep folding back into the work: what does it mean to look at something for long enough? Long enough to notice the second colour beneath the first, the warmth that hides inside what appeared, on a quick glance, to be plain grey.</p>
            <p>I have been mixing burnt sienna with a little raw umber. It is a colour I keep returning to. Something between a remembered evening and the inside of a clay pot. It is not a colour I can buy from a tube.</p>
            <div className="flex justify-center my-12 text-sienna-200"><Ornament /></div>
            <p>If the practice has taught me anything this season, it is that slowness is a form of attention. And attention is a form of care.</p>
          </div>
          <div className="mt-24 max-w-5xl mx-auto">
            <h3 className="font-display text-3xl text-sienna-500 mb-8">Related posts</h3>
            <div className="grid md:grid-cols-2 gap-8">{POSTS.filter((x) => x.id !== p.id).map((r) => (
              <button key={r.id} onClick={() => { setActive(r.id); window.scrollTo({ top: 0 }); }} className="text-left group">
                <div className="art-zoom aspect-[4/3] overflow-hidden rounded-sm"><img src={r.img} alt={r.title} className="h-full w-full object-cover" /></div>
                <p className="mt-3 font-display text-2xl text-sienna-500 group-hover:text-terracotta-700 transition">{r.title}</p>
              </button>
            ))}</div>
          </div>
        </div>
      </div>
    );
  }
  const featured = POSTS[0];
  return (
    <div className="pt-32 pb-24">
      <PageHeader eyebrow="Artist Journal" title="Letters from the studio." subtitle="Slow writing on pigment, attention, and the practice of a daily studio life." />
      <div className="container mt-16">
        <Reveal>
          <button onClick={() => setActive(featured.id)} className="grid lg:grid-cols-12 gap-10 items-center text-left w-full group">
            <div className="lg:col-span-7 art-zoom aspect-[4/3] overflow-hidden rounded-sm"><img src={featured.img} alt={featured.title} className="h-full w-full object-cover" /></div>
            <div className="lg:col-span-5">
              <Badge className="bg-terracotta-100 text-terracotta-700 border-0 mb-4">Featured</Badge>
              <p className="text-xs uppercase tracking-[0.25em] text-terracotta-700">{featured.category} · {featured.read}</p>
              <h2 className="mt-3 font-display text-5xl text-sienna-500 group-hover:text-terracotta-700 transition">{featured.title}</h2>
              <p className="mt-5 text-sienna-300 leading-relaxed">{featured.excerpt}</p>
              <p className="mt-6 text-sm text-sienna-200">{featured.date}</p>
            </div>
          </button>
        </Reveal>
        <div className="mt-16 flex flex-wrap gap-2">{cats.map((c) => (
          <button key={c} onClick={() => setCat(c)} className={`px-5 py-2 rounded-full text-sm border transition ${cat === c ? 'bg-sienna-500 text-cream-100 border-sienna-500' : 'border-sienna-200 text-sienna-300'}`}>{c}</button>
        ))}</div>
        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">{list.map((p, i) => (
          <Reveal key={p.id} delay={i}>
            <button onClick={() => setActive(p.id)} className="text-left group">
              <div className="art-zoom aspect-[4/3] overflow-hidden rounded-sm"><img src={p.img} alt={p.title} className="h-full w-full object-cover" /></div>
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-terracotta-700">{p.category} · {p.read}</p>
              <h3 className="mt-2 font-display text-2xl text-sienna-500 group-hover:text-terracotta-700 transition">{p.title}</h3>
            </button>
          </Reveal>
        ))}</div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <PageHeader eyebrow="About" title="A studio of patient hands." subtitle="ARTAURA is an art collective founded on the belief that slow looking and slow making are quiet acts of resistance." />
      <div className="container mt-20 grid lg:grid-cols-12 gap-12 items-start">
        <Reveal className="lg:col-span-6">
          <div className="art-zoom rounded-sm overflow-hidden"><img src={IMG.about} alt="Studio" className="w-full h-auto object-cover" /></div>
        </Reveal>
        <Reveal delay={0.2} className="lg:col-span-6 space-y-6 text-sienna-500 leading-[1.85]">
          <p className="font-script text-3xl text-terracotta-700">Begin with a single mark.</p>
          <p>The studio was founded in 2016 in a converted ceramics workshop on Willow Lane. What began as a quiet practice has grown into a collective — original work, a small library of collections, and a steady programme of workshops held throughout the year.</p>
          <p>Our work is made entirely by hand, in small batches, in natural light. We mix our own pigments, prepare our own surfaces, and resist the rush of the digital season. We believe a painting should hold a hush.</p>
          <p>Every piece carries the time it took to make it. That, we think, is the whole of the work.</p>
        </Reveal>
      </div>
      <div className="container mt-28">
        <SectionLabel>Mission</SectionLabel>
        <Reveal><h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-3xl leading-tight">To make and teach work that earns a place on a wall — and stays there for a generation.</h2></Reveal>
      </div>
      <div className="container mt-28">
        <SectionLabel>Timeline</SectionLabel>
        <div className="mt-12 grid lg:grid-cols-5 gap-y-12 gap-x-6">{TIMELINE.map((t, i) => (
          <Reveal key={t.year} delay={i * 0.5}>
            <div className="border-t border-sienna-200 pt-5">
              <p className="font-display text-3xl text-terracotta-700">{t.year}</p>
              <p className="mt-3 text-sienna-300 text-sm leading-relaxed">{t.text}</p>
            </div>
          </Reveal>
        ))}</div>
      </div>
      <div className="container mt-28 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionLabel>Awards & Press</SectionLabel>
          <ul className="mt-8 space-y-5 text-sienna-500">
            {[['Slowform Prize for Emerging Painters', '2022'], ['North & Field Solo Exhibition', '2018, 2021'], ['Featured · Coastal Arts Review', '2023'], ['Editor&rsquo;s Pick · Slowform Magazine', '2024']].map(([t, y]) => (
              <li key={t} className="flex items-center justify-between border-b border-sienna-100/60 pb-4">
                <span className="flex items-center gap-3"><Award className="h-4 w-4 text-terracotta-700" /> <span dangerouslySetInnerHTML={{ __html: t }} /></span>
                <span className="text-sienna-300 text-sm">{y}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionLabel>The Studio</SectionLabel>
          <p className="mt-6 text-sienna-300 leading-relaxed">A daylit room on the second floor of a converted ceramics workshop. Visits are welcome by appointment.</p>
          <div className="mt-6 art-zoom aspect-[4/3] overflow-hidden rounded-sm"><img src={IMG.workshops[0]} alt="Studio" className="h-full w-full object-cover" /></div>
        </div>
      </div>
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState('idle');
  const submit = async (e) => {
    e.preventDefault(); setState('loading');
    try {
      const r = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!r.ok) throw new Error(); setState('done'); setForm({ name: '', email: '', message: '' });
    } catch { setState('error'); }
  };
  return (
    <div className="pt-32 pb-24">
      <PageHeader eyebrow="Contact" title="Say hello." subtitle="Commissions, press, studio visits and gentle conversation — all welcome." />
      <div className="container mt-16 grid lg:grid-cols-12 gap-12">
        <Reveal className="lg:col-span-7">
          <form onSubmit={submit} className="space-y-5 bg-cream-50 p-8 rounded-sm border border-sienna-100/40">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="h-12 bg-cream-100 border-sienna-100" />
              <Input type="email" required placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="h-12 bg-cream-100 border-sienna-100" />
            </div>
            <Textarea required placeholder="What&rsquo;s on your mind?" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="min-h-[180px] bg-cream-100 border-sienna-100" />
            <Button type="submit" disabled={state === 'loading'} className="bg-sienna-500 hover:bg-sienna-600 text-cream-100 rounded-full px-7 h-12">
              {state === 'done' ? (<><Check className="h-4 w-4 mr-2" />Sent</>) : state === 'loading' ? 'Sending…' : (<>Send message <Send className="h-4 w-4 ml-2" /></>)}
            </Button>
            {state === 'done' && <p className="font-script text-xl text-terracotta-700 mt-2">Thank you — we&rsquo;ll reply soon.</p>}
            {state === 'error' && <p className="text-sm text-terracotta-700 mt-2">Something went wrong. Please try again.</p>}
          </form>
        </Reveal>
        <Reveal delay={0.2} className="lg:col-span-5 space-y-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sienna-200">Studio</p>
            <p className="mt-3 text-sienna-500 leading-relaxed">14 Willow Lane, Studio 03<br />Coastal District, 90213</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sienna-200">Hours</p>
            <p className="mt-3 text-sienna-500 leading-relaxed">By appointment · Tue – Sat<br />10:00 — 17:00</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-sienna-200">General</p>
            <p className="mt-3 text-sienna-500">hello@artaura.studio</p>
            <p className="text-sienna-500">+1 (415) 555 0142</p>
          </div>
          <div className="flex items-center gap-3 pt-4">
            {[Instagram, Facebook, Twitter].map((Icon, i) => (
              <a key={i} href="#" className="h-11 w-11 rounded-full border border-sienna-200 flex items-center justify-center text-sienna-300 hover:bg-sienna-500 hover:text-cream-100 transition"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

function App() {
  const [current, setCurrent] = useState('Home');
  const [activeArt, setActiveArt] = useState(null);
  const [activeCollection, setActiveCollection] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [current]);

  return (
    <main className="min-h-screen bg-cream-100">
      <Nav current={current} setCurrent={(p) => { setCurrent(p); setActiveArt(null); setActiveCollection(null); }} />
      <AnimatePresence mode="wait">
        <motion.div key={current + (activeArt || '') + (activeCollection || '')} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}>
          {current === 'Home' && (
            <>
              <Hero setCurrent={setCurrent} />
              <FeaturedCollections setCurrent={setCurrent} setActiveCollection={(id) => { setActiveCollection(id); }} />
              <FeaturedArtwork setCurrent={setCurrent} setActiveArt={setActiveArt} />
              <WorkshopsPreview setCurrent={setCurrent} />
              <JournalPreview setCurrent={setCurrent} />
              <Testimonials />
              <Newsletter />
            </>
          )}
          {current === 'Gallery' && <GalleryPage activeArt={activeArt} setActiveArt={setActiveArt} />}
          {current === 'Collections' && <CollectionsPage activeCollection={activeCollection} setActiveCollection={setActiveCollection} setCurrent={setCurrent} setActiveArt={setActiveArt} />}
          {current === 'Workshops' && <WorkshopsPage />}
          {current === 'Journal' && <JournalPage />}
          {current === 'About' && <AboutPage />}
          {current === 'Contact' && <ContactPage />}
        </motion.div>
      </AnimatePresence>
      <Footer setCurrent={setCurrent} />
    </main>
  );
}

export default App;
