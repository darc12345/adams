'use client';

import { createContext, useContext, useState } from 'react';

type NavigationContextType = {
  activeTab: 'home' | 'air-quality' | 'points';
  setActiveTab: (tab: 'home' | 'air-quality' | 'points') => void;
};

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<'home' | 'air-quality' | 'points'>('home');
  
  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};