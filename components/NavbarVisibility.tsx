'use client';
import { usePathname } from 'next/navigation';
import Navbar from './navbar';

export default function NavbarVisibility() {
  const pathname = usePathname();
  if (
    pathname === '/landing' ||
    pathname === '/sign-up' ||
    pathname === '/login' ||
    pathname === '/synchronize' ||
    pathname === '/permission'
  ) {
    return null;
  }
  return <Navbar />;
}