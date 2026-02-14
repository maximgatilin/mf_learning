import React, { useState, useEffect } from 'react';

function Character({ 
  applePosition = 0, 
  appleRotation = 0, 
  isBlinking = false, 
  isSpeaking = false, 
  speechText = 'NYAM!',
  isSleeping = false,
  spoonPosition = 'plate'
}) {
  return (
    <div className="apple-container" style={{ 
      transform: `translateX(${applePosition}px) rotate(${appleRotation}deg)`, 
      transition: 'transform 0.3s ease-out',
      display: 'flex',
      alignItems: 'center',
      gap: '50px'
    }}>
      <svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Apple body */}
        <path d="M100 20 C 60 20, 40 50, 40 90 C 40 120, 50 140, 70 150 C 80 155, 90 160, 100 160 C 110 160, 120 155, 130 150 C 150 140, 160 120, 160 90 C 160 50, 140 20, 100 20 Z" 
              fill="#ff4444" 
              stroke="#cc0000" 
              strokeWidth="2"/>
        
        {/* Hair */}
        <path d="M 70 35 Q 100 20, 130 35 Q 125 45, 120 40 Q 100 30, 80 40 Q 75 45, 70 35 Z" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
        <path d="M 75 40 Q 100 25, 125 40 Q 120 50, 115 45 Q 100 35, 85 45 Q 80 50, 75 40 Z" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
        
        {/* Cap crown */}
        <ellipse cx="100" cy="25" rx="40" ry="12" fill="#1E3A8A" stroke="#1E40AF" strokeWidth="2"/>
        
        {/* Cap body */}
        <rect x="60" y="15" width="80" height="20" fill="#3B82F6" stroke="#2563EB" strokeWidth="2" rx="8"/>
        
        {/* Cap brim */}
        <ellipse cx="100" cy="35" rx="45" ry="8" fill="#1E3A8A" stroke="#1E40AF" strokeWidth="2"/>
        
        {/* Cap button */}
        <circle cx="100" cy="25" r="3" fill="#FBBF24" stroke="#F59E0B" strokeWidth="1"/>
        
        {/* Apple stem (now under the cap) */}
        <rect x="95" y="15" width="10" height="15" fill="#8B4513" rx="2"/>
        
        {/* Apple leaf (now under the cap) */}
        <path d="M105 20 Q 120 15, 125 25 Q 120 30, 105 25 Z" fill="#90EE90" stroke="#228B22" strokeWidth="1"/>
        
        {/* Left eye */}
        <circle cx="75" cy="70" r="8" fill="white"/>
        {!isBlinking && !isSleeping && <circle cx="75" cy="70" r="5" fill="#8B4513"/>}
        {!isBlinking && !isSleeping && <circle cx="76" cy="68" r="2" fill="white"/>}
        {isBlinking && <path d="M 70 70 L 80 70" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>}
        {isSleeping && <path d="M 70 70 L 80 70" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>}
        
        {/* Right eye */}
        <circle cx="125" cy="70" r="8" fill="white"/>
        {!isBlinking && !isSleeping && <circle cx="125" cy="70" r="5" fill="#8B4513"/>}
        {!isBlinking && !isSleeping && <circle cx="126" cy="68" r="2" fill="white"/>}
        {isBlinking && <path d="M 120 70 L 130 70" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>}
        {isSleeping && <path d="M 120 70 L 130 70" stroke="#8B4513" strokeWidth="2" strokeLinecap="round"/>}
        
        {/* Smile / Speaking mouth */}
        {!isSpeaking ? (
          <path d="M 80 100 Q 100 120, 120 100" 
                stroke="black" 
                strokeWidth="3" 
                fill="none" 
                strokeLinecap="round"/>
        ) : (
          <ellipse cx="100" cy="110" rx="15" ry="8" 
                   fill="black" 
                   stroke="black" 
                   strokeWidth="2"/>
        )}
        
        {/* Apple highlight */}
        <ellipse cx="85" cy="50" rx="15" ry="25" fill="rgba(255,255,255,0.3)" transform="rotate(-20 85 50)"/>
        
        {/* Speaking sound waves */}
        {isSpeaking && (
          <>
            <circle cx="140" cy="90" r="8" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.7"/>
            <circle cx="150" cy="100" r="12" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.5"/>
            <circle cx="160" cy="110" r="16" fill="none" stroke="#FFD700" strokeWidth="2" opacity="0.3"/>
            <text x="170" y="95" fontSize="12" fill="#FFD700" fontWeight="bold">{speechText}</text>
          </>
        )}
        
        {/* Sleeping Z's */}
        {isSleeping && (
          <>
            <text x="120" y="40" fontSize="16" fill="#87CEEB" fontWeight="bold" opacity="0.8">Z</text>
            <text x="130" y="30" fontSize="14" fill="#87CEEB" fontWeight="bold" opacity="0.6">Z</text>
            <text x="140" y="35" fontSize="12" fill="#87CEEB" fontWeight="bold" opacity="0.4">Z</text>
          </>
        )}
        
        {/* Shorts */}
        <rect x="70" y="140" width="60" height="25" fill="#4169E1" stroke="#0000CD" strokeWidth="2" rx="3"/>
        <rect x="70" y="150" width="25" height="15" fill="#4169E1" stroke="#0000CD" strokeWidth="2" rx="2"/>
        <rect x="105" y="150" width="25" height="15" fill="#4169E1" stroke="#0000CD" strokeWidth="2" rx="2"/>
        
        {/* Belt */}
        <rect x="70" y="140" width="60" height="4" fill="#8B4513" stroke="#654321" strokeWidth="1"/>
        <rect x="95" y="138" width="10" height="8" fill="#FFD700" stroke="#DAA520" strokeWidth="1" rx="2"/>
        
        {/* Left arm */}
        <ellipse cx="60" cy="100" rx="8" ry="25" fill="#ff4444" stroke="#cc0000" strokeWidth="2" transform="rotate(-30 60 100)"/>
        <circle cx="45" cy="120" r="6" fill="#ff4444" stroke="#cc0000" strokeWidth="2"/>
        
        {/* Right arm */}
        <ellipse cx="140" cy="100" rx="8" ry="25" fill="#ff4444" stroke="#cc0000" strokeWidth="2" transform="rotate(30 140 100)"/>
        <circle cx="155" cy="120" r="6" fill="#ff4444" stroke="#cc0000" strokeWidth="2"/>
        
        {/* Left leg */}
        <ellipse cx="85" cy="170" rx="12" ry="30" fill="#ff4444" stroke="#cc0000" strokeWidth="2" transform="rotate(-10 85 170)"/>
        <ellipse cx="80" cy="195" rx="8" ry="12" fill="#ff4444" stroke="#cc0000" strokeWidth="2"/>
        
        {/* Right leg */}
        <ellipse cx="115" cy="170" rx="12" ry="30" fill="#ff4444" stroke="#cc0000" strokeWidth="2" transform="rotate(10 115 170)"/>
        <ellipse cx="120" cy="195" rx="8" ry="12" fill="#ff4444" stroke="#cc0000" strokeWidth="2"/>
      </svg>
      
      {/* Plate with porridge and spoon */}
      <svg style={{ overflow: 'visible' }} width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {/* Plate */}
        <ellipse cx="100" cy="120" rx="60" ry="15" fill="#F5F5F5" stroke="#E0E0E0" strokeWidth="2"/>
        <ellipse cx="100" cy="110" rx="55" ry="8" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="2"/>
        
        {/* Porridge */}
        <ellipse cx="100" cy="110" rx="50" ry="6" fill="#D2B48C" stroke="#BC9A6A" strokeWidth="1"/>
        
        {/* Porridge texture */}
        <circle cx="80" cy="108" r="3" fill="#C19A6B" opacity="0.7"/>
        <circle cx="100" cy="105" r="2" fill="#C19A6B" opacity="0.7"/>
        <circle cx="120" cy="108" r="2.5" fill="#C19A6B" opacity="0.7"/>
        <circle cx="90" cy="112" r="2" fill="#C19A6B" opacity="0.7"/>
        <circle cx="110" cy="112" r="1.5" fill="#C19A6B" opacity="0.7"/>
        
        {/* Spoon */}
        <g transform={
          spoonPosition === 'plate' ? 'translate(-15, 25)' :
          spoonPosition === 'mouth' ? 'translate(-300, 30)' :
          'translate(-80, -40)'
        } style={{ transition: 'transform 0.8s ease-in-out' }}>
          <path d="M 160 80 Q 170 75, 175 85 Q 170 90, 160 85 Q 155 82, 160 80 Z" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="1"/>
          <rect x="170" y="82" width="15" height="2" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="1" rx="1"/>
          <rect x="180" y="80" width="8" height="6" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="1" rx="1"/>
        </g>
        
        {/* Steam from porridge */}
        <path d="M 85 100 Q 90 95, 95 100 Q 90 105, 85 100" fill="none" stroke="#E0E0E0" strokeWidth="1" opacity="0.6"/>
        <path d="M 100 98 Q 105 93, 110 98 Q 105 103, 100 98" fill="none" stroke="#E0E0E0" strokeWidth="1" opacity="0.6"/>
        <path d="M 115 100 Q 120 95, 125 100 Q 120 105, 115 100" fill="none" stroke="#E0E0E0" strokeWidth="1" opacity="0.6"/>
      </svg>
    </div>
  );
}

export default Character;

