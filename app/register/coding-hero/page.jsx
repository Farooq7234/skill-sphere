'use client';
import { useState, useEffect } from 'react';
export default function RegisterToTeach() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    skills: '',
    experience: '',
    description: '',
    reason: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setShowConfetti(true);
  };

  // Hide confetti after 5 seconds
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  return (
    <div className="min-h-screen p-6 relative overflow-hidden">
      {/* Animated background elements */}
    
      {showConfetti && <Confetti />}
      
      <div className="max-w-xl mx-auto relative z-10 ">
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
              Go to Dashboard
            </button>
          </div>
        ) : (
          <div className=" bg-opacity-80 p-8 rounded-lg shadow-md space-y-5 border border-indigo-500">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-indigo-200 ">Full Name</label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-indigo-500 text-indigo-100 rounded-md p-3 "
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-indigo-200">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border border-indigo-500 text-indigo-100 rounded-md p-3 "
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="skills" className="block text-sm font-medium text-indigo-200">Skills You Want to Teach</label>
              <input
                id="skills"
                type="text"
                name="skills"
                placeholder="e.g. JavaScript, Photography, Yoga"
                value={formData.skills}
                onChange={handleChange}
                className="w-full border border border-indigo-500 text-indigo-100 rounded-md p-3 "
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="experience" className="block text-sm font-medium text-indigo-200">Experience</label>
              <input
                id="experience"
                type="text"
                name="experience"
                placeholder="e.g. 2 years, Professional certification"
                value={formData.experience}
                onChange={handleChange}
                className="w-full border border border-indigo-500 text-indigo-100 rounded-md p-3 "
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-indigo-200">Brief Description of Your Course</label>
              <textarea
                id="description"
                name="description"
                placeholder="What will students learn in your course?"
                value={formData.description}
                onChange={handleChange}
                className="w-full border border border-indigo-500 text-indigo-100 rounded-md p-3 "
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="reason" className="block text-sm font-medium text-indigo-200">Why Do You Want to Teach?</label>
              <textarea
                id="reason"
                name="reason"
                placeholder="Share your passion for teaching"
                value={formData.reason}
                onChange={handleChange}
                className="w-full  border border-indigo-500 text-indigo-100 rounded-md p-3 "
                rows={2}
              />
            </div>
            
            <button 
              onClick={handleSubmit}
              className="w-full bg-indigo-500 text-white py-3 rounded-md hover:bg-indigo-400 transition duration-300 ease-in-out transform hover:scale-105"
            >
              Submit Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// // Animated Background Component
// function AnimatedBackground() {
//   const bubbles = [];
  
//   // Create 20 animated bubbles
//   for (let i = 0; i < 20; i++) {
//     const size = Math.floor(Math.random() * 120) + 40; // Random size between 40-160px
//     const startPositionX = Math.random() * 100; // Random horizontal position
//     const startPositionY = Math.random() * 100; // Random vertical position
//     const duration = Math.random() * 40 + 60; // Random duration between 60-100s
//     const delay = Math.random() * -20; // Random delay
    
//     // Create gradient colors
//     const opacity = Math.random() * 0.1 + 0.05; // Random opacity between 0.05-0.15
    
//     bubbles.push(
//       <div 
//         key={i}
//         className="absolute rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
//         style={{
//           width: `${size}px`,
//           height: `${size}px`,
//           left: `${startPositionX}%`,
//           top: `${startPositionY}%`,
//           opacity: opacity,
//           animation: `float ${duration}s linear ${delay}s infinite`,
//           zIndex: 1
//         }}
//       />
//     );
//   }

//   return (
//     <div className="fixed inset-0 overflow-hidden">
//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translate(0, 0) rotate(0deg); }
//           33% { transform: translate(-15vw, -5vh) rotate(120deg); }
//           66% { transform: translate(15vw, -15vh) rotate(240deg); }
//           100% { transform: translate(0, 0) rotate(360deg); }
//         }
//       `}</style>
//       {bubbles}
//     </div>
//   );
// }

// Confetti component
function Confetti() {
  // Generate array of confetti pieces
  const pieces = [];
  
  for (let i = 0; i < 100; i++) {
    const size = Math.floor(Math.random() * 8) + 6; // Random size between 6-14px
    const leftPos = Math.floor(Math.random() * 100); // Random horizontal position
    const animationDuration = (Math.random() * 2) + 3; // Random duration between 3-5s
    const animationDelay = Math.random() * 0.5; // Random delay
    
    // Random color
    const colors = ['bg-indigo-500', 'bg-purple-400', 'bg-blue-400', 'bg-violet-400', 'bg-indigo-300'];
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