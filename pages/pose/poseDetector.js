// pose-detector.js
// Vanilla-JS port of the React PoseDetector component.
// Requires: @mediapipe/tasks-vision (loaded via CDN, see index.html)

import { angleAt, scoreAngles } from "./poseAngles.js";

// MediaPipe landmark indices we care about.
const L = {
  leftShoulder: 11,
  rightShoulder: 12,
  leftElbow: 13,
  rightElbow: 14,
  leftWrist: 15,
  rightWrist: 16,
  leftHip: 23,
  rightHip: 24,
  leftKnee: 25,
  rightKnee: 26,
  leftAnkle: 27,
  rightAnkle: 28,
};

// Skeleton pairs to draw
const CONNECTIONS = [
  [L.leftShoulder, L.rightShoulder],
  [L.leftShoulder, L.leftElbow], [L.leftElbow, L.leftWrist],
  [L.rightShoulder, L.rightElbow], [L.rightElbow, L.rightWrist],
  [L.leftShoulder, L.leftHip], [L.rightShoulder, L.rightHip],
  [L.leftHip, L.rightHip],
  [L.leftHip, L.leftKnee], [L.leftKnee, L.leftAnkle],
  [L.rightHip, L.rightKnee], [L.rightKnee, L.rightAnkle],
];

export class PoseDetector {
  /**
   * @param {Object} opts
   * @param {HTMLVideoElement} opts.videoEl
   * @param {HTMLCanvasElement} opts.canvasEl
   * @param {Object} opts.pose - { target: {...}, tolerance: number }
   * @param {(data: {accuracy:number, durationSeconds:number}) => void} opts.onSave
   * @param {Object} [opts.els] - optional DOM elements to auto-update:
   *    { statusEl, accuracyEl, feedbackEl, measuredEl, elapsedEl }
   */
 constructor({ videoEl, canvasEl, pose, els = {} }) {

    this.video = videoEl;
    this.canvas = canvasEl;
    this.pose = pose;
    this.els = els;

    this.landmarker = null;
    this.running = false;
    this.rafId = null;

    this.startedAt = 0;

    this.rolling = [];
    this.state = {

    status: "Ready",

    elapsed: 0,

    accuracy: 0,

    feedback: "Click Start Camera",

    measured: {}

};

}

  _setState(patch) {
    Object.assign(this.state, patch);
    const { statusEl, accuracyEl, feedbackEl, measuredEl, elapsedEl } = this.els;

    if (statusEl) {
      statusEl.textContent = `${this.state.status} · ${this.state.elapsed}s`;
    }
    if (elapsedEl) {

    const mins = Math.floor(this.state.elapsed / 60);
    const secs = this.state.elapsed % 60;

    elapsedEl.textContent =
        String(mins).padStart(2, "0") +
        ":" +
        String(secs).padStart(2, "0");

}

    if (accuracyEl) {
      accuracyEl.textContent = `${this.state.accuracy}%`;
      accuracyEl.classList.remove("score-high", "score-mid", "score-low");
      accuracyEl.classList.add(
        this.state.accuracy >= 85 ? "score-high" : this.state.accuracy >= 60 ? "score-mid" : "score-low"
      );
    }

    if (feedbackEl) feedbackEl.textContent = this.state.feedback;

  
  }

  async setup() {
    this._setState({ status: "Loading model…" });
    // Loaded from CDN as a global — see index.html <script type="module">
    const vision = await import(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/vision_bundle.mjs"
    );
    const resolver = await vision.FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.35/wasm"
    );
    const modelAssetPath =
      "https://storage.googleapis.com/mediapipe-models/pose_landmarker/pose_landmarker_lite/float16/1/pose_landmarker_lite.task";

    try {
      this.landmarker = await vision.PoseLandmarker.createFromOptions(resolver, {
        baseOptions: { modelAssetPath, delegate: "GPU" },
        runningMode: "VIDEO",
        numPoses: 1,
        minPoseDetectionConfidence: 0.5,
        minPosePresenceConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
    } catch (err) {
      console.warn("GPU delegate failed, falling back to CPU", err);
      this.landmarker = await vision.PoseLandmarker.createFromOptions(resolver, {
        baseOptions: { modelAssetPath, delegate: "CPU" },
        runningMode: "VIDEO",
        numPoses: 1,
      });
    }
  }

  async start() {
    try {
      if (!this.landmarker) await this.setup();
      this._setState({ status: "Requesting camera…" });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" },
      });
      const video = this.video;
      video.srcObject = stream;
      await video.play();

      if (video.readyState < 2) {
        await new Promise((resolve) => {
          const onReady = () => {
            video.removeEventListener("loadeddata", onReady);
            resolve();
          };
          video.addEventListener("loadeddata", onReady);
        });
      }

      this.startedAt = performance.now();
      this.rolling = [];
      this.running = true;
      this._setState({ status: "Live", feedback: "Move into frame — full body visible." });
      this._loop();
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      this._setState({ status: `Setup failed: ${msg}` });
      console.error("Pose detector start failed", e);
    }
  }

  stop() {
    cancelAnimationFrame(this.rafId);
    const video = this.video;
    if (video?.srcObject) {
      video.srcObject.getTracks().forEach((t) => t.stop());
      video.srcObject = null;
    }
    this.running = false;
  }

 

  _loop() {
    const video = this.video;
    const canvas = this.canvas;
    if (!video || !canvas || !this.landmarker) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;

    const now = performance.now();
    this._setState({ elapsed: Math.floor((now - this.startedAt) / 1000) });

    if (video.readyState < 2 || video.videoWidth === 0) {
      this.rafId = requestAnimationFrame(() => this._loop());
      return;
    }

    let result = null;
    try {
      result = this.landmarker.detectForVideo(video, now);
    } catch (err) {
      console.warn("detectForVideo error", err);
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    if (result && result.landmarks && result.landmarks[0]) {
      const lms = result.landmarks[0];
      const pt = (i) => ({ x: lms[i].x * canvas.width, y: lms[i].y * canvas.height });

      // Draw skeleton
      ctx.strokeStyle = "rgba(120, 180, 140, 0.9)";
      ctx.lineWidth = 4;
      for (const [a, b] of CONNECTIONS) {
        const pa = pt(a), pb = pt(b);
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(180, 100, 60, 0.95)";
      for (const idx of Object.values(L)) {
        const p = pt(idx);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Compute angles
      const m = {
        leftElbow: angleAt(pt(L.leftShoulder), pt(L.leftElbow), pt(L.leftWrist)),
        rightElbow: angleAt(pt(L.rightShoulder), pt(L.rightElbow), pt(L.rightWrist)),
        leftShoulder: angleAt(pt(L.leftElbow), pt(L.leftShoulder), pt(L.leftHip)),
        rightShoulder: angleAt(pt(L.rightElbow), pt(L.rightShoulder), pt(L.rightHip)),
        leftHip: angleAt(pt(L.leftShoulder), pt(L.leftHip), pt(L.leftKnee)),
        rightHip: angleAt(pt(L.rightShoulder), pt(L.rightHip), pt(L.rightKnee)),
        leftKnee: angleAt(pt(L.leftHip), pt(L.leftKnee), pt(L.leftAnkle)),
        rightKnee: angleAt(pt(L.rightHip), pt(L.rightKnee), pt(L.rightAnkle)),
      };
      const measured = Object.fromEntries(Object.entries(m).map(([k, v]) => [k, Math.round(v)]));

      const score = scoreAngles(m, this.pose.target, this.pose.tolerance);
      this.rolling.push(score);
      if (this.rolling.length > 240) this.rolling.shift();

      // Feedback: find worst joint
      const worst = Object.entries(this.pose.target)
        .map(([k, target]) => ({ k, diff: Math.abs(m[k] - target) }))
        .sort((a, b) => b.diff - a.diff)[0];

      let feedback = this.state.feedback;
      if (score >= 85) {
        feedback = "Beautiful — hold and breathe.";
      } else if (worst) {
        const name = worst.k.replace(/([A-Z])/g, " $1").toLowerCase();
        const target = this.pose.target[worst.k];
        const current = Math.round(m[worst.k]);
        feedback =
          current < target
            ? `Extend your ${name} more (${current}° → ${target}°).`
            : `Soften your ${name} slightly (${current}° → ${target}°).`;
      }

    // Update Joint Cards
if(window.updateJointCards){

    window.updateJointCards(measured);

}

// Update Accuracy
if(window.updateAccuracy){

    window.updateAccuracy(score);

}

this._setState({

    measured,

    accuracy: score,

    feedback

}); 
    } else if (this.running) {
      this._setState({ feedback: "No pose detected — step back so your full body is visible." });
    }

    ctx.restore();
  this.rafId = requestAnimationFrame(() => this._loop());
  }
}