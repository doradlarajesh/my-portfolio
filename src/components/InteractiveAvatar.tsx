import { useRef, useEffect, useState } from "react";
import avatarVideo from "@/assets/avatar-greeting.mp4";

interface InteractiveAvatarProps {
  className?: string;
}

const InteractiveAvatar = ({ className = "" }: InteractiveAvatarProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (!video) return;
      const duration = video.duration;
      
      if (hasPlayedOnce) {
        // After first play, loop last 3 seconds
        const loopStart = Math.max(0, duration - 3);
        if (video.currentTime >= duration - 0.1) {
          video.currentTime = loopStart;
        }
      } else {
        // First play completed
        if (video.currentTime >= duration - 0.1) {
          setHasPlayedOnce(true);
          const loopStart = Math.max(0, duration - 3);
          video.currentTime = loopStart;
        }
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [hasPlayedOnce]);

  return (
    <div className={`relative ${className}`}>
      {/* Animated background glow */}
      <div className="absolute inset-0 -z-10 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl scale-110" />
      </div>
      
      {/* Ground/pit effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-gradient-to-t from-slate-900 via-slate-800/90 to-transparent z-20 rounded-t-[100%]" />
      
      {/* Video container with cropping */}
      <div className="relative overflow-hidden rounded-2xl">
        <div className="overflow-hidden" style={{ marginBottom: '-40px' }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover scale-105"
            style={{ 
              background: 'transparent',
              mixBlendMode: 'normal',
              objectPosition: 'center top'
            }}
          >
            <source src={avatarVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-slate-900/30" />
      </div>
    </div>
  );
};

export default InteractiveAvatar;
