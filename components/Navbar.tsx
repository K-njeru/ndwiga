'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import  Image  from 'next/image';

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
    <nav className="fixed top-0 left-0 right-0 bg-[#000d14]/80 backdrop-blur-sm z-40 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">

          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#contact"
                className="group relative flex flex-col items-center"
              >
                {/* Circular Logo Image */}
                <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                  <Image
                    src="/Kennedy.jpeg"
                    alt="Portfolio Log"
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                {/* Online Indicator (Green Dot) */}
                <div className="relative -mt-3 ml-6">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                </div>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Online - Click to contact</p>
            </TooltipContent>
          </Tooltip>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4 md:gap-x-8 md:flex-1 md:justify-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white hover:text-muted-foreground dark:text-muted-foreground dark:hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Button */}
          <Button
          variant="outline"
            size="icon"
            className="mr-2 text-white hover:text-muted-foreground dark:text-muted-foreground dark:hover:text-foreground transition-colors md:hidden"
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
                  className="text-white hover:text-muted-foreground dark:text-muted-foreground dark:hover:text-foreground transition-colors"
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