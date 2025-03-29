"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveUpRight } from "lucide-react";

export default function Hero() {
  const ref = useRef(null); // Create a ref for the motion.div
  const isInView = useInView(ref, { once: true }); // Trigger animation only once

  return (
    <div className="relative h-[95vh] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://th.bing.com/th/id/R.9a17709da8ebcfc618805e435cab07e4?rik=bFf1peV980nV4Q&pid=ImgRaw&r=0" // Online image URL
          alt="Batman"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#000d14]/80 rounded-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center md:justify-start px-6 lg:px-8">
  <motion.div
    ref={ref}
    initial={{ opacity: 0, x: -60 }}
    animate={isInView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.9, ease: "easeOut" }}
    className="p-8 rounded-2xl md:ml-20 lg:w-2/3 text-center md:text-left"
  >
    {/* Hello + Wave */}
    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
      <motion.h1 
        className="text-5xl md:text-6xl font-bold text-white"
      >
        Hello
      </motion.h1>
      <motion.div
        animate={isInView ? { 
          rotate: [0, 14, -8, 14, 0],
        } : {}}
        transition={{ 
          delay: 0.8, 
          duration: 1.2,
          repeat: 2,
          repeatDelay: 1
        }}
        className="text-5xl md:text-6xl"
      >
        👋
      </motion.div>
    </div>

    {/* Name - Simple fade-in */}
    <motion.h1 
      className="text-4xl md:text-7xl font-bold text-white mb-4"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.4 }}
    >
      I am Kennedy Njeru.
    </motion.h1>

    {/* Tagline - Original text with subtle emphasis */}
    <motion.p 
      className="text-xl md:text-3xl leading-relaxed text-white/80 mb-6"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ delay: 0.6 }}
    >
      I tell websites what to do.{" "}
      <span className="text-blue-400 font-medium">Do they listen?</span> Well, sometimes they do,
      sometimes they don&apos;t, but that&apos;s where my magic comes in. I
      coax those unruly pixels into place and turn caffeine into code.
    </motion.p>

    {/* Closing line - Minimal animation */}
    <motion.p 
      className="text-3xl md:text-4xl font-bold text-white"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8 }}
    >
      Welcome to my digital alchemy<span className="text-blue-400"> ...</span>
    </motion.p>
  </motion.div>
</div>
    </div>
  );
}
