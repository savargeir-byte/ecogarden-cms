"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Breadcrumb {
  _id: string;
  title_is: string;
  slug: string;
}

interface Props {
  heroImage: string;
  title: string;
  description?: string;
  icon?: string;
  breadcrumbs: Breadcrumb[];
}

export default function CategoryHero({ heroImage, title, description, icon, breadcrumbs }: Props) {
  const { scrollY } = useScroll();

  const imageY = useTransform(scrollY, [0, 500], [0, 120]);
  const imageScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const contentOpacity = useTransform(scrollY, [0, 250], [1, 0]);
  const contentY = useTransform(scrollY, [0, 250], [0, -40]);

  return (
    <div className="relative overflow-hidden" style={{ height: "560px" }}>
      {/* Bakgrunnsmynd — parallax */}
      <motion.div
        className="absolute inset-0 w-full will-change-transform"
        style={{ y: imageY, scale: imageScale, transformOrigin: "center" }}
      >
        <Image
          src={heroImage}
          alt={title}
          fill
          unoptimized
          className="object-cover object-center"
          priority
        />
      </motion.div>

      {/* Deep cinematic gradient overlay — bottom-heavy */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />
      {/* Left vignette for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
      {/* Subtle green tint at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-950/40 to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-30 flex flex-col justify-end h-full max-w-7xl mx-auto px-6 pb-14"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Breadcrumbs */}
        {breadcrumbs.length > 1 && (
          <nav className="mb-5 text-sm">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="text-white/60 hover:text-white transition">
                  Heim
                </Link>
              </li>
              {breadcrumbs.map((bc, i) => (
                <li key={bc._id} className="flex items-center gap-2">
                  <span className="text-white/40">→</span>
                  {i === breadcrumbs.length - 1 ? (
                    <span className="font-semibold text-white/90">{bc.title_is}</span>
                  ) : (
                    <Link
                      href={`/flokkar/${bc.slug}`}
                      className="text-white/60 hover:text-white transition"
                    >
                      {bc.title_is}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title row */}
        <motion.div
          className="flex items-end gap-4 mb-4"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
        >
          {icon && (
            <span className="text-5xl mb-1 drop-shadow-lg">{icon}</span>
          )}
          <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-xl">
            {title}
          </h1>
        </motion.div>

        {/* Description */}
        {description && (
          <motion.p
            className="text-lg md:text-xl text-white/80 max-w-xl mb-7 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: "easeOut" }}
          >
            {description}
          </motion.p>
        )}

        {/* Bottom row: CTA + Trust badge */}
        <motion.div
          className="flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.3, ease: "easeOut" }}
        >
          {/* Animated CTA */}
          <Link
            href="/contact"
            className="group relative inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm uppercase tracking-wide bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 shadow-xl shadow-green-900/50 transition-all duration-300 hover:scale-105 hover:shadow-green-400/60 hover:brightness-110 active:scale-95 overflow-hidden"
          >
            {/* pulse glow behind button */}
            <span className="absolute -inset-1 rounded-xl bg-gradient-to-r from-green-400 to-emerald-400 opacity-0 blur-md group-hover:opacity-50 transition-opacity duration-300" />
            <span className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative z-10">Fá tilboð</span>
            <svg className="relative z-10 w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

          {/* Trust badge */}
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
            <svg className="w-4 h-4 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span>Íslenskt fyrirtæki · Fagleg ráðgjöf</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
