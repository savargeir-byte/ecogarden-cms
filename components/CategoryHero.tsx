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

  // Hero height shrinks from 500px → 200px as user scrolls 0→300px
  const heroHeight = useTransform(scrollY, [0, 300], [500, 200]);
  // Image scales slightly for parallax feel
  const imageScale = useTransform(scrollY, [0, 300], [1, 1.15]);
  // Content fades out while scrolling
  const contentOpacity = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <motion.div
      className="relative overflow-hidden border-b"
      style={{ height: heroHeight }}
    >
      {/* Bakgrunnsmynd */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, transformOrigin: "center" }}
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />

      {/* Textinn */}
      <motion.div
        className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 py-20 sm:py-28"
        style={{ opacity: contentOpacity }}
      >
        {breadcrumbs.length > 1 && (
          <nav className="mb-6 text-sm">
            <ol className="flex items-center gap-2 flex-wrap">
              <li>
                <Link href="/" className="text-white/80 hover:text-white transition">
                  Heim
                </Link>
              </li>
              {breadcrumbs.map((bc, i) => (
                <li key={bc._id} className="flex items-center gap-2">
                  <span className="text-white/60">→</span>
                  {i === breadcrumbs.length - 1 ? (
                    <span className="font-semibold text-white">{bc.title_is}</span>
                  ) : (
                    <Link
                      href={`/flokkar/${bc.slug}`}
                      className="text-white/80 hover:text-white transition"
                    >
                      {bc.title_is}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex items-center gap-4 mb-4">
          {icon && <div className="text-6xl">{icon}</div>}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
              {title}
            </h1>
            {description && (
              <p className="text-xl mt-2 text-white/90">{description}</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
