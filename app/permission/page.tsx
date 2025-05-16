'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AuthGuard from '@/components/AuthGuard';

type PermissionName = 'Data Privacy' | 'Location' | 'Notifications';

const initialPermissions: Record<PermissionName, boolean> = {
  'Data Privacy': false,
  'Location': false,
  'Notifications': false,
};

const PermissionsPage = () => {
  const [checkedItems, setCheckedItems] = useState<Record<PermissionName, boolean>>(initialPermissions);

  const router = useRouter();

  const handleCheckboxChange = (name: PermissionName) => {
    setCheckedItems(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/login');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#14181D] text-white px-6">
        <h1 className="text-3xl font-bold mb-4 text-center">User permissions</h1>
        <p className="text-gray-400 mb-6 text-center max-w-sm">
          Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-6">
          <div className="space-y-4">
            {Object.entries(checkedItems).map(([name, checked]) => (
              <div key={name} className="flex items-center">
                <input
                  type="checkbox"
                  id={name}
                  checked={checked}
                  onChange={() => handleCheckboxChange(name as PermissionName)}
                  className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor={name} className="ml-3 block">
                  {name}
                </label>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Continue
          </button>
        </form>
      </div>
    </AuthGuard>
  );
};

export default PermissionsPage;