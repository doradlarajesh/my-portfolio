import { useState, useEffect } from 'react';


import avatarImg from '../assets/avatar_mid.png'; 

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
      const nextBlink = Math.random() * 4000 + 3000;
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

  // 3. CALIBRATION (Matched to your specific image)
  const config = {
    headTilt: 10,
    leftEyePos: { top: '54.5%', left: '39%' },
    rightEyePos: { top: '54.5%', left: '61.5%' },
  };

  // The "Eye Patch" Component (Hides the painted eye, adds the moving one)
  const EyePatch = ({ top, left }: { top: string, left: string }) => (
    <div 
      className="absolute overflow-hidden rounded-full bg-[#fcfcfc]" 
      style={{
        top: top,
        left: left,
        width: '12.5%', 
        height: '10.5%',
        transform: 'translate(-50%, -50%) rotate(1deg)',
        zIndex: 20, 
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
      }}
    >
      {/* MOVING PUPIL */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '58%', 
          height: '62%',
          background: 'radial-gradient(circle at 35% 35%, #6d4c41, #4e342e, #2d1b16)', // Brown eyes
          top: '50%', 
          left: '50%',
          transform: `translate(-50%, -50%) translate(${mousePos.x * 4}px, ${mousePos.y * 2.5}px)`
        }}
      >
        <div className="absolute top-1/2 left-1/2 w-[45%] h-[45%] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-[20%] right-[20%] w-[25%] h-[25%] bg-white rounded-full opacity-85 blur-[0.5px]"></div>
      </div>

      {/* BLINKING EYELID */}
      <div 
        className="absolute top-0 left-0 w-full"
        style={{
          backgroundColor: '#8d6e63', // Matches skin/eyelid shadow
          height: isBlinking ? '100%' : '0%',
          transition: 'height 0.1s ease-in-out',
          zIndex: 30
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center py-12" style={{ perspective: '1000px' }}>
      
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
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)'
        }}
      >
        <div className="w-full h-full rounded-full overflow-hidden relative bg-[#322251]">
            
            {/* 1. THE IMPORTED IMAGE */}
            <img 
              src={avatarImg} 
              alt="Avatar" 
              className="w-full h-full object-cover pointer-events-none select-none relative z-10"
            />

            {/* 2. THE EYE PATCHES */}
            <EyePatch top={config.leftEyePos.top} left={config.leftEyePos.left} />
            <EyePatch top={config.rightEyePos.top} left={config.rightEyePos.left} />
        </div>

        {/* 3. GLOSS OVERLAY */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-40" />
      </div>
    </div>
  );
};

export default InteractiveAvatar;
