import { useState } from 'react'
import './App.css'
// import FeedbackFlashing from "./components/FeedbackFlashing";
//import FeedbackPanel from "./components/FeedbackPanel";
//import InstructorVideo from "./components/InstructorVideo";
//import PracticeControls from "./components/PracticeControls";
//import ResultsScreen from "./components/ResultsScreen";
import WebcamPose from "./components/WebcamPose";

function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
    <h1>hi</h1>
      
      {/* components */}
    {<WebcamPose />}
    {/* <InstructorVideo/> */}
    {/* <PracticeControls/> */}
    {/* <FeedbackPanel /> */}
    {/* <FeedbackFlashing /> */}
    {/* <ResultsScreen/> */}

    
    

    </main>
  )
}

export default App
