import { useEffect, useState } from "react";

const CyberpunkBackground = () => {
  const [codeSnippets] = useState([
    'describe("QA Test")',
    'expect(bug).toBe(null)',
    'await page.click()',
    'assert.equal(true)',
    'cy.get(".button")',
    'test.skip()',
    'beforeEach(() => {})',
    'it("should pass")',
    'playwright.launch()',
    'describe("QA Test")',
  ]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Deep blue/purple gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#0f0a2a] to-[#0a0a1a]" />
      
      {/* Circuit board pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
            {/* Horizontal lines */}
            <path d="M0 50 H30 M40 50 H60 M70 50 H100" stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" />
            {/* Vertical lines */}
            <path d="M50 0 V30 M50 40 V60 M50 70 V100" stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" />
            {/* Circuit nodes */}
            <circle cx="30" cy="50" r="3" fill="url(#node-gradient)" />
            <circle cx="70" cy="50" r="3" fill="url(#node-gradient)" />
            <circle cx="50" cy="30" r="3" fill="url(#node-gradient)" />
            <circle cx="50" cy="70" r="3" fill="url(#node-gradient)" />
            {/* Corner elements */}
            <path d="M10 10 L10 30 M10 10 L30 10" stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" />
            <path d="M90 10 L90 30 M90 10 L70 10" stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" />
            <path d="M10 90 L10 70 M10 90 L30 90" stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" />
            <path d="M90 90 L90 70 M90 90 L70 90" stroke="url(#circuit-gradient)" strokeWidth="1" fill="none" />
          </pattern>
          <linearGradient id="circuit-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="50%" stopColor="#8b5cf6" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <radialGradient id="node-gradient">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#circuit-pattern)" />
      </svg>

      {/* Large circuit board bug icon on left */}
      <div className="absolute top-20 left-8 opacity-10">
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 8V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V8" stroke="url(#bug-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 10H16V16C16 18.2091 14.2091 20 12 20C9.79086 20 8 18.2091 8 16V10Z" stroke="url(#bug-gradient)" strokeWidth="1.5"/>
          <path d="M5 11H8M16 11H19M5 15H8M16 15H19" stroke="url(#bug-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 10V20" stroke="url(#bug-gradient)" strokeWidth="1.5" strokeLinecap="round"/>
          <defs>
            <linearGradient id="bug-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Floating code snippets */}
      <div className="absolute inset-0 pointer-events-none">
        {codeSnippets.map((snippet, i) => (
          <div
            key={i}
            className="absolute font-mono text-xs text-cyan-400/40 whitespace-nowrap animate-pulse"
            style={{
              left: `${10 + (i * 20) % 80}%`,
              top: `${10 + (i * 15) % 70}%`,
              animationDelay: `${i * 0.5}s`,
              transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (5 + i * 2)}deg)`,
            }}
          >
            {snippet}
          </div>
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-48 h-48 bg-magenta-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Data stream lines */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="stream-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#00d4ff" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
          {[...Array(5)].map((_, i) => (
            <line
              key={i}
              x1="0%"
              y1={`${20 + i * 15}%`}
              x2="100%"
              y2={`${25 + i * 12}%`}
              stroke="url(#stream-gradient)"
              strokeWidth="1"
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </svg>
      </div>

      {/* Grid floor effect at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 perspective-1000">
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,212,255,0.05) 50%, rgba(139,92,246,0.1) 100%)',
            transform: 'rotateX(60deg)',
            transformOrigin: 'bottom center',
          }}
        >
          <svg className="w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 0 H40 M0 0 V40" stroke="#00d4ff" strokeWidth="0.5" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CyberpunkBackground;
