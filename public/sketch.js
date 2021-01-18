/* base elements */
let video;
let poseNet;
let poses = [];
let width = 640;
let height = 480;

/* targets */
let targetRadius = 25;
let targetSize = targetRadius * 2;
let targetRadiusSquare = targetRadius ** 2;
let target = {
  x: width / 2,
  y: height / 3,
  part: 'rightWrist',
};

function setup() {
  createCanvas(width, height);
  video = createCapture(VIDEO);
  video.size(width, height);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function(results) {
    poses = results;
    onPose(poses);
  });
  // Hide the video element, and just show the canvas
  video.hide();
}

function onPose() {
  for (let pose of poses) {
    let part = pose.pose[target.part];
    if (part.confidence > 0.6) {
      let distanceSquare = calcDistanceSquare(part, target);
      if (distanceSquare <= targetRadiusSquare) {
        playSoundEffect();
        target.x = Math.random() * (width - targetRadius * 4) + targetRadius * 2;
        target.y = Math.random() * (height - targetRadius * 4) + targetRadius * 2;
      }
    }
  }
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  image(video, 0, 0, width, height);

  // the point to reach by body
  drawTargets();

  // We can call both functions to draw all keypoints and the skeletons
  drawKeypoints();
  drawSkeleton();
}

function drawTargets() {
  fill(77, 255, 77);
  noStroke();
  ellipse(target.x, target.y, targetSize, targetSize);
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score >= 0.6) {
        if (keypoint.part === 'leftWrist' || keypoint.part === 'rightWrist') {
          fill(255, 159, 0);
          noStroke();
          ellipse(keypoint.position.x, keypoint.position.y, 30, 30);
        }

        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(
        partA.position.x,
        partA.position.y,
        partB.position.x,
        partB.position.y,
      );
    }
  }
}
