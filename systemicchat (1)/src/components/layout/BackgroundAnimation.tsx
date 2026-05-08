import React from 'react';
import { motion } from 'motion/react';

export default function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-bg-dark">
      {/* Primary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ['0%', '10%', '-10%', '0%'],
          y: ['0%', '-10%', '10%', '0%'],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-primary/20 blur-[120px] pointer-events-none mix-blend-screen"
      />
      
      {/* Secondary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
          x: ['0%', '-15%', '15%', '0%'],
          y: ['0%', '15%', '-15%', '0%'],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-[10%] -right-[10%] w-[60vw] h-[60vw] rounded-full bg-accent/20 blur-[100px] pointer-events-none mix-blend-screen"
      />

      {/* Tertiary Glow */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.15, 0.3, 0.15],
          x: ['0%', '20%', '-20%', '0%'],
          y: ['0%', '20%', '-20%', '0%'],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5
        }}
        className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-secondary/10 blur-[120px] pointer-events-none mix-blend-screen"
      />

      {/* Noise overlay to give it texture (optional but very nice) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* Grid overlay for a more tech feel */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none"></div>
    </div>
  );
}
