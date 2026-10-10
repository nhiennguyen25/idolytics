
import fs from "node:fs";

const filePath = "./src/data/referenceLandmarks.json";
const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

const frames = data.frames;

let missingPoses = 0;
let incorrectLandmarkCounts = 0;
let invalidCoordinates = 0;
let invalidTimestamps = 0;

const problems = [];

console.log("Starting reference landmark validation...\n");

// Check every frame
for (let i = 0; i < frames.length; i++) {
  const frame = frames[i];
  const landmarks = frame.landmarks;

  // 1. Check that the timestamp is a valid finite number
  if (
    typeof frame.timestamp !== "number" ||
    !Number.isFinite(frame.timestamp)
  ) {
    invalidTimestamps++;
    problems.push(`Frame ${i + 1}: invalid timestamp`);
  }

  // 2. Check whether a pose was detected
  if (!Array.isArray(landmarks) || landmarks.length === 0) {
    missingPoses++;
    problems.push(`Frame ${i + 1}: no pose detected`);
    continue;
  }

  // 3. Check that the pose has exactly 33 landmarks
  if (landmarks.length !== 33) {
    incorrectLandmarkCounts++;
    problems.push(
      `Frame ${i + 1}: expected 33 landmarks, found ${landmarks.length}`
    );
  }

  // 4. Check that each landmark has finite x, y, z coordinates
  for (let j = 0; j < landmarks.length; j++) {
    const point = landmarks[j];

    const validCoordinates = ["x", "y", "z"].every(
      (axis) =>
        typeof point[axis] === "number" &&
        Number.isFinite(point[axis])
    );

    if (!validCoordinates) {
      invalidCoordinates++;
      problems.push(
        `Frame ${i + 1}, landmark ${j}: invalid x/y/z coordinates`
      );
    }
  }
}

// Print summary
console.log("========== VALIDATION SUMMARY ==========");
console.log("Total frames:", frames.length);
console.log("Frames without a detected pose:", missingPoses);
console.log("Frames with incorrect landmark counts:", incorrectLandmarkCounts);
console.log("Landmarks with invalid coordinates:", invalidCoordinates);
console.log("Frames with invalid timestamps:", invalidTimestamps);

if (problems.length > 0) {
  console.log("\n========== ISSUES FOUND ==========");
  problems.forEach((problem) => console.log("-", problem));
} else {
  console.log("\nAll checks passed! No structural issues found.");
}