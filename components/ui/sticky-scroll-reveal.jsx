"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const StickyScroll = ({ content, contentClassName }) => {
  const [activeCard, setActiveCard] = useState(0);
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);

  const linearGradients = [
    "linear-gradient(135deg, #06b6d4 0%, #10b981 100%)",
    "linear-gradient(135deg, #ec4899 0%, #6366f1 100%)",
    "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
    "linear-gradient(135deg, #8b5cf6 0%, #06b6d4 100%)",
    "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  ];

  const backgroundColors = ["#0f172a", "#1e293b", "#0f172a", "#1e293b", "#0f172a"];
  
  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  // Create refs for each item
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, content.length);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const scrollTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;
      const scrollCenter = scrollTop + containerHeight / 2;
      
      // If we're near the bottom, activate the last card
      if (scrollTop + containerHeight >= scrollHeight - 50) {
        setActiveCard(content.length - 1);
        return;
      }
      
      let closestIndex = 0;
      let minDistance = Infinity;
      
      cardRefs.current.forEach((el, index) => {
        if (el) {
          const cardCenter = el.offsetTop + el.clientHeight / 2;
          const distance = Math.abs(cardCenter - scrollCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = index;
          }
        }
      });
      
      setActiveCard(closestIndex);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      handleScroll(); // Set initial active card
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [content.length]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="relative min-h-screen w-full overflow-hidden"
    >
      <div className="sticky top-0 min-h-screen w-full flex items-center justify-center px-4 py-20">
        <div className="flex w-full max-w-7xl gap-16 items-start">
          {/* Left scrollable text */}
          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto scrollbar-hide h-[70vh] pr-6 scroll-smooth"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#475569 transparent'
            }}
          >
            <div className="py-10">
              {content.map((item, index) => (
                <div
                  key={item.title + index}
                  ref={(el) => (cardRefs.current[index] = el)}
                  className={`${
                    index === content.length - 1 ? 'mb-80' : 'mb-20'
                  } last:mb-80`}
                >
                
                  <motion.div
                    animate={{
                      opacity: activeCard === index ? 1 : 0.4,
                      scale: activeCard === index ? 1 : 0.95,
                      y: activeCard === index ? 0 : 20,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                      {item.title}
                    </h2>
                    <p className="text-lg lg:text-xl max-w-2xl text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Sticky preview card */}
          <motion.div
            style={{ background: backgroundGradient }}
            animate={{
              background: backgroundGradient,
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className={cn(
              "hidden lg:block h-96 w-96 rounded-3xl shadow-2xl overflow-hidden",
              "sticky top-32 flex-shrink-0",
              contentClassName
            )}
          >
            <motion.div
              key={activeCard}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="h-full w-full"
            >
              {content[activeCard]?.content ?? null}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};