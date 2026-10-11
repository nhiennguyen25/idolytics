import { useEffect, useRef, useState } from "react";
import '../styling/feedback.css'

// GET TIMING FROM QUYNH

function scoreToRating(score) {
  if (!Number.isFinite(score)){
    return {label: "GET IN POSITION", tier: "waiting"};
  }
  if (score >= 90) return { label: "PERFECT", tier: "perfect" };
  if (score >= 75) return { label: "SO CLOSE", tier: "close" };
  if (score >= 55) return { label: "MID", tier: "adjust" };
  if (score >=30) return {label: "TRY AGAIN", tier: "retry"};
  return { label: "NOT YOUR BEST", tier: "reset" };
}

export default function FeedbackFlashing({
  score,
  active = true,
  intervalMs = 2000,
  onScoreFlash
}) {

  //FIX ACTIVE LIKE HOW YOU DID FOR CANVAS
  const [flash, setFlash] = useState(null);
  const latest = useRef(score);
  const latestCallback = useRef(onScoreFlash);
  const count = useRef(0);

  latest.current = score;
  latestCallback.current = onScoreFlash;


  useEffect(() => {
    if (!active) 
        return;
    const t = setInterval(() => {
      if (!Number.isFinite(latest.current)) return;

      const currentScore = latest.current;

      setFlash({
        ...scoreToRating(currentScore),
        id: ++count.current
      });

      latestCallback.current?.(currentScore);
    }, intervalMs);

  return () => clearInterval(t);
    }, [active, intervalMs]);

   return (

      /*FOR DEBUGGING PURPOSES, SHOW SCORE
        <div className="score-flash">
      <p>Debug score: {String(score)}</p>

      {flash && (
        <div
          key={flash.id}
          className={`flash flash-${flash.tier}`}
        >
          {flash.label}
        </div>
      )}
    </div>*/

    <div className="score-flash">
      {flash && (
        <div
          key={flash.id}
          className={`flash flash-${flash.tier}`}
        >
          {flash.label}
        </div>
      )}
    </div>
  );
}

function Test({ score, active }) {
  if (!active) return null;
  return (
    <div>
      <h1>{score}</h1>
      <h2>{scoreCheck(score)}</h2>
    </div>
  );
}

/*function scoreCheck(score) {
  if (score > 75) return "good";
  if (score > 50) return "okay";
  if (score > 25) return "bad";
  return "miss";
}*/