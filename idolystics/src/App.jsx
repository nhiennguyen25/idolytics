import { useEffect, useRef, useState } from "react";
import './App.css'
import FeedbackFlashing from "./components/FeedbackFlashing";
// import FeedbackPanel from "./components/FeedbackPanel";
//import InstructorVideo from "./components/InstructorVideo";
//import PracticeControls from "./components/PracticeControls";
//import ResultsScreen from "./components/ResultsScreen";
import WebcamPose from "./components/WebcamPose";
import {SkeletonTest} from "./components/SkeletonCanvas";
import "./styling/video.css";



function App() {
  const [count, setCount] = useState(0);
  const [isCameraOn, setIsCameraOn] = useState(false);


  return (
    <main className="idolystics">
      <nav className="navbar">
        <h2 className="logo">idolytics</h2>
        <p>YOUR AI DANCE COACH</p>
      </nav>
      
      <section className="hero">
        <p className="eyebrow">YOUR VERY OWN POP STAR ACADEMY</p>
        <p className="description">
          Idolystics is an AI-powered dance training platform that helps you learn and improve your dance skills.
        </p>

        <button className="start-button">
          Start Practicing
        </button>
      </section>

      <footer className="footer">

      </footer>
  

      {/* components */}

    <div className = "webcam-container">
      <WebcamPose isCameraOn={isCameraOn} setIsCameraOn={setIsCameraOn}/>
      {isCameraOn && <SkeletonTest />}
      <FeedbackFlashing /> 
    </div>
    {/* <InstructorVideo/> */}
    {/* <PracticeControls/> */}
    {/* <FeedbackPanel /> */}
    {/* <ResultsScreen/> */}

    
    

    </main>
  )
}

export default App
