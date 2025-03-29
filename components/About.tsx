'use client';
import Image from "next/image";
import { motion } from "framer-motion";
import { Laptop, Rocket } from "lucide-react"; // Or use a 3D animation library

export function About() {
  return (
    <section id="about" className="relative min-h-screen py-20 overflow-hidden">
      {/* Background Images - Different for light/dark mode */}
      <div className="absolute inset-0">
        {/* Dark mode background */}
        <div className="dark:block hidden">
          <Image
            src="/chalkboard.jpg" // Your dark mode image
            alt="Technology background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#000d14]/80"></div>
        </div>
        
        {/* Light mode background */}
        <div className="dark:hidden block">
          <Image
            src="https://th.bing.com/th/id/R.9a17709da8ebcfc618805e435cab07e4?rik=bFf1peV980nV4Q&pid=ImgRaw&r=0" // Your light mode image
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
          {/* Left Column - Animation (1/3 on md+) */}
          <motion.div 
            className="md:w-1/3 flex items-center justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-64 md:h-full">
              {/* Option 1: Simple SVG Animation */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-blue-400 dark:text-blue-300"
              >
                <Rocket className="w-32 h-32" />
                <p className="mt-4 text-center font-mono">Launching Ideas</p>
              </motion.div>

              {/* Option 2: For 3D animation, you would import a component here */}
              {/* <ThreeJsComputerAnimation /> */}
            </div>
          </motion.div>

          {/* Right Column - Content (2/3 on md+) */}
          <div className="md:w-2/3 space-y-12 flex flex-col justify-center">
            {/* First Paragraph */}
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

            {/* Second Paragraph */}
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