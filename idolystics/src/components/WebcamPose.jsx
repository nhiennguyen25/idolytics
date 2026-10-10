
import { useEffect, useRef, useState } from "react";
import { FilesetResolver, PoseLandmarker } from "@mediapipe/tasks-vision";

function WebcamPose({ isCameraOn, setIsCameraOn }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [status, setStatus] = useState("Camera stopped");
  const [landmarkCount, setLandmarkCount] = useState(0);

  async function startCamera() {
    try {
      setStatus("Starting camera...");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: 640,
          height: 480,
        },
        audio: false,
      });

      streamRef.current = stream;
      const video = videoRef.current;
      video.srcObject = stream;
      await video.play();

      setIsCameraOn(true);

      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.1.0/wasm"
      );

      const landmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/models/pose_landmarker_lite.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

      landmarkerRef.current = landmarker;
      setStatus("Looking for a person...");

      function detectPose() {
        if (!streamRef.current) return;

        if (video.readyState >= 2) {
          const results = landmarker.detectForVideo(
            video,
            performance.now()
          );

          const landmarks = results.landmarks?.[0] ?? [];
          setLandmarkCount(landmarks.length);
          setStatus(
            landmarks.length > 0
              ? "Pose detected!"
              : "Looking for a person..."
          );
        }

        animationRef.current = requestAnimationFrame(detectPose);
      }

      detectPose();
    } catch (error) {
      console.error("Pose detection error:", error);
      setStatus(`Error: ${error.message}`);
      stopCamera();
    }
  }

  function stopCamera() {
    // Cancel the animation loop.
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    // Turn off the webcam hardware.
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    // Release MediaPipe resources.
    landmarkerRef.current?.close();
    landmarkerRef.current = null;

    // Clear the video.
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsCameraOn(false);
    setLandmarkCount(0);
    setStatus("Camera stopped");
  }

  useEffect(() => {
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }

      streamRef.current?.getTracks().forEach((track) => track.stop());
      landmarkerRef.current?.close();
    };
  }, []);

  return (
    <section  className="webcam-video">

      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{
          width: "100%",
          maxWidth: "640px",
          transform: "scaleX(-1)",
          borderRadius: "12px",
          backgroundColor: "#111",
        }}
      />

      <p>Status: {status}</p>
      <p>Body landmarks detected: {landmarkCount}</p>

      <button onClick={isCameraOn ? stopCamera : startCamera}>
        {isCameraOn ? "Stop Camera" : "Start Camera"}
      </button>
    </section>
  );
}

export default WebcamPose;

