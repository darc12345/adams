import Image from 'next/image';

export default function Streak() {
  return (
    <div className="p-4  bg-gradient-to-r from-[#1F252D] via-[#1F252D] to-[#F24822] shadow-md rounded-lg flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-white">Points Today!</h1>
        <div className="m-2 space-y-2">
          <h2 className="text-5xl font-semibold text-[#FFF388]">82 pts</h2>
          <div className="flex flex-col text-gray-600">
            <span className="text-white">129 pts</span>
            <span className="text-white">cumulated points</span>
          </div>
        </div>
      </div>
      <div className="w-32 h-32">
        <Image 
          src="/fire.png" 
          alt="Fire Emoji" 
          width={128} 
          height={128} 
          className="object-contain"
        />
      </div>
    </div>
  );
}