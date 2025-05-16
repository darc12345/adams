'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

const merchants = [
  { id: 1, name: 'Indomaret', logo: '/merchant/indomaret.svg' },
  { id: 2, name: 'Kimia Farma', logo: '/merchant/kimia-farma.svg' },
  { id: 3, name: 'Alfamart', logo: '/merchant/alfamart.svg' },
  { id: 4, name: 'Apotek K 24', logo: '/merchant/k24.svg' },
  { id: 5, name: 'Apotek K 24', logo: '/merchant/k24.svg' },
  { id: 6, name: 'Alfamart', logo: '/merchant/alfamart.svg' },
  { id: 7, name: 'Kimia Farma', logo: '/merchant/kimia-farma.svg' },
  { id: 8, name: 'Indomaret', logo: '/merchant/indomaret.svg' },
];

export default function PointsRedeemPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMerchant, setSelectedMerchant] = useState<number | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedMerchantName, setSelectedMerchantName] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const router = useRouter();

  const handleMerchantClick = (id: number, name: string) => {
    setSelectedMerchant(id);
    setSelectedMerchantName(name);
    setShowConfirmation(true);
    setAnimateOut(false);
  };

  const handleConfirmExchange = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setShowConfirmation(false);
      router.push('/points/redeem/success');
    }, 300);
  };

  const handleCancelExchange = () => {
    setAnimateOut(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedMerchant(null);
    }, 300);
  };

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8" style={{ backgroundColor: '#14181D' }}>
        <div className="flex items-center mb-8">
          <Link href="/points" className="text-white text-lg font-bold mr-4">
            &lt;
          </Link>
          <h1 className="text-2xl font-bold text-white">Choose Merchant</h1>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {merchants.map((merchant) => (
            <div
              key={merchant.id}
              className={`rounded-lg flex items-center justify-center hover:shadow-md transition-shadow cursor-pointer aspect-square border-[#D9D9D9] bg-[#D9D9D9]`}
              onClick={() => handleMerchantClick(merchant.id, merchant.name)}
            >
              <div className="w-42 bg-gray-100 rounded-full flex items-center justify-center">
                <img src={merchant.logo} alt={merchant.name} className="w-full h-full object-contain" />
              </div>
            </div>
          ))}
        </div>

        {/* Confirmation Modal with animation */}
        {showConfirmation && (
          <div className="fixed inset-0 flex items-center justify-center p-4 z-50 bg-black/30">
            <div
              className={`bg-white rounded-lg p-6 max-w-sm w-full transition-all duration-300
                ${animateOut
                  ? 'opacity-0 translate-y-8 pointer-events-none'
                  : 'opacity-100 translate-y-0'}
              `}
              style={{ willChange: 'opacity, transform' }}
            >
              <h3 className="text-xl font-semibold text-black mb-4 text-center">
                Are you sure you want to exchange points?
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirmExchange}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Yes
                </button>
                <button
                  onClick={handleCancelExchange}
                  className="flex-1 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AuthGuard>
  );
}