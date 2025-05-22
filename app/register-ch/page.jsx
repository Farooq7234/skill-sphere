'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { databases, ID } from '../../utils/appwrite';
import Link from 'next/link';

export default function RegisterToTeach() {
    const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    skills: [],
    description: '',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to submit');
      return;
    }



    setLoading(true);

    try {
      const doc = await databases.createDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
        process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID,
        ID.unique(),
        {
          userId: user.id,
          name: formData.name,
          url: formData.url,
          skills: formData.skills,
          reason: formData.reason,
        }
      );

      console.log('Success:', doc);
      setSubmitted(true);
      setShowConfetti(true);
    } catch (error) {
      console.error('Appwrite error:', error);
      alert('Something went wrong. Please try again.');
    }

    setLoading(false);
  };

  const handleSkillKeyDown = (e) => {
    if ((e.key === 'Enter' || e.key === ',') && skillInput.trim()) {
      e.preventDefault();
      if (!formData.skills.includes(skillInput.trim())) {
        setFormData({
          ...formData,
          skills: [...formData.skills, skillInput.trim()]
        });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (index) => {
    const newSkills = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: newSkills });
  };

  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen p-6 relative overflow-hidden py-20">
      {showConfetti && <Confetti />}

      <div className="max-w-xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-300">Register to Teach on SkillSphere</h1>
          <p className="text-indigo-200 mt-2">Share your expertise and inspire others</p>
        </div>

        {submitted ? (
          <div className="bg-indigo-900 p-8 rounded-lg shadow-md text-center border border-indigo-500">
            <div className="text-2xl font-bold text-indigo-300 mb-4">Thank you for registering! 🎉</div>
            <p className="text-indigo-100">We're excited to have you join our community of educators at SkillSphere.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-500 transition duration-300 ease-in-out transform hover:scale-105"
            >
             <Link href={`/dashboard`}>Go to Dashboard</Link>
            </button>
          </div>
        ) : (
          <div className=" bg-opacity-80 p-8 rounded-lg shadow-md space-y-5 border border-indigo-500">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-indigo-200">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-purple-500 text-indigo-100 rounded-md p-3"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="url" className="block text-sm font-medium text-indigo-200">Url</label>
              <input
                id="url"
                type="url"
                name="url"
                placeholder="Short intro about your expertise"
                value={formData.url}
                onChange={handleChange}
                className="w-full border border-purple-500 text-indigo-100 rounded-md p-3"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="skills" className="block text-sm font-medium text-indigo-200">Skills You Want to Teach</label>

              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center  text-white px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(index)}
                      className="ml-2 text-white hover:text-gray-300 focus:outline-none"
                    >
                      &times;
                    </button>
                  </span>
                ))}
              </div>

              <input
                id="skills"
                type="text"
                name="skills"
                placeholder="e.g. JavaScript, Photography, Yoga"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="w-full border border-purple-500 text-indigo-100  rounded-md p-3"
              />
              <p className="text-xs text-indigo-300">Press Enter or comma to add skills</p>
            </div>


            <div className="space-y-2">
              <label htmlFor="reason" className="block text-sm font-medium text-indigo-200">Why Do You Want to Teach?</label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Share your passion for teaching"
                value={formData.reason}
                onChange={handleChange}
                className="w-full border border-purple-500 text-indigo-100 rounded-md p-3"
                rows={2}
              />
            </div>

            <button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-md hover:bg-indigo-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Confetti() {
  const pieces = [];

  for (let i = 0; i < 100; i++) {
    const size = Math.floor(Math.random() * 8) + 6;
    const leftPos = Math.floor(Math.random() * 100);
    const animationDuration = (Math.random() * 2) + 3;
    const animationDelay = Math.random() * 0.5;

    const colors = ['bg-red-500', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400', 'bg-indigo-300'];
    const color = colors[Math.floor(Math.random() * colors.length)];

    pieces.push(
      <div 
        key={i}
        className={`absolute ${color} rounded-sm`}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          left: `${leftPos}%`,
          top: '-20px',
          animation: `confetti-fall ${animationDuration}s ease-in-out ${animationDelay}s forwards`,
          opacity: 0
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      <style jsx>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
      {pieces}
    </div>
  );
}
