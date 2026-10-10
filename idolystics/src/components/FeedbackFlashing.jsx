import { useEffect, useRef, useState } from "react";

function scoreToRating(score) {
  if (score >= 85) return { label: "GOOD", tier: "good" };
  if (score >= 65) return { label: "OKAY", tier: "okay" };
  if (score >= 40) return { label: "BAD", tier: "bad" };
  return { label: "MISS", tier: "miss" };
}

export default function FeedbackFlashing() {
  const [score, setScore] = useState(50);
  const [flash, setFlash] = useState(null);
  const active = true;
  const intervalMs = 700;
  const latest = useRef(score);
  const count = useRef(0);
  latest.current = score;

  useEffect(() => {
    if (!active) return;
    const t = setInterval(() => {
      if (latest.current == null) return;
      setFlash({ ...scoreToRating(latest.current), id: ++count.current });
    }, intervalMs);
    return () => clearInterval(t);
  }, [active, intervalMs]);

  return (
    <main style={{ position: "relative" }}>
      <input
        type="range" min="0" max="100" value={score}
        onChange={e => setScore(+e.target.value)}
      />
      <Test score={score} active={active} />

      {flash && (
        <div key={flash.id} className={`flash flash-${flash.tier}`}>
          {flash.label}
        </div>
      )}
    </main>
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