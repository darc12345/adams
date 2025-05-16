'use client';

import React from 'react';
import AuthGuard from '@/components/AuthGuard';

const NotificationsPage = () => {
  const notifications = {
    today: [
      {
        id: 1,
        message: 'Your air exposure was 20% better than yesterday',
        time: '2 h ago'
      },
      {
        id: 2,
        message: 'Supri, this is a good route! It\'s a green zone. Good job!',
        time: '3 h ago'
      },
      {
        id: 3,
        message: 'This other route was 30% less polluted and took 3 minutes longer.',
        time: '5 h ago'
      }
    ],
    thisWeek: [
      {
        id: 4,
        message: 'You avoided 2 red zones today! You got 12 more minutes of clean air.',
        time: '3 d ago'
      },
      {
        id: 5,
        message: 'Heads up! this spot\'s been rough today. Many drivers are shifting to XYZ.',
        time: '4 d ago'
      },
      {
        id: 6,
        message: 'Supri, this week you spent 3 hours less in red zones vs. last week. You earned a mask for your life.',
        time: '4 d ago'
      },
      {
        id: 7,
        message: 'You made 9 trips, earned 65%, and had 35% less exposure than the average driver.',
        time: '4 d ago'
      },
      {
        id: 8,
        message: 'You\'ve been in red zones for 2 hours — here\'s a nearby green zone with occasional bursts of demand and lower fatigue.',
        time: '5 d ago'
      },
      {
        id: 9,
        message: 'You made 9 trips, earned 65%, and had 35% less exposure than the average driver.',
        time: '5 d ago'
      }
    ]
  };

  return (
    <AuthGuard>
      <div className="bg-[#14181D] text-white min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-6">Notification</h1>
        
        <h2 className="text-xl font-semibold mb-4">Today</h2>
        <div className="space-y-0 mb-8">
          {notifications.today.map((notification, index) => (
            <div key={notification.id}>
              <div className="py-3">
                <p>{notification.message}</p>
                <p className="text-gray-400 text-sm mt-1">{notification.time}</p>
              </div>
              {index !== notifications.today.length - 1 && (
                <hr className="border-gray-700 my-2" />
              )}
            </div>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">This Week</h2>
        <div className="space-y-0">
          {notifications.thisWeek.map((notification, index) => (
            <div key={notification.id}>
              <div className="py-3">
                <p>{notification.message}</p>
                <p className="text-gray-400 text-sm mt-1">{notification.time}</p>
              </div>
              {index !== notifications.thisWeek.length - 1 && (
                <hr className="border-gray-700 my-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </AuthGuard>
  );
};

export default NotificationsPage;