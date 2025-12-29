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

    // 1. Handle the "End" of the first playthrough
    const handleEnded = () => {
      setHasPlayedOnce(true);
      const duration = video.duration;
      // Immediately jump back 3 seconds and ensure it plays
      video.currentTime = Math.max(0, duration - 3);
      video.play();
    };

    // 2. Handle the Loop Logic (Last 3 seconds)
    const handleTimeUpdate = () => {
      // Only run this logic AFTER the first full play is done
      if (!hasPlayedOnce) return;

      const duration = video.duration;
      // If we are within 0.2 seconds of the end, restart the loop
      if (video.currentTime >= duration - 0.2) {
        video.currentTime = Math.max(0, duration - 3);
        video.play(); // Ensure it doesn't pause
      }
    };

    video.addEventListener("ended", handleEnded);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
    };
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
            // IMPORTANT: Do NOT use the 'loop' prop here, or it will override our custom logic
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
