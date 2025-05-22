"use client";
import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const howItWorksContent = [
  {
    title: "Skill Exchange Marketplace",
    description:
      "SkillSphere enables users to connect and trade skills in a collaborative marketplace. Whether you're teaching graphic design and learning public speaking, or swapping photography tips for coding lessons, the platform uses intelligent matchmaking to pair learners and mentors effectively.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">📘</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Skill Exchange</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Match with mentors or learners, trade skills, and schedule sessions seamlessly.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Intelligent Matching</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Skill Trading</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Session Scheduling</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Personalized Microlearning",
    description:
      "Our AI-powered microlearning engine curates short, adaptive lessons tailored to each user's skill goals and learning pace. By analyzing your progress and interests, SkillSphere delivers focused, modular content that evolves with you.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">🧠</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">AI Microlearning</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Adaptive lessons keep your progress on track, whether you're reviewing basics or mastering advanced concepts.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">AI-Powered Curation</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Adaptive Learning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Progress Tracking</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Interactive Simulations",
    description:
      "SkillSphere brings learning to life through scenario-based simulations powered by AI. Practice soft skills like negotiation, leadership, and communication in immersive, roleplay-like environments with real-time feedback and gamified challenges.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">🎮</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Real-world Scenarios</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Experience learning through simulations and get instant feedback.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Scenario-Based Learning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Real-time Feedback</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Gamified Challenges</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Community Collaboration",
    description:
      "SkillSphere fosters a community where users share insights, collaborate on projects, and support each other. Participate in events, workshops, or explore peer-made tutorials to grow together.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">🤝</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Connect & Collaborate</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Learn and grow together with events, projects, and community knowledge.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Community Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Project Collaboration</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Peer Tutorials</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Recognition & Trust",
    description:
      "Earn badges, endorsements, and verified certificates that validate your learning and teaching. Build trust and showcase your evolving skillset within the platform.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">🏅</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Earn & Showcase</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Gain credibility with recognitions and build your learning profile.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Verified Badges</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Peer Endorsements</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Skill Certificates</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section className="w-full min-h-screen bg-slate-900">
      <StickyScroll content={howItWorksContent} />
    </section>
  );
};

export default HowItWorks;