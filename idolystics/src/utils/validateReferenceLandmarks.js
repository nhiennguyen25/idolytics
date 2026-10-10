
import fs from "node:fs";

const originalPath = "./src/data/referenceLandmarks.json";
const mirroredPath = "./src/data/referenceLandmarksMirrored.json";

const originalData = JSON.parse(
  fs.readFileSync(originalPath, "utf8")
);

const mirroredData = JSON.parse(
  fs.readFileSync(mirroredPath, "utf8")
);

const originalFrames = originalData.frames;
const mirroredFrames = mirroredData.frames;

let missingPoses = 0;
let incorrectLandmarkCounts = 0;
let invalidCoordinates = 0;
let invalidTimestamps = 0;
let incorrectMirroring = 0;
let mismatchedFrames = 0;

const problems = [];
const EPSILON = 1e-10;

console.log("Starting reference landmark validation...\n");

// 1. Check that both files contain the same number of frames.
if (originalFrames.length !== mirroredFrames.length) {
  mismatchedFrames++;
  problems.push(
    `Frame count mismatch: original has ${originalFrames.length}, ` +
    `mirrored has ${mirroredFrames.length}`
  );
}

// Compare corresponding frames.
const frameCount = Math.min(
  originalFrames.length,
  mirroredFrames.length
);

for (let i = 0; i < frameCount; i++) {
  const originalFrame = originalFrames[i];
  const mirroredFrame = mirroredFrames[i];

  const originalLandmarks = originalFrame.landmarks;
  const mirroredLandmarks = mirroredFrame.landmarks;

  // 2. Validate timestamps in both files.
  if (
    typeof originalFrame.timestamp !== "number" ||
    !Number.isFinite(originalFrame.timestamp) ||
    typeof mirroredFrame.timestamp !== "number" ||
    !Number.isFinite(mirroredFrame.timestamp)
  ) {
    invalidTimestamps++;
    problems.push(`Frame ${i + 1}: invalid timestamp`);
  } else if (
    Math.abs(originalFrame.timestamp - mirroredFrame.timestamp) > EPSILON
  ) {
    invalidTimestamps++;
    problems.push(`Frame ${i + 1}: timestamp changed during mirroring`);
  }

  // 3. Check for detected poses in both files.
  if (
    !Array.isArray(originalLandmarks) ||
    originalLandmarks.length === 0 ||
    !Array.isArray(mirroredLandmarks) ||
    mirroredLandmarks.length === 0
  ) {
    missingPoses++;
    problems.push(`Frame ${i + 1}: pose missing in one or both files`);
    continue;
  }

  // 4. Check that both poses have exactly 33 landmarks.
  if (
    originalLandmarks.length !== 33 ||
    mirroredLandmarks.length !== 33
  ) {
    incorrectLandmarkCounts++;
    problems.push(`Frame ${i + 1}: expected 33 landmarks in both files`);
  }

  if (originalLandmarks.length !== mirroredLandmarks.length) {
    mismatchedFrames++;
    problems.push(`Frame ${i + 1}: landmark counts differ between files`);
    continue;
  }

  // 5. Validate coordinates and verify the mirroring transformation.
  for (let j = 0; j < originalLandmarks.length; j++) {
    const original = originalLandmarks[j];
    const mirrored = mirroredLandmarks[j];

    const validOriginal = ["x", "y", "z"].every(
      (axis) =>
        typeof original[axis] === "number" &&
        Number.isFinite(original[axis])
    );

    const validMirrored = ["x", "y", "z"].every(
      (axis) =>
        typeof mirrored[axis] === "number" &&
        Number.isFinite(mirrored[axis])
    );

    if (!validOriginal || !validMirrored) {
      invalidCoordinates++;
      problems.push(
        `Frame ${i + 1}, landmark ${j}: invalid x/y/z coordinates`
      );
      continue;
    }

    // Mirroring should change x to 1 - x.
    // y and z should stay the same.
    const xCorrect =
      Math.abs(mirrored.x - (1 - original.x)) <= EPSILON;

    const yCorrect =
      Math.abs(mirrored.y - original.y) <= EPSILON;

    const zCorrect =
      Math.abs(mirrored.z - original.z) <= EPSILON;

    if (!xCorrect || !yCorrect || !zCorrect) {
      incorrectMirroring++;
      problems.push(
        `Frame ${i + 1}, landmark ${j}: mirroring mismatch`
      );
    }
  }
}

// 6. Print the summary.
console.log("========== VALIDATION SUMMARY ==========");
console.log("Original frames:", originalFrames.length);
console.log("Mirrored frames:", mirroredFrames.length);
console.log("Frames missing poses:", missingPoses);
console.log("Frames with incorrect landmark counts:", incorrectLandmarkCounts);
console.log("Landmarks with invalid coordinates:", invalidCoordinates);
console.log("Frames with invalid timestamps or changed timestamps:", invalidTimestamps);
console.log("Landmarks with incorrect mirroring:", incorrectMirroring);
console.log("Frame structure mismatches:", mismatchedFrames);

if (
  missingPoses +
  incorrectLandmarkCounts +
  invalidCoordinates +
  invalidTimestamps +
  incorrectMirroring +
  mismatchedFrames === 0
) {
  console.log("\nAll checks passed! Mirrored data matches the expected transformation.");
} else {
  console.log("\n========== ISSUES FOUND ==========");
  problems.forEach((problem) => console.log("-", problem));
}
