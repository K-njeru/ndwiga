'use client';

import { Compass, Terminal as TerminalIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface ViewToggleProps {
  mode: 'adventure' | 'developer';
  setMode: (mode: 'adventure' | 'developer') => void;
}

export function ViewToggle({ mode, setMode }: ViewToggleProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMode(mode === 'adventure' ? 'developer' : 'adventure')}
        >
          {mode === 'adventure' ? (
            <TerminalIcon className="h-[1.2rem] w-[1.2rem]" />
          ) : (
            <Compass className="h-[1.2rem] w-[1.2rem]" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Switch to {mode === 'adventure' ? 'Developer' : 'Adventure'} Mode</p>
      </TooltipContent>
    </Tooltip>
  );
}