let detectionStarted = false;

function startDetection() {

    detectionStarted = false;

    let count = 5;

    const timer = setInterval(() => {

        document.getElementById("countdown").innerHTML =
        `Get Ready... ${count}`;

        count--;

        if (count < 0) {

            clearInterval(timer);

            document.getElementById("countdown").innerHTML =
            "Detecting Pose...";

            detectionStarted = true;
        }

    }, 1000);
}
const videoElement =
document.getElementById("video");

const canvasElement =
document.getElementById("output");

const canvasCtx =
canvasElement.getContext("2d");


function calculateAngle(a,b,c)
{
    let radians =

        Math.atan2(
            c.y - b.y,
            c.x - b.x
        )

        -

        Math.atan2(
            a.y - b.y,
            a.x - b.x
        );

    let angle =

        Math.abs(
            radians * 180 / Math.PI
        );

    if(angle > 180)
        angle = 360 - angle;

    return angle;
}

const pose = new Pose({

    locateFile: (file) => {

        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;

    }

});

pose.setOptions({

    modelComplexity: 1,

    smoothLandmarks: true,

    minDetectionConfidence: 0.5,

    minTrackingConfidence: 0.5

});
const poses = {

warrior: {

leftArm:180,
rightArm:180,

leftLeg:90,
rightLeg:180

},

tree: {

leftArm:170,
rightArm:170,

leftLeg:45,
rightLeg:180

},

cobra: {

leftArm:140,
rightArm:140,

leftLeg:175,
rightLeg:175

}

};
function getAccuracy(actual,expected)
{
    let difference =

    Math.abs(
        actual-expected
    );

    let accuracy =

    100 -

    (
        difference/180
    )*100;

    return Math.max(
        0,
        accuracy
    );
}
let prevLeftArm = 180;
let prevRightArm = 180;
let prevLeftLeg = 180;
let prevRightLeg = 180;

function smooth(current, previous) {
    return previous * 0.8 + current * 0.2;
}

pose.onResults((results) => {

    canvasCtx.save();

    canvasCtx.clearRect(
        0,
        0,
        canvasElement.width,
        canvasElement.height
    );

    canvasCtx.drawImage(
        results.image,
        0,
        0,
        canvasElement.width,
        canvasElement.height
    );

   if(results.poseLandmarks)
{
    if(!detectionStarted)
    {
        document.getElementById("feedback").innerHTML =
        "Select pose and click Start Pose";

        canvasCtx.restore();
        return;
    }

    drawConnectors(
        canvasCtx,
        results.poseLandmarks,
        POSE_CONNECTIONS,
        {
            lineWidth: 4
        }
    );

    drawLandmarks(
        canvasCtx,
        results.poseLandmarks,
        {
            radius: 5
        }
    );

    const landmarks =
    results.poseLandmarks;

    if (
    landmarks[11].visibility < 0.3 ||
    landmarks[12].visibility < 0.3 ||
    landmarks[23].visibility < 0.3 ||
    landmarks[24].visibility < 0.3
)
    {
        document.getElementById("overall").innerHTML =
        "Pose not detected properly";

        document.getElementById("feedback").innerHTML =
        "Move back so your full body is visible";

        canvasCtx.restore();
        return;
    }

        // LEFT ARM

const leftShoulder = landmarks[11];
const leftElbow = landmarks[13];
const leftWrist = landmarks[15];

// RIGHT ARM

const rightShoulder = landmarks[12];
const rightElbow = landmarks[14];
const rightWrist = landmarks[16];

// LEFT LEG

const leftHip = landmarks[23];
const leftKnee = landmarks[25];
const leftAnkle = landmarks[27];

// RIGHT LEG

const rightHip = landmarks[24];
const rightKnee = landmarks[26];
const rightAnkle = landmarks[28];

let leftArmAngle = calculateAngle(
leftShoulder,
leftElbow,
leftWrist
);

let rightArmAngle = calculateAngle(
rightShoulder,
rightElbow,
rightWrist
);

let leftLegAngle = calculateAngle(
leftHip,
leftKnee,
leftAnkle
);

let rightLegAngle = calculateAngle(
rightHip,
rightKnee,
rightAnkle
);
console.log(
    "LA:", leftArmAngle.toFixed(1),
    "RA:", rightArmAngle.toFixed(1),
    "LL:", leftLegAngle.toFixed(1),
    "RL:", rightLegAngle.toFixed(1)
);

leftArmAngle = smooth(leftArmAngle, prevLeftArm);
rightArmAngle = smooth(rightArmAngle, prevRightArm);
leftLegAngle = smooth(leftLegAngle, prevLeftLeg);
rightLegAngle = smooth(rightLegAngle, prevRightLeg);

prevLeftArm = leftArmAngle;
prevRightArm = rightArmAngle;
prevLeftLeg = leftLegAngle;
prevRightLeg = rightLegAngle;        
const selectedPose =

document.getElementById(
"poseSelect"
).value;
const reference =

poses[selectedPose];

        
     const leftArmAccuracy =
getAccuracy(
    leftArmAngle,
    reference.leftArm
);

const rightArmAccuracy =
getAccuracy(
    rightArmAngle,
    reference.rightArm
);

const leftLegAccuracy =
getAccuracy(
    leftLegAngle,
    reference.leftLeg
);

const rightLegAccuracy =
getAccuracy(
    rightLegAngle,
    reference.rightLeg
);
const overallAccuracy =

(
    leftArmAccuracy +
    rightArmAccuracy +
    leftLegAccuracy +
    rightLegAccuracy
)

/

4;
document.getElementById(
    "overall"
).innerHTML =

`Overall Accuracy:
${overallAccuracy.toFixed(0)}%`;

document.getElementById(
    "leftArm"
).innerHTML =

`Left Arm:
${leftArmAccuracy.toFixed(0)}%`;

document.getElementById(
    "rightArm"
).innerHTML =

`Right Arm:
${rightArmAccuracy.toFixed(0)}%`;

document.getElementById(
    "leftLeg"
).innerHTML =

`Left Leg:
${leftLegAccuracy.toFixed(0)}%`;

document.getElementById(
    "rightLeg"
).innerHTML =

`Right Leg:
${rightLegAccuracy.toFixed(0)}%`;

let feedback = [];

if(selectedPose === "warrior")
{
    if(leftArmAngle < 170)
        feedback.push("Straighten left arm");

    if(rightArmAngle < 170)
        feedback.push("Straighten right arm");

    if(leftLegAngle > 110)
        feedback.push("Bend left knee more");

    if(rightLegAngle < 160)
        feedback.push("Straighten right leg");

    document.getElementById("feedback").innerHTML =
    feedback.length ?
    feedback.join("<br>")
    :
    "Perfect Warrior Pose!";
}

else if(selectedPose === "tree")
{
    if(leftArmAngle < 160)
        feedback.push("Raise left arm");

    if(rightArmAngle < 160)
        feedback.push("Raise right arm");

    if(leftLegAngle > 70)
        feedback.push("Lift your left foot higher");

    document.getElementById("feedback").innerHTML =
    feedback.length ?
    feedback.join("<br>")
    :
    "Perfect Tree Pose!";
}

else if(selectedPose === "cobra")
{
    if(leftArmAngle < 140)
        feedback.push("Straighten left arm");

    if(rightArmAngle < 140)
        feedback.push("Straighten right arm");

    document.getElementById("feedback").innerHTML =
    feedback.length ?
    feedback.join("<br>")
    :
    "Perfect Cobra Pose!";
}

    canvasCtx.restore();
}

});

const camera =
new Camera(
    videoElement,
    {

        onFrame: async () => {

            await pose.send({

                image: videoElement

            });

        },

        width: 640,

        height: 480

    }
);

camera.start();