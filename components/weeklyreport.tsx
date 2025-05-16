'use client';

import React, { useEffect, useState } from 'react';

export default function WeeklyReport() {
  const [loading, setLoading] = useState(true);
  const [chartData] = useState<number[]>([]);
  const chartTitle = "Air quality index";
  const yAxisLabel = "Working Hours";
  
  // Default data (will be replaced with API data)
  const defaultData = [4, 7, 5, 8, 6, 3, 2];
  const maxIntensity = Math.max(...(chartData.length ? chartData : defaultData), 10);

  useEffect(() => {
    // TODO: Replace with actual API calls
    const fetchData = async () => {
      try {
        /* Example of how you might combine endpoints:
        const [scanData, exposureData] = await Promise.all([
          fetch('/api/scanner-data'),
          fetch('/api/pollution-exposure')
        ]);
        */
        setLoading(false);
        // setChartData(processedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold text-white">Weekly Report</h2>
      
      <div className="p-4 bg-[#1F252D] rounded-lg shadow">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium text-sm text-gray-300">{chartTitle}</div>
          <div className="text-sm text-gray-400">{yAxisLabel}</div>
        </div>
        
        {loading ? (
          <div className="h-48 flex items-center justify-center text-gray-400">
            Loading data...
          </div>
        ) : (
          <>
            <div className="flex h-48 border-b border-l border-gray-600">
              {/* Y-axis labels */}
              <div className="flex flex-col justify-between h-full mr-2">
                {[10, 8, 6, 4, 2, 0].map((value) => (
                  <div key={value} className="text-xs text-gray-400 h-8 flex items-center">
                    <span className="w-4 text-right">{value}</span>
                  </div>
                ))}
              </div>
              
              {/* Chart bars and grid lines */}
              <div className="relative flex-grow">
                <div className="absolute inset-0 flex flex-col justify-between">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="border-t border-gray-700 h-8"></div>
                  ))}
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 flex justify-around h-full items-end px-2">
                  {(chartData.length ? chartData : defaultData).map((intensity, index) => (
                    <div 
                      key={index}
                      className="w-6 bg-blue-400 rounded-t-sm"
                      style={{ height: `${(intensity / maxIntensity) * 100}%` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* X-axis day labels */}
            <div className="flex justify-around mt-1 text-xs text-gray-400">
              {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                <div key={day} className="w-6 text-center">{day}</div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}