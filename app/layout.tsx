import type {Metadata} from 'next';
import { Inter, Abril_Fatface } from 'next/font/google';
import './globals.css'; // Global styles

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const abril = Abril_Fatface({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'AMAgada Foundation',
  description: 'Youth education and sustainable community development.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${inter.variable} ${abril.variable}`}>
      <body className="font-sans antialiased bg-[#fdfdfd]" suppressHydrationWarning>{children}</body>
    </html>
  );
}
