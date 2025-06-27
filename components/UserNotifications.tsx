'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const userData = [
  { name: 'David Kim', city: 'Hartford' },
  { name: 'Jessica Brown', city: 'New Haven' },
  { name: 'Brianna Socci', city: 'Boston' },
  { name: 'Daniel Martinez', city: 'Stamford' },
  { name: 'Olivia Garcia', city: 'Portland' },
  { name: 'James Wilson', city: 'Burlington' },
  { name: 'Sophia Lee', city: 'Manchester' },
  { name: 'William Taylor', city: 'Nashua' },
  { name: 'Dhruva Poojary', city: 'New York' },
  { name: 'Krish Jain', city: 'New York' },
  { name: 'Naytik Vora', city: 'Allston' },
  { name: 'Harsh Patel', city: 'North Billerica' },
  { name: 'Ansh Mehta', city: 'Boston' },
  { name: 'Keval Patel', city: 'Cambridge' },
  { name: 'Harsh Shukla', city: 'Somerville' },
  { name: 'Akshat Kolekar', city: 'Boston' },
  { name: 'Indra Patel', city: 'Brookline' },
  { name: 'Apoorv Verma', city: 'Boston' },
  { name: 'Sarah Johnson', city: 'Providence' },
  { name: 'Michael Chen', city: 'Worcester' },
  { name: 'Emily Davis', city: 'Springfield' },
  { name: 'Ava Anderson', city: 'Portsmouth' },
  { name: 'Benjamin Thomas', city: 'Albany' },
  { name: 'Mia Jackson', city: 'Buffalo' },
  { name: 'Lucas White', city: 'Rochester' },
  { name: 'Charlotte Harris', city: 'Syracuse' },
  { name: 'Henry Martin', city: 'Newark' },
  { name: 'Amelia Thompson', city: 'Jersey City' },
  { name: 'Alexander Garcia', city: 'Philadelphia' },
  { name: 'Victoria Rodriguez', city: 'Pittsburgh' },
  { name: 'Aiyana Tallchief', city: 'Boston' },
  { name: 'Nashoba Littlefeather', city: 'Cambridge' },
  { name: 'Kiona Redhawk', city: 'Worcester' },
  { name: 'Takoda Graywolf', city: 'Springfield' },
  { name: 'Mika Clearwater', city: 'Lowell' },
  { name: 'Nodin Swift', city: 'Brockton' },
  { name: 'Aylen Star', city: 'Quincy' },
  { name: 'Elan Strongbow', city: 'Lynn' },
  { name: 'Tala Runningdeer', city: 'Somerville' },
  { name: 'Kaya Sunflower', city: 'Lawrence' },
  { name: 'Sakari Willow', city: 'Newton' },
  { name: 'Onida Bearclaw', city: 'Framingham' },
  { name: 'Chayton Fox', city: 'Waltham' },
  { name: 'Enola Bluebird', city: 'Haverhill' },
  { name: 'Yuma Silvermoon', city: 'Malden' },
  { name: 'Winona Pine', city: 'Medford' },
  { name: 'Nayeli Swiftwater', city: 'Taunton' },
  { name: 'Sequoia Whitecloud', city: 'Pawtucket' },
  { name: 'Tasunke Blackstone', city: 'Providence' },
  { name: 'Aponi Nightstar', city: 'Cranston' },
  { name: 'Kitchi Bear', city: 'Warwick' },
  { name: 'Sani Yellowhawk', city: 'Albany' },
  { name: 'Halona Brightsky', city: 'Schenectady' },
  { name: 'Misu Snowbird', city: 'Troy' },
  { name: 'Nayavu Redfox', city: 'Utica' },
  { name: 'Kiona Starlight', city: 'Yonkers' },
  { name: 'Tiva Wildrose', city: 'White Plains' },
  { name: 'Tayanita Dreamer', city: 'Buffalo' },
  { name: 'Tadita River', city: 'Rochester' },
  { name: 'Wapi Elk', city: 'Syracuse' },
  { name: 'Mika Cloud', city: 'Binghamton' },
  { name: 'Kele Sparrow', city: 'Newark' },
  { name: 'Nokomis Rain', city: 'Jersey City' },
  { name: 'Atohi Wolf', city: 'Paterson' },
  { name: 'Sakima Redleaf', city: 'Elizabeth' },
  { name: 'Nashoba Wind', city: 'Edison' },
  { name: 'Wynono Lake', city: 'Trenton' },
  { name: 'Mika Ash', city: 'Allentown' },
  { name: 'Kaya Willow', city: 'Philadelphia' },
  { name: 'Sani Cloud', city: 'Pittsburgh' },
  { name: 'Aiyana Elk', city: 'Scranton' },
  { name: 'Takoda Oak', city: 'Bethlehem' },
  { name: 'Aylen Sky', city: 'Erie' },
  { name: 'Chayton Pine', city: 'Reading' },
  { name: 'Elan Wolf', city: 'Duluth' },
  { name: 'Tala River', city: 'Minneapolis' },
  { name: 'Kiona Hawk', city: 'Saint Paul' },
  { name: 'Winona Stone', city: 'Rochester' },
  { name: 'Nodin Leaf', city: 'Manchester' },
  { name: 'Yuma Snow', city: 'Nashua' },
  { name: 'Onida Birch', city: 'Concord' },
  { name: 'Tasunke Deer', city: 'Portsmouth' },
  { name: 'Aponi Rose', city: 'Dover' },
];

export default function UserNotifications() {
  const [remainingUsers, setRemainingUsers] = useState([...userData]);
  const [currentUser, setCurrentUser] = useState(remainingUsers[0]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const showNotification = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        // If remainingUsers is empty, refill it
        setRemainingUsers(prev => {
          let pool = prev.length === 0 ? [...userData] : [...prev];
          // Pick a random index
          const randomIndex = Math.floor(Math.random() * pool.length);
          // Splice out the user
          const [nextUser] = pool.splice(randomIndex, 1);
          setCurrentUser(nextUser);
          return pool;
        });
        setIsVisible(true);
      }, 1000);
    }, 5500);
    return () => clearInterval(showNotification);
  }, []);

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
