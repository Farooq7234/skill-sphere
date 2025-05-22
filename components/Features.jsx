'use client';

import { useEffect, useRef } from 'react';
import {
  Handshake,
  Cpu,
  Dices,
  Calendar1,
  Smartphone,
  Sparkles,
} from 'lucide-react';

const FeatureCard = ({ icon, title, description, delay }) => {
  const cardRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate-in');
            }, delay);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div 
      ref={cardRef}
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 opacity-0 translate-y-8 transition-all duration-700 ease-out hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/10 group"
    >
      <div className="rounded-lg p-3 inline-flex bg-gradient-to-br from-blue-500/10 to-purple-600/10 border border-slate-700 mb-4 group-hover:border-purple-500/50 transition-colors duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Handshake className="h-6 w-6 text-blue-400" />,
      title: "Peer-to-Peer Skill Exchange",
      description: "Connect with other learners and mentors to trade skills in a mutually beneficial way.",
    },
    {
      icon: <Cpu className="h-6 w-6 text-purple-400" />,
      title: "Community Knowledge Sharing",
      description: "Engage in tutorials online meets with peers.",
    },
    {
      icon: <Dices className="h-6 w-6 text-blue-400" />,
      title: "Trust Building",
      description: "Showcase your skills and build trust with others through verified profiles and endorsements.",
    },
    {
      icon: <Calendar1 className="h-6 w-6 text-purple-400" />,
      title: "Flexible Scheduling & Calendar Integration",
      description: "Easily book, reschedule, and manage skill exchange sessions with google calendar syncing.",
    },
    {
      icon: <Smartphone className="h-6 w-6 text-blue-400" />,
      title: "Skill Endorsements ",
      description: "Build your credibility through sessions and endorsements from fellow learners.",
    },
    {
      icon: <Sparkles className="h-6 w-6 text-purple-400" />,
      title: "Learning Becomes a Habit",
      description: "Through our sessions, you can make learning a daily habit and improve your skills consistently.",
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-900 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/3 bottom-1/3 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">Features</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover the unique features that make our platform the best place to learn and grow your skills. 
            From peer-to-peer exchanges to flexible scheduling, we have everything you need to succeed.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;