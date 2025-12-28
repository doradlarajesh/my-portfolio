import { useState, useEffect } from 'react';
// Ensure the image is named 'avatar-mask.png' in your assets folder
import avatarImg from "@/assets/avatar.png";

const InteractiveAvatar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);

  // 1. TRACK MOUSE POSITION
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

  // 2. BLINKING ENGINE (Makes it look alive)
  useEffect(() => {
    const blinkLoop = () => {
      // Random blink every 2 to 6 seconds
      const nextBlink = Math.random() * 4000 + 2000;
      setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          blinkLoop();
        }, 150); // Blink closes for 150ms
      }, nextBlink);
    };
    blinkLoop();
    return () => {};
  }, []);

  // 3. CONFIGURATION (Tuned for the provided image)
  const config = {
    headTilt: 15,      // Degrees of 3D tilt
    eyeSize: '10.5%',  // Size of the whole eye container
    irisSize: '65%',   // Size of the colored part of the eye
    pupilSize: '40%',  // Size of the black pupil
    leftEyePos: { top: '46.5%', left: '33.5%' },
    rightEyePos: { top: '46.5%', left: '55.5%' },
  };

  // Helper component for the Eye to ensure symmetry
  const Eye = ({ top, left }: { top: string, left: string }) => (
    <div 
      className="absolute overflow-hidden rounded-full shadow-inner bg-gray-100"
      style={{
        top: top,
        left: left,
        width: config.eyeSize,
        height: config.eyeSize,
        transform: 'translate(-50%, -50%)', // Centers the eye on the coordinate
        zIndex: 20, // Ensures it sits ON TOP of the static image
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' // Inner shadow for depth
      }}
    >
      {/* THE MOVING IRIS & PUPIL */}
      <div 
        className="absolute rounded-full"
        style={{
          width: config.irisSize,
          height: config.irisSize,
          background: 'radial-gradient(circle at 30% 30%, #5D4037, #3E2723, #000)', // Brown eye gradient
          top: '50%',
          left: '50%',
          transform: `translate(-50%, -50%) translate(${mousePos.x * 6}px, ${mousePos.y * 4}px)` // Movement logic
        }}
      >
        {/* The Black Pupil */}
        <div 
          className="absolute bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ width: config.pupilSize, height: config.pupilSize }}
        />
        
        {/* The Reflection (makes it look wet/shiny) */}
        <div className="absolute top-[20%] right-[20%] w-[15%] h-[15%] bg-white rounded-full opacity-90"></div>
      </div>

      {/* THE EYELID (Blinking) */}
      <div 
        className="absolute top-0 left-0 w-full bg-[#E0AC95]" // Matched to skin tone
        style={{
          height: isBlinking ? '100%' : '0%',
          transition: 'height 0.1s ease-in-out',
          zIndex: 30
        }}
      />
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center py-12" style={{ perspective: '1000px' }}>
      
      {/* AVATAR CONTAINER */}
      <div 
        className="relative w-64 h-64 rounded-full transition-all duration-100 ease-out shadow-2xl"
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
        {/* 1. THE STATIC IMAGE */}
        {/* We use the image to provide the face shape, hair, and beard */}
        <img 
          src={avatarImg} 
          alt="Avatar" 
          className="w-full h-full object-cover rounded-full pointer-events-none select-none"
        />

        {/* 2. THE INTERACTIVE EYES (Patched over the static eyes) */}
        <Eye top={config.leftEyePos.top} left={config.leftEyePos.left} />
        <Eye top={config.rightEyePos.top} left={config.rightEyePos.left} />

        {/* 3. GLOSS OVERLAY (Uniform lighting) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-40" />
      </div>
    </div>
  );
};

export default InteractiveAvatar;
