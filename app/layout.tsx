import './globals.css';
import type { Metadata } from 'next';
import { Josefin_Sans, Raleway } from 'next/font/google';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import CursorEffects from '@/components/CursorEffects';

// Load Raleway for body text (applied to <body>)
const raleway = Raleway({ subsets: ['latin'] });

// Load Josefin Sans for headings (manually applied via CSS)
const josefinSans = Josefin_Sans({
  subsets: ['latin'],
  variable: '--font-josefin', // CSS variable for manual usage
});

export const metadata: Metadata = {
  title: 'Kennedy Njeru',
  description: 'My unique portfolio website with Adventure and Developer modes.',
   icons: {
    icon: '/Kennedy-modified.png', // Path to my favicon (in `/public`)
    apple: '/Kennedy-modified.png', // Apple touch icon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${raleway.className} ${josefinSans.variable}`}>
      <CursorEffects />
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}