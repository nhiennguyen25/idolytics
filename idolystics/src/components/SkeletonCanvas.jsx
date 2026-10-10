import { useEffect, useRef } from "react";
import { drawSkeleton } from "../utils/drawSkeleton";


const fake = Array.from({ length: 33 }, () => ({ x: 0.5, y: 0.5 }));
    fake[11] = { x: 0.4, y: 0.3 }; fake[12] = { x: 0.6, y: 0.3 };
    fake[13] = { x: 0.3, y: 0.45 }; fake[14] = { x: 0.7, y: 0.45 };
    fake[15] = { x: 0.25, y: 0.6 }; fake[16] = { x: 0.75, y: 0.6 };
    fake[23] = { x: 0.45, y: 0.6 }; fake[24] = { x: 0.55, y: 0.6 };
    fake[25] = { x: 0.45, y: 0.8 }; fake[26] = { x: 0.55, y: 0.8 };
    fake[27] = { x: 0.45, y: 0.95 }; fake[28] = { x: 0.55, y: 0.95 };

function SkeletonCanvas({landmarks, width, height})
{
    const canvasRef = useRef(null);
    useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    //will update landmarks with mediapipe
    //loop useref
    drawSkeleton(ctx, landmarks, width, height);
    }, [landmarks, width, height]);

    return(
       <canvas className="canvas-style"
      ref={canvasRef}
      width={width}
      height={height}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    />
    )
}

 
export function SkeletonTest(){


    return(
           <SkeletonCanvas landmarks={fake} width={670} height = {480}/>
    )
    
}