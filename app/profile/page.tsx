'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

const ProfilePage = () => {
  const router = useRouter();
  const [displayName, setDisplayName] = useState('User');

  useEffect(() => {
    // Get email from localStorage or your auth context
    const email = localStorage.getItem('email');
    if (email) {
      // Extract the part before '@' and remove any extension after '.'
      const namePart = email.split('@')[0];
      const nameWithoutExt = namePart.split('.')[0];
      setDisplayName(nameWithoutExt.charAt(0).toUpperCase() + nameWithoutExt.slice(1));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('email');
    router.push('/landing');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#14181D] text-white p-6">
        {/* Profile Header */}
        <div className="flex items-center justify-between mb-10 w-full">
          {/* Profile Picture */}
          <div className="relative w-20 h-20 mr-4">
            <Image
              src="/pp-dummy.webp"
              alt="Profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
          {/* Name and Company/ID */}
          <div className="flex-1 flex items-center justify-between">
            {/* Name */}
            <div className="flex flex-col justify-center">
              <span className="text-2xl font-bold">{displayName}</span>
            </div>
            {/* Company Logo and ID */}
            <div className="flex flex-col items-center ml-8">
              <div className="w-10 h-10 mb-1 flex items-center justify-center">
                {/* Gojek Icon SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="w-8 h-8"
                >
                  <circle cx="20" cy="20" r="20" fill="#00AA13"/>
                  <circle cx="20" cy="20" r="8" fill="white"/>
                  <circle cx="20" cy="20" r="4" fill="#00AA13"/>
                </svg>
              </div>
              <span className="text-gray-400 text-xs">ID 123456</span>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-2 mt-8">
          <Link 
            href="/company-sync"
            className="flex items-center px-2 py-3 rounded-lg hover:bg-[#232A34] transition"
          >
            {/* Box with arrow icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="7" width="13" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M16 12h5m0 0l-2-2m2 2l-2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Company Synchronisation</span>
          </Link>

          <Link 
            href="/pending-exchanges"
            className="flex items-center px-2 py-3 rounded-lg hover:bg-[#232A34] transition"
          >
            {/* Clock icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
              <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Pending Exchanges</span>
          </Link>

          <Link 
            href="/settings"
            className="flex items-center px-2 py-3 rounded-lg hover:bg-[#232A34] transition"
          >
            {/* Gear icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.09a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.09a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.09a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Settings</span>
          </Link>

          <button 
            className="w-full flex items-center px-2 py-3 rounded-lg hover:bg-[#232A34] transition text-left"
            onClick={handleLogout}
          >
            {/* Arrow through door icon */}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M16 17v1a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="10 9 13 12 10 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="21" y1="12" x2="13" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </AuthGuard>
  );
};

export default ProfilePage;