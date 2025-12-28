import { useState, useEffect } from 'react';

const InteractiveAvatar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate mouse position relative to the center of the window
      // This gives us a value between -1 and 1
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Configuration for eye movement range
  const maxMoveX = 15; 
  const maxMoveY = 10;

  return (
    // Avatar Container
    // You can adjust the w-64 h-64 to change the overall size
    <div 
      className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl border-4 border-white transform transition-transform duration-500 hover:scale-105 mx-auto"
      style={{
        boxShadow: '0 20px 50px -12px rgba(0, 0, 0, 0.25)'
      }}
    >
      {/* 1. The High-Quality Image Base */}
      {/* IMPORTANT: Make sure 'avatar-face.png' is in your public folder */}
      <img 
        src="/avatar-face.png" 
        alt="My Interactive Avatar" 
        className="w-full h-full object-cover"
      />

      {/* 2. The Interactive Eye Layer */}
      
      {/* Left Eye Container */}
      <div className="absolute top-[42%] left-[32%] w-[16%] h-[12%] pointer-events-none">
         {/* Left Pupil */}
         <div 
           className="absolute bg-[#1a1a1a] rounded-full w-[35%] h-[35%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
           style={{
             transform: `translate(calc(-50% + ${mousePos.x * maxMoveX}px), calc(-50% + ${mousePos.y * maxMoveY}px))`
           }}
         >
           {/* Tiny Reflection for realism */}
           <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
         </div>
      </div>

      {/* Right Eye Container */}
      <div className="absolute top-[42%] left-[53%] w-[16%] h-[12%] pointer-events-none">
         {/* Right Pupil */}
         <div 
           className="absolute bg-[#1a1a1a] rounded-full w-[35%] h-[35%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 ease-out"
           style={{
             transform: `translate(calc(-50% + ${mousePos.x * maxMoveX}px), calc(-50% + ${mousePos.y * maxMoveY}px))`
           }}
         >
            {/* Tiny Reflection */}
           <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-60"></div>
         </div>
      </div>

    </div>
  );
};

export default InteractiveAvatar;
