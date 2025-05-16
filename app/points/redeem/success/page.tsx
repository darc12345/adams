'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

export default function RedemptionSuccessPage() {
  const router = useRouter();

  return (
    <AuthGuard>
      <div className="container mx-auto px-4 py-8 max-w-md min-h-screen" style={{ backgroundColor: '#14181D' }}>
        <div className="flex items-center mb-8">
          <Link href="/points" className="text-white text-lg font-bold mr-4">
            &lt;
          </Link>
          <h1 className="text-2xl font-bold text-white">Redeem</h1>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-6">Exchange Successful!</h2>
        </div>

        {/* QR Code Section */}
        <div className="p-6 rounded-lg text-center mb-8">
          <div className="mx-auto w-48 h-48 bg-gray-100 flex items-center justify-center mb-4">
            {/* QR Code Image */}
            <Image
              src="/qr-dummy.svg"
              alt="QR Code"
              width={192}
              height={192}
              className="object-contain"
            />
          </div>
          <p className="text-sm text-white mb-6">
            Visit your nearest Indomaret & show code to cashier to redeem your reward!
          </p>
          <button
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg transition"
            onClick={() => router.push('/dashboard')}
          >
            Go Back Home
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}