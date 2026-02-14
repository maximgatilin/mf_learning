import React, { useState, useEffect, useRef, Suspense } from 'react';
import nyamSound from './nyam.mp3';
import fishSound from './fish.mp3';
import meatSound from './meat.mp3';
import raketaSound from './raketa.mp3';
import congratsSound from './congrats.mp3';
import shtanSound from './shtani.mp3';
import helloSound from './hello.mp3';
import kasha from './kasha.mp3';

// Dynamically import the Character component from the remote microfrontend
const Character = React.lazy(() => import('remoteCharacter/Character'));

function App() {
  const [count, setCount] = useState(0);
  const [applePosition, setApplePosition] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechText, setSpeechText] = useState('NYAM!');
  const [appleRotation, setAppleRotation] = useState(0);
  const [isSleeping, setIsSleeping] = useState(false);
  const [spoonPosition, setSpoonPosition] = useState('plate'); // 'plate', 'mouth', 'eating'
  const audioRef = useRef(null);
  const fishAudioRef = useRef(null);
  const meatAudioRef = useRef(null);
  const raketaAudioRef = useRef(null);
  const congratsAudioRef = useRef(null);
  const shtaniAudioRef = useRef(null);
  const helloAudioRef = useRef(null);
  const kashaAudioRef = useRef(null);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'ArrowLeft') {
        event.preventDefault();
        setApplePosition(prev => prev - 20);
      } else if (event.code === 'ArrowRight') {
        event.preventDefault();
        setApplePosition(prev => prev + 20);
      } else if (event.code === 'ArrowUp') {
        event.preventDefault();
        setAppleRotation(prev => prev + 15);
      } else if (event.code === 'ArrowDown') {
        event.preventDefault();
        setIsSleeping(true);
        // Stop sleeping after 3 seconds
        setTimeout(() => setIsSleeping(false), 3000);
      } else if (event.code === 'Space') {
        event.preventDefault();
        setIsBlinking(true);
        setTimeout(() => setIsBlinking(false), 200);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const playSound = (soundRef, text) => {
    if (soundRef.current) {
      soundRef.current.currentTime = 0;
      setSpeechText(text);
      setIsSpeaking(true);
      soundRef.current.play().catch(console.error);
      // Stop speaking animation after audio duration
      setTimeout(() => setIsSpeaking(false), 1000);
    }
  };

  const playNyamSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setSpeechText('НЯМ!');
      setIsSpeaking(true);
      audioRef.current.play().catch(console.error);
      
      // Start spoon animation sequence
      setSpoonPosition('mouth');
      
      // After 1 second, show eating animation
      setTimeout(() => {
        setSpoonPosition('eating');
      }, 1000);
      
      // After 2 seconds, return spoon to plate
      setTimeout(() => {
        setSpoonPosition('plate');
        setIsSpeaking(false);
      }, 2000);
    }
  };

  return (
    <div className="app">
      <audio ref={audioRef} src={nyamSound} preload="auto" />
      <audio ref={fishAudioRef} src={fishSound} preload="auto" />
      <audio ref={meatAudioRef} src={meatSound} preload="auto" />
      <audio ref={raketaAudioRef} src={raketaSound} preload="auto" />
      <audio ref={congratsAudioRef} src={congratsSound} preload="auto" />
      <audio ref={shtaniAudioRef} src={shtanSound} preload="auto" />
      <audio ref={helloAudioRef} src={helloSound} preload="auto" />
      <audio ref={kashaAudioRef} src={kasha} preload="auto" />

      <header className="app-header">
        <h1>🚀 Мистер Яблочко</h1>
      </header>
      
      <main className="app-main">
        {/* Load Character component from remote microfrontend */}
        <Suspense fallback={<div style={{ textAlign: 'center', padding: '20px' }}>Loading character from remote microfrontend...</div>}>
          <div style={{ 
            transform: `translateX(${applePosition}px) rotate(${appleRotation}deg)`, 
            transition: 'transform 0.3s ease-out'
          }}>
            <Character
              applePosition={0}
              appleRotation={0}
              isBlinking={isBlinking}
              isSpeaking={isSpeaking}
              speechText={speechText}
              isSleeping={isSleeping}
              spoonPosition={spoonPosition}
            />
          </div>
        </Suspense>
        
        
        
        {/* Sound Buttons */}
        <div className="sound-buttons" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          marginTop: '20px',
          flexWrap: 'wrap'
        }}>
          <button 
            className="sound-btn"
            onClick={() => playSound(fishAudioRef, 'РЫБА!')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            РЫБА
          </button>
          <button 
            className="sound-btn"
            onClick={() => playSound(meatAudioRef, 'МЯСО!')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#FF5722',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            МЯСО
          </button>
          <button 
            className="sound-btn"
            onClick={() => playSound(raketaAudioRef, 'РАКЕТА!')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            РАКЕТА
          </button>
          <button 
            className="sound-btn"
            onClick={playNyamSound}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            НЯМ
          </button>
          <button 
            className="sound-btn"
            onClick={() => playSound(congratsAudioRef, 'ПОЗДРАВЛЯЮ!')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            ПОЗДРАВЛЯЮ
          </button>
          <button 
            className="sound-btn"
            onClick={() => playSound(shtaniAudioRef, 'ШТАНИ!')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            ШТАНЫ
          </button>
          <button 
            className="sound-btn"
            onClick={() => playSound(helloAudioRef, 'ЗДРАВСТВУЙТЕ!')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            ЗДРАВСТВУЙТЕ
          </button>
          <button 
            className="sound-btn"
            onClick={() => playSound(kashaAudioRef, 'КАША!')}
            style={{
              padding: '10px 20px',
              fontSize: '16px',
              fontWeight: 'bold',
              backgroundColor: '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              textTransform: 'uppercase'
            }}
          >
            КАША
          </button>
        </div>
        
        {/* <div className="card">
          <h2>Counter Example</h2>
          <p>Current count: <span className="count">{count}</span></p>
          <div className="button-group">
            <button 
              className="btn btn-primary"
              onClick={() => setCount(count + 1)}
            >
              Increment
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => setCount(count - 1)}
            >
              Decrement
            </button>
            <button 
              className="btn btn-danger"
              onClick={() => setCount(0)}
            >
              Reset
            </button>
          </div>
        </div> */}

        {/* <div className="features">
          <h2>✨ Features</h2>
          <ul>
            <li>⚡ Hot Module Replacement (HMR)</li>
            <li>🔧 Webpack 5 configuration</li>
            <li>⚛️ React 18 with hooks</li>
            <li>🎨 Modern CSS with loaders</li>
            <li>📱 Responsive design</li>
            <li>🚀 Development server</li>
          </ul>
        </div>

        <div className="getting-started">
          <h2>🚀 Getting Started</h2>
          <div className="code-block">
            <p><strong>Install dependencies:</strong></p>
            <code>npm install</code>
          </div>
          <div className="code-block">
            <p><strong>Start development server:</strong></p>
            <code>npm start</code>
          </div>
          <div className="code-block">
            <p><strong>Build for production:</strong></p>
            <code>npm run build</code>
          </div>
        </div> */}
      </main>

      <footer className="app-footer">
        <p>Made with ❤️ using Webpack + React</p>
      </footer>
    </div>
  );
}

export default App;
