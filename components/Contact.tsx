"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Contact() {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const contacts = [
    { platform: "Email", link: "mailto:your.email@example.com", icon: <Mail className="w-6 h-6" /> },
    { platform: "GitHub", link: "https://github.com/yourusername", icon: <Github className="w-6 h-6" /> },
    { platform: "LinkedIn", link: "https://linkedin.com/in/yourusername", icon: <Linkedin className="w-6 h-6" /> },
    { platform: "Twitter", link: "https://twitter.com/yourusername", icon: <Twitter className="w-6 h-6" /> },
  ];

  const typeMessage = (platform: string, link: string) => {
    setIsTyping(true);
    const text = `> Sending transmission to ${platform}: ${link}`;
    let i = 0;
    setMessage("");
    const interval = setInterval(() => {
      setMessage(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 50); // Typing speed
  };

  useEffect(() => {
    // Initial message
    setMessage("> Ready to connect? Select a channel...");
  }, []);

  return (
    <section id="contact" className="relative min-h-screen py-20 overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10 h-full flex items-center justify-center">
        <motion.div
          className="w-full max-w-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground dark:text-white">
            Transmit a Signal
          </h2>
          <div className="bg-white/90 dark:bg-[#000d14]/50 p-6 rounded-lg shadow-lg border border-blue-400/20 dark:border-blue-400/30">
            {/* Terminal Display */}
            <div className="bg-black/80 p-4 rounded-t-lg min-h-[100px] font-mono text-blue-400 dark:text-blue-300 text-lg">
              <p className={isTyping ? "animate-pulse" : ""}>{message}</p>
            </div>
            {/* Contact Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-white/90 dark:bg-[#000d14]/50 rounded-b-lg">
              {contacts.map((contact) => (
                <motion.button
                  key={contact.platform}
                  className="flex items-center justify-center gap-2 p-3 bg-blue-400/10 dark:bg-blue-400/20 rounded-lg hover:bg-blue-400/20 dark:hover:bg-blue-400/30 transition-colors"
                  onClick={() => typeMessage(contact.platform, contact.link)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {contact.icon}
                  <span className="text-sm text-foreground dark:text-white">{contact.platform}</span>
                </motion.button>
              ))}
            </div>
          </div>
          <p className="text-center mt-4 text-muted-foreground dark:text-white/80">
            Click a channel to beam me a message!
          </p>
        </motion.div>
      </div>
    </section>
  );
}