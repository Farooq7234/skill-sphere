"use client";

import { useEffect, useRef } from "react";
import {
  User,
  Link,
  BookOpen,
  Brain,
  Users,
  Award,
} from "lucide-react";

const TimelineStep = ({ number, title, description, icon, isLast }) => {
  const stepRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (stepRef.current) observer.observe(stepRef.current);
    return () => {
      if (stepRef.current) observer.unobserve(stepRef.current);
    };
  }, []);

  return (
    <div
      ref={stepRef}
      className="relative flex opacity-0 translate-y-8 transition-all duration-700 ease-out"
    >
      {!isLast && (
        <div className="absolute top-0 left-6 w-0.5 h-full bg-gradient-to-b from-purple-500 to-blue-500 ml-0.5"></div>
      )}

      <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-slate-800 border border-purple-500 shadow-lg shadow-purple-500/20">
        {icon}
      </div>

      <div className="ml-8 pb-16">
        <div className="flex items-center mb-3">
          <span className="flex items-center justify-center h-7 w-7 rounded-full bg-blue-500 text-sm font-bold text-white mr-3">
            {number}
          </span>
          <h3 className="text-2xl font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-300 text-lg max-w-lg leading-relaxed">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Sign Up & Create Your Profile",
      description:
        'Join SkillSphere by signing up and setting up your profile. List the skills you can teach and the ones you want to learn. 🪪 "Your learning journey starts with your unique skill identity."',
      icon: <User className="h-7 w-7 text-purple-400" />,
    },
    {
      number: 2,
      title: "Get Matched with a Skill Partner",
      description:
        'Our AI-powered algorithm connects you with users who want to learn what you can teach—and vice versa. 🔗 "Teach guitar, learn coding. It\'s skill-sharing made smart."',
      icon: <Link className="h-7 w-7 text-purple-400" />,
    },
    {
      number: 3,
      title: "Start Learning Through Micro-Courses",
      description:
        'Access AI-personalized microlearning modules designed for your goals and current skill level. 📘 "Never too much, never too little—just what you need."',
      icon: <BookOpen className="h-7 w-7 text-purple-400" />,
    },
    {
      number: 4,
      title: "Practice with Simulations",
      description:
        'Hone your soft skills like communication, leadership, and negotiation through realistic, AI-driven simulations. 🎭 "Practice makes perfect—with AI as your coach."',
      icon: <Brain className="h-7 w-7 text-purple-400" />,
    },
    {
      number: 5,
      title: "Collaborate and Share Knowledge",
      description:
        'Join the community: ask questions, share insights, and participate in events. 🌐 "Grow together by giving back."',
      icon: <Users className="h-7 w-7 text-purple-400" />,
    },
    {
      number: 6,
      title: "Earn Badges and Build Your Reputation",
      description:
        'Complete challenges, get endorsements, and earn verified skill certificates. 🏆 "Recognition that grows with you."',
      icon: <Award className="h-7 w-7 text-purple-400" />,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-900 relative">
      {/* Background */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-slate-900 to-transparent"></div>
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-900 to-transparent"></div>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/3 top-1/4 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
              How It Works
            </span>
          </h2>
          <p className="text-gray-300 text-xl max-w-3xl mx-auto">
            SkillSphere is your AI-powered skill exchange ecosystem. Learn,
            teach, and evolve with a guided, engaging process.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {steps.map((step, index) => (
            <TimelineStep
              key={index}
              number={step.number}
              title={step.title}
              description={step.description}
              icon={step.icon}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;