'use client';

import { useEffect } from 'react';

import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import Features from '@/components/Features';
import FAQ from '@/components/FAQ';
import NavigationBar from '@/components/NavigationBar';


// Global styles for animations and backgrounds
const addGlobalStyles = () => {
  // Add custom CSS for animations
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    
    @keyframes float-delay {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    
    @keyframes gradient {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes orbit-1 {
      0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
      100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
    }
    
    @keyframes orbit-2 {
      0% { transform: rotate(90deg) translateX(150px) rotate(-90deg); }
      100% { transform: rotate(450deg) translateX(150px) rotate(-450deg); }
    }
    
    @keyframes orbit-3 {
      0% { transform: rotate(180deg) translateX(150px) rotate(-180deg); }
      100% { transform: rotate(540deg) translateX(150px) rotate(-540deg); }
    }
    
    @keyframes orbit-4 {
      0% { transform: rotate(270deg) translateX(150px) rotate(-270deg); }
      100% { transform: rotate(630deg) translateX(150px) rotate(-630deg); }
    }
    
    .animate-float {
      animation: float 5s ease-in-out infinite;
    }
    
    .animate-float-delay {
      animation: float 6s ease-in-out 1s infinite;
    }
    
    .animate-gradient {
      animation: gradient 8s ease infinite;
      background-size: 200% 200%;
    }
    
    .animate-orbit-1 {
      animation: orbit-1 20s linear infinite;
    }
    
    .animate-orbit-2 {
      animation: orbit-2 25s linear infinite;
    }
    
    .animate-orbit-3 {
      animation: orbit-3 30s linear infinite;
    }
    
    .animate-orbit-4 {
      animation: orbit-4 35s linear infinite;
    }
    
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .bg-grid-white {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(255,255,255)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e");
    }
  `;
  document.head.appendChild(style);
};

export default function Home() {
  useEffect(() => {
    // Set dark mode for the body
    document.body.classList.add('bg-slate-900');
    // Add global styles for animations
    addGlobalStyles();
    
    return () => {
      document.body.classList.remove('bg-slate-900');
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-slate-900 text-white">
          <NavigationBar />
      <HeroSection />
      <HowItWorks />
      <Features />
      <FAQ />

    </main>
  );
}