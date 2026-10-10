
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Find the project directory relative to this script.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Input and output files.
const inputPath = path.resolve(
  __dirname,
  "../data/referenceLandmarks.json"
);

const outputPath = path.resolve(
  __dirname,
  "../data/referenceLandmarksMirrored.json"
);

// Read the original reference data.
const referenceData = JSON.parse(
  fs.readFileSync(inputPath, "utf8")
);

// Mirror each landmark horizontally.
const mirroredData = {
  ...referenceData,
  frames: referenceData.frames.map((frame) => ({
    ...frame,
    landmarks: frame.landmarks.map((landmark) => ({
      ...landmark,
      x: 1 - landmark.x,
    })),
  })),
};

// Save the mirrored data as a separate file.
fs.writeFileSync(
  outputPath,
  JSON.stringify(mirroredData, null, 2),
  "utf8"
);

console.log("Mirrored reference data saved!");
console.log(`Frames processed: ${mirroredData.frames.length}`);
console.log(`Output: ${outputPath}`);