import { useState, useEffect, useRef } from 'react';

const InteractiveAvatar = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (svgRef.current) {
        const svgRect = svgRef.current.getBoundingClientRect();
        const x = e.clientX - svgRect.left;
        const y = e.clientY - svgRect.top;
        setCursorPos({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate eye movement (limited range)
  const eyeOffsetX = Math.min(Math.max((cursorPos.x - 100) / 15, -3), 3);
  const eyeOffsetY = Math.min(Math.max((cursorPos.y - 90) / 15, -3), 3);

  return (
    <div className="flex flex-col items-center p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Let's connect</h2>
      <svg
        ref={svgRef}
        width="200"
        height="200"
        viewBox="0 0 200 200"
        className="w-48 h-48 rounded-full bg-white shadow-inner"
      >
        <defs>
          <linearGradient id="skinGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FCE4D6" />
            <stop offset="100%" stopColor="#F0C8A0" />
          </linearGradient>
          <linearGradient id="hairGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3E2723" />
            <stop offset="100%" stopColor="#212121" />
          </linearGradient>
        </defs>

        {/* Head */}
        <circle cx="100" cy="100" r="70" fill="url(#skinGradient)" />

        {/* Hair */}
        <path
          d="M50,80 Q60,30 100,30 T150,80 Q160,110 155,130 Q140,150 100,150 Q60,150 45,130 Q40,110 50,80"
          fill="url(#hairGradient)"
        />

        {/* Beard */}
        <path
          d="M60,130 Q80,160 100,160 T140,130 L135,120 Q120,140 100,140 T65,120 L60,130"
          fill="url(#hairGradient)"
        />

        {/* Eyes (moving) */}
        <g transform={`translate(${eyeOffsetX}, ${eyeOffsetY})`}>
          <circle cx="80" cy="90" r="5" fill="#000" />
          <circle cx="120" cy="90" r="5" fill="#000" />
        </g>

        {/* Eyebrows (subtle animation) */}
        <path d="M70,80 Q80,75 90,80" stroke="#3E2723" strokeWidth="2" fill="none">
          <animate attributeName="d" values="M70,80 Q80,75 90,80;M70,78 Q80,73 90,78;M70,80 Q80,75 90,80" dur="4s" repeatCount="indefinite" />
        </path>
        <path d="M110,80 Q120,75 130,80" stroke="#3E2723" strokeWidth="2" fill="none">
          <animate attributeName="d" values="M110,80 Q120,75 130,80;M110,78 Q120,73 130,78;M110,80 Q120,75 130,80" dur="4s" repeatCount="indefinite" />
        </path>

        {/* Mouth (subtle smile animation) */}
        <path d="M80,120 Q100,135 120,120" stroke="#000" strokeWidth="2" fill="none">
          <animate attributeName="d" values="M80,120 Q100,135 120,120;M80,122 Q100,137 120,122;M80,120 Q100,135 120,120" dur="3s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
};

export default InteractiveAvatar;
