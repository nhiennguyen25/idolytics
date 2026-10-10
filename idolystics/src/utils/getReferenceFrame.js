/**
 * Finds the reference frame closest to the instructor video's
 * current playback time.
 *
 * @param {Array} frames - Reference frames from the JSON data.
 * @param {number} playbackTime - Video currentTime in seconds.
 * @returns {Object|null} The closest reference frame, or null.
 */
export function getReferenceFrame(frames, playbackTime) {
  // Handle missing or invalid input.
  if (
    !Array.isArray(frames) ||
    frames.length === 0 ||
    !Number.isFinite(playbackTime)
  ) {
    return null;
  }

  let closestFrame = null;
  let smallestDifference = Infinity;

  for (const frame of frames) {
    if (!Number.isFinite(frame.timestamp)) {
      continue;
    }

    const difference = Math.abs(frame.timestamp - playbackTime);

    if (difference < smallestDifference) {
      smallestDifference = difference;
      closestFrame = frame;
    }
  }

  return closestFrame;
}
