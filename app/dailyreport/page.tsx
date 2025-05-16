'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import AuthGuard from '@/components/AuthGuard';

// Dynamically import the interactive map component
const Map = dynamic(() => import('@/components/readonlymap'), { ssr: false });

export default function DailyReportPage() {
  const [dailyMessage, setDailyMessage] = useState('Loading your daily message...');
  const [pollutionPoints, setPollutionPoints] = useState<{ x_coor: number, y_coor: number, pollution: number }[]>([]);

  useEffect(() => {
    fetch('https://adam-be1-c555c3bbd0a6.herokuapp.com/gemini-explanation', {
      credentials: 'include',
    })
    .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch'))
    .then(data => setDailyMessage(data.message))
      .catch(() => setDailyMessage('Could not load your daily message.'));
  }, []);

  // Fetch pollution exposure points
  useEffect(() => {
    fetch('https://adam-be1-c555c3bbd0a6.herokuapp.com/pollution-exposure', {
      credentials: 'include',
    })
      .then(res => res.ok ? res.json() : Promise.reject('Failed to fetch pollution exposure'))
      .then(data => setPollutionPoints(data))
      .catch(() => setPollutionPoints([]));
  }, []);

  const getEnglishDateIndonesia = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'Asia/Jakarta'
    };
    return today.toLocaleDateString('en-US', options);
  };

  // Example main point (Yogyakarta)
  const mainPoint: [number, number] = [-7.7828, 110.3671];

  return (
    <AuthGuard>
      <div className="max-w-md mx-auto p-4 bg-[#14181D] min-h-screen">
        {/* Header with back button */}
        <div className="flex items-center mb-4">
          <Link href="/dashboard" className="mr-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-200 hover:text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7" 
              />
            </svg>
          </Link>
          <h1 className="text-2xl font-bold text-gray-100">Daily Report</h1>
        </div>

        <h2 className="text-lg text-gray-300 mb-6">{getEnglishDateIndonesia()}</h2>

        <div className="gap-4 mb-6 bg-[#232A34] p-4 rounded-lg">
          {/* Points and Mission */}
          <div className='flex justify-between items-center mb-4'>
            <div>
              <div className="flex flex-col mb-6">
                <span className="text-4xl font-bold text-[#FB4706]">
                  129<span className="text-xl text-white">pts</span>
                </span>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-4xl font-bold text-white">3</span>
                <span className="text-md font-bold text-gray-200 mt-1">missions completed</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4 w-full max-w-xs">
              {/* Mission List */}
              <div className="flex items-center bg-[#495565] rounded-md px-3 py-2">
                <span className="font-bold text-white mr-2">+100 pts</span>
                <span className="text-white text-sm w-[160px]">For staying in green zone for 50% of your work-time</span>
              </div>
              <div className="flex items-center bg-[#495565] rounded-md px-3 py-2">
                <span className="font-bold text-white mr-2">+100 pts</span>
                <span className="text-white text-sm w-[160px]">For staying in green zone for 50% of your work-time</span>
              </div>
              <div className="flex items-center bg-[#495565] rounded-md px-3 py-2">
                <span className="font-bold text-white mr-2">+100 pts</span>
                <span className="text-white text-sm w-[160px]">For staying in green zone for 50% of your work-time</span>
              </div>
            </div>
          </div>
        </div>

        {/* Working Hours - Side by Side with Original Colors */}
        <div className="bg-[#232A34] p-4 rounded-lg mb-6">
          <div className="flex">
            {/* Total Hours - Left Side */}
            <div className="w-1/2 pr-4 my-auto">
              <p className="text-3xl font-bold text-white">12 hr</p>
              <p className="text-gray-300">Working hours</p>
            </div>
            
            {/* Zone Breakdown - Right Side */}
            <div className="flex flex-col gap-2">
              <div className="rounded-lg px-4 py-3 bg-[#FB4706] flex items-center">
                <span className="text-white text-md font-bold w-12">5 hr</span>
                <span className="text-white">on the red zone</span>
              </div>
              <div className="rounded-lg px-4 py-3 bg-[#F4EA03] flex items-center">
                <span className="text-[#232A34] text-md font-bold w-12">2 hr</span>
                <span className="text-[#232A34]">on the yellow zone</span>
              </div>
              <div className="rounded-lg px-4 py-3 bg-[#23CA58] flex items-center">
                <span className="text-white text-md font-bold w-12">5 hr</span>
                <span className="text-black">on the green zone</span>
              </div>
            </div>
          </div>
        </div>

        {/* Air Quality Index */}
        <p className='text-white mb-4 font-semibold'>Air Quality Index</p>
        <div className="bg-[#F24822] p-4 rounded-lg shadow">
          <div className="flex items-center">
            <div className="bg-[#B13505] rounded-lg flex items-center justify-center w-16 h-16 mr-4">
              <span className="text-white text-2xl font-bold">127</span>
            </div>
            <span className="text-white text-xl font-semibold">Unhealthy for Sensitive Groups</span>
          </div>
        </div>

        {/* Path you took today */}
        <div className="p-4 rounded-lg mt-4 mb-4">
          <h3 className="text-white font-semibold mb-3">Path you took today</h3>
          
          {/* Interactive Map */}
          <div className="bg-[#14181D] h-48 rounded-lg mb-3 flex items-center justify-center">
            <Map center={mainPoint} pollutionPoints={pollutionPoints} />
          </div>
          
          {/* Location text */}
          <div className="flex items-center">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 text-blue-400 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" 
                clipRule="evenodd" 
              />
            </svg>
            <span className="text-white">Sleman</span>
          </div>
        </div>

        {/* Driver Feedback */}
        <div className="bg-[#495565] p-8 rounded-lg shadow mt-4 text-center">
          <h1 className="text-white font-bold mb-3">Driver Feedback</h1>
          <p className="text-white">
            {dailyMessage}
          </p>
        </div>
      </div>
    </AuthGuard>
  );
}