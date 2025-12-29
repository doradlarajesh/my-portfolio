import avatarVideo from "@/assets/avatar-greeting.mp4";

interface InteractiveAvatarProps {
  className?: string;
}

const InteractiveAvatar = ({ className = "" }: InteractiveAvatarProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Animated background glow */}
      <div className="absolute inset-0 -z-10 animate-pulse">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-pink-500/30 rounded-full blur-3xl scale-110" />
      </div>
      
      {/* Ground/pit effect */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-12 bg-gradient-to-t from-slate-900 via-slate-800/90 to-transparent z-20 rounded-t-[100%]" />
      
      {/* Video container */}
      <div className="relative overflow-hidden rounded-2xl">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ 
            background: 'transparent',
            mixBlendMode: 'normal'
          }}
        >
          <source src={avatarVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Subtle vignette overlay */}
        <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-transparent via-transparent to-slate-900/30" />
      </div>
    </div>
  );
};

export default InteractiveAvatar;
