'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight, ArrowUpRight, Menu, X, Mail, MapPin, Phone, Instagram, Facebook,
  Twitter, Calendar, Clock, Award, Quote, ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// ---- Centralized data ----------------------------------------------------
import { site } from '@/data/site';
import { artworks } from '@/data/artworks';
import { collections } from '@/data/collections';
import { workshops } from '@/data/workshops';
import { blogs } from '@/data/blogs';
import { about, timeline, awards, testimonials } from '@/data/about';

// =============================================================================
//  Small reusable building blocks
// =============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.08 },
  }),
};

function Reveal({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={delay}
      className={className}
    >
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

// =============================================================================
//  Navigation
// =============================================================================

function Nav({ current, setCurrent }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll); onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (page) => {
    setCurrent(page);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-cream-100/85 backdrop-blur-md border-b border-sienna-100/40' : 'bg-transparent'}`}>
        <div className="container flex items-center justify-between py-4">
          <button onClick={() => go('Home')} className="flex items-center gap-3" aria-label={`${site.title} home`}>
            <img src={site.logo} alt="" width={44} height={44} style={{ mixBlendMode: 'multiply' }} />
            <span className="hidden sm:block font-display text-2xl tracking-wide text-sienna-500">ARTAURA</span>
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {site.navigation.map((n) => (
              <button
                key={n}
                onClick={() => go(n)}
                className={`link-underline text-sm tracking-wide ${current === n ? 'text-sienna-500 font-medium' : 'text-sienna-300'}`}
              >
                {n}
              </button>
            ))}
          </nav>

          <a
            href={site.contact.instagram}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center gap-2 border border-sienna-500 text-sienna-500 hover:bg-sienna-500 hover:text-cream-100 rounded-full px-5 py-2 text-sm transition"
          >
            <Instagram className="h-4 w-4" />
            Follow
          </a>

          <button className="md:hidden text-sienna-500" onClick={() => setOpen(true)} aria-label="Menu">
            <Menu />
          </button>
        </div>
      </header>

      {/*
        IMPORTANT: The mobile menu lives OUTSIDE the <header> on purpose.
        The header uses `backdrop-blur-md` when scrolled, and `backdrop-filter`
        creates a new containing block for `position: fixed` elements (CSS spec).
        If the menu sits inside the header it would be clipped to the header's
        bounds — that is why we render it as a sibling.
      */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed inset-0 z-[70] overflow-y-auto bg-cream-100"
          >
            <div className="container flex items-center justify-between py-4">
              <img src={site.logo} alt="" width={48} height={48} style={{ mixBlendMode: 'multiply' }} />
              <button onClick={() => setOpen(false)} className="text-sienna-500" aria-label="Close"><X /></button>
            </div>
            <div className="container mt-10 flex flex-col gap-6 pb-12">
              {site.navigation.map((n, i) => (
                <motion.button
                  key={n}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: 0.06 * i, duration: 0.4 } }}
                  onClick={() => go(n)}
                  className="text-left font-display text-4xl text-sienna-500"
                >
                  {n}
                </motion.button>
              ))}
              <a
                href={site.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sienna-300 text-sm"
              >
                <Instagram className="h-4 w-4" /> {site.contact.instagramHandle}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// =============================================================================
//  Home sections
// =============================================================================

function Hero({ setCurrent }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  // Use first artwork image as a soft hero backdrop (so the brand owns it once images are dropped in).
  const heroImage = artworks[0]?.image || site.logo;

  return (
    <section ref={ref} className="relative min-h-[100svh] overflow-hidden pt-28 pb-20">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img src={heroImage} alt="" className="h-full w-full object-cover" style={{ filter: 'saturate(0.85) brightness(1.05)' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-cream-100 via-cream-100/85 to-cream-100/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-100/70 via-cream-100/40 to-cream-100" />
      </motion.div>
      <Brushstrokes variant="a" />

      <div className="container relative z-10 grid lg:grid-cols-12 gap-10 items-end min-h-[80svh] pt-10">
        <div className="lg:col-span-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <SectionLabel>Contemporary Art Collective · est. {site.established}</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.3, delay: 0.15 }}
            className="mt-6 font-display text-[44px] leading-[1.02] sm:text-6xl lg:text-[88px] text-sienna-500"
          >
            Art that <em className="font-script text-terracotta-600 not-italic">Inspires.</em><br />
            Stories that <span className="italic text-sienna-300">Last.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-8 max-w-xl text-sienna-300 text-lg leading-relaxed"
          >
            An art collective and creative studio devoted to slow craftsmanship, warm pigment and quiet storytelling — exhibited, taught and journaled from a single studio.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Button
              onClick={() => setCurrent('Gallery')}
              className="bg-sienna-500 hover:bg-sienna-600 text-cream-100 rounded-full px-7 py-6 text-base"
            >
              Explore Gallery <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => setCurrent('Workshops')}
              variant="outline"
              className="border-sienna-300 text-sienna-500 hover:bg-cream-200 rounded-full px-7 py-6 text-base"
            >
              View Workshops
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="lg:col-span-4 hidden lg:flex flex-col items-end gap-4 text-right"
        >
          <div className="max-w-[260px] border-l border-sienna-200/60 pl-5">
            <p className="font-script text-2xl text-terracotta-600">— from the studio</p>
            <p className="mt-3 text-sm text-sienna-300 leading-relaxed">
              Every piece begins with a single mark. We work in small batches, in natural light, with hand-mixed pigment and unhurried attention.
            </p>
          </div>
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
            <Reveal>
              <h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-2xl leading-tight">
                Bodies of work, built slowly over seasons.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <button onClick={() => setCurrent('Collections')} className="link-underline text-sienna-300 text-sm tracking-[0.2em] uppercase">
              All Collections →
            </button>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={i}>
              <button
                onClick={() => { setActiveCollection(c.id); setCurrent('Collections'); }}
                className="group text-left w-full"
              >
                <div className="art-zoom relative aspect-[4/5] overflow-hidden rounded-sm bg-cream-200">
                  <img src={c.cover} alt={c.name} className="h-full w-full object-cover" />
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
            <Reveal>
              <h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-2xl leading-tight">
                Pieces currently on view.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <button onClick={() => setCurrent('Gallery')} className="link-underline text-sienna-300 text-sm tracking-[0.2em] uppercase">
              Visit the Gallery →
            </button>
          </Reveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {artworks.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.5}>
              <button
                onClick={() => { setActiveArt(a.id); setCurrent('Gallery'); }}
                className="group block text-left w-full"
              >
                <div className="art-zoom relative aspect-[3/4] rounded-sm overflow-hidden bg-cream-300">
                  <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-sienna-700/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-cream-100 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-80">{a.medium} · {a.year}</p>
                    <p className="font-display text-2xl">{a.title}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="font-display text-lg text-sienna-500">{a.title}</p>
                  <p className="text-xs text-sienna-200 uppercase tracking-[0.2em] mt-0.5">{a.medium} · {a.year}</p>
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
  const upcoming = workshops.filter((w) => !w.past).slice(0, 3);
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <SectionLabel>Workshops</SectionLabel>
            <Reveal>
              <h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-2xl leading-tight">
                Spend a day inside the studio.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <button onClick={() => setCurrent('Workshops')} className="link-underline text-sienna-300 text-sm tracking-[0.2em] uppercase">
              All Workshops →
            </button>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {upcoming.map((w, i) => (
            <Reveal key={w.id} delay={i}>
              <article className="group bg-cream-50 rounded-sm border border-sienna-100/40 overflow-hidden hover:shadow-[0_30px_60px_-30px_rgba(90,50,32,0.25)] transition-shadow">
                <div className="art-zoom aspect-[5/4] overflow-hidden">
                  <img src={w.cover} alt={w.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-sienna-200">
                    <Calendar className="h-3.5 w-3.5" />{w.date}
                  </div>
                  <h3 className="mt-3 font-display text-2xl text-sienna-500">{w.title}</h3>
                  <div className="mt-3 flex items-center gap-4 text-sm text-sienna-300">
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{w.duration}</span>
                  </div>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-sm text-sienna-300">{w.level}</span>
                    <button onClick={() => setCurrent('Workshops')} className="text-sm text-sienna-500 link-underline">View details →</button>
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

function BlogPreview({ setCurrent }) {
  return (
    <section className="relative py-24 lg:py-32 bg-cream-200">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <SectionLabel>From the Blog</SectionLabel>
            <Reveal>
              <h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-2xl leading-tight">
                Notes from the studio.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <button onClick={() => setCurrent('Blog')} className="link-underline text-sienna-300 text-sm tracking-[0.2em] uppercase">
              Read the Blog →
            </button>
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {blogs.map((p, i) => (
            <Reveal key={p.id} delay={i}>
              <article className="group cursor-pointer" onClick={() => setCurrent('Blog')}>
                <div className="art-zoom aspect-[4/3] overflow-hidden rounded-sm">
                  <img src={p.cover} alt={p.title} className="h-full w-full object-cover" />
                </div>
                <div className="mt-5 flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-terracotta-700">
                  <span>{p.category}</span>
                  <span className="text-sienna-200">·</span>
                  <span className="text-sienna-200">{p.readingTime}</span>
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
  useEffect(() => {
    const t = setInterval(() => setI((x) => (x + 1) % testimonials.length), 7000);
    return () => clearInterval(t);
  }, []);
  const t = testimonials[i];
  return (
    <section className="relative py-28 lg:py-36 overflow-hidden">
      <Brushstrokes variant="a" />
      <div className="container relative">
        <Reveal>
          <div className="flex justify-center text-sienna-200"><Ornament /></div>
        </Reveal>
        <Reveal delay={0.2}>
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.7 }}
              className="mt-10 mx-auto max-w-4xl text-center"
            >
              <Quote className="mx-auto h-8 w-8 text-terracotta-400 mb-6" />
              <p className="font-display text-3xl md:text-4xl leading-[1.25] text-sienna-500">&ldquo;{t.quote}&rdquo;</p>
              <footer className="mt-8">
                <p className="font-medium text-sienna-500">{t.name}</p>
                <p className="text-sm text-sienna-300">{t.role}</p>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </Reveal>
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? 'w-10 bg-sienna-500' : 'w-4 bg-sienna-100'}`}
              aria-label={`Testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// =============================================================================
//  Footer — also serves as the site's contact panel (no contact page)
// =============================================================================

function Footer({ setCurrent }) {
  const socials = [
    { Icon: Instagram, href: site.social.instagram },
    site.social.facebook ? { Icon: Facebook, href: site.social.facebook } : null,
    site.social.twitter ? { Icon: Twitter, href: site.social.twitter } : null,
  ].filter(Boolean);

  return (
    <footer id="contact" className="bg-cream-200 paper-texture pt-20 pb-10">
      <div className="container grid lg:grid-cols-12 gap-12">
        {/* Brand + tagline */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3">
            <img src={site.logo} alt={site.title} width={56} height={56} style={{ mixBlendMode: 'multiply' }} />
            <span className="font-display text-3xl text-sienna-500">ARTAURA</span>
          </div>
          <p className="mt-6 max-w-sm text-sienna-300 leading-relaxed">
            An independent art collective and creative studio. Original work, small-batch collections, and workshops held in a daylit studio.
          </p>
          <div className="mt-6 flex items-center gap-4">
            {socials.map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="h-10 w-10 rounded-full border border-sienna-200 flex items-center justify-center text-sienna-300 hover:bg-sienna-500 hover:text-cream-100 transition"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="lg:col-span-3">
          <p className="text-xs uppercase tracking-[0.3em] text-sienna-200 mb-5">Explore</p>
          <ul className="space-y-3">
            {site.navigation.map((n) => (
              <li key={n}>
                <button
                  onClick={() => { setCurrent(n); window.scrollTo({ top: 0 }); }}
                  className="link-underline text-sienna-500"
                >
                  {n}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact details (replaces the Contact page) */}
        <div className="lg:col-span-4">
          <p className="text-xs uppercase tracking-[0.3em] text-sienna-200 mb-5">Get in touch</p>
          <ul className="space-y-4 text-sienna-500">
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-terracotta-600 shrink-0" />
              <a href={`tel:${site.contact.phone.replace(/\s+/g, '')}`} className="link-underline">{site.contact.phone}</a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-terracotta-600 shrink-0" />
              <a href={`mailto:${site.contact.email}`} className="link-underline">{site.contact.email}</a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="h-4 w-4 text-terracotta-600 shrink-0" />
              <a href={site.contact.instagram} target="_blank" rel="noreferrer" className="link-underline">
                {site.contact.instagramHandle}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-sienna-300 pt-2">
              <MapPin className="h-4 w-4 mt-0.5 text-terracotta-600 shrink-0" />
              <span>{site.footer.address}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mt-16 pt-8 border-t border-sienna-100/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sienna-200">
        <p>© {new Date().getFullYear()} {site.artistName}. All works hand-made with care.</p>
        <p className="font-script text-lg text-terracotta-700">{site.footer.note}</p>
      </div>
    </footer>
  );
}

// =============================================================================
//  Shared page header
// =============================================================================

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="relative overflow-hidden">
      <Brushstrokes variant="a" />
      <div className="container relative pt-12">
        <Reveal><SectionLabel>{eyebrow}</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-5 font-display text-5xl md:text-7xl text-sienna-500 leading-[1.05] max-w-4xl">{title}</h1>
        </Reveal>
        {subtitle && (
          <Reveal delay={0.2}>
            <p className="mt-6 text-sienna-300 max-w-2xl leading-relaxed text-lg">{subtitle}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

// =============================================================================
//  Gallery
// =============================================================================

function ArtworkDetail({ art, onBack }) {
  const related = artworks.filter((a) => a.id !== art.id && a.collection === art.collection).slice(0, 3);
  return (
    <div className="pt-28 pb-24">
      <div className="container">
        <button onClick={onBack} className="text-sm text-sienna-300 link-underline mb-10">← Back to gallery</button>
        <div className="grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-7">
            <div className="art-zoom overflow-hidden rounded-sm bg-cream-200">
              <img src={art.image} alt={art.title} className="w-full h-auto object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <SectionLabel>{art.collection}</SectionLabel>
            <h1 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 leading-tight">{art.title}</h1>
            <p className="mt-6 text-sienna-300 leading-relaxed">{art.description}</p>
            <dl className="mt-10 grid grid-cols-2 gap-y-6 text-sm">
              {[
                ['Medium', art.medium],
                ['Year', art.year],
                ['Dimensions', art.dimensions],
                ['Collection', art.collection],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-xs uppercase tracking-[0.25em] text-sienna-200">{k}</dt>
                  <dd className="mt-1 text-sienna-500">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {related.length > 0 && (
          <div className="mt-28">
            <h3 className="font-display text-3xl text-sienna-500 mb-8">Related works from {art.collection}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <div key={r.id} className="art-zoom overflow-hidden rounded-sm aspect-[3/4]">
                  <img src={r.image} alt={r.title} className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function GalleryPage({ activeArt, setActiveArt }) {
  const [filter, setFilter] = useState('All');
  const art = artworks.find((a) => a.id === activeArt);
  if (art) return <ArtworkDetail art={art} onBack={() => setActiveArt(null)} />;

  const filters = ['All', ...Array.from(new Set(artworks.map((a) => a.collection)))];
  const list = filter === 'All' ? artworks : artworks.filter((a) => a.collection === filter);

  return (
    <div className="pt-32 pb-24">
      <PageHeader
        eyebrow="Gallery"
        title="Original works on view."
        subtitle="A curated selection of paintings, works on paper and studies."
      />
      <div className="container mt-12">
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-full text-sm border transition ${
                filter === f
                  ? 'bg-sienna-500 text-cream-100 border-sienna-500'
                  : 'border-sienna-200 text-sienna-300 hover:border-sienna-300'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="masonry md:columns-2 lg:columns-3">
          {list.map((a, i) => (
            <Reveal key={a.id} delay={i * 0.3}>
              <button onClick={() => setActiveArt(a.id)} className="group block w-full text-left">
                <div className="art-zoom overflow-hidden rounded-sm">
                  <img
                    src={a.image}
                    alt={a.title}
                    className="w-full h-auto object-cover"
                    style={{ aspectRatio: i % 3 === 0 ? '3/4' : i % 3 === 1 ? '4/5' : '1/1' }}
                  />
                </div>
                <div className="mt-3">
                  <p className="font-display text-xl text-sienna-500">{a.title}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-sienna-200 mt-1">{a.medium} · {a.year}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
//  Collections
// =============================================================================

function CollectionsPage({ activeCollection, setActiveCollection, setCurrent, setActiveArt }) {
  if (activeCollection) {
    const c = collections.find((x) => x.id === activeCollection);
    const works = artworks.filter((a) => a.collection === c.name);
    return (
      <div className="pt-28 pb-24">
        <div className="relative h-[60svh] min-h-[420px] overflow-hidden">
          <img src={c.cover} alt={c.name} className="absolute inset-0 h-full w-full object-cover" />
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
          <p className="max-w-2xl text-sienna-300 text-lg leading-relaxed">{c.description}</p>
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {works.map((a, i) => (
              <Reveal key={a.id} delay={i * 0.3}>
                <button
                  onClick={() => { setActiveArt(a.id); setCurrent('Gallery'); }}
                  className="text-left w-full"
                >
                  <div className="art-zoom aspect-[3/4] overflow-hidden rounded-sm">
                    <img src={a.image} alt={a.title} className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-3 font-display text-xl text-sienna-500">{a.title}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-sienna-200">{a.medium} · {a.year}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <PageHeader
        eyebrow="Collections"
        title="Bodies of work."
        subtitle="Each collection is a season, an idea, or a question worked through in pigment and paper."
      />
      <div className="container mt-16 space-y-24">
        {collections.map((c, i) => (
          <Reveal key={c.id}>
            <div className="grid lg:grid-cols-12 gap-10 items-center">
              <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <button
                  onClick={() => setActiveCollection(c.id)}
                  className="art-zoom block w-full overflow-hidden rounded-sm aspect-[5/3]"
                >
                  <img src={c.cover} alt={c.name} className="h-full w-full object-cover" />
                </button>
              </div>
              <div className="lg:col-span-5">
                <SectionLabel>Collection {String(i + 1).padStart(2, '0')}</SectionLabel>
                <h2 className="mt-4 font-display text-5xl text-sienna-500">{c.name}</h2>
                <p className="mt-2 font-script text-2xl text-terracotta-600">{c.tagline}</p>
                <p className="mt-6 text-sienna-300 leading-relaxed">{c.description}</p>
                <button
                  onClick={() => setActiveCollection(c.id)}
                  className="mt-8 inline-flex items-center gap-2 text-sienna-500 link-underline"
                >
                  View {c.count} works <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

// =============================================================================
//  Workshops — Register opens Google Form in a new tab
// =============================================================================

function WorkshopsPage() {
  const upcoming = workshops.filter((w) => !w.past);
  const past = workshops.filter((w) => w.past);

  return (
    <div className="pt-32 pb-24">
      <PageHeader
        eyebrow="Workshops"
        title="Days in the studio."
        subtitle="Small-group workshops held in a daylit studio. Registration is handled via a quick Google Form."
      />
      <div className="container mt-16">
        <h3 className="font-display text-3xl text-sienna-500 mb-8">Upcoming</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.map((w, i) => (
            <Reveal key={w.id} delay={i}>
              <article className="group bg-cream-50 rounded-sm border border-sienna-100/40 overflow-hidden flex flex-col">
                <div className="art-zoom aspect-[5/4] overflow-hidden">
                  <img src={w.cover} alt={w.title} className="h-full w-full object-cover" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs uppercase tracking-[0.25em] text-sienna-200">
                    <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{w.date}</span>
                    <span>{w.level}</span>
                  </div>
                  <h4 className="mt-3 font-display text-2xl text-sienna-500">{w.title}</h4>
                  <p className="mt-3 text-sienna-300 leading-relaxed text-sm flex-1">{w.description}</p>
                  <ul className="mt-5 space-y-1.5 text-sm text-sienna-300">
                    <li className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 text-terracotta-600" />{w.duration}</li>
                    <li className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 text-terracotta-600" />{w.location}</li>
                  </ul>
                  <a
                    href={w.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-sienna-500 hover:bg-sienna-600 text-cream-100 rounded-full px-5 py-3 text-sm transition"
                  >
                    Register <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {past.length > 0 && (
          <>
            <h3 className="font-display text-3xl text-sienna-500 mt-24 mb-8">Past sessions</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {past.map((w) => (
                <div key={w.id} className="opacity-70">
                  <div className="art-zoom aspect-[5/4] overflow-hidden rounded-sm grayscale">
                    <img src={w.cover} alt={w.title} className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-3 font-display text-xl text-sienna-500">{w.title}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-sienna-200">{w.date} · {w.level}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// =============================================================================
//  Blog
// =============================================================================

function BlogPage() {
  const [active, setActive] = useState(null);
  const cats = ['All', ...Array.from(new Set(blogs.map((p) => p.category)))];
  const [cat, setCat] = useState('All');
  const list = cat === 'All' ? blogs : blogs.filter((p) => p.category === cat);

  if (active) {
    const p = blogs.find((x) => x.id === active);
    return (
      <div className="pt-28 pb-24">
        <div className="container">
          <button onClick={() => setActive(null)} className="text-sm text-sienna-300 link-underline mb-8">← Back to blog</button>
          <div className="max-w-3xl mx-auto">
            <p className="text-xs uppercase tracking-[0.3em] text-terracotta-700">{p.category} · {p.readingTime} read</p>
            <h1 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 leading-tight">{p.title}</h1>
            <p className="mt-4 text-sm text-sienna-200">{p.date}</p>
          </div>
          <div className="mt-12 art-zoom aspect-[2/1] overflow-hidden rounded-sm max-w-5xl mx-auto">
            <img src={p.cover} alt={p.title} className="h-full w-full object-cover" />
          </div>
          <div className="mt-12 max-w-2xl mx-auto text-sienna-500 leading-[1.85] space-y-6 text-lg">
            {p.content.map((para, idx) => (
              <p
                key={idx}
                className={
                  idx === 0
                    ? 'first-letter:font-display first-letter:text-7xl first-letter:float-left first-letter:mr-3 first-letter:leading-[0.85] first-letter:text-terracotta-700'
                    : ''
                }
              >
                {para}
              </p>
            ))}
            <div className="flex justify-center my-12 text-sienna-200"><Ornament /></div>
          </div>
          <div className="mt-24 max-w-5xl mx-auto">
            <h3 className="font-display text-3xl text-sienna-500 mb-8">More posts</h3>
            <div className="grid md:grid-cols-2 gap-8">
              {blogs.filter((x) => x.id !== p.id).map((r) => (
                <button
                  key={r.id}
                  onClick={() => { setActive(r.id); window.scrollTo({ top: 0 }); }}
                  className="text-left group"
                >
                  <div className="art-zoom aspect-[4/3] overflow-hidden rounded-sm">
                    <img src={r.cover} alt={r.title} className="h-full w-full object-cover" />
                  </div>
                  <p className="mt-3 font-display text-2xl text-sienna-500 group-hover:text-terracotta-700 transition">{r.title}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const featured = blogs[0];
  return (
    <div className="pt-32 pb-24">
      <PageHeader
        eyebrow="Blog"
        title="Letters from the studio."
        subtitle="Slow writing on pigment, attention, and the practice of a daily studio life."
      />
      <div className="container mt-16">
        {featured && (
          <Reveal>
            <button
              onClick={() => setActive(featured.id)}
              className="grid lg:grid-cols-12 gap-10 items-center text-left w-full group"
            >
              <div className="lg:col-span-7 art-zoom aspect-[4/3] overflow-hidden rounded-sm">
                <img src={featured.cover} alt={featured.title} className="h-full w-full object-cover" />
              </div>
              <div className="lg:col-span-5">
                <Badge className="bg-terracotta-100 text-terracotta-700 border-0 mb-4">Featured</Badge>
                <p className="text-xs uppercase tracking-[0.25em] text-terracotta-700">{featured.category} · {featured.readingTime}</p>
                <h2 className="mt-3 font-display text-5xl text-sienna-500 group-hover:text-terracotta-700 transition">{featured.title}</h2>
                <p className="mt-5 text-sienna-300 leading-relaxed">{featured.excerpt}</p>
                <p className="mt-6 text-sm text-sienna-200">{featured.date}</p>
              </div>
            </button>
          </Reveal>
        )}

        <div className="mt-16 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-5 py-2 rounded-full text-sm border transition ${
                cat === c
                  ? 'bg-sienna-500 text-cream-100 border-sienna-500'
                  : 'border-sienna-200 text-sienna-300'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {list.map((p, i) => (
            <Reveal key={p.id} delay={i}>
              <button onClick={() => setActive(p.id)} className="text-left group">
                <div className="art-zoom aspect-[4/3] overflow-hidden rounded-sm">
                  <img src={p.cover} alt={p.title} className="h-full w-full object-cover" />
                </div>
                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-terracotta-700">{p.category} · {p.readingTime}</p>
                <h3 className="mt-2 font-display text-2xl text-sienna-500 group-hover:text-terracotta-700 transition">{p.title}</h3>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

// =============================================================================
//  About
// =============================================================================

function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <PageHeader
        eyebrow="About"
        title="A studio of patient hands."
        subtitle="ARTAURA is an art collective founded on the belief that slow looking and slow making are quiet acts of resistance."
      />

      <div className="container mt-20 grid lg:grid-cols-12 gap-12 items-start">
        <Reveal className="lg:col-span-6">
          <div className="art-zoom rounded-sm overflow-hidden">
            <img src={about.studioImage} alt="Studio" className="w-full h-auto object-cover" />
          </div>
        </Reveal>
        <Reveal delay={0.2} className="lg:col-span-6 space-y-6 text-sienna-500 leading-[1.85]">
          <p className="font-script text-3xl text-terracotta-700">Begin with a single mark.</p>
          {about.story.map((p, i) => <p key={i}>{p}</p>)}
        </Reveal>
      </div>

      <div className="container mt-28">
        <SectionLabel>Mission</SectionLabel>
        <Reveal>
          <h2 className="mt-5 font-display text-5xl lg:text-6xl text-sienna-500 max-w-3xl leading-tight">
            {about.mission}
          </h2>
        </Reveal>
      </div>

      <div className="container mt-28">
        <SectionLabel>Timeline</SectionLabel>
        <div className="mt-12 grid lg:grid-cols-5 gap-y-12 gap-x-6">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i * 0.5}>
              <div className="border-t border-sienna-200 pt-5">
                <p className="font-display text-3xl text-terracotta-700">{t.year}</p>
                <p className="mt-3 text-sienna-300 text-sm leading-relaxed">{t.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <div className="container mt-28 grid lg:grid-cols-2 gap-12">
        <div>
          <SectionLabel>Awards & Press</SectionLabel>
          <ul className="mt-8 space-y-5 text-sienna-500">
            {awards.map((a) => (
              <li key={a.title} className="flex items-center justify-between border-b border-sienna-100/60 pb-4">
                <span className="flex items-center gap-3"><Award className="h-4 w-4 text-terracotta-700" /> {a.title}</span>
                <span className="text-sienna-300 text-sm">{a.year}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <SectionLabel>Studio Visits</SectionLabel>
          <p className="mt-6 text-sienna-300 leading-relaxed">
            A daylit room on the second floor of a converted ceramics workshop. Visits are welcome by appointment — please reach out via email or Instagram.
          </p>
          <div className="mt-6 space-y-3 text-sienna-500">
            <p className="flex items-center gap-3"><Mail className="h-4 w-4 text-terracotta-600" /> {site.contact.email}</p>
            <p className="flex items-center gap-3"><Phone className="h-4 w-4 text-terracotta-600" /> {site.contact.phone}</p>
            <p className="flex items-center gap-3">
              <Instagram className="h-4 w-4 text-terracotta-600" />
              <a href={site.contact.instagram} target="_blank" rel="noreferrer" className="link-underline">
                {site.contact.instagramHandle}
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============================================================================
//  Root app — client-side view switching keeps the app exportable as a single
//  static HTML file (no dynamic Next.js routes required).
// =============================================================================

function App() {
  const [current, setCurrent] = useState('Home');
  const [activeArt, setActiveArt] = useState(null);
  const [activeCollection, setActiveCollection] = useState(null);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [current]);

  const handleNavigate = (page) => {
    setCurrent(page);
    setActiveArt(null);
    setActiveCollection(null);
  };

  return (
    <main className="min-h-screen bg-cream-100">
      <Nav current={current} setCurrent={handleNavigate} />

      <AnimatePresence mode="wait">
        <motion.div
          key={current + (activeArt || '') + (activeCollection || '')}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
        >
          {current === 'Home' && (
            <>
              <Hero setCurrent={setCurrent} />
              <FeaturedCollections setCurrent={setCurrent} setActiveCollection={setActiveCollection} />
              <FeaturedArtwork setCurrent={setCurrent} setActiveArt={setActiveArt} />
              <WorkshopsPreview setCurrent={setCurrent} />
              <BlogPreview setCurrent={setCurrent} />
              <Testimonials />
            </>
          )}
          {current === 'Gallery' && (
            <GalleryPage activeArt={activeArt} setActiveArt={setActiveArt} />
          )}
          {current === 'Collections' && (
            <CollectionsPage
              activeCollection={activeCollection}
              setActiveCollection={setActiveCollection}
              setCurrent={setCurrent}
              setActiveArt={setActiveArt}
            />
          )}
          {current === 'Workshops' && <WorkshopsPage />}
          {current === 'Blog' && <BlogPage />}
          {current === 'About' && <AboutPage />}
        </motion.div>
      </AnimatePresence>

      <Footer setCurrent={handleNavigate} />
    </main>
  );
}

export default App;
