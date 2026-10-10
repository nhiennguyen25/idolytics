// pairs of landmark indices to connect with a line
const CONNECTIONS = [
  [11, 12],                        // shoulders
  [11, 13], [13, 15],              // left arm
  [12, 14], [14, 16],              // right arm
  [11, 23], [12, 24], [23, 24],    // torso
  [23, 25], [25, 27],              // left leg
  [24, 26], [26, 28],              // right leg
];

// joints that get a dot
const JOINTS = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];

export function drawSkeleton(ctx, landmarks, width, height)
{
    //?
    ctx.clearRect(0, 0, width, height);
    //no references, go back
    if (!landmarks) 
        return;

    ctx.strokeStyle = "#00718F";
    ctx.lineWidth = 4;
    ctx.lineCap = "round";

    //go through each connection and draw a line
    for (const [a, b] of CONNECTIONS) {
        const p = landmarks[a];
        const q = landmarks[b];

        if (!p || !q) 
            continue;

        ctx.beginPath();
        ctx.moveTo(p.x * width, p.y * height);
        ctx.lineTo(q.x * width, q.y * height);
        ctx.stroke();
    }

    // joints
    ctx.fillStyle = "#85E5FF";
    //go through every joint found
    for (const i of JOINTS) {
        const p = landmarks[i];

        if (!p) 
            continue;
        
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, 6, 0, Math.PI * 2);
        ctx.fill();
  }

}