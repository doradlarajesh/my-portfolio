import { useRef, useEffect, useState } from "react";
import avatarVideo from "@/assets/avatar-greeting.mp4";
import avatarPoster from "@/assets/avatar_mid.png";

interface InteractiveAvatarProps {
  className?: string;
}

const InteractiveAvatar = ({ className = "" }: InteractiveAvatarProps) => {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const seekingRef = useRef(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (seekingRef.current || !video.duration) return;
      // Jump back to 0.02s before the video can reach `ended` state.
      // Catching it 0.5s early ensures the browser never resets currentTime to 0.
      if (video.currentTime >= video.duration - 0.5) {
        seekingRef.current = true;
        video.currentTime = 1;
        video.play()
          .catch(() => {})
          .finally(() => { seekingRef.current = false; });
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Animated background glow */}
      <div className="absolute inset-0 -z-10 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl scale-110" />
      </div>

      {/* Ground/pit effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-gradient-to-t from-slate-900 via-slate-800/90 to-transparent z-20 rounded-t-[100%]" />

      {/* Video container */}
      <div className="relative overflow-hidden rounded-2xl w-full h-full">
        <div className="overflow-hidden w-full h-full" style={{ marginBottom: "-40px" }}>
          {/* Poster — visible instantly, fades out when video is ready */}
          <img
            src={avatarPoster}
            alt="avatar"
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-500"
            style={{ objectPosition: "center top", opacity: videoReady ? 0 : 1, pointerEvents: "none" }}
          />
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-105 transition-opacity duration-500"
            style={{
              background: "transparent",
              objectPosition: "center top",
              opacity: videoReady ? 1 : 0,
            }}
            onCanPlay={() => setVideoReady(true)}
          >
            <source src={avatarVideo} type="video/mp4" />
          </video>
        </div>

        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-slate-900/30" />
      </div>
    </div>
  );
};

export default InteractiveAvatar;
