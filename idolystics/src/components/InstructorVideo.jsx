import { useRef, useState } from "react";
import "../styling/InstructorVideo.css";

function InstructorVideo({ videoRef, onTimeUpdate, onEnded}) {
  const internalVideoRef = useRef(null);
  const activeVideoRef = videoRef ?? internalVideoRef;

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  function handleTimeUpdate() {
    const video = activeVideoRef.current;
    if (!video) return;

    setCurrentTime(video.currentTime);
    onTimeUpdate?.(video.currentTime);
  }

  function handleLoadedMetadata() {
    const video = activeVideoRef.current;
    if (video) setDuration(video.duration);
  }


async function togglePlayback() {
  const video = activeVideoRef.current;
  if (!video) return;

  if (video.paused) {
    try {
      await video.play();
    } catch (error) {
      console.error("Unable to play instructor video:", error);
    }
  } else {
    video.pause();
  }
}

function skipTime(seconds) {
  const video = activeVideoRef.current;
  if (!video) return;

  const targetTime = video.currentTime + seconds;

  video.currentTime = Math.max(
    0,
    Math.min(targetTime, video.duration || targetTime)
  );
}

function handleVideoKeyDown(event) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    event.stopPropagation();
    skipTime(-5);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    event.stopPropagation();
    skipTime(5);
  } else if (event.key === " " || event.key === "Enter") {
    event.preventDefault();
    event.stopPropagation();
    togglePlayback();
  }
}


  function handleSeek(event) {
    const video = activeVideoRef.current;
    if (!video) return;

    const newTime = Number(event.target.value);
    video.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function formatTime(time) {
    if (!Number.isFinite(time)) return "0:00";

    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);

    return `${minutes}:${String(seconds).padStart(2, "0")}`;
  }

  return (
    <div className="instructor-video">
      <div className="instructor-video__screen">
        <video
          ref={activeVideoRef}
          src="/videos/newjeans_super_shy.mov"
          playsInline
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlayback}
          onKeyDown={handleVideoKeyDown}
          tabIndex={0}
          aria-label="Instructor video. Click to play or pause. Use left and right arrow keys to skip 5 seconds."
          className="instructor-video__player"
        />
      </div>

      <div className="instructor-video__controls">

<button
  type="button"
  onClick={() => skipTime(-5)}
  className="instructor-video__skip-button"
  aria-label="Back 5 seconds"
  title="Back 5 seconds"
>
  <span className="skip-icon">↶</span>
  <span className="skip-label">5s</span>
</button>

<button
  type="button"
  onClick={() => skipTime(5)}
  className="instructor-video__skip-button"
  aria-label="Forward 5 seconds"
  title="Forward 5 seconds"
>
  <span className="skip-icon">↷</span>
  <span className="skip-label">5s</span>
</button>

<button
  type="button"
  onClick={togglePlayback}
  className="instructor-video__play-button"
  aria-label={isPlaying ? "Pause instructor video" : "Play instructor video"}
>
  {isPlaying ? "❚❚" : "▶"}
</button>

<span className="instructor-video__time">
  {formatTime(currentTime)}
</span>

<input
  type="range"
  min="0"
  max={duration || 0}
  step="0.1"
  value={Math.min(currentTime, duration || 0)}
  onChange={handleSeek}
  className="instructor-video__seek"
  aria-label="Seek instructor video"
/>

<span className="instructor-video__time">
  {formatTime(duration)}
</span>

      </div>
    </div>
  );
}

export default InstructorVideo;
