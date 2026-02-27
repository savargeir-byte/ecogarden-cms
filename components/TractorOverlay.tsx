"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TractorOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">

      {/* Dust trail */}
      <motion.div
        initial={{ x: "-50vw", opacity: 0 }}
        animate={{ x: "120vw", opacity: [0, 0.3, 0] }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute bottom-10 w-64 h-8 bg-yellow-200 blur-2xl rounded-full"
      />

      {/* Tractor */}
      <motion.div
        initial={{ x: "-50vw", y: 0 }}
        animate={{
          x: "120vw",
          y: [0, -2, 0, 2, 0],
        }}
        transition={{
          duration: 25,
          ease: "linear",
          repeat: Infinity,
        }}
        className="absolute bottom-[-20px]"
      >
        <Image
          src="/tractor.png"
          alt="tractor"
          width={200}
          height={105}
          className="drop-shadow-xl"
        />
      </motion.div>

    </div>
  );
}
