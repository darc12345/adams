'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  // Logout handler
  const handleLogout = () => {
    // Clear any auth/session storage if needed
    // localStorage.removeItem('token');
    setMenuOpen(false);
    router.push('/landing');
  };

  return (
    <nav
      className="p-4 flex flex-col items-stretch relative"
      style={{
        background: '#0A3890'
      }}
    >
      {/* Top Row: Logo, Title, Right Icons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img src="/adams-logo.svg" alt="ADAMS Logo" className="h-12 w-12 mr-3" />
          <div className="flex flex-col justify-center">
            <span className="text-white font-bold text-3xl leading-none">ADAMS</span>
            <span className="text-white text-xs tracking-widest mt-1">PROJECT</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/notification" className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </Link>
          <Link href="/profile" className="text-white">
            <img
              src="/pp-dummy.webp"
              alt="Profile"
              className="h-9 w-9 rounded-full object-cover cursor-pointer"
            />
          </Link>
          {/* Hamburger Menu */}
          <button
            className="text-white focus:outline-none relative z-50 flex items-center h-9"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            style={{ marginTop: '0px' }}
          >
            <span className="block w-7 h-7 relative">
              {/* Improved X icon animation */}
              <span
                className={`absolute left-0 top-3 w-7 h-1 bg-white rounded transition-all duration-300
                  ${menuOpen ? 'rotate-45' : 'rotate-0 -translate-y-1.5'}`}
              ></span>
              <span
                className={`absolute left-0 top-3 w-7 h-1 bg-white rounded transition-all duration-300
                  ${menuOpen ? '-rotate-45' : 'rotate-0 translate-y-1.5'}`}
              ></span>
            </span>
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out bg-transparent rounded-b-lg ${
          menuOpen ? 'max-h-96 mt-4 py-4' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-4 px-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-white text-lg font-semibold hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            {/* House Icon */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M4 10v10a1 1 0 001 1h3m10-11v10a1 1 0 01-1 1h-3m-6 0h6" />
            </svg>
            Dashboard
          </Link>
          <Link
            href="/air-quality"
            className="flex items-center gap-3 text-white text-lg font-semibold hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            {/* Map Icon */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A2 2 0 013 15.382V6.618a2 2 0 011.553-1.946l5.447-1.362a2 2 0 01.894 0l5.447 1.362A2 2 0 0121 6.618v8.764a2 2 0 01-1.553 1.946L15 20l-6-3z" />
            </svg>
            Air Quality Map
          </Link>
          <Link
            href="/points"
            className="flex items-center gap-3 text-white text-lg font-semibold hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            {/* Gift Icon */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 12v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7m16 0V7a2 2 0 00-2-2h-3.5a2 2 0 00-2 2v5m7 0H5m7-5V5a2 2 0 10-4 0v2" />
            </svg>
            Points
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 text-white text-lg font-semibold hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            {/* User Icon */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 20c0-2.21 3.582-4 6-4s6 1.79 6 4" />
            </svg>
            Profile
          </Link>
          <button
            className="flex items-center gap-3 text-white text-lg font-semibold hover:text-green-400 transition text-left"
            onClick={handleLogout}
          >
            {/* Logout Icon */}
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;