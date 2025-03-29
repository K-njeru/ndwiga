"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export function WhatIDo() {
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  const skills = [
    {
      id: "webDev",
      title: "Web Development",
      description:
        "Creating seamless web experiences with a blend of creativity and code. From dynamic front-ends to robust back-ends, I bring ideas to life online.",
      tools: [
        { name: "React", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
        { name: "Next.js", logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png" },
        { name: "Node.js", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
        { name: "TypeScript", logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" },
        { name: "Tailwind CSS", logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" },
      ],
    },
    {
      id: "mobileDev",
      title: "Mobile Development",
      description:
        "Building cross-platform mobile applications with Flutter. Currently learning to create smooth Android and iOS apps that deliver exceptional user experiences.",
      tools: [
        { name: "Flutter", logo: "https://storage.googleapis.com/cms-storage-bucket/6a07d8a62f4308d2b854.svg" },
        { name: "Dart", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Dart-logo.png" },
      ],
    },
    {
      id: "management",
      title: "Project Management & Version Control",
      description:
        "Balancing project timelines and code versions is like conducting an orchestra—every piece must play in harmony to create a masterpiece.",
      tools: [
        { name: "Git", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Git_icon.svg" },
        { name: "GitHub", logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" },
        { name: "JIRA", logo: "https://cdn.worldvectorlogo.com/logos/jira-1.svg" },
      ],
    },
  ];

  return (
    <section id="skills" className="relative py-20 overflow-hidden">
      {/* Background Images - Same as About */}
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
        <div className="flex flex-col-reverse md:flex-row gap-12 h-full">
          {/* Accordion Column - Full Width on Mobile (Bottom), 2/3 on Medium+ (Left) */}
          <motion.div
            className="w-full md:w-2/3"
            initial={{ opacity: 0, x: -50 }} // Slide from left
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.id} className="border border-blue-400/20 dark:border-blue-400/30 rounded-lg overflow-hidden">
                  <button
                    className={`w-full p-6 text-left flex justify-between items-center transition-colors ${
                      activeAccordion === skill.id
                        ? "bg-blue-400/10 dark:bg-blue-400/20"
                        : "bg-white/90 dark:bg-[#000d14]/50"
                    }`}
                    onClick={() => toggleAccordion(skill.id)}
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-foreground dark:text-white">
                      {skill.title}
                    </h3>
                    <span className="text-2xl text-blue-400 dark:text-blue-300 transition-transform duration-300">
                      {activeAccordion === skill.id ? "−" : "+"}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeAccordion === skill.id ? "max-h-[500px]" : "max-h-0"
                    }`}
                  >
                    <div className="p-6 pt-0">
                      <p className="text-muted-foreground dark:text-white/80 mb-4 text-lg">
                        {skill.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        {skill.tools.map((tool) => (
                          <div
                            key={tool.name}
                            className="flex items-center gap-2 bg-blue-400/10 dark:bg-blue-400/20 px-3 py-2 rounded-full"
                          >
                            <Image
                              src={tool.logo}
                              alt={`${tool.name} Logo`}
                              width={20}
                              height={20}
                              className="w-5 h-5 object-contain"
                            />
                            <span className="text-sm text-blue-400 dark:text-blue-300">{tool.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Description Column - Full Width on Mobile (Top), 1/3 on Medium+ (Right) */}
          <motion.div
            className="w-full md:w-1/3 md:flex"
            initial={{ opacity: 0, x: 50 }} // Slide from right
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-6 bg-white/90 dark:bg-[#000d14]/50 rounded-lg shadow-lg border border-blue-400/20 dark:border-blue-400/30 md:sticky md:top-20">
              <h2 className="text-3xl font-bold mb-4 text-foreground dark:text-white">
                What I Do
              </h2>
              <p className="text-muted-foreground dark:text-white/80 text-lg">
                I create digital symphonies, turning code into experiences. Whether I’m fixing a bug or
                crafting a new feature, I approach it all with the same energy I bring to the dance floor—except with way
                more success.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}