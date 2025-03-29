'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-40 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <Link
            href="#contact"
            className="group relative flex flex-col items-center"
          >
            {/* Circular Logo Image */}
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
              {/* Replace with your actual image */}
              <img
                src="https://th.bing.com/th/id/R.9a17709da8ebcfc618805e435cab07e4?rik=bFf1peV980nV4Q&pid=ImgRaw&r=0"
                alt="Portfolio Logo"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Online Indicator (Green Dot) */}
            <div className="relative -mt-3 ml-6">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              {/* Hidden "Online" text that appears on hover */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Online - Click to contact
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}