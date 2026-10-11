import { useEffect, useRef, useState } from "react";
import '../styling/feedback.css'

// GET TIMING FROM QUYNH

function scoreToRating(score) {
  if (score >= 85) return { label: "GOOD", tier: "good" };
  if (score >= 65) return { label: "OKAY", tier: "okay" };
  if (score >= 40) return { label: "BAD", tier: "bad" };
  return { label: "MISS", tier: "miss" };
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
      if (latest.current == null) return;

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

function scoreCheck(score) {
  if (score > 75) return "good";
  if (score > 50) return "okay";
  if (score > 25) return "bad";
  return "miss";
}