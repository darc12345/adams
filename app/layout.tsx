import { NavigationProvider } from '@/context/NavigationContext';
import NavbarVisibility from '@/components/NavbarVisibility';
import './globals.css';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="min-h-screen flex flex-col bg-gray-50 font-dm-sans">
        <NavigationProvider>
          {/* Only show Navbar if not on /landing */}
          <NavbarVisibility />
          <main className="flex-grow overflow-y-auto">
            {children}
          </main>
        </NavigationProvider>
      </body>
    </html>
  );
}