"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export function About() {
  return (
    <section id="about" className="relative py-20 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div className="dark:block hidden">
          <Image
            src="/chalkboard.jpg"
            alt="Technology background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#000d14]/80"></div>
        </div>
        <div className="dark:hidden block">
          <Image
            src="/scattered.svg"
            alt="Technology background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full">
        <div className="flex flex-col md:flex-row gap-12 h-full">
          {/* Left Column - Real Video with Dark Mode Overlay */}
          <motion.div 
            className="md:w-1/3 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-64 md:h-full flex items-center justify-center">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover rounded-lg shadow-lg"
              >
                <source src="/videos/Knight.mp4" type="video/mp4" />
                Your browser doesn’t support video.
              </video>
              {/* Dark mode overlay */}
              <div className="absolute inset-0 bg-[#000d14]/50 dark:block hidden pointer-events-none rounded-lg" />
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <div className="md:w-2/3 space-y-12 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground dark:text-white">
                Code Alchemist
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground dark:text-white/80">
                I transform coffee into clean, efficient code and ideas into interactive experiences. 
                With 5+ years in the digital crucible, I specialize in React, Next.js, and Node.js 
                alchemy. My spells include responsive design, state management wizardry, and API 
                enchantments.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground dark:text-white">
                Pixel Whisperer
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground dark:text-white/80">
                I coax unruly interfaces into harmonious user experiences. When browsers misbehave, 
                I debug with the patience of a monk and the precision of a surgeon. My development 
                mantra: "Make it work, make it right, make it fast" - in that exact order.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}