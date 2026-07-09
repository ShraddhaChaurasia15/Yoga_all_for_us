function calculateAngle(a, b, c) {

    const ab = {
        x: a.x - b.x,
        y: a.y - b.y
    };

    const cb = {
        x: c.x - b.x,
        y: c.y - b.y
    };

    let angle =
        Math.atan2(cb.y, cb.x) -
        Math.atan2(ab.y, ab.x);

    angle = Math.abs(angle * 180 / Math.PI);

    if (angle > 180)
        angle = 360 - angle;

    return Math.round(angle);

}
function getJointAngles(landmarks){

    return{

        leftElbow: calculateAngle(

            landmarks[11],

            landmarks[13],

            landmarks[15]

        ),

        rightElbow: calculateAngle(

            landmarks[12],

            landmarks[14],

            landmarks[16]

        ),

        leftShoulder: calculateAngle(

            landmarks[13],

            landmarks[11],

            landmarks[23]

        ),

        rightShoulder: calculateAngle(

            landmarks[14],

            landmarks[12],

            landmarks[24]

        ),

        leftHip: calculateAngle(

            landmarks[11],

            landmarks[23],

            landmarks[25]

        ),

        rightHip: calculateAngle(

            landmarks[12],

            landmarks[24],

            landmarks[26]

        ),

        leftKnee: calculateAngle(

            landmarks[23],

            landmarks[25],

            landmarks[27]

        ),

        rightKnee: calculateAngle(

            landmarks[24],

            landmarks[26],

            landmarks[28]

        )

    };

}
window.calculateAngle = calculateAngle;
window.getJointAngles = getJointAngles;