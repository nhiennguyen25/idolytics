import { useMemo } from "react";
import { compareAngle } from "./movement-analysis/comparePoses.js";
import FeedbackFlashing from "./FeedbackFlashing.jsx";

export default function PoseFeedback({
  referencePose,
  learnerPose,
  active = true
}) {
  const result = useMemo(() => {
    if (
      !Array.isArray(referencePose) ||
      referencePose.length === 0 ||
      !Array.isArray(learnerPose) ||
      learnerPose.length === 0
    ) {
      return null;
    }

    return compareAngle(referencePose, learnerPose);
  }, [referencePose, learnerPose]);

  return (
    <FeedbackFlashing
      score={result?.similarityScore ?? null}
      active={active}
      intervalMs={2000}
    />
  );
}