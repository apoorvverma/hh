'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const userData = [
    { name: 'Dhruva Poojary', city: 'New York' },
    { name: 'Krish Jain', city: 'New York' },
    { name: 'Naytik Vora', city: 'Allston' },
    { name: 'Harsh Patel', city: 'North Billerica' },
    { name: 'Ansh Mehta', city: 'Boston' },
    { name: 'Keval Patel', city: 'Cambridge' },
    { name: 'Harsh Shukla', city: 'Somerville' },
    { name: 'Akshat Kolekar', city: 'Boston' },
    { name: 'Indra Patel', city: 'Brookline' },
    { name: 'Brianna Socci', city: 'Boston' },
    { name: 'Apoorv Verma', city: 'Boston' },
    { name: 'Sarah Johnson', city: 'Providence' },
    { name: 'Michael Chen', city: 'Worcester' },
    { name: 'Emily Davis', city: 'Springfield' },
    { name: 'David Kim', city: 'Hartford' },
    { name: 'Jessica Brown', city: 'New Haven' },
    { name: 'Daniel Martinez', city: 'Stamford' },
    { name: 'Olivia Garcia', city: 'Portland' },
    { name: 'James Wilson', city: 'Burlington' },
    { name: 'Sophia Lee', city: 'Manchester' },
    { name: 'William Taylor', city: 'Nashua' },
    { name: 'Ava Anderson', city: 'Portsmouth' },
    { name: 'Benjamin Thomas', city: 'Albany' },
    { name: 'Mia Jackson', city: 'Buffalo' },
    { name: 'Lucas White', city: 'Rochester' },
    { name: 'Charlotte Harris', city: 'Syracuse' },
    { name: 'Henry Martin', city: 'Newark' },
    { name: 'Amelia Thompson', city: 'Jersey City' },
    { name: 'Alexander Garcia', city: 'Philadelphia' },
    { name: 'Victoria Rodriguez', city: 'Pittsburgh' }
];
  

export default function UserNotifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const showNotification = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentIndex(Math.floor(Math.random() * userData.length));
        setIsVisible(true);
      }, 1000);
      
    }, 5500);

    return () => clearInterval(showNotification);
  }, []);

  const currentUser = userData[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            initial={{ x: '-120%', opacity: 0, scale: 0.9 }}
            animate={{ 
              x: 0, 
              opacity: 1, 
              scale: 1,
              transition: { 
                type: 'spring', 
                damping: 20, 
                stiffness: 150 
              } 
            }}
            exit={{ 
              x: '-120%', 
              opacity: 0, 
              scale: 0.9,
              transition: { 
                duration: 0.3,
                ease: 'easeIn' 
              } 
            }}
            className="relative bg-gradient-to-r from-cyan-700 to-blue-500 shadow-xl rounded-xl p-4 pr-8 text-sm font-medium text-white backdrop-blur-sm"
          >
            <div className="absolute top-3 left-3 w-2 h-2 bg-green-500 rounded-full animate-ping" />
            <div className="absolute top-3 left-3 w-2 h-2 bg-green-500 rounded-full" />
            <div className="flex items-center gap-1 pl-4">
              <span className="font-bold text-white">{currentUser.name}</span>
              joined from
              <span className="font-bold">{currentUser.city}!</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
