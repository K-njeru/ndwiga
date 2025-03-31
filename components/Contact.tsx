"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

export function Contact() {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [displayText, setDisplayText] = useState("> Type your message and hit Transmit...");
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState("");
  const [currentSong, setCurrentSong] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);


  const songs = [
    { src: "/playlist/track1.mp3", duration: "5:01" }, // "Coffee Break"
    { src: "https://cdn.pixabay.com/audio/2022/03/15/audio_5e5b6e5b-8e5b-4e5b-8e5b-6e5b6e5b6e5b.mp3", duration: "5:01" }, // "Late Night Coding"
    { src: "https://cdn.pixabay.com/audio/2023/01/12/audio_7e5b6e5b-8e5b-4e5b-8e5b-6e5b6e5b6e5b.mp3", duration: "2:30" }, // "Tech Beat"
    { src: "https://cdn.pixabay.com/audio/2022/08/02/audio_8e5b6e5b-8e5b-4e5b-8e5b-6e5b6e5b6e5b.mp3", duration: "1:55" }, // "Chill Vibes"
    { src: "https://cdn.pixabay.com/audio/2023/03/10/audio_9e5b6e5b-8e5b-4e5b-8e5b-6e5b6e5b6e5b.mp3", duration: "2:10" }, // "Neon Drive"
  ];

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) {
      setDisplayText("> Error: Message and email required!");
      return;
    }

    setIsSending(true);
    setDisplayText(`> Transmitting: "${message}" from ${email}...`);
    playTypeSound();

    const templateParams = {
      message: message,
      from_email: email,
      to_email: "your.email@example.com",
    };

    try {
      await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", templateParams, "YOUR_PUBLIC_KEY");
      setDisplayText("> Transmission successful! I'll get back to you soon.");
      setMessage("");
      setEmail("");
      setStatus("success");
    } catch (error) {
      setDisplayText("> Transmission failed. Try again or use an alternate channel.");
      setStatus("error");
    } finally {
      setIsSending(false);
    }
  };

  const playTypeSound = () => {
    const audio = new Audio("https://freesound.org/data/previews/256/256451_4003331-lq.mp3"); // Freesound Teletype
    audio.play();
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
    setDisplayText(`> Typing: "${e.target.value}" from ${email}`);
    setStatus("");
  };

  // Track which song is playing and if it's paused
  const [playbackState, setPlaybackState] = useState<{
    currentSong: string | null;
    isPlaying: boolean;
  }>({ currentSong: null, isPlaying: false });


  const playSong = (songSrc: string) => {
    // If clicking the currently playing song
    if (playbackState.currentSong === songSrc) {
      if (playbackState.isPlaying) {
        // Pause if currently playing
        audioRef.current?.pause();
        setPlaybackState({ currentSong: songSrc, isPlaying: false });
      } else {
        // Play if paused
        audioRef.current?.play();
        setPlaybackState({ currentSong: songSrc, isPlaying: true });
      }
    } else {
      // New song selected
      if (audioRef.current) {
        audioRef.current.src = songSrc;
        audioRef.current.play();
        setPlaybackState({ currentSong: songSrc, isPlaying: true });
      }
    }
  };

  // Clean up audio when component unmounts
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Clear the source
      }
    };
  }, []);

  // Update progress bar
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      const progress = (audio.currentTime / audio.duration) * 100;
      setProgress(progress);
    };

    const handleEnded = () => {
      setPlaybackState({ currentSong: null, isPlaying: false });
      setProgress(0);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playbackState.currentSong]);


  return (
    <section id="contact" className="relative py-20 overflow-hidden">
      {/* Background Images */}
      <div className="absolute inset-0">
        <div className="dark:block hidden">
          <Image src="/chalkboard.jpg" alt="Technology background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-[#000d14]/80"></div>
        </div>
        <div className="dark:hidden block">
          <Image src="/scattered.svg" alt="Technology background" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
        <motion.div
          className="w-full max-w-4xl flex flex-col md:flex-row-reverse gap-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Contact - 2/3 Width on md+ */}
          <div className="w-full md:w-2/3">
            <h3 className="text-2xl font-semibold text-center mb-4 text-foreground dark:text-white">
              Have an idea, a bug to squash, or just want to brew some code together? Drop me a line—I’ll zap back faster than a double espresso shot!
            </h3>
            <div className="bg-white/90 dark:bg-[#000d14]/50 p-6 rounded-lg shadow-lg border border-blue-400/20 dark:border-blue-400/30">
              <div
                className={`bg-black/80 p-4 rounded-t-lg min-h-[100px] font-mono text-lg ${status === "success"
                  ? "text-green-400"
                  : status === "error"
                    ? "text-red-400"
                    : "text-blue-400 dark:text-blue-300"
                  }`}
              >
                <p className={isSending ? "animate-pulse" : ""}>{displayText}</p>
              </div>
              <form onSubmit={sendMessage} className="p-4 bg-white/90 dark:bg-[#000d14]/50 rounded-b-lg space-y-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email (for replies)"
                  className="w-full p-3 bg-transparent border border-blue-400/30 dark:border-blue-400/40 rounded-lg text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isSending}
                />
                <input
                  type="text"
                  value={message}
                  onChange={handleTyping}
                  placeholder="Enter your message here"
                  className="w-full p-3 bg-transparent border border-blue-400/30 dark:border-blue-400/40 rounded-lg text-foreground dark:text-white placeholder-muted-foreground dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  disabled={isSending}
                />
                <motion.button
                  type="submit"
                  className="w-full p-3 bg-blue-400/20 dark:bg-blue-400/30 text-blue-400 dark:text-blue-300 rounded-lg hover:bg-blue-400/30 dark:hover:bg-blue-400/40 transition-colors disabled:opacity-50"
                  disabled={isSending}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isSending ? "Transmitting..." : "Transmit"}
                </motion.button>
              </form>
            </div>
            <p className="text-center mt-4 text-muted-foreground dark:text-white/80 text-lg">
              Sending a message? Expect a reply from the Code Alchemist!
            </p>
          </div>

          {/* Playlist - 1/3 Width on md+, Below on Small */}
          <div className="w-full md:w-1/3 relative">
            <h3 className="text-2xl font-semibold text-center mb-4 text-foreground dark:text-white">
              My Caffeine-to-Code Jukebox
            </h3>
            <div className="p-4 rounded-lg shadow-lg border border-blue-400/20 dark:border-blue-400/30 bg-transparent">
              {/* Image banner with text overlay */}
              <div className="relative w-full h-40 mb-4 overflow-hidden rounded-md">
                <Image
                  src="/headphones.jpg"
                  alt="Headphones banner"
                  fill
                  className="object-cover opacity-70"
                />
                {/* Dark mode overlay */}
                <div className="absolute inset-0 bg-black/0 dark:bg-black/40" />
                {/* Centered text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-sm px-4 py-1 rounded-full bg-white/80 dark:bg-black/80 text-foreground dark:text-white backdrop-blur-sm">
                    Curious enough?
                  </p>
                </div>
              </div>

              {/* Playlist */}
              <div className="space-y-3">
                {songs.map((song, index) => {
                  const isCurrentSong = playbackState.currentSong === song.src;
                  const isPlaying = isCurrentSong && playbackState.isPlaying;

                  return (
                    <div key={index} className="space-y-1">
                      <motion.button
                        className={`w-full p-2 text-sm rounded-lg transition-colors flex justify-between items-center ${isCurrentSong
                          ? "bg-blue-400/20 dark:bg-blue-400/30 text-blue-400 dark:text-blue-300"
                          : "bg-blue-400/10 dark:bg-blue-400/20 text-muted-foreground dark:text-white/80 hover:bg-blue-400/20 dark:hover:bg-blue-400/30"
                          }`}
                        onClick={() => playSong(song.src)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>{`Track ${index + 1}`}</span>
                        <div className="flex items-center gap-2">
                          <span>{song.duration}</span>
                          {isCurrentSong && (
                            <span>{isPlaying ? "⏸" : "▶"}</span>
                          )}
                        </div>
                      </motion.button>
                      {isCurrentSong && (
                        <div className="w-full h-1 bg-blue-400/20 rounded-full">
                          <div
                            className="h-full bg-blue-400 rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Audio element should be outside the playlist container */}
            <audio ref={audioRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}