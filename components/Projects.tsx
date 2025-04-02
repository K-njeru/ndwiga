"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Globe, Code, ChevronLeft, ChevronRight, CheckCircle, XCircle } from "lucide-react";

export function Projects() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "correct" | "wrong" | "pass"; message: string } | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const questions = [
    {
      text: "What's 7 × 8?",
      options: ["42", "56", "64", "72"],
      answer: "56",
      category: "Math",
    },
    {
      text: "What gas keeps us alive?",
      options: ["Nitrogen", "Carbon Dioxide", "Oxygen", "Helium"],
      answer: "Oxygen",
      category: "Life",
    },
    {
      text: "What's the brain of a computer?",
      options: ["RAM", "CPU", "GPU", "Hard Drive"],
      answer: "CPU",
      category: "Tech",
    },
  ];

  const projects = [
    {
      id: 1,
      title: "Tattoo Shop",
      description: "A sleek website for a tattoo parlor with bold designs and smooth navigation.",
      image: "/crank.png",
      stackLogos: [
        {
          name: "Next.js",
          logo: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
        },
        {
          name: "Tailwind CSS",
          logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
        }
      ],
      website: "https://crank-arts.vercel.app/",
      github: "https://github.com/yourusername/code-telegraph", // Note: This seems misplaced; update if needed
      stars: 4.5
    },
    {
      id: 2,
      title: "AM Technologies",
      description: "A tech-driven site showcasing innovative solutions with a modern edge.",
      image: "/am.png",
      stackLogos: [
        {
          name: "React",
          logo: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
        },
        {
          name: "HTML5",
          logo: "https://img.icons8.com/color/48/000000/html-5.png"
        },
        {
          name: "CSS3",
          logo: "https://img.icons8.com/color/48/000000/css3.png"
        },
        {
          name: "JavaScript",
          logo: "https://img.icons8.com/color/48/000000/javascript.png"
        }
      ],
      website: "https://k-njeru.github.io/am-tech/",
      stars: 3.0 // Added based on previous suggestion
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "A personal showcase of skills and projects with a clean, minimalist style.",
      image: "/kevo.png",
      stackLogos: [
        {
          name: "HTML5",
          logo: "https://img.icons8.com/color/48/000000/html-5.png"
        },
        {
          name: "CSS3",
          logo: "https://img.icons8.com/color/48/000000/css3.png"
        },
        {
          name: "JavaScript",
          logo: "https://img.icons8.com/color/48/000000/javascript.png"
        }
      ],
      website: "https://kelvin-m-njoki.github.io/portfolio/",
      stars: 3.5 // Added based on previous suggestion
    },
    {
      id: 4,
      title: "Marketing Agency Website",
      description: "A vibrant site for a marketing agency, blending creativity and functionality.",
      image: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/orange-tree.jpg",
      stackLogos: [
        {
          name: "HTML5",
          logo: "https://img.icons8.com/color/48/000000/html-5.png"
        },
        {
          name: "CSS3",
          logo: "https://img.icons8.com/color/48/000000/css3.png"
        },
        {
          name: "JavaScript",
          logo: "https://img.icons8.com/color/48/000000/javascript.png"
        },
        {
          name: "Bootstrap",
          logo: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Bootstrap_logo.svg"
        },
        {
          name: "PHP",
          logo: "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"
        }
      ],
      website: "https://globalleaf.co.ke/",
      stars: 3.5 // Added based on previous suggestion
    },
    {
      id: 5,
      title: "Robin",
      description: "A machine learning agent that assists drivers by identifying road signs via camera and announcing them aloud.",
      image: "https://cdn.pixabay.com/photo/2017/08/07/14/02/self-driving-2605898_1280.jpg",
      stackLogos: [
        {
          name: "Python",
          logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg"
        },
        {
          name: "TensorFlow",
          logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg"
        },
        {
          name: "OpenCV",
          logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/OpenCV_Logo_with_text_svg_version.svg"
        },
        {
          name: "Flask",
          logo: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Flask_logo.svg"
        }
      ],
      website: "https://robin-driving-aid.com",
      stars: 4.0
    },
  ];

  const playCrtSound = () => {
    try {
      // Stop any currently playing audio
      const existingAudio = document.querySelector('#crt-sound') as HTMLAudioElement;
      if (existingAudio) {
        existingAudio.pause();
        existingAudio.currentTime = 0;
      }

      // Create new audio element
      const audio = new Audio("/sounds/pass.mp3");
      audio.id = 'crt-sound'; // Give it an ID so we can find it later
      audio.play().catch(e => console.error("Audio play failed:", e));

      // Clean up after playback
      audio.onended = () => {
        audio.remove();
      };
    } catch (e) {
      console.error("Error playing crt sound:", e);
    }
  };

  const playUnlockSound = () => {
    const audio = new Audio("https://freesound.org/data/previews/170/170621_1234567-lq.mp3");
    audio.play();
  };

  const playCorrectSound = () => {
    try {
      const existingAudio = document.querySelector('#correct-sound') as HTMLAudioElement;
      if (existingAudio) {
        existingAudio.pause();
        existingAudio.currentTime = 0;
        existingAudio.remove();
      }

      const audio = new Audio("/sounds/correct.mp3");
      audio.id = 'correct-sound';
      audio.play().catch(e => console.error("Audio play failed:", e));
      audio.onended = () => audio.remove();
    } catch (e) {
      console.error("Error playing correct sound:", e);
    }
  };

  const playWrongSound = () => {
    try {
      // Stop any currently playing audio
      const existingAudio = document.querySelector('#wrong-sound') as HTMLAudioElement;
      if (existingAudio) {
        existingAudio.pause();
        existingAudio.currentTime = 0;
      }

      // Create new audio element
      const audio = new Audio("/sounds/wrong.mp3");
      audio.id = 'wrong-sound'; // Give it an ID so we can find it later
      audio.play().catch(e => console.error("Audio play failed:", e));

      // Clean up after playback
      audio.onended = () => {
        audio.remove();
      };
    } catch (e) {
      console.error("Error playing wrong sound:", e);
    }
  };

  const playPassSound = () => {
    try {
      // Stop any currently playing audio
      const existingAudio = document.querySelector('#pass-sound') as HTMLAudioElement;
      if (existingAudio) {
        existingAudio.pause();
        existingAudio.currentTime = 0;
      }

      // Create new audio element
      const audio = new Audio("/sounds/pass.mp3");
      audio.id = 'pass-sound'; // Give it an ID so we can find it later
      audio.play().catch(e => console.error("Audio play failed:", e));

      // Clean up after playback
      audio.onended = () => {
        audio.remove();
      };
    } catch (e) {
      console.error("Error playing pass sound:", e);
    }
  };

  const scrollToIndex = (index: number) => {
    if (index < 0 || index >= projects.length) return;
    setCurrentIndex(index);
    if (carouselRef.current) {
      const frameWidth = carouselRef.current.offsetWidth / (window.innerWidth >= 768 ? 3 : 1);
      carouselRef.current.scrollTo({ left: index * frameWidth, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Clear feedback after 5 seconds if it's wrong or pass type
    if (feedback && (feedback.type === "wrong" || feedback.type === "pass")) {
      const timer = setTimeout(() => {
        setFeedback(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  const handleAnswerSelect = (option: string) => {
    setSelectedAnswer(option);
    const currentQuestion = questions[questionIndex];
    if (option === currentQuestion.answer) {
      let joke = "";
      if (currentQuestion.category === "Math") {
        joke = "Correct! You must be a math wizard. Did you know 7×8 is also the number of ways to arrange 3 books on a shelf?";
      } else if (currentQuestion.category === "Life") {
        joke = "Breathe easy! You got it right. Without oxygen, we'd all be... well, not here to answer questions!";
      } else if (currentQuestion.category === "Tech") {
        joke = "Processor power! The CPU is like the conductor of your computer's orchestra.";
      }
      setFeedback({ type: "correct", message: joke });
      playCorrectSound();
      playUnlockSound();
      setTimeout(() => setIsUnlocked(true), 2000);
    } else {
      let joke = "";
      if (currentQuestion.category === "Math") {
        if (option === "42") joke = "Close! 42 is the answer to life, the universe, and everything... but not 7×8!";
        else joke = `"${option}"? That doesn't add up! Maybe you need more coffee?`;
      } else if (currentQuestion.category === "Life") {
        if (option === "Helium") joke = "Helium would make your voice funny, but it won't keep you alive!";
        else joke = `"${option}"? That's not what keeps us breathing!`;
      } else if (currentQuestion.category === "Tech") {
        if (option === "GPU") joke = "The GPU is great for graphics, but the CPU is the real brain!";
        else joke = `"${option}"? That's an important part, but not the brain!`;
      }
      setFeedback({ type: "wrong", message: joke });
      playWrongSound();
    }
  };

  const handlePass = () => {
    const currentQuestion = questions[questionIndex];
    let joke = "";
    if (currentQuestion.category === "Math") {
      joke = "Math not your strong suit? That's okay, even calculators need batteries!";
    } else if (currentQuestion.category === "Life") {
      joke = "Life's big questions can be tricky. Maybe try breathing on it (with oxygen, of course)!";
    } else if (currentQuestion.category === "Tech") {
      joke = "Tech questions can be hard to process. Maybe you need to upgrade your knowledge RAM!";
    }

    setFeedback({ type: "pass", message: joke });
    playPassSound();
    setTimeout(() => {
      setQuestionIndex((prev) => (prev + 1) % questions.length);
      setSelectedAnswer(null);
    }, 5000);
  };
  return (
    <section id="projects" className="relative py-20 overflow-hidden">
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


      <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
        {!isUnlocked ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row items-center gap-8 max-w-4xl"
          >
            {/* Video */}
            <div className="w-64 h-64 md:w-80 md:h-80 overflow-hidden rounded-lg">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/videos/robot.mp4" type="video/mp4" />
              </video>

            </div>

            <div className="text-center md:text-left relative">
              {/* Feedback positioned above the question */}
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg ${feedback.type === "correct"
                    ? "bg-green-500/90 text-white"
                    : feedback.type === "wrong"
                      ? "bg-red-500/90 text-white"
                      : "bg-yellow-500/90 text-white"
                    }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {feedback.type === "correct" ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : feedback.type === "wrong" ? (
                      <XCircle className="w-6 h-6" />
                    ) : (
                      <XCircle className="w-6 h-6" />
                    )}
                    <h3 className="text-xl font-bold">
                      {feedback.type === "correct"
                        ? "Correct!"
                        : feedback.type === "wrong"
                          ? "Wrong!"
                          : "Oops!"}
                    </h3>
                  </div>
                  <p className="mt-2">{feedback.message}</p>
                </motion.div>
              )}
              <p className="text-lg text-muted-foreground dark:text-white/80 mb-4">Want a taste of my creative ventures?</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground dark:text-white">
                Crack up the Safe
              </h2>
              <p className="text-lg text-muted-foreground dark:text-white/80 mb-4">
                {questions[questionIndex].text}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {questions[questionIndex].options.map((option) => (
                  <label
                    key={option}
                    className={`flex items-center gap-2 px-4 py-2 border ${selectedAnswer === option
                      ? 'border-blue-400 bg-blue-400/30'
                      : 'border-blue-400/20 dark:border-blue-400/30 bg-blue-400/10 dark:bg-blue-400/20'
                      } rounded-md text-foreground dark:text-white hover:bg-blue-400/30 cursor-pointer`}
                  >
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerSelect(option)}
                      className="hidden"
                    />
                    {option}
                  </label>
                ))}
              </div>
              <button
                onClick={handlePass}
                className="px-4 py-2 bg-red-500/20 border border-red-500/40 text-red-500 dark:text-red-300 rounded-md hover:bg-red-500/30 transition-colors"
              >
                Pass
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="w-full "
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground dark:text-white">
              My creative Ventures
            </h2>
            <div className="relative">
              <motion.button
                className="absolute left-[-40px] md:left-[-60px] top-1/2 -translate-y-1/2 p-3 bg-blue-400/30 dark:bg-blue-400/40 rounded-full text-blue-400 dark:text-blue-300 hover:bg-blue-400/50"
                onClick={() => scrollToIndex(currentIndex - 1)}
                disabled={currentIndex === 0}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-8 h-8" />
              </motion.button>
              <motion.button
                className="absolute right-[-40px] md:right-[-60px] top-1/2 -translate-y-1/2 p-3 bg-blue-400/30 dark:bg-blue-400/40 rounded-full text-blue-400 dark:text-blue-300 hover:bg-blue-400/50"
                onClick={() => scrollToIndex(currentIndex + 1)}
                disabled={currentIndex === projects.length - 1}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-8 h-8" />
              </motion.button>
              <div
                ref={carouselRef}
                className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 hide-scrollbar"
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className={`flex-shrink-0 w-full md:w-1/4 snap-center terminal-window relative ${index === currentIndex ? "scale-105 z-10" : "scale-95 opacity-80"
                      }`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    onHoverStart={() => {
                      setHoveredCard(project.id);
                      {/* playCrtSound(); */ }
                    }}
                    onHoverEnd={() => setHoveredCard(null)}
                  >
                    <div
                      className={`absolute inset-0 bg-[url('/headphones.jpg')] bg-cover opacity-0 transition-opacity duration-300 ${hoveredCard === project.id ? "opacity-20 animate-scanline" : ""
                        }`}
                    />
                    <div className="terminal-header">
                      <div className="terminal-button terminal-button-close" />
                      <div className="terminal-button terminal-button-minimize" />
                      <div className="terminal-button terminal-button-maximize" />
                      <span className="ml-2 text-xs text-muted-foreground dark:text-white/80">
                        {project.title}
                      </span>
                    </div>
                    <div className="terminal-body bg-white/90 dark:bg-[#000d14]/70 text-foreground dark:text-white relative z-10">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={300}
                        height={150}
                        className="w-full h-32 object-cover mb-4 rounded-md"
                      />
                      <p className="mb-4 text-muted-foreground dark:text-white/80">{project.description}</p>
                      <div className="mb-4 flex items-center gap-1 text-muted-foreground dark:text-white/80">
                        <span>Rating: {project.stars} / 5</span>
                        {/* Optional: Add a star icon component here, e.g., <Star className="w-4 h-4" /> */}
                      </div>
                      <div className="mb-4 flex flex-wrap gap-2">
                        {project.stackLogos.map((tech, idx) => (
                          <Image
                            key={idx}
                            src={tech.logo}
                            alt={`${tech.name} Logo`}
                            width={24}
                            height={24}
                            className="object-contain"
                          />
                        ))}
                      </div>
                      <div className="mb-4 flex gap-1 text-yellow-500 dark:text-yellow-400">
                        {(() => {
                          const fullStars = Math.floor(project.stars); // Number of full stars
                          const hasHalfStar = project.stars % 1 >= 0.5; // Check for half star
                          const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // Remaining empty stars

                          return (
                            <>
                              {Array(fullStars).fill(null).map((_, i) => (
                                <span key={`full-${i}`} className="text-xl">★</span>
                              ))}
                              {hasHalfStar && (
                                <span className="text-xl relative inline-block w-5 h-5">
                                  <span className="absolute inset-0 text-gray-300 dark:text-gray-600">★</span>
                                  <span
                                    className="absolute inset-0 text-yellow-500 dark:text-yellow-400 overflow-hidden"
                                    style={{ width: "50%" }}
                                  >
                                    ★
                                  </span>
                                </span>
                              )}
                              {Array(emptyStars).fill(null).map((_, i) => (
                                <span key={`empty-${i}`} className="text-xl text-gray-300 dark:text-gray-600">★</span>
                              ))}
                            </>
                          );
                        })()}
                      </div>
                      <div className="flex flex-col gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-400 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200"
                          >
                            <Github className="w-4 h-4" /> GitHub
                          </a>
                        )}
                        {project.website && (
                          <a
                            href={project.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-blue-400 dark:text-blue-300 hover:text-blue-500 dark:hover:text-blue-200"
                          >
                            <Globe className="w-4 h-4" /> Website
                          </a>
                        )}
                        {!project.github && !project.website && (
                          <span className="flex items-center gap-1 text-blue-400 dark:text-blue-300">
                            <Code className="w-4 h-4" /> Classified
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <p className="text-center mt-12 text-muted-foreground dark:text-white/80 text-lg">
              Peek into my retro terminals—where vintage screens flicker with creative sparks and coffee-fueled adventures!
            </p>
          </motion.div>
        )}
      </div>

      {/* CSS for Scrollbar and Scanline Animation */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes scanline {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
        .animate-scanline {
          animation: scanline 2s infinite linear;
        }
      `}</style>
    </section>
  );
}