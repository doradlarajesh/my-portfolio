import { useState, useEffect } from 'react';

const InteractiveAvatar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [imgError, setImgError] = useState(false);

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
      // Random blink every 3-7 seconds
      const nextBlink = Math.random() * 4000 + 3000;
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

  // 3. CALIBRATION (TUNED SPECIFICALLY FOR YOUR IMAGE)
  const config = {
    headTilt: 10, // Subtle 3D tilt
    // Precise center points of the painted eyes
    leftEyePos: { top: '54.5%', left: '39%' },
    rightEyePos: { top: '54.5%', left: '61.5%' },
  };

  // The "Eye Patch" Component
  const EyePatch = ({ top, left }: { top: string, left: string }) => (
    <div 
      className="absolute overflow-hidden rounded-full bg-[#fcfcfc]" // Almost pure white to cover existing eye
      style={{
        top: top,
        left: left,
        width: '12.5%', // Sized to cover the painted iris perfectly
        height: '10.5%',
        transform: 'translate(-50%, -50%) rotate(1deg)', // Slight rotation to match face angle
        zIndex: 20, 
        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)' // Subtle inner shadow for realism
      }}
    >
      {/* A. THE MOVING IRIS & PUPIL */}
      <div 
        className="absolute rounded-full"
        style={{
          width: '58%', 
          height: '62%',
          // Brown gradient matching the art style
          background: 'radial-gradient(circle at 35% 35%, #6d4c41, #4e342e, #2d1b16)',
          top: '50%', 
          left: '50%',
          // Movement Logic (constrained so it doesn't leave the patch)
          transform: `translate(-50%, -50%) translate(${mousePos.x * 4}px, ${mousePos.y * 2.5}px)`
        }}
      >
        {/* Black Pupil Center */}
        <div className="absolute top-1/2 left-1/2 w-[45%] h-[45%] bg-black rounded-full transform -translate-x-1/2 -translate-y-1/2" />
        
        {/* Reflection Highlight (Makes it look alive) */}
        <div className="absolute top-[20%] right-[20%] w-[25%] h-[25%] bg-white rounded-full opacity-85 blur-[0.5px]"></div>
      </div>

      {/* B. THE EYELID (Blinking Animation) */}
      <div 
        className="absolute top-0 left-0 w-full"
        style={{
          backgroundColor: '#8d6e63', // Color matched to the eyelid shadow in the image
          height: isBlinking ? '100%' : '0%',
          transition: 'height 0.1s ease-in-out',
          zIndex: 30
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
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)'
        }}
      >
        {/* IMAGE CONTAINER */}
        <div className={`w-full h-full rounded-full overflow-hidden relative ${imgError ? 'bg-red-100' : 'bg-[#322251]'}`}>
            
            {/* 1. THE BASE IMAGE (from public folder) */}
            <img 
              src="/avatar.jpg" 
              alt="Avatar" 
              className="w-full h-full object-cover pointer-events-none select-none relative z-10"
              onError={() => setImgError(true)}
            />

            {/* 2. THE EYE PATCHES (Sit on top of image, under gloss) */}
            {!imgError && (
              <>
                <EyePatch top={config.leftEyePos.top} left={config.leftEyePos.left} />
                <EyePatch top={config.rightEyePos.top} left={config.rightEyePos.left} />
              </>
            )}
            
            {/* Error Message */}
            {imgError && (
               <div className="absolute inset-0 flex items-center justify-center text-red-600 font-bold text-center p-4 z-50">
                 Image not found.<br/>Move 'avatar.jpg' to public folder.
               </div>
            )}
        </div>

        {/* 3. GLOSS OVERLAY (Sits over everything) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none z-40" />
      </div>
    </div>
  );
};

export default InteractiveAvatar;
