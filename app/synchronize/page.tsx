'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AuthGuard from '@/components/AuthGuard';

const SynchronizePage = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [driverId, setDriverId] = useState('');
  const router = useRouter();

  const companies = [
    { id: 'gojek', logo: '/gojek-logo.svg', alt: 'Gojek Logo' },
    { id: 'grab', logo: '/grab-logo.svg', alt: 'Grab Logo' },
    { id: 'maxim', logo: '/maxim-logo.svg', alt: 'Maxim Logo' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful synchronization
    console.log('Selected company:', selectedCompany);
    console.log('Driver ID:', driverId);
    router.push('/permission');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#14181D] text-white p-4">
        <h1 className="text-3xl font-bold text-center mb-2">Synchronize your account!</h1>
        
        <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
          {/* Company Logos as Selectable List */}
          <div className="p-4 bg-[#1F252D] rounded-md flex flex-col gap-4">
            {companies.map((company) => (
              <div
                key={company.id}
                onClick={() => setSelectedCompany(company.id)}
                className={`flex items-center justify-center w-full h-16 rounded-md cursor-pointer transition-all border-2
                  ${selectedCompany === company.id 
                    ? 'border-blue-500 bg-white' 
                    : 'border-gray-300 bg-gray-100 hover:border-blue-400'
                  }`}
              >
                <Image
                  src={company.logo}
                  alt={company.alt}
                  width={72}
                  height={72}
                  className="object-contain"
                />
              </div>
            ))}
          </div>

          {/* Driver ID Input */}
          <div>
            <label htmlFor="driverId" className="block text-sm font-medium mb-1">
              Driver ID
            </label>
            <input
              id="driverId"
              type="text"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
              placeholder="Enter your driver ID"
              className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
              required
            />
          </div>
          
          {/* Confirm Button */}
          <button
            type="submit"
            disabled={!selectedCompany || !driverId}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              selectedCompany && driverId 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
          >
            Confirm
          </button>
        </form>
      </div>
    </AuthGuard>
  );
};

export default SynchronizePage;