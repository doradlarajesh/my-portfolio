import { useState, useEffect } from 'react';

import avatarImg from "@/assets/avatar.jpg";

const InteractiveAvatar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // 1. MOUSE TRACKING LOGIC
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to window center (-1 to 1)
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. BLINKING LOGIC
  useEffect(() => {
    const blinkLoop = () => {
      const nextBlink = Math.random() * 4000 + 2000; // Random blink every 2-6s
      
      setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          blinkLoop();
        }, 150); // Blink duration
      }, nextBlink);
    };

    blinkLoop();
    return () => {}; 
  }, []);

  // CALIBRATION: Tuned for the hoodie avatar
  const eyeConfig = {
    maxMoveX: 10,  
    maxMoveY: 8,   
    tilt: 15,      
    leftEyePos: { top: '46%', left: '33%' },
    rightEyePos: { top: '46%', left: '55%' },
    eyeSize: { width: '11%', height: '11%' } 
  };

  return (
    <div className="flex flex-col items-center justify-center py-10" style={{ perspective: '1000px' }}>
      
      {/* 3D TILT CONTAINER */}
      <div 
        className="relative w-72 h-72 rounded-full transition-all duration-100 ease-out"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          transform: `
            rotateY(${mousePos.x * eyeConfig.tilt}deg) 
            rotateX(${-mousePos.y * eyeConfig.tilt}deg)
            scale(${isHovering ? 1.05 : 1})
          `,
          boxShadow: '0 30px 60px -10px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* AVATAR IMAGE (Imported) */}
        <img 
          src={avatarImg} 
          alt="Interactive Avatar" 
          className="w-full h-full object-cover rounded-full pointer-events-none select-none"
        />

        {/* --- LEFT EYE LAYER --- */}
        <div 
          className="absolute overflow-hidden rounded-full"
          style={{
            top: eyeConfig.leftEyePos.top,
            left: eyeConfig.leftEyePos.left,
            width: eyeConfig.eyeSize.width,
            height: eyeConfig.eyeSize.height,
            transform: 'rotate(-5deg)'
          }}
        >
          {/* Pupil Movement */}
          <div 
            className="w-full h-full bg-[#1a0f0a] rounded-full opacity-90 blur-[0.5px]"
            style={{
              transform: `translate(${mousePos.x * eyeConfig.maxMoveX}px, ${mousePos.y * eyeConfig.maxMoveY}px)`
            }}
          >
            <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-70"></div>
          </div>
          
          {/* Eyelid (Blinking) */}
          <div 
            className="absolute top-0 left-0 w-full bg-[#dcb8a3]" 
            style={{
              height: isBlinking ? '100%' : '0%',
              transition: 'height 0.1s ease-in-out',
              zIndex: 10
            }}
          />
        </div>

        {/* --- RIGHT EYE LAYER --- */}
        <div 
          className="absolute overflow-hidden rounded-full"
          style={{
            top: eyeConfig.rightEyePos.top,
            left: eyeConfig.rightEyePos.left,
            width: eyeConfig.eyeSize.width,
            height: eyeConfig.eyeSize.height,
            transform: 'rotate(5deg)'
          }}
        >
          {/* Pupil Movement */}
          <div 
            className="w-full h-full bg-[#1a0f0a] rounded-full opacity-90 blur-[0.5px]"
            style={{
              transform: `translate(${mousePos.x * eyeConfig.maxMoveX}px, ${mousePos.y * eyeConfig.maxMoveY}px)`
            }}
          >
             <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full opacity-70"></div>
          </div>

          {/* Eyelid (Blinking) */}
          <div 
            className="absolute top-0 left-0 w-full bg-[#dcb8a3]" 
            style={{
              height: isBlinking ? '100%' : '0%',
              transition: 'height 0.1s ease-in-out',
              zIndex: 10
            }}
          />
        </div>

        {/* Gloss overlay */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-50 pointer-events-none" />
      </div>
    </div>
  );
};

export default InteractiveAvatar;
