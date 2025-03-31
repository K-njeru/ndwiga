"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function Farewell() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false }); // Trigger animation every time it enters view

  return (
    <section id="farewell" className="relative py-20 overflow-hidden w-full">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div className="dark:block hidden">
          <Image src="/chalkboard.jpg" alt="Fun background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#000d14]/80" />
        </div>
        <div className="dark:hidden block">
          <Image src="/scattered.svg" alt="Fun background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-white/80" />
        </div>
      </div>


      <div className="relative z-10 h-full flex items-center justify-center w-full px-4" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-5xl p-6"
        >
          {/* Mac OS Header */}
          <div className="flex items-center gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground dark:text-white/80">Goodbye_Message.txt</span>
          </div>

          {/* Content */}
          <div className="text-center">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground dark:text-white mb-6 flex items-center justify-center gap-2">
              Time to Wave Goodbye!
              <motion.div
                animate={
                  isInView
                    ? {
                        rotate: [0, 14, -8, 14, 0],
                      }
                    : {}
                }
                transition={{
                  delay: 0.8,
                  duration: 1.2,
                  repeat: 2,
                  repeatDelay: 1,
                }}
                className="text-5xl md:text-6xl"
              >
                👋
              </motion.div>
            </h2>
            <p className="text-3xl md:text-4xl text-muted-foreground dark:text-white/90 leading-relaxed mb-4">
            You scrolled all the way down? That deserves a prize! And by prize, I mean… a conversation with me. Lucky you! Drop me a message!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}