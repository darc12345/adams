import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LandingPage = () => {
  return (
    <>
      {/* Top Section with SVG Background */}
      <div
        className="relative w-full flex flex-col items-center justify-center"
        style={{ minHeight: '100vh' }} // Make hero cover the whole page
      >
        {/* SVG Background Image */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Image
            src="/landing-bg.svg"
            alt="Landing Background"
            fill
            className="object-cover object-top scale-[1.7]"
            priority
          />
          <div className="absolute inset-0 w-full h-full backdrop-blur-sm"></div>
        </div>
        {/* Content Above Background */}
        <div className="relative z-10 flex flex-col items-start justify-center max-w-md w-full p-8 text-white pt-40">
          {/* Welcome and ADAMS PROJECT Title */}
          <h1 className="text-4xl font-bold mb-4 mt-8">Welcome to</h1>
          <div className="mb-4">
            <h2 className="text-6xl font-extrabold leading-tight">ADAMS</h2>
            <h3 className="text-5xl font-bold">PROJECT</h3>
          </div>
          <p className="text-xl italic mb-12">&quot;Riding towards a better future&quot;</p>
          <Link href="/login">
            <button className="bg-white text-blue-500 font-bold py-3 px-10 rounded-lg text-lg hover:bg-opacity-90 transition mb-20">
              Login
            </button>
          </Link>
        </div>
      </div>

      {/* Next Components (start after login button and background) */}
      <div className="flex flex-col items-center w-full bg-gradient-to-b from-blue-500 to-green-500 text-white p-8 mt-32">
        {/* Combined Logo and Description Section */}
        <div className="mt-16 w-full max-w-md text-center">
          {/* Logo */}
          <div className="mb-6">
            <Image
              src="/adams-logo.svg"
              alt="ADAMS Logo"
              width={80}
              height={80}
              className="object-contain mx-auto"
            />
          </div>
          {/* Description */}
          <div>
            <h4 className="text-3xl font-bold mb-4">ADAM Let&apos;s you ...</h4>
          </div>
        </div>

        {/* Feature 1 */}
        <div className="mt-16 w-full max-w-md">
          <div className="mb-4 text-left">
            <p className="text-2xl">
              Track Air Quality Monitor the air quality around you to ensure a healthier and safer environment.
            </p>
          </div>
          <div className="w-full rounded-lg flex items-center justify-center">
            <Image
              src="/product/1.svg"
              alt="Product Image"
              width={400}
              height={300}
              className="object-contain"
            />
          </div>
        </div>

        {/* Feature 2 */}
        <div className="mt-16 w-full max-w-md">
          <div className="mb-4 text-center">
            <p className="text-2xl">
              View heat map of your area
            </p>
          </div>
          <div className="w-full rounded-lg flex items-center justify-center">
            <Image
              src="/product/2.svg"
              alt="Product Image"
              width={400}
              height={300}
              className="object-contain"
            />
          </div>
        </div>

        {/* Feature 3 */}
        <div className="mt-16 w-full max-w-md">
          <div className="mb-4 text-right">
            <p className="text-2xl">
              Get rewards for completing missions
            </p>
          </div>
          <div className="w-full rounded-lg flex items-center justify-center">
            <Image
              src="/product/3.svg"
              alt="Product Image"
              width={400}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Long Page Section */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#1F252D] text-white p-8">
        <div className="text-center max-w-2xl">
          <h2 className="text-4xl font-bold mb-6">Ride towards a better future</h2>
          <Link href="/sign-up">
            <button className="bg-blue-500 text-white font-bold py-3 px-10 rounded-lg text-lg hover:bg-blue-600 transition">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LandingPage;