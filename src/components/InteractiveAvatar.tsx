import { useState, useEffect } from 'react';
import avatarImg from "@/assets/avatar_mid.png";

const InteractiveAvatar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // 1. MOUSE TRACKING
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates (-1 to 1)
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. BLINKING ENGINE
  useEffect(() => {
    const blinkLoop = () => {
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          blinkLoop();
        }, 150);
      }, nextBlink);
    };
    blinkLoop();
    return () => {};
  }, []);

  // 3. CALIBRATION (Specific to 'avatar mid.jpg')
  const config = {
    headTilt: 12,
    // These coordinates place the white "concealer" over the painted eyes
    leftEyePos: { top: '55%', left: '38%' },
    rightEyePos: { top: '54%', left: '62%' }, 
  };

  // The "Eye" Component
  const Eye = ({ top, left }: { top: string, left: string }) => (
    <div 
      className="absolute overflow-hidden rounded-full bg-white" 
      style={{
        top: top,
        left: left,
        width: '13%',  // Large enough to cover the painted eye
        height: '11%', // Squashed slightly to match the cartoon eye shape
        transform: 'translate(-50%, -50%)',
        zIndex: 10,
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)' // Inner shadow for depth
      }}
    >
      {/* A. THE MOVING PUPIL */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '55%', 
          height: '60%',
          // Brown gradient matching the original image style
          background: 'radial-gradient(circle at 30% 30%, #5D4037, #3E2723, #1a0f0a)',
          top: '50%', 
          left: '50%',
          // Movement Logic
          transform: `translate(-50%, -50%) translate(${mousePos.x * 5}px, ${mousePos.y * 3}px)`
        }}
      >
        {/* Black Center */}
        <div className="absolute top-1/2 left-1/2 w-[40%] h-[40%] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Reflection Highlight */}
        <div className="absolute top-[20%] right-[20%] w-[25%] h-[25%] bg-white rounded-full opacity-80 blur-[0.5px]"></div>
      </div>

      {/* B. THE EYELID (Blinking) */}
      <div 
        className="absolute top-0 left-0 w-full bg-[#E0AC95]" // Matches skin tone
        style={{
          height: isBlinking ? '100%' : '0%',
          transition: 'height 0.1s ease-in-out',
          zIndex: 20
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center py-12" style={{ perspective: '1000px' }}>
      
      {/* 3D CONTAINER */}
      <div 
        className="relative w-72 h-72 rounded-full transition-all duration-100 ease-out"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          transform: `
            rotateY(${mousePos.x * config.headTilt}deg) 
            rotateX(${-mousePos.y * config.headTilt}deg)
            scale(${isHovering ? 1.05 : 1})
          `,
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* 1. BASE IMAGE */}
        <div className="w-full h-full rounded-full overflow-hidden bg-[#2D1B4E]">
            <img 
              src={avatarImg} 
              alt="Avatar" 
              className="w-full h-full object-cover pointer-events-none select-none"
            />
        </div>

        {/* 2. THE INTERACTIVE EYES */}
        {/* These sit ON TOP to cover the painted eyes */}
        <Eye top={config.leftEyePos.top} left={config.leftEyePos.left} />
        <Eye top={config.rightEyePos.top} left={config.rightEyePos.left} />

        {/* 3. GLOSS OVERLAY */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" style={{ zIndex: 30 }} />
      </div>
    </div>
  );
};

export default InteractiveAvatar;
