'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

// Define a type for missions to avoid TypeScript errors
type Mission = {
  title: string;
  points: number;
  progress: number;
};

export default function PointsPage() {
  const [activeView, setActiveView] = useState<'missions' | 'rewards'>('missions');
  const [missions, setMissions] = useState<{ completed: Mission[]; uncompleted: Mission[] }>({ completed: [], uncompleted: [] });
  const [missionsLoading, setMissionsLoading] = useState(true);
  const [missionsError, setMissionsError] = useState('');
  const router = useRouter();

  // Updated rewards list
  const rewards = [
    { title: "KN95 Bagus Mask (10 pcs)", points: 100, image: "/KN95.svg" },
    { title: "Duckbill Sensi Mask (50 pcs)", points: 500, image: "/duckbill.svg" },
    { title: "Aquviva (250 mL)", points: 50, image: "/aquviva.svg" },
    { title: "Aquviva (1 L)", points: 50, image: "/aquviva.svg" },
    { title: "Pertamax Cashback", points: 500, image: "/pertamina.svg" },
    { title: "Cellular Data (1 GB)", points: 300, image: "/telkomsel.svg" },
  ];

  const getProgressClass = (progress: number) => {
    if (progress === 0) return 'bg-gray-300';
    if (progress === 100) return 'bg-green-500';
    return 'bg-yellow-400';
  };

  // Fetch missions from backend (fixed to /mission)
  useEffect(() => {
    setMissionsLoading(true);
    fetch('https://adam-be1-c555c3bbd0a6.herokuapp.com/mission', {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch missions');
        return res.json();
      })
      .then(data => {
        // If backend returns a flat array, split into completed/uncompleted
        const completed = Array.isArray(data) ? data.filter((m: Mission) => m.progress === 100) : (data.completed || []);
        const uncompleted = Array.isArray(data) ? data.filter((m: Mission) => m.progress < 100) : (data.uncompleted || []);
        setMissions({ completed, uncompleted });
        setMissionsError('');
      })
      .catch(() => {
        setMissionsError('Could not load missions.');
        setMissions({ completed: [], uncompleted: [] });
      })
      .finally(() => setMissionsLoading(false));
  }, []);

  return (
    <AuthGuard>
      <div className="p-4 min-h-screen" style={{ backgroundColor: '#14181D' }}>
        {/* Top bar with back arrow and Points title */}
        <div className="flex items-center mb-8">
          <button
            className="mr-2 text-2xl text-white font-bold"
            onClick={() => router.push('/dashboard')}
            aria-label="Back"
          >
            &lt;
          </button>
          <h1 className="text-xl font-bold text-white">Points</h1>
        </div>

        {/* Points value */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-white leading-none">129</span>
            <span className="text-lg text-white leading-none">pts</span>
          </div>
        </div>
        
        {/* Tab Navigation with active tab color #1F252D */}
        <div className="flex">
          <button
            className={`flex-1 py-3 px-4 font-medium text-center rounded-t-lg ${
              activeView === 'missions' 
                ? 'bg-[#1F252D] text-[#2A68F7]' 
                : 'text-gray-500 bg-[#14181D]'
            }`}
            onClick={() => setActiveView('missions')}
          >
            Missions
          </button>
          <button
            className={`flex-1 py-3 px-4 font-medium text-center rounded-t-lg ${
              activeView === 'rewards' 
                ? 'bg-[#1F252D] text-[#2A68F7]' 
                : 'text-gray-500 bg-[#14181D]'
            }`}
            onClick={() => setActiveView('rewards')}
          >
            Rewards
          </button>
        </div>
        
        {/* Content area - make background transparent to connect with tab */}
        <div className="-mx-4 px-4 pb-4 bg-[#1F252D]">
          {activeView === 'missions' ? (
            missionsLoading ? (
              <div className="text-gray-400 pt-8">Loading missions...</div>
            ) : missionsError ? (
              <div className="text-red-400 pt-8">{missionsError}</div>
            ) : (
              <>
                {missions.completed.length === 0 && missions.uncompleted.length === 0 ? (
                  <div className="text-center text-gray-400 pt-8">
                    You don&apos;t have any missions today.
                  </div>
                ) : (
                  <>
                    <section>
                      <h2 className="text-2xl font-semibold mb-4 pt-4 text-white">Completed Missions</h2>
                      <ul className="space-y-4 list-none">
                        {missions.completed.map((mission, index) => (
                          <li key={`completed-${index}`} className="flex items-center bg-[#D9D9D9] rounded-lg p-4 shadow-sm">
                            <div
                              className={`w-4 h-4 rounded-full mr-4 ${getProgressClass(mission.progress)}`}
                              title={`Progress: ${mission.progress}%`}
                            ></div>
                            <div className="flex justify-between items-center w-full">
                              <p className="text-lg text-black">{mission.title}</p>
                              <span className="font-medium text-black">{mission.points} pts</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section className="pt-6">
                      <h2 className="text-2xl font-semibold mb-4 text-white">Uncompleted Missions</h2>
                      <ul className="space-y-4 list-none">
                        {missions.uncompleted.map((mission, index) => (
                          <li key={`uncompleted-${index}`} className="flex flex-col bg-[#D9D9D9] rounded-lg p-4 shadow-sm">
                            <div className="flex items-center mb-2">
                              <div
                                className={`w-4 h-4 rounded-full mr-4 ${getProgressClass(mission.progress)}`}
                                title={`Progress: ${mission.progress}%`}
                              ></div>
                              <div className="flex justify-between items-center w-full">
                                <p className="text-lg text-black">{mission.title}</p>
                                <span className="font-medium text-black">{mission.points} pts</span>
                              </div>
                            </div>
                            {/* Progress bar only for missions that are in progress (not 0, not 100) */}
                            {mission.progress > 0 && mission.progress < 100 && (
                              <div className="w-full h-2 bg-gray-300 rounded">
                                <div
                                  className="h-2 rounded"
                                  style={{
                                    width: `${mission.progress}%`,
                                    background:
                                      mission.progress < 100
                                        ? '#F4EA03' // yellow for in progress
                                        : '#23CA58', // green if completed (shouldn't show here)
                                  }}
                                ></div>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </section>
                  </>
                )}
              </>
            )
          ) : (
            <section className="pt-4">
              {/* Removed the Available Rewards title */}
              <div className="grid grid-cols-2 gap-4">
                {rewards.map((reward, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm bg-[#D9D9D9] flex flex-col items-center">
                    <img src={reward.image} alt={reward.title} className="w-24 h-24 object-contain mb-4" />
                    <h3 className="font-semibold text-lg text-center text-black">{reward.title}</h3>
                    <span className="text-black font-bold mt-2">{reward.points} pts</span>
                    <button
                      className="mt-4"
                      style={{ backgroundColor: '#8491A2', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontSize: '0.875rem' }}
                      onClick={() => router.push('/points/redeem')}
                    >
                      Exchange Points
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}