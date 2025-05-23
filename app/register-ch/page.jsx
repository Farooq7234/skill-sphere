'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { databases, ID } from '../../utils/appwrite';
import Link from 'next/link';
import { 
  User, 
  Link as LinkIcon, 
  Tag,
  FileText,
  X
} from 'lucide-react';

export default function RegisterToTeach() {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    skills: [],
    description: '',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);
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
    <div className="min-h-screen bg-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      {showConfetti && <Confetti />}

      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Register to Teach on SkillSphere</h1>
          <p className="text-gray-400 mt-2">Share your expertise and inspire others</p>
        </div>

        {submitted ? (
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8 text-center">
            <div className="text-2xl font-bold text-white mb-4">Thank you for registering! 🎉</div>
            <p className="text-gray-300 mb-6">We're excited to have you join our community of educators at SkillSphere.</p>
            <button 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Link href={`/dashboard`}>Go to Dashboard</Link>
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8 space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* URL Field */}
            <div>
              <label htmlFor="url" className="block text-sm font-medium text-white mb-2">
                Video URL *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LinkIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="url"
                  type="url"
                  name="url"
                  placeholder="Share about your expertise"
                  value={formData.url}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Skills Field */}
            <div>
              <label htmlFor="skills" className="block text-sm font-medium text-white mb-2">
                Skills You Want to Teach *
              </label>

              {/* Display added skills */}
              {formData.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center text-sm px-3 py-1 text-white bg-green-500 rounded-full"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="ml-2 text-white hover:text-gray-300 focus:outline-none"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              <input
                id="skills"
                type="text"
                name="skills"
                placeholder="e.g. JavaScript, Photography, Yoga"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillKeyDown}
                className="block w-full px-3 py-3 border border-slate-700 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
              <p className="text-xs text-gray-400 mt-1">Press Enter or comma to add skills</p>
            </div>

            {/* Reason Field */}
            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-white mb-2">
                Why Do You Want to Teach?
              </label>
              <div className="relative">
                <div className="absolute top-3 left-3 pointer-events-none">
                  <FileText className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  id="reason"
                  name="reason"
                  placeholder="Share your passion for teaching"
                  value={formData.reason}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-slate-700 rounded-lg bg-slate-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  rows={3}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting Application...
                </>
              ) : (
                'Submit Application'
              )}
            </button>
          </form>
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

    const colors = ['bg-red-500', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400', 'bg-purple-500'];
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