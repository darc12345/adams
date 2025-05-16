'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAuth, signInWithPopup, GoogleAuthProvider, UserCredential } from "firebase/auth";
import { initializeApp, getApps, FirebaseApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBJm2mG6WU2ItwKf2lQDP286QojYnPh50Q",
  authDomain: "adams-db415.firebaseapp.com",
  projectId: "adams-db415",
  storageBucket: "adams-db415.firebasestorage.app",
  messagingSenderId: "117026430120",
  appId: "1:117026430120:web:875a4e9078683e37d0769d",
  measurementId: "G-1ZGBXZ1DEK"
};

// Initialize Firebase only once
let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('All fields are required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://adam-be1-c555c3bbd0a6.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store login state after successful login
      localStorage.setItem('isLoggedIn', 'true');

      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        setErrorMsg(err.message || 'Login failed. Please try again.');
      } else {
        setErrorMsg('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Only the function is changed, not the button or design
  const googleSignIn = async () => {
    setIsLoading(true);
    setErrorMsg('');
    let token: string | undefined, user: import("firebase/auth").User, email: string | null | undefined, uid: string | undefined;
    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (!credential) {
        throw new Error('No credential found');
      }
      token = credential.accessToken;
      user = result.user;
      email = user.email;
      uid = user.uid;
    } catch (err) {
      if (typeof err === "object" && err && "code" in err && (err as { code?: string }).code === "auth/cancelled-popup-request") {
        setErrorMsg("Google Sign-In popup was cancelled. Please try again.");
      } else {
        setErrorMsg('Google Sign-In failed. Please try again.');
      }
      setIsLoading(false);
      return;
    }

    try {
      await fetch('https://adam-be1-c555c3bbd0a6.herokuapp.com/google-signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ token, email, uid }),
      });
      router.push('/dashboard');
    } catch {
      setErrorMsg('Google Sign-In failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = email && password;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#14181D] text-white p-4">
      {/* Logo */}
      <div className="mb-6">
        <Image 
          src="/adams-logo.svg"
          alt="ADAMS Logo"
          width={80}
          height={80}
          className="object-contain"
        />
      </div>

      <h1 className="text-3xl font-bold text-center mb-8">Log in</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-sm">
        {errorMsg && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {errorMsg}
          </div>
        )}
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full px-3 py-2 bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            required
          />
        </div>
        
        <button
          type="submit"
          disabled={!isFormValid || isLoading}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isFormValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
          } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
        >
          {isLoading ? 'Logging in...' : 'Log in'}
        </button>
      </form>
      
      <div className="mt-6 text-center w-full max-w-sm">
        <div className="mb-4">
          <Link href="/sign-up" className="text-blue-400 hover:text-blue-300 text-sm">
            Create account
          </Link>
        </div>       
        
        <div className="mt-24 text-center" onClick={googleSignIn} >
          <div className="mb-2 text-white font-medium">Login with</div>
          <Image 
            src="/google.svg" 
            alt="Google Logo" 
            width={40} 
            height={40} 
            className="mx-auto cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;