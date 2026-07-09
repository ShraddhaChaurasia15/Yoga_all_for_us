const video = document.getElementById("video");
const canvas = document.getElementById("outputCanvas");
const ctx = canvas.getContext("2d");

const accuracyText = document.getElementById("accuracy");
const feedback = document.getElementById("feedback");
const timer = document.getElementById("timer");

const pose = new Pose({

    locateFile: (file) => {

        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;

    }

});

pose.setOptions({

    modelComplexity:1,

    smoothLandmarks:true,

    enableSegmentation:false,

    minDetectionConfidence:0.6,

    minTrackingConfidence:0.6

});
const camera = new Camera(video, {

    onFrame: async () => {

        await pose.send({

            image: video

        });

    },

    width:1280,

    height:720

});
document
.getElementById("startBtn")
.addEventListener("click",()=>{

camera.start();

});
function resizeCanvas(){

canvas.width=video.videoWidth;

canvas.height=video.videoHeight;

}

video.onloadedmetadata=resizeCanvas;
pose.onResults(results=>{

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.drawImage(results.image,0,0,canvas.width,canvas.height);

if(results.poseLandmarks){

ctx.shadowColor = "#5FFFCB";
ctx.shadowBlur = 10;

drawConnectors(
    ctx,
    results.poseLandmarks,
    POSE_CONNECTIONS,
    {
        color:"#5FFFCB",
        lineWidth:4
    }
);
const angles =
getJointAngles(results.poseLandmarks);
updateJointCard(
"leftElbow",
angles.leftElbow
);

updateJointCard(
"rightElbow",
angles.rightElbow
);

updateJointCard(
"leftShoulder",
angles.leftShoulder
);

updateJointCard(
"rightShoulder",
angles.rightShoulder
);

updateJointCard(
"leftHip",
angles.leftHip
);

updateJointCard(
"rightHip",
angles.rightHip
);

updateJointCard(
"leftKnee",
angles.leftKnee
);

updateJointCard(
"rightKnee",
angles.rightKnee
);


ctx.shadowBlur = 0;




drawLandmarks(
    ctx,
    results.poseLandmarks,
    {
        color:"#ffffff",
        radius:2
    }
);

}
else{

feedback.innerHTML=
"Body not detected";

}

});
function updateJointCard(id,angle){

const element=document.getElementById(id);

element.innerHTML=angle+"°";

if(angle>160){

element.style.color="#1DB954";

}
else if(angle>120){

element.style.color="#ff9800";

}
else{

element.style.color="#ff3d3d";

}

}