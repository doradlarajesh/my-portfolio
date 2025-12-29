import { useState, useEffect, useRef } from 'react';

interface InteractiveAvatarProps {
  className?: string;
}

const InteractiveAvatar = ({ className = "" }: InteractiveAvatarProps) => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Pop-up animation on mount
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 3;
      const normalizedDistance = Math.min(distance / 300, 1);
      
      const angle = Math.atan2(deltaY, deltaX);
      const eyeX = Math.cos(angle) * maxDistance * normalizedDistance;
      const eyeY = Math.sin(angle) * maxDistance * normalizedDistance;
      
      setEyePosition({ x: eyeX, y: eyeY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* The pit/hole - circular dark gradient */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[60px] rounded-[50%]"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(var(--background)) 0%, hsl(220 20% 10%) 40%, hsl(220 30% 5%) 100%)',
          boxShadow: 'inset 0 10px 30px rgba(0,0,0,0.8), 0 -5px 20px rgba(0,0,0,0.3)'
        }}
      />
      
      {/* Avatar container with pop-up animation */}
      <div 
        className="relative transition-all duration-700 ease-out"
        style={{
          transform: isVisible ? 'translateY(0)' : 'translateY(80px)',
          opacity: isVisible ? 1 : 0
        }}
      >
        {/* Waving hand */}
        <div 
          className="absolute -right-8 top-[60%] z-20 animate-wave origin-bottom"
          style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }}
        >
          <svg width="50" height="60" viewBox="0 0 50 60">
            {/* Arm */}
            <path
              d="M25 60 L25 35 Q25 30 28 28"
              fill="none"
              stroke="#C4956A"
              strokeWidth="12"
              strokeLinecap="round"
            />
            {/* Hand */}
            <ellipse cx="28" cy="22" rx="10" ry="12" fill="#C4956A" />
            {/* Fingers */}
            <path
              d="M22 12 L22 6 M26 10 L26 3 M30 10 L30 4 M34 12 L34 8"
              stroke="#C4956A"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Thumb */}
            <path
              d="M19 18 L14 16"
              stroke="#C4956A"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Main SVG Avatar */}
        <svg 
          width="180" 
          height="200" 
          viewBox="0 0 180 200"
          className="relative z-10"
        >
          <defs>
            {/* Gradient for suit */}
            <linearGradient id="suitGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4a4a4a" />
              <stop offset="100%" stopColor="#2d2d2d" />
            </linearGradient>
            
            {/* Gradient for skin */}
            <linearGradient id="skinGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D4A574" />
              <stop offset="100%" stopColor="#C4956A" />
            </linearGradient>

            {/* Shadow filter */}
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3"/>
            </filter>
          </defs>

          {/* Neck */}
          <rect x="70" y="130" width="40" height="30" fill="url(#skinGradient)" />
          
          {/* Shirt collar */}
          <path 
            d="M60 155 L90 145 L120 155 L120 200 L60 200 Z" 
            fill="white" 
          />
          
          {/* Tie */}
          <path 
            d="M85 148 L90 155 L95 148 L93 200 L87 200 Z" 
            fill="#1e3a5f" 
          />
          <polygon points="85,148 90,145 95,148 90,155" fill="#1e3a5f" />
          
          {/* Suit - left shoulder */}
          <path 
            d="M0 160 Q30 150 60 155 L60 200 L0 200 Z" 
            fill="url(#suitGradient)" 
          />
          
          {/* Suit - right shoulder */}
          <path 
            d="M180 160 Q150 150 120 155 L120 200 L180 200 Z" 
            fill="url(#suitGradient)" 
          />
          
          {/* Suit lapels */}
          <path 
            d="M60 155 L75 170 L65 200 L60 200 Z" 
            fill="#3a3a3a" 
          />
          <path 
            d="M120 155 L105 170 L115 200 L120 200 Z" 
            fill="#3a3a3a" 
          />

          {/* Face - oval shape */}
          <ellipse 
            cx="90" 
            cy="80" 
            rx="55" 
            ry="65" 
            fill="url(#skinGradient)" 
            filter="url(#shadow)"
          />
          
          {/* Hair - side-parted black hair */}
          <path 
            d="M35 70 
               Q35 20 90 15 
               Q145 20 145 70
               Q145 50 130 40
               Q110 30 90 32
               Q60 30 50 50
               Q40 60 35 70"
            fill="#1a1a1a"
          />
          
          {/* Hair detail - side part */}
          <path 
            d="M55 35 Q70 25 90 28 Q65 30 55 45"
            fill="#2a2a2a"
          />
          
          {/* Ears */}
          <ellipse cx="35" cy="85" rx="8" ry="12" fill="url(#skinGradient)" />
          <ellipse cx="145" cy="85" rx="8" ry="12" fill="url(#skinGradient)" />
          
          {/* Eyebrows */}
          <path 
            d="M55 58 Q67 54 78 58" 
            stroke="#1a1a1a" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
          />
          <path 
            d="M102 58 Q113 54 125 58" 
            stroke="#1a1a1a" 
            strokeWidth="3" 
            fill="none"
            strokeLinecap="round"
          />
          
          {/* Eyes - white part */}
          <ellipse cx="67" cy="75" rx="12" ry="8" fill="white" />
          <ellipse cx="113" cy="75" rx="12" ry="8" fill="white" />
          
          {/* Iris */}
          <circle 
            cx={67 + eyePosition.x} 
            cy={75 + eyePosition.y} 
            r="5" 
            fill="#3d2314" 
          />
          <circle 
            cx={113 + eyePosition.x} 
            cy={75 + eyePosition.y} 
            r="5" 
            fill="#3d2314" 
          />
          
          {/* Pupils */}
          <circle 
            cx={67 + eyePosition.x} 
            cy={75 + eyePosition.y} 
            r="2.5" 
            fill="#1a1a1a" 
          />
          <circle 
            cx={113 + eyePosition.x} 
            cy={75 + eyePosition.y} 
            r="2.5" 
            fill="#1a1a1a" 
          />
          
          {/* Eye highlights */}
          <circle 
            cx={69 + eyePosition.x * 0.3} 
            cy={73 + eyePosition.y * 0.3} 
            r="1.5" 
            fill="white" 
            opacity="0.9"
          />
          <circle 
            cx={115 + eyePosition.x * 0.3} 
            cy={73 + eyePosition.y * 0.3} 
            r="1.5" 
            fill="white" 
            opacity="0.9"
          />
          
          {/* Nose */}
          <path 
            d="M90 75 L90 95 Q85 100 90 102 Q95 100 90 95" 
            stroke="#B8896A" 
            strokeWidth="2" 
            fill="none"
          />
          
          {/* Smile - warm friendly smile showing teeth */}
          <path 
            d="M70 112 Q90 128 110 112" 
            stroke="#8B4513" 
            strokeWidth="2.5" 
            fill="none"
            strokeLinecap="round"
          />
          {/* Upper lip line */}
          <path 
            d="M72 113 Q90 108 108 113" 
            stroke="#B8896A" 
            strokeWidth="1" 
            fill="none"
          />
          {/* Teeth hint */}
          <path 
            d="M75 114 Q90 122 105 114" 
            fill="white"
            opacity="0.9"
          />
          
          {/* Beard - short stubble style */}
          <path 
            d="M45 95 
               Q40 110 45 130
               Q55 150 90 155
               Q125 150 135 130
               Q140 110 135 95"
            fill="none"
            stroke="#2a2a2a"
            strokeWidth="1"
            opacity="0.4"
          />
          {/* Beard shadow/stubble effect */}
          <ellipse cx="90" cy="135" rx="35" ry="20" fill="#1a1a1a" opacity="0.15" />
          <ellipse cx="60" cy="120" rx="15" ry="15" fill="#1a1a1a" opacity="0.1" />
          <ellipse cx="120" cy="120" rx="15" ry="15" fill="#1a1a1a" opacity="0.1" />
          
          {/* Goatee */}
          <ellipse cx="90" cy="125" rx="20" ry="12" fill="#1a1a1a" opacity="0.2" />
          
          {/* Mustache hint */}
          <path 
            d="M75 108 Q90 112 105 108" 
            stroke="#1a1a1a" 
            strokeWidth="3" 
            fill="none"
            opacity="0.25"
            strokeLinecap="round"
          />
        </svg>
      </div>
      
      {/* Pit edge overlay - to create depth */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[220px] h-[30px] rounded-[50%] z-30 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, hsl(var(--background)) 60%)',
        }}
      />
    </div>
  );
};

export default InteractiveAvatar;
