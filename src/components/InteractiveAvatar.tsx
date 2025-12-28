import { useState, useEffect, useRef } from 'react';

const InteractiveAvatar = () => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const avatarRef = useRef<SVGSVGElement>(null);

  // 1. MOUSE TRACKING
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Limit eye movement
      const angle = Math.atan2(deltaY, deltaX);
      const maxDist = 6;
      const dist = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 40, maxDist);
      
      setEyePosition({
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. BLINK ANIMATION
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

  return (
    <div className="flex items-center justify-center py-12">
      <svg
        ref={avatarRef}
        viewBox="0 0 200 240"
        className="w-72 h-72 drop-shadow-2xl"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* SKIN: 3D Radial Gradient for volume */}
          <radialGradient id="skin3D" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#ffdbcc" />
            <stop offset="40%" stopColor="#eeb69c" />
            <stop offset="100%" stopColor="#d2987d" />
          </radialGradient>

          {/* HAIR: Deep rich gradient */}
          <linearGradient id="hair3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3d2c29" />
            <stop offset="50%" stopColor="#2a1d1a" />
            <stop offset="100%" stopColor="#1a0f0d" />
          </linearGradient>

          {/* HOODIE: Fabric texture feel */}
          <linearGradient id="hoodie3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5f717d" />
            <stop offset="100%" stopColor="#37474f" />
          </linearGradient>
          
          {/* EYE: Realistic Iris */}
          <radialGradient id="iris3D" cx="50%" cy="50%" r="50%">
            <stop offset="40%" stopColor="#4e342e" />
            <stop offset="90%" stopColor="#281a16" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
        </defs>

        {/* --- BODY --- */}
        {/* Hoodie Body */}
        <path d="M30,240 Q30,190 100,190 Q170,190 170,240" fill="url(#hoodie3D)" />
        {/* Hoodie Hood/Collar */}
        <path d="M50,200 Q100,230 150,200 Q145,220 100,220 Q55,220 50,200" fill="#455a64" />
        {/* Neck */}
        <path d="M70,180 Q100,190 130,180 L130,200 Q100,210 70,200 Z" fill="#dba78b" />

        {/* --- HEAD GROUP --- */}
        <g transform="translate(0, 10)">
          
          {/* Face Shape (Jawline optimized) */}
          <path 
            d="M45,70 C45,20 155,20 155,70 L155,100 Q155,150 100,165 Q45,150 45,100 Z"
            fill="url(#skin3D)"
          />

          {/* EARS */}
          <ellipse cx="42" cy="105" rx="7" ry="12" fill="#eeb69c" />
          <ellipse cx="158" cy="105" rx="7" ry="12" fill="#eeb69c" />

          {/* --- HAIR (Complex Organic Waves) --- */}
          {/* Back Volume */}
          <path d="M35,70 Q30,30 100,25 Q170,30 165,70 L165,90 Q155,80 155,70" fill="url(#hair3D)" />
          {/* Front Quiff - Left */}
          <path d="M40,80 Q30,50 60,35 Q80,20 100,30" fill="url(#hair3D)" />
          {/* Front Quiff - Center Wave (Signature Pixar Look) */}
          <path d="M100,30 Q140,20 150,60 Q160,80 145,90 Q130,60 100,50 Q70,40 40,80" fill="url(#hair3D)" />
          
          {/* --- BEARD (Detailed) --- */}
          <path 
            d="M45,100 Q45,140 100,155 Q155,140 155,100 L145,100 Q145,135 100,142 Q55,135 55,100 Z"
            fill="url(#hair3D)"
          />
          {/* Mustache - Connected to beard */}
          <path d="M65,130 Q100,115 135,130 Q100,140 65,130" fill="url(#hair3D)" />
          {/* Soul Patch */}
          <path d="M90,148 L110,148 L100,155 Z" fill="url(#hair3D)" />

          {/* --- FACE DETAILS --- */}
          {/* Eyebrows */}
          <path d="M55,95 Q70,85 85,95" stroke="#1a0f0d" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M115,95 Q130,85 145,95" stroke="#1a0f0d" strokeWidth="5" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <path d="M100,105 Q90,125 85,130 Q100,138 115,130" fill="#cd9175" opacity="0.6" />

          {/* Mouth (Confident Smile) */}
          <path d="M75,140 Q100,155 125,140" stroke="#a65c52" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Teeth */}
          <path d="M80,142 Q100,150 120,142" fill="#fff" opacity="0.9" />

          {/* --- INTERACTIVE EYES --- */}
          {/* Left Eye */}
          <g transform="translate(70, 110)">
            {/* Eye White */}
            <ellipse rx="12" ry="9" fill="#fff" />
            <clipPath id="l-clip"><ellipse rx="12" ry="9" /></clipPath>
            
            {/* Moving Parts */}
            <g clipPath="url(#l-clip)">
               {/* Iris */}
               <circle 
                 cx={eyePosition.x} cy={eyePosition.y} 
                 r="6.5" fill="url(#iris3D)" 
               />
               {/* Pupil */}
               <circle 
                 cx={eyePosition.x} cy={eyePosition.y} 
                 r="3" fill="#000" 
               />
               {/* Reflection (Crucial for life) */}
               <circle 
                 cx={eyePosition.x + 2} cy={eyePosition.y - 2} 
                 r="2" fill="#fff" opacity="0.8" 
               />
            </g>
            {/* Eyelid Blink */}
            <rect x="-15" y="-12" width="30" height={isBlinking ? "24" : "0"} fill="#d2987d" className="transition-all duration-100" />
          </g>

          {/* Right Eye */}
          <g transform="translate(130, 110)">
            <ellipse rx="12" ry="9" fill="#fff" />
            <clipPath id="r-clip"><ellipse rx="12" ry="9" /></clipPath>
            
            <g clipPath="url(#r-clip)">
               <circle cx={eyePosition.x} cy={eyePosition.y} r="6.5" fill="url(#iris3D)" />
               <circle cx={eyePosition.x} cy={eyePosition.y} r="3" fill="#000" />
               <circle cx={eyePosition.x + 2} cy={eyePosition.y - 2} r="2" fill="#fff" opacity="0.8" />
            </g>
            <rect x="-15" y="-12" width="30" height={isBlinking ? "24" : "0"} fill="#d2987d" className="transition-all duration-100" />
          </g>

        </g>
      </svg>
    </div>
  );
};

export default InteractiveAvatar;
