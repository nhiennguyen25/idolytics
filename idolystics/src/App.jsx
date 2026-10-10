
import { useEffect, useRef, useState } from "react";
import './App.css'
import FeedbackFlashing from './components/FeedbackFlashing'
import WebcamPose from './components/WebcamPose'
import { SkeletonTest } from './components/SkeletonCanvas'
import './styling/video.css'

function App() {
  const [isPracticing, setIsPracticing] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [landmarks, setLandmarks] = useState([]);

  console.log(landmarks[0]);

  return (
    <main className="idolytics">
      {!isPracticing ? (
        <>
          <div className="announcement">
            ✧ YOUR VERY OWN POP STAR ACADEMY ✧
          </div>

          <header className="navbar">
            <a className="logo" href="#home">idolytics ♡</a>

            <nav className="nav-links">
              <a href="#how-it-works">How it works</a>
              <a href="#features">Features</a>
              <a href="#dance-styles">Dance styles</a>
            </nav>
          </header>

          <section className="hero" id="home">
            <div className="hero-copy">
                <img
                  src="/external/idolytics-logo.png"
                  alt="Logo"
                  className="pink-logo"
                />
              <p className="eyebrow">
                ✧ AI COACHING. DANCE ENERGY. ✧
              </p>

              <h1>
                Learn. Practice.
                <span>Slay the choreo.</span>
              </h1>

              <p className="description">
                Your very own AI dance coach is here! Learn new
                choreography, practice at your own pace, and level
                up your moves one dance at a time.
              </p>

              <button
                className="start-button"
                onClick={() => setIsPracticing(true)}
              >
                Start Practicing ↗
              </button>

              <p className="little-note">
                make your idol dreams come true ♡
              </p>
            </div>

            <div className="hero-scrapbook">
              <div className="photo-window">
                <div className="window-toolbar">
                  <span>your_dance_era.jpg</span>
                  <span>−　□　×</span>
                </div>

                <img
                  src="/external/newjeans.jpg"
                  alt="Dance inspiration"
                  className="dance-photo"
                />
              </div>

              <div className="score-popup">
                <div className="window-toolbar">
                  <span>ai_coach_feedback.exe</span>
                  <span>×</span>
                </div>

                <div className="score-details">
                  <p className="score-label">YOUR POTENTIAL IS ✨</p>
                  <p className="score-value">100%</p>
                  <p>Your idol era starts here! ♡</p>
                </div>
              </div>

              <img
                src="/external/pink-chrome-heart.png"
                alt=""
                className="heart-sticker"
              />

              <span className="sparkle-decoration">✧ ⋆ ✧</span>
            </div>
          </section>

          <section className="dance-styles" id="dance-styles">
            <div className="dance-ticker">
              <span>LEARN THE MOVES.</span>
              <span>NAIL THE TIMING.</span>
              <span>SLAY EVERY ERA.</span>
              <span>AI COACH. YOUR PACE.</span>
            </div>

            <div className="styles-content" id="features">
              <p>Find your rhythm. Find your style. ♡</p>

              <div className="style-list">
                <span>🎀 K-pop</span>
                <span>🎧 Hip-hop</span>
                <span>🎶 Popping</span>
                <span>💿 Freestyle</span>
                <span>✨ Waacking</span>
              </div>
            </div>
          </section>

          <footer className="footer" id="how-it-works">
            Made for your next main-character moment ♡
          </footer>
        </>
      ) : (
        <section className="practice-page">
          <button
            className="back-button"
            onClick={() => setIsPracticing(false)}
          >
            ← Back to home
          </button>

          <h1 className="practice-title">Your idol era starts now! ♡</h1>
          <p className="practice-description">
            Get ready, find your space, and let's dance!
          </p>

          <div className = "webcam-container">
            <WebcamPose isCameraOn={isCameraOn} setIsCameraOn={setIsCameraOn } onLandmarks={setLandmarks}/>
            {isCameraOn && <SkeletonTest landmarks = {landmarks}/>}
            <FeedbackFlashing /> 
          </div>
        </section>
      )}
    </main>
  )
}

export default App

