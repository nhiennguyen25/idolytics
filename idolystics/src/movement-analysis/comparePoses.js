//------ COMPARE POSES ------
import { calculateAngles } from "./jointAngles.js";
/* We will compare the instructor's pose with learner pose
and get the difference */

/* ---- MEDIA PIPE JOINT ARRAY INDEX ----
EXAMPLE:
const referencePose = [
  { x: 0.40, y: 0.25, z: 0.00 }, // Index 11: Left shoulder
  { x: 0.60, y: 0.25, z: 0.00 }, // Index 12: Right shoulder

  { x: 0.30, y: 0.40, z: 0.00 }, // Index 13: Left elbow
  { x: 0.70, y: 0.40, z: 0.00 }, // Index 14: Right elbow

  { x: 0.25, y: 0.55, z: 0.00 }, // Index 15: Left wrist
  { x: 0.75, y: 0.55, z: 0.00 }, // Index 16: Right wrist

  { x: 0.45, y: 0.50, z: 0.00 }, // Index 23: Left hip
  { x: 0.55, y: 0.50, z: 0.00 }, // Index 24: Right hip

  { x: 0.43, y: 0.70, z: 0.00 }, // Index 25: Left knee
  { x: 0.57, y: 0.70, z: 0.00 }, // Index 26: Right knee

  { x: 0.42, y: 0.90, z: 0.00 }, // Index 27: Left ankle
  { x: 0.58, y: 0.90, z: 0.00 }  // Index 28: Right ankle
];

*/

export function compareAngle(referencePose, learnerPose){
    //we will store the angle difference as an object (joint: angle difference, key: value)
    const diffList = {};

    //keep track of total angle difference and number of joint to get avg angle difference
    // use 'let' not 'const' because these values will change later
    let totalDifference = 0;
    let jointCount = 0;
    

    /* get row index (row index = each joint's xyz coordinates) of media pipe's landmark indexes to get 3 joints for
    calculateAngles to use to get the joint angles, *see media pipe landmark on top*
    */

    const joints = {
        leftElbow:     [11, 13, 15], // Shoulder, elbow, wrist
        rightElbow:    [12, 14, 16], // Shoulder, elbow, wrist

        leftShoulder:  [13, 11, 23], // Elbow, shoulder, hip
        rightShoulder: [14, 12, 24], // Elbow, shoulder, hip

        leftHip:       [11, 23, 25], // Shoulder, hip, knee
        rightHip:      [12, 24, 26], // Shoulder, hip, knee

        leftKnee:      [23, 25, 27], // Hip, knee, ankle
        rightKnee:     [24, 26, 28]  // Hip, knee, ankle
    };

    //use for loop to go throught joints and calculate each joint's angle
    for(const joint in joints){

        //ex joint = "leftElbow", so joints["leftElbow"] = [11, 13, 15]
        // [PointA, pointB, pointC] = [11, 13, 15], so pointA = 11 (shoulder), pointB = 13 (elbow), pointC = 15 wrist
        const[pointA, pointB, pointC] = joints[joint]

        //before we use calculateAngle, we make sure all points exist, if not we skip
        if (
            !referencePose[pointA] ||
            !referencePose[pointB] ||
            !referencePose[pointC] ||
            !learnerPose[pointA] ||
            !learnerPose[pointB] ||
            !learnerPose[pointC]
        ) {
            continue;
        }

        //we use calculateAngle function with input of the 3 joints from refrence pose, Point A, B and C
        //it will Calculate and return angle at pointB 
        const referenceAngle = calculateAngles(
            referencePose[pointA],
            referencePose[pointB],
            referencePose[pointC]
        );

        //do the same for learner's angle
        const learnerAngle = calculateAngles(
            learnerPose[pointA],
            learnerPose[pointB],
            learnerPose[pointC]
        );


        //skip joints with missing or invalid landmarks .isFinite() check if its a valid finite num, so ! check if its not finite
        if(
            referenceAngle === null ||
            learnerAngle === null ||
            referenceAngle === undefined ||
            learnerAngle === undefined ||
            !Number.isFinite(referenceAngle) ||
            !Number.isFinite(learnerAngle)
        ){
            continue
        }

        //find absolute difference between angle (we dont want negative diff)
        const difference = Math.abs(referenceAngle - learnerAngle);


        //add difference to diffList, and add up total difference and total joints (for calculating avg)
        //diffList will store corresponding jointIndex as key and difference as its values
        diffList[joint] = difference;
        totalDifference += difference;
        jointCount++;
    }

    //Handle case where no joints can be compared
    if(jointCount === 0){
        return {
            similarityScore: null,
            averageDifference: null,
            diffList: {}
        };
    }
    
    const averageDifference = totalDifference / jointCount;

    /*max angle diff is 180 so we do anglediff/180 to get the percentage of maximum possible angle difference
    ex: averageDiff = 36, 36/180 = 0.2, we do 1 - 0.2 = 0.8, this means 80% similarity between learner and instructor's
    we then do math.min to set upper limit of 100 and math.max to set lower limit of 0
    */
    const similarityScore = Math.max(0, Math.min(100, 100*(1-averageDifference/180)));

    return {
        //math.round = round to nearest whole number
        similarityScore: Math.round(similarityScore),
        averageDifference: averageDifference,
        diffList: diffList
    };

    /* ---- HOW TO ACCESS EACH RESULTS ----
    create a variable and set it equal to the function, ex: result = compareAngle(refrencePose, learnerPose)
    then to access similarity score for example we do, result.similarityScore
    but to access an object inside result diffList we do for ex: result.diffList.rightKnee
    */

}