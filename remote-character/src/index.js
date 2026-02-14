// This file is the bootstrap for the remote microfrontend
// It's used when running the remote standalone for development/testing
import React from 'react';
import ReactDOM from 'react-dom/client';
import Character from './Character';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Remote Character Microfrontend</h1>
      <p>This is the remote microfrontend running standalone.</p>
      <Character 
        applePosition={0}
        appleRotation={0}
        isBlinking={false}
        isSpeaking={false}
        isSleeping={false}
        spoonPosition="plate"
      />
    </div>
  </React.StrictMode>
);

