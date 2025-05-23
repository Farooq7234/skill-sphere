"use client";
import { SignUpButton } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [typewriterText1, setTypewriterText1] = useState('');
  const [typewriterText2, setTypewriterText2] = useState('');
  const [typewriterText3, setTypewriterText3] = useState('');
  const [showButton, setShowButton] = useState(false);

  const text1 = "Teach What You Know,";
  const text2 = "Learn What You Love";
  const text3 = "Learn, teach, and grow together in a dynamic community where skills are traded, knowledge is shared.";

  useEffect(() => {
    setIsLoaded(true);
    
    // Typewriter effect for first text
    const timer1 = setTimeout(() => {
      let i = 0;
      const interval1 = setInterval(() => {
        if (i < text1.length) {
          setTypewriterText1(text1.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval1);
          
          // Start second text after first completes
          setTimeout(() => {
            let j = 0;
            const interval2 = setInterval(() => {
              if (j < text2.length) {
                setTypewriterText2(text2.slice(0, j + 1));
                j++;
              } else {
                clearInterval(interval2);
                
                // Start description text after second completes
                setTimeout(() => {
                  let k = 0;
                  const interval3 = setInterval(() => {
                    if (k < text3.length) {
                      setTypewriterText3(text3.slice(0, k + 1));
                      k++;
                    } else {
                      clearInterval(interval3);
                      // Show button after all text completes
                      setTimeout(() => setShowButton(true), 300);
                    }
                  }, 30);
                }, 500);
              }
            }, 80);
          }, 300);
        }
      }, 100);
    }, 800);

    return () => clearTimeout(timer1);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
      {/* Enhanced background elements with animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full opacity-20 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full opacity-20 blur-3xl animate-pulse-slow-delay"></div>
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-3xl animate-float"></div>
        <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-blue-400 rounded-full opacity-5 blur-2xl animate-float-delay"></div>
      </div>

      {/* Enhanced grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px] animate-grid-fade"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-30 animate-particle-${i % 3}`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
              animationDelay: `${i * 0.5}s`
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Enhanced Text with animations */}
          <div className={`space-y-8 transform transition-all duration-1000 ${isLoaded ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="inline-block relative">
                  <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 text-transparent bg-clip-text animate-gradient-flow font-extrabold tracking-tight">
                    {typewriterText1}
                    {typewriterText1.length < text1.length && (
                      <span className="animate-blink text-purple-400">|</span>
                    )}
                  </span>
                  {/* Glowing effect behind gradient text */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-purple-600 opacity-20 blur-lg animate-glow-pulse"></div>
                </span>
                <br />
                <span className="text-white relative">
                  <span className="relative z-10 drop-shadow-2xl">
                    {typewriterText2}
                    {typewriterText2.length < text2.length && typewriterText1.length >= text1.length && (
                      <span className="animate-blink text-white">|</span>
                    )}
                  </span>
                  {/* Subtle glow for white text */}
                  <div className="absolute inset-0 text-white opacity-50 blur-sm">{typewriterText2}</div>
                </span>
              </h1>
              
              <div className="relative">
                <p className="text-2xl text-gray-300 max-w-xl leading-relaxed transform transition-all duration-1000 delay-300">
                  <span className="relative z-10">
                    {typewriterText3}
                    {typewriterText3.length < text3.length && typewriterText2.length >= text2.length && (
                      <span className="animate-blink text-white">|</span>
                    )}
                  </span>
                </p>
                {/* Animated underline effect */}
                <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transform origin-left transition-all duration-2000 delay-1000"
                     style={{ width: typewriterText3.length >= text3.length ? '100%' : '0%' }}></div>
              </div>
            </div>
            
                <div className={`flex flex-col sm:flex-row gap-4 transform transition-all duration-800 delay-500 ${showButton ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
              <SignUpButton>
                <button className="group relative px-8 py-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-500 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
                  {/* Button background animation */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 transform translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>

                  {/* Button shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <span className="relative z-10 flex items-center gap-2">
                    Get Started
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>

                  {/* Button glow effect */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-60 blur-sm transition-all duration-500"></div>
                </button>
              </SignUpButton>
            </div>
          </div>
          

          {/* Right: Enhanced Video with better animations */}
          <div className={`relative h-full min-h-[400px] flex items-center justify-center transform transition-all duration-1200 delay-300 ${isLoaded ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="relative w-full max-w-md rounded-2xl overflow-hidden bg-gray-900/50 backdrop-blur-sm border border-white/10">
              <video
                typeof="video/mp4"
                src="/hero-globe-dark.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover rounded-2xl"
              />
              
              {/* Enhanced glow effect with animation */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-600 to-blue-500 rounded-2xl opacity-40 blur-lg animate-gradient-rotate"></div>
              {/* <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl opacity-30 blur-sm animate-pulse-glow"></div> */}
            </div>

            {/* Enhanced floating elements */}
            <div className="absolute -top-8 -right-8 w-24 h-24 bg-gradient-to-br from-blue-600/30 to-purple-600/30 rounded-2xl blur-sm animate-float-complex backdrop-blur-sm border border-white/10"></div>
            <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-gradient-to-tl from-purple-600/30 to-blue-600/30 rounded-2xl blur-sm animate-float-complex-delay backdrop-blur-sm border border-white/10"></div>
            <div className="absolute top-1/4 -left-6 w-16 h-16 bg-gradient-to-r from-blue-400/40 to-purple-500/40 rounded-full blur-md animate-orbit"></div>
            <div className="absolute bottom-1/4 -right-4 w-12 h-12 bg-gradient-to-l from-purple-400/40 to-blue-500/40 rounded-full blur-md animate-orbit-reverse"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.05); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        
        @keyframes pulse-slow-delay {
          0%, 100% { opacity: 0.2; transform: scale(1.1); }
          50% { opacity: 0.3; transform: scale(1); }
        }
        
        @keyframes float-complex {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(-10px) rotate(240deg); }
        }
        
        @keyframes float-complex-delay {
          0%, 100% { transform: translateY(-10px) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(-120deg); }
          66% { transform: translateY(-5px) rotate(-240deg); }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(30px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(30px) rotate(-360deg); }
        }
        
        @keyframes orbit-reverse {
          0% { transform: rotate(0deg) translateX(-25px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(-25px) rotate(360deg); }
        }
        
        @keyframes particle-0 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          25% { transform: translateY(-50px) translateX(20px); opacity: 0.7; }
          50% { transform: translateY(-30px) translateX(-15px); opacity: 0.5; }
          75% { transform: translateY(-70px) translateX(10px); opacity: 0.8; }
        }
        
        @keyframes particle-1 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          33% { transform: translateY(-40px) translateX(-20px); opacity: 0.6; }
          66% { transform: translateY(-60px) translateX(25px); opacity: 0.4; }
        }
        
        @keyframes particle-2 {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.4; }
          50% { transform: translateY(-80px) translateX(-10px); opacity: 0.8; }
        }
        
        @keyframes grid-fade {
          0%, 100% { opacity: 0.02; }
          50% { opacity: 0.05; }
        }
        
        // .animate-gradient-flow {
        //   background-size: 200% 200%;
        //   animation: gradient-flow 3s ease-in-out infinite;
        // }
        
        // .animate-gradient-rotate {
        //   animation: gradient-rotate 8s linear infinite;
        // }
        
        .animate-blink {
          animation: blink 1s infinite;
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-pulse-slow-delay {
          animation: pulse-slow-delay 4s ease-in-out infinite;
        }
        
        .animate-float-complex {
          animation: float-complex 6s ease-in-out infinite;
        }
        
        .animate-float-complex-delay {
          animation: float-complex-delay 6s ease-in-out infinite 2s;
        }
        
        .animate-orbit {
          animation: orbit 8s linear infinite;
        }
        
        .animate-orbit-reverse {
          animation: orbit-reverse 10s linear infinite;
        }
        
        .animate-particle-0 {
          animation: particle-0 12s ease-in-out infinite;
        }
        
        .animate-particle-1 {
          animation: particle-1 15s ease-in-out infinite;
        }
        
        .animate-particle-2 {
          animation: particle-2 10s ease-in-out infinite;
        }
        
        .animate-grid-fade {
          animation: grid-fade 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;