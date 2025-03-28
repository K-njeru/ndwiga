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
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent rounded-2xl"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center md:justify-start px-6 lg:px-8">
        <motion.div
          ref={ref} // Attach the ref
          initial={{ opacity: 0, x: -60 }} // Start off-screen to the left
          animate={isInView ? { opacity: 1, x: 0 } : {}} // Animate when in view
          transition={{ duration: 0.9, delay: 0.9, ease: "easeOut" }} // Smooth easing
          className=" p-8 rounded-2xl shadow-lg md:ml-32 lg:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Hello</h1>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                I am Kennedy Njeru.</h1>
          <p className="mt-6 text-lg leading-8 text-white/80">
            I tell websites what to do.<span className="text-blue-400"> Do they listen?</span> Well, sometimes they do,
            sometimes they don&apos;t, but that&apos;s where my magic comes in. I
            coax those unruly pixels into place and turn caffeine into code.
          </p>
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to my digital alchemy...</h1>
        </motion.div>
      </div>
    </div>
  );
}
