//------ JOINT ANGLES ------

/* we will get joint points coordinate as inputs, an example is one point for shoulder, 
elbow, and wrist, and the angle between the two connected lines is angle between upper and lower arm
create a function will take in 3 inputs of coordinates(3 joints) to get the angles at point B, which is at the elbow,
then the angle, which is between upper arm and lower arm joints, will be returned 
 */



 export function calculateAngles(pointA, pointB, pointC) {
    
    //we will create 2 vectors lines between the 3 points to calculate the angles later down the code

    //create vector from joint to B to A (ex: elbow to shoulder)
    const BA = {

        //x and y is creating an object so it uses ':' not '='
        //so x is the key and the pointA.x - pointB.x is values (key: values, like dictionary in python)
        x: pointA.x - pointB.x,
        y: pointA.y - pointB.y
    };

    //create vector from joint B to C (ex: elbow to wrist)
    const BC = {
        x: pointC.x - pointB.x,
        y: pointC.y - pointB.y
    };

    //to get angle we use dot product formula where BA and BC are vectors: BA . BC = |BA||BC|cos(angle)
    // to start get dot product, formula BA . BC = (BAx * BCx) + (BAy * BCy)
    const dotProduct = (BA.x * BC.x) + (BA.y * BC.y);

    //then get |BA| and |BC|, formula is |BA| = sqrt((BAx)^2 + (BAy)^2)
    const magnitudeBA = Math.sqrt(BA.x**2 + BA.y**2);
    
    const magnitudeBC = Math.sqrt(BC.x**2 + BC.y**2);


    //from formula BA . BC = |BA||BC|cos(angle) --> angle = cos^-1[(BA . BC)/(|BA||BC|)]

    //first we will prevent division from 0 (error) if |BA| or |BC| = 0 by returning null
    // === check equality without automatically converting between types
    if (magnitudeBA === 0 || magnitudeBC === 0){
        return null;
    }


    //calculate angle using angle = cos^-1[(BA . BC)/(|BA||BC|)]
    const insideCosine = dotProduct / (magnitudeBA * magnitudeBC);

    //range of cos is -1 and 1, but floating points might be slightly out of range
    // so max gets the higher negative (-1) incase float is (-1.0000..2), and min get lesser number (1) incase float is (1.0000..2)
    const clampedCosine = Math.max(-1, Math.min(1, insideCosine));

    //calculate angle, acos = arccosine, and convert from radians to degrees by * 180/pi
    const angle = Math.acos(clampedCosine) * (180/Math.PI);

    return angle;

 }