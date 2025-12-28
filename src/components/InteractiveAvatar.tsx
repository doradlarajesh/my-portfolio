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
      
      // Limit eye movement distance
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 50, 6); // Max 6px move
      
      setEyePosition({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2. BLINKING ANIMATION
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
          {/* SKIN GRADIENT (Adding depth) */}
          <linearGradient id="skinGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#f5cbb8" />
            <stop offset="100%" stopColor="#dcb8a3" />
          </linearGradient>

          {/* HAIR GRADIENT (Rich dark brown/black) */}
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#1a0f0a" />
          </linearGradient>

          {/* HOODIE GRADIENT */}
          <linearGradient id="hoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#546E7A" />
            <stop offset="100%" stopColor="#37474F" />
          </linearGradient>
        </defs>

        {/* --- BODY / HOODIE --- */}
        {/* Shoulders */}
        <path 
          d="M20,240 C20,200 60,190 100,190 C140,190 180,200 180,240 Z" 
          fill="url(#hoodieGrad)" 
        />
        {/* Hoodie Neck Rim */}
        <path 
          d="M60,195 Q100,215 140,195 Q135,225 100,225 Q65,225 60,195" 
          fill="#455A64" 
        />
        {/* Neck Skin */}
        <path d="M75,180 Q100,195 125,180 L125,200 Q100,210 75,200 Z" fill="#dcb8a3" />

        {/* --- HEAD SHAPE --- */}
        <g transform="translate(0, 10)">
          {/* Main Face Shape */}
          <path
            d="M55,60 
               C55,20 145,20 145,60 
               L145,110 
               C145,150 100,165 55,110 
               Z"
            fill="url(#skinGrad)"
          />

          {/* EARS */}
          <ellipse cx="52" cy="100" rx="6" ry="10" fill="#dcb8a3" />
          <ellipse cx="148" cy="100" rx="6" ry="10" fill="#dcb8a3" />

          {/* --- HAIR (Complex Wavy Shape) --- */}
          {/* Back Hair */}
          <path 
            d="M45,60 C40,40 60,10 100,10 C140,10 160,40 155,60 L155,90 L145,80 L145,60" 
            fill="url(#hairGrad)" 
          />
          {/* Top/Front Wave (The "Quiff") */}
          <path 
            d="M45,70 
               Q35,50 55,35 
               Q75,20 100,25 
               Q130,20 150,40 
               Q160,60 150,80 
               Q140,60 120,55 
               Q100,50 80,60 
               Q60,70 45,70" 
            fill="url(#hairGrad)" 
          />

          {/* --- BEARD (Groomed) --- */}
          <path
            d="M55,110 
               Q55,145 100,155 
               Q145,145 145,110 
               L135,110 
               Q135,135 100,140 
               Q65,135 65,110 
               Z"
            fill="url(#hairGrad)"
          />
          {/* Mustache */}
          <path d="M75,125 Q100,115 125,125 Q100,135 75,125" fill="url(#hairGrad)" />
          {/* Soul Patch */}
          <path d="M95,145 L105,145 L100,150 Z" fill="url(#hairGrad)" />

          {/* --- FACE FEATURES --- */}
          
          {/* Eyebrows */}
          <path d="M65,90 Q80,85 90,90" stroke="#1a0f0a" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M110,90 Q120,85 135,90" stroke="#1a0f0a" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Nose */}
          <path d="M100,95 Q95,115 90,120 Q100,125 110,120" fill="#cc9d88" opacity="0.6" />

          {/* Mouth (Smile) */}
          <path d="M80,135 Q100,150 120,135" stroke="#a1665e" strokeWidth="3" fill="none" strokeLinecap="round" />
          {/* Teeth hint */}
          <path d="M85,136 Q100,145 115,136" fill="white" opacity="0.8" />

          {/* --- INTERACTIVE EYES --- */}
          {/* Left Eye Container */}
          <g transform="translate(75, 100)">
            <ellipse rx="10" ry="8" fill="white" />
            <clipPath id="leftEyeClip">
              <ellipse rx="10" ry="8" />
            </clipPath>
            {/* Moving Pupil */}
            <g clipPath="url(#leftEyeClip)">
              <circle 
                cx={eyePosition.x} 
                cy={eyePosition.y} 
                r="5" 
                fill="#3E2723" 
              />
              <circle 
                cx={eyePosition.x} 
                cy={eyePosition.y} 
                r="2" 
                fill="black" 
              />
              <circle 
                cx={eyePosition.x + 2} 
                cy={eyePosition.y - 2} 
                r="1.5" 
                fill="white" 
                opacity="0.8" 
              />
            </g>
            {/* Eyelid Blink */}
            <rect 
              x="-12" y="-10" width="24" 
              height={isBlinking ? "20" : "0"} 
              fill="#dcb8a3" 
              className="transition-all duration-100"
            />
          </g>

          {/* Right Eye Container */}
          <g transform="translate(125, 100)">
            <ellipse rx="10" ry="8" fill="white" />
            <clipPath id="rightEyeClip">
              <ellipse rx="10" ry="8" />
            </clipPath>
            {/* Moving Pupil */}
            <g clipPath="url(#rightEyeClip)">
              <circle 
                cx={eyePosition.x} 
                cy={eyePosition.y} 
                r="5" 
                fill="#3E2723" 
              />
              <circle 
                cx={eyePosition.x} 
                cy={eyePosition.y} 
                r="2" 
                fill="black" 
              />
              <circle 
                cx={eyePosition.x + 2} 
                cy={eyePosition.y - 2} 
                r="1.5" 
                fill="white" 
                opacity="0.8" 
              />
            </g>
            {/* Eyelid Blink */}
            <rect 
              x="-12" y="-10" width="24" 
              height={isBlinking ? "20" : "0"} 
              fill="#dcb8a3" 
              className="transition-all duration-100"
            />
          </g>

        </g>
      </svg>
    </div>
  );
};

export default InteractiveAvatar;
