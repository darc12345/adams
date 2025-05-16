'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Replace this with your real authentication check
    const isLoggedIn = document.cookie.includes('your_auth_cookie'); // or use localStorage, etc.

    if (isLoggedIn) {
      router.replace('/dashboard');
    } else {
      router.replace('/landing');
    }
  }, [router]);

  return null; // Or a loading spinner/message
}