"use client";
import React from "react";
import { StickyScroll } from "../components/ui/sticky-scroll-reveal";

const howItWorksContent = [
  {
    title: "Real-Time Skill Exchange",
    description:
      "SkillSphere connects learners and mentors for live, interactive sessions. The platform empowers users to exchange skills in real time — from coding help and design reviews to GATE prep and lab walkthroughs.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">🔄</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Live Skill Sharing</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Engage in real-time sessions with mentors or peers for dynamic learning.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Interactive Sessions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Peer Mentorship</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Skill Discovery</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Microlearning Modules",
    description:
      "Short, focused learning bursts tailored to user-defined skills make growth manageable and sustainable. Learn or mentor through bite-sized, live interactions anytime.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">⚡</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Live Microlearning</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Learn quickly with focused, live learning sessions based on your goals.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Short Sessions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Goal-Oriented Learning</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Real-Time Feedback</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Collaborative Community",
    description:
      "Join a growing community of learners and mentors. Share tutorials, join workshops, or co-host sessions — learning becomes a shared journey.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">🌐</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Community Learning</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Share skills, host events, and collaborate on your learning journey.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Workshops & Events</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Peer Collaboration</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Shared Tutorials</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Flexible & Secure Platform",
    description:
      "SkillSphere is built on a robust stack: secure login via Clerk, scalable sessions via Appwrite, and beautiful interfaces powered by Next.js and Tailwind CSS. All with full CRUD support.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">🛠️</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Seamless Experience</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Enjoy fast, secure, and role-based access across a full-stack environment.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Role-Based Access</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Full CRUD Support</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Cloud-Hosted UI</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "Recognize & Reward Growth",
    description:
      "Earn badges, endorsements, and certificates as you grow. A leaderboard celebrates top mentors, and future rewards include payment-based incentives.",
    content: (
      <div className="h-full w-full p-8 flex flex-col justify-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-xl mb-6 flex items-center justify-center">
            <span className="text-2xl">🏆</span>
          </div>
          <h3 className="text-2xl font-bold mb-4">Recognition & Rewards</h3>
          <p className="text-white/90 text-base leading-relaxed">
            Earn badges, certificates, and visibility as you mentor and learn.
          </p>
          <div className="mt-6 space-y-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Verified Badges</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Mentor Leaderboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-white/60 rounded-full"></div>
              <span className="text-sm text-white/80">Certificates & Rewards</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="w-full min-h-screen bg-slate-900">
      <StickyScroll content={howItWorksContent} />
    </section>
  );
};

export default HowItWorks;