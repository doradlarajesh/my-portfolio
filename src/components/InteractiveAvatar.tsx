import { useState, useEffect, useRef } from 'react';
import avatarImage from '@/assets/avatar_mid.png';

interface InteractiveAvatarProps {
  className?: string;
}

const InteractiveAvatar = ({ className = "" }: InteractiveAvatarProps) => {
  const [eyePosition, setEyePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      
      // Calculate angle and limit eye movement
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = 4; // Maximum eye movement in pixels
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
      {/* Background glow effect */}
      <div 
        className="absolute inset-0 rounded-full opacity-50 blur-xl animate-pulse"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
          transform: 'scale(1.2)'
        }}
      />
      
      {/* Avatar image container */}
      <div className="relative w-full aspect-square max-w-[280px]">
        {/* Main avatar image */}
        <img 
          src={avatarImage} 
          alt="Interactive Avatar"
          className="w-full h-full object-cover rounded-full"
        />
        
        {/* Animated eyes overlay - positioned over the avatar's eyes */}
        <svg 
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          style={{ borderRadius: '50%' }}
        >
          {/* Left eye pupil - positioned to match avatar's left eye */}
          <circle
            cx={38 + eyePosition.x}
            cy={42 + eyePosition.y}
            r="2.5"
            fill="#1a1a1a"
          />
          {/* Left eye highlight */}
          <circle
            cx={39 + eyePosition.x * 0.3}
            cy={41 + eyePosition.y * 0.3}
            r="0.8"
            fill="white"
            opacity="0.9"
          />
          
          {/* Right eye pupil - positioned to match avatar's right eye */}
          <circle
            cx={62 + eyePosition.x}
            cy={42 + eyePosition.y}
            r="2.5"
            fill="#1a1a1a"
          />
          {/* Right eye highlight */}
          <circle
            cx={63 + eyePosition.x * 0.3}
            cy={41 + eyePosition.y * 0.3}
            r="0.8"
            fill="white"
            opacity="0.9"
          />
        </svg>
      </div>
    </div>
  );
};

export default InteractiveAvatar;
