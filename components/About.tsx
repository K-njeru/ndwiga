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
                The Rhythm of My Code: A Story Unplugged
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground dark:text-white/80">
                My life is a playlist of quirky tunes, a football match with unpredictable twists, and a dance floor where, well,
                let’s just say my coding skills outshine my rhythm. I code with the precision
                of an artist, except my music taste is as weird as it gets, and my code is as clean as a well-organized playlist.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground dark:text-white">
                Debugging Life: The Unwritten Code
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground dark:text-white/80">
                My passion for football rivals my passion for debugging, but my moves on the pitch (and the dance floor) are more
                'debugging in progress.' While I don’t have any plants yet, I’m still nurturing the idea—right after I figure out how to make
                my favorite tracks the soundtrack of my next coding session. But honestly,
                you should meet me in person—this portfolio doesn’t quite capture the bugs and dance moves that come with the real deal!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}