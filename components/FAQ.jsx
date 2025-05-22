'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState(0);
  
  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <div className="border-b border-slate-700 last:border-0">
      <button
        className="w-full flex justify-between items-center py-5 px-5 text-left focus:outline-none focus:ring-2 focus:ring-purple-400/30 focus:ring-inset rounded"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-medium text-white">{question}</h3>
        <ChevronDown
          className={`h-5 w-5 text-purple-400 transition-transform duration-300 ease-in-out ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        style={{ height: `${height}px` }}
        className="overflow-hidden transition-all duration-300 ease-in-out"
      >
        <div ref={contentRef} className="pb-5 px-5">
          <p className="text-gray-400">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: "What is SkillSphere and how does it work?",
      answer: "SkillSphere is a peer-to-peer learning platform where users can both teach and learn skills. It  matches users based on their skill interests, provide personalized microlearning content, and enable real-time collaboration through messaging and video calls"
    },
    {
      question: "Do I need to pay to use SkillSphere?",
      answer: "We accept all major credit cards including Visa, Mastercard, American Express, and Discover. We also support payments via PayPal and bank transfers for annual subscriptions. Enterprise customers can opt for invoicing with net-30 payment terms."
    },
    {
      question: "What types of skills can I learn or teach on SkillSphere?",
      answer: "SkillSphere supports a wide variety of technical subjects like coding, design, data science and more. If you can teach it or want to learn it, there’s likely someone here for you!"
    },
    {
      question: "Can I contribute my own learning materials or tutorials?",
      answer: "Definitely! SkillSphere encourages users to upload short-form video tutorials, guides, or tips. You can share your expertise with the community and build your teaching credibility."
    },
    {
      question: "Do I need teaching experience to share my skills?",
      answer: "Not at all! Anyone can teach on SkillSphere. Whether you're a hobbyist, student, or professional, if you’re passionate about a skill, you’re welcome to share it. Peer ratings and feedback will help you grow as a mentor."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-slate-900 relative">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 right-1/3 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute left-1/4 bottom-1/4 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Find answers to common questions about our platform and services.
            If you don't see your question here, feel free to contact our support team.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden shadow-lg ">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              className ="p-5"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;