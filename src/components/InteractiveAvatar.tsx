import { useState, useEffect } from 'react';
import avatarImg from "@/assets/avatar.png";

const InteractiveAvatar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // 1. MOUSE TRACKING
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize coordinates -1 to 1
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. RANDOM BLINKING LOGIC (Adds the "Lively" feel)
  useEffect(() => {
    const blinkLoop = () => {
      // Random blink every 3 to 6 seconds
      const nextBlink = Math.random() * 3000 + 3000;
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

  // 3. CALIBRATION (Tuned for the Blue Denim Shirt Image)
  const config = {
    // Limits how far the eyes move (keep small to stay inside the iris)
    maxEyeMove: 4, 
    // How much the head 3D-tilts
    headTilt: 12,
    // Exact position of the eyes in this specific image
    leftEye: { top: '44%', left: '36%' },
    rightEye: { top: '44%', left: '60%' },
  };

  return (
    <div className="flex flex-col items-center justify-center py-10" style={{ perspective: '1000px' }}>
      
      {/* AVATAR CONTAINER */}
      <div 
        className="relative w-64 h-64 rounded-full transition-all duration-200 ease-out shadow-2xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{
          transform: `
            rotateY(${mousePos.x * config.headTilt}deg) 
            rotateX(${-mousePos.y * config.headTilt}deg)
            scale(${isHovering ? 1.05 : 1})
          `,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)'
        }}
      >
        {/* THE IMAGE */}
        <div className="w-full h-full rounded-full overflow-hidden bg-gray-900">
            <img 
              src={avatarImg} 
              alt="Profile Avatar" 
              className="w-full h-full object-cover pointer-events-none select-none"
            />
        </div>

        {/* --- LEFT EYE INTERACTION --- */}
        <div 
          className="absolute w-[10%] h-[10%] rounded-full overflow-hidden"
          style={{
            top: config.leftEye.top,
            left: config.leftEye.left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Moving Pupil Lens */}
          <div 
            className="w-full h-full rounded-full bg-black opacity-20"
            style={{
              transform: `translate(${mousePos.x * config.maxEyeMove}px, ${mousePos.y * config.maxEyeMove}px)`
            }}
          >
             {/* Specular Highlight (The white dot that makes it look alive) */}
             <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-60 shadow-sm"></div>
          </div>
          
          {/* Eyelid (Blink Animation) - Matches skin tone approximately */}
          <div 
            className="absolute top-0 left-0 w-full bg-[#dcb8a3]"
            style={{
              height: isBlinking ? '100%' : '0%',
              transition: 'height 0.1s ease-in-out'
            }}
          />
        </div>

        {/* --- RIGHT EYE INTERACTION --- */}
        <div 
          className="absolute w-[10%] h-[10%] rounded-full overflow-hidden"
          style={{
            top: config.rightEye.top,
            left: config.rightEye.left,
            transform: 'translate(-50%, -50%)'
          }}
        >
          {/* Moving Pupil Lens */}
          <div 
            className="w-full h-full rounded-full bg-black opacity-20"
            style={{
              transform: `translate(${mousePos.x * config.maxEyeMove}px, ${mousePos.y * config.maxEyeMove}px)`
            }}
          >
             {/* Specular Highlight */}
             <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-white rounded-full opacity-60 shadow-sm"></div>
          </div>

          {/* Eyelid (Blink Animation) */}
          <div 
            className="absolute top-0 left-0 w-full bg-[#dcb8a3]"
            style={{
              height: isBlinking ? '100%' : '0%',
              transition: 'height 0.1s ease-in-out'
            }}
          />
        </div>

        {/* GLOSS OVERLAY (Adds premium finish) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default InteractiveAvatar;
