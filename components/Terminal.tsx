'use client';

import { useState, useEffect, useRef } from 'react';
import { Command } from 'cmdk';

interface TerminalProps {
  setActiveSection: (section: string) => void;
  activeSection: string;
}

export function Terminal({ setActiveSection, activeSection }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([
    'Welcome to Developer Mode! Type "help" to see available commands.',
    'Current directory: ~/portfolio',
    '',
    '$ _'
  ]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: `Available commands:
  ls              List all sections
  cat <section>   Display section content
  cd <section>    Navigate to section
  clear           Clear terminal
  git             Show git information
  whoami          Display about information
  skills          List technical skills
  projects        Show project portfolio
  contact         Display contact information`,
    ls: 'Sections:\n  about/\n  skills/\n  projects/\n  contact/',
    git: 'On branch main\nYour portfolio is up to date with origin/main',
    whoami: 'Displaying about section...',
    skills: 'Loading technical skills...',
    projects: 'Loading project portfolio...',
    contact: 'Opening contact information...',
    clear: 'Clearing terminal...',
  };

  const handleCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();
    const args = cmd.split(' ');
    
    if (cmd === 'clear') {
      setHistory(['$ _']);
      return;
    }

    if (args[0] === 'cat' || args[0] === 'cd') {
      const section = args[1];
      if (section && ['about', 'skills', 'projects', 'contact'].includes(section)) {
        setActiveSection(section);
        setHistory(prev => [...prev, `$ ${command}`, `Navigating to ${section}...`, '', '$ _']);
      } else {
        setHistory(prev => [...prev, `$ ${command}`, 'Error: Invalid section', '', '$ _']);
      }
      return;
    }

    const response = commands[cmd as keyof typeof commands];
    if (response) {
      setHistory(prev => [...prev, `$ ${command}`, response, '', '$ _']);
      if (['whoami', 'skills', 'projects', 'contact'].includes(cmd)) {
        setActiveSection(cmd === 'whoami' ? 'about' : cmd);
      }
    } else {
      setHistory(prev => [...prev, `$ ${command}`, `Command not found: ${args[0]}. Type "help" for available commands.`, '', '$ _']);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <div className="terminal-window">
      <div className="terminal-header">
        <div className="terminal-button terminal-button-close" />
        <div className="terminal-button terminal-button-minimize" />
        <div className="terminal-button terminal-button-maximize" />
        <span className="ml-2 text-xs text-muted-foreground">portfolio ~ -zsh</span>
      </div>
      <div 
        ref={terminalRef}
        className="terminal-body bg-card h-64 overflow-y-auto"
      >
        {history.map((line, i) => (
          <div key={i} className="py-1">
            <span className={line.startsWith('$') ? 'terminal-prompt' : 'terminal-output'}>
              {line}
            </span>
          </div>
        ))}
        <div className="flex items-center">
          <span className="terminal-prompt mr-2">$</span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleCommand(input);
                setInput('');
              }
            }}
            className="bg-transparent flex-1 outline-none"
            placeholder="Type a command..."
          />
        </div>
      </div>
    </div>
  );
}