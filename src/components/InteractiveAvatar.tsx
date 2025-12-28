import { useState, useEffect, useRef } from 'react';

interface InteractiveAvatarProps {
  className?: string;
}

const InteractiveAvatar = ({ className = "" }: InteractiveAvatarProps) => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const avatarRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!avatarRef.current) return;
      
      const rect = avatarRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Calculate angle and limit eye movement
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 8; // Maximum eye movement
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
    <div className={`relative ${className}`}>
      {/* Background blob shape */}
      <svg
        viewBox="0 0 300 300"
        className="absolute w-full h-full -z-10"
        style={{ transform: 'scale(1.3)' }}
      >
        <defs>
          <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <path
          d="M150,20 C220,20 280,80 280,150 C280,220 220,280 150,280 C80,280 20,220 20,150 C20,80 80,20 150,20"
          fill="url(#blobGradient)"
          className="animate-pulse"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M150,20 C220,20 280,80 280,150 C280,220 220,280 150,280 C80,280 20,220 20,150 C20,80 80,20 150,20;
              M150,30 C210,25 275,90 270,150 C265,210 210,275 150,270 C90,265 25,210 30,150 C35,90 90,30 150,30;
              M150,20 C220,20 280,80 280,150 C280,220 220,280 150,280 C80,280 20,220 20,150 C20,80 80,20 150,20
            "
          />
        </path>
      </svg>

      {/* Main Avatar SVG */}
      <svg
        ref={avatarRef}
        viewBox="0 0 200 240"
        className="w-full h-full"
        style={{ maxWidth: '280px' }}
      >
        <defs>
          {/* Skin gradient */}
          <linearGradient id="skinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8beac" />
            <stop offset="100%" stopColor="#d4a088" />
          </linearGradient>
          
          {/* Hair gradient */}
          <linearGradient id="hairGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1a1a1a" />
            <stop offset="100%" stopColor="#2d2d2d" />
          </linearGradient>
          
          {/* Shirt gradient */}
          <linearGradient id="shirtGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4a5568" />
            <stop offset="100%" stopColor="#2d3748" />
          </linearGradient>
          
          {/* Tie gradient */}
          <linearGradient id="tieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>

        {/* Neck */}
        <ellipse cx="100" cy="190" rx="25" ry="15" fill="url(#skinGradient)" />

        {/* Shirt / Suit */}
        <path
          d="M50 200 Q50 230 60 240 L140 240 Q150 230 150 200 Q130 195 100 195 Q70 195 50 200"
          fill="url(#shirtGradient)"
        />
        
        {/* Shirt collar left */}
        <path
          d="M75 195 L85 210 L100 200 Z"
          fill="#f7fafc"
        />
        
        {/* Shirt collar right */}
        <path
          d="M125 195 L115 210 L100 200 Z"
          fill="#f7fafc"
        />
        
        {/* Tie */}
        <path
          d="M95 200 L100 195 L105 200 L108 240 L100 240 L92 240 Z"
          fill="url(#tieGradient)"
        />

        {/* Face */}
        <ellipse cx="100" cy="120" rx="55" ry="65" fill="url(#skinGradient)" />

        {/* Ears */}
        <ellipse cx="45" cy="125" rx="10" ry="15" fill="url(#skinGradient)" />
        <ellipse cx="155" cy="125" rx="10" ry="15" fill="url(#skinGradient)" />

        {/* Hair - main volume */}
        <path
          d="M45 100 
             Q45 50 100 45 
             Q155 50 155 100
             Q155 85 145 80
             Q120 75 100 78
             Q80 75 55 80
             Q45 85 45 100"
          fill="url(#hairGradient)"
        />
        
        {/* Hair - side styled part */}
        <path
          d="M50 100 Q55 75 75 70 Q90 68 100 72 Q75 75 55 95 Z"
          fill="url(#hairGradient)"
        />

        {/* Eyebrows */}
        <path
          d="M65 100 Q75 95 90 100"
          stroke="#1a1a1a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M110 100 Q125 95 135 100"
          stroke="#1a1a1a"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Eyes - white part */}
        <ellipse cx="77" cy="115" rx="12" ry="10" fill="white" />
        <ellipse cx="123" cy="115" rx="12" ry="10" fill="white" />

        {/* Eyes - iris (follows cursor) */}
        <circle
          cx={77 + eyePosition.x}
          cy={115 + eyePosition.y}
          r="6"
          fill="#3d2314"
        />
        <circle
          cx={123 + eyePosition.x}
          cy={115 + eyePosition.y}
          r="6"
          fill="#3d2314"
        />

        {/* Eyes - pupils (follows cursor) */}
        <circle
          cx={77 + eyePosition.x}
          cy={115 + eyePosition.y}
          r="3"
          fill="#1a1a1a"
        />
        <circle
          cx={123 + eyePosition.x}
          cy={115 + eyePosition.y}
          r="3"
          fill="#1a1a1a"
        />

        {/* Eye highlights */}
        <circle
          cx={79 + eyePosition.x * 0.5}
          cy={113 + eyePosition.y * 0.5}
          r="2"
          fill="white"
          opacity="0.8"
        />
        <circle
          cx={125 + eyePosition.x * 0.5}
          cy={113 + eyePosition.y * 0.5}
          r="2"
          fill="white"
          opacity="0.8"
        />

        {/* Nose */}
        <path
          d="M100 118 Q105 135 100 145 Q95 148 100 150"
          stroke="#c9937a"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Smile */}
        <path
          d="M80 158 Q100 172 120 158"
          stroke="#b88b7d"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Teeth hint */}
        <path
          d="M85 160 Q100 168 115 160"
          fill="white"
          opacity="0.9"
        />

        {/* Beard - stubble/light beard effect */}
        <ellipse cx="100" cy="165" rx="35" ry="20" fill="#2d2d2d" opacity="0.15" />
        
        {/* Beard - fuller on chin */}
        <path
          d="M65 160 
             Q65 175 80 180 
             Q100 185 120 180 
             Q135 175 135 160
             Q125 165 100 168
             Q75 165 65 160"
          fill="url(#hairGradient)"
          opacity="0.4"
        />
        
        {/* Mustache */}
        <path
          d="M78 152 Q100 158 122 152"
          stroke="#2d2d2d"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* Cheek blush */}
        <ellipse cx="60" cy="135" rx="8" ry="5" fill="#e8a090" opacity="0.3" />
        <ellipse cx="140" cy="135" rx="8" ry="5" fill="#e8a090" opacity="0.3" />
      </svg>
    </div>
  );
};

export default InteractiveAvatar;
