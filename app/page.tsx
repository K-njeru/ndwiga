'use client';

import { useState, useEffect } from 'react';
import { Terminal } from '@/components/Terminal';
import { Navbar } from '@/components/Navbar';
import  Hero  from '@/components/Hero';
import { About } from '@/components/About';
import { WhatIDo } from '@/components/WhatIDo';
import { Projects } from '@/components/Projects';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { ModeToggle } from '@/components/ModeToggle';
import { ViewToggle } from '@/components/ViewToggle';

export default function Home() {
  const [mode, setMode] = useState<'adventure' | 'developer'>('adventure');
  const [activeSection, setActiveSection] = useState<string>('hero');

  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-3 right-20 md:right-4 flex gap-2 z-50">
        <ViewToggle mode={mode} setMode={setMode} />
        <ModeToggle />
      </div>
      
      {mode === 'adventure' ? (
        <>
          <Navbar />
          <Hero />
          <About />
          <WhatIDo />
          <Projects />
          <Contact />
          <Footer />
        </>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <Terminal 
            setActiveSection={setActiveSection} 
            activeSection={activeSection}
          />
          <div className="mt-8">
            {activeSection === 'hero' && <Hero />}
            {activeSection === 'about' && <About />}
            {activeSection === 'skills' && <WhatIDo />}
            {activeSection === 'projects' && <Projects />}
            {activeSection === 'contact' && <Contact />}
          </div>
        </div>
      )}
    </main>
  );
}