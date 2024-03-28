let img = "";
let objects = [];
let status = "";
let objectDetector;
audio = "audio.mp3";
let babyFound = false;

function preload() {
  img = loadImage('dog_cat.jpg');
  audio = loadSound('baby_crying.mp3');
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
}

function start() {
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function draw() {
  image(video, 0, 0, 380, 380);

  if (status !== "") {
    objectDetector.detect(video, gotResult);
    for (let i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Object Detected";
      document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
      if (objects[i].label === 'person') {
        babyFound = true;
      }
    }
    if (!babyFound) {
      audio.play();
      document.getElementById("status").innerHTML = "Status : Baby not found";
    } else {
      audio.stop();
      document.getElementById("status").innerHTML = "Status : Baby found";
    }
  }
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
  objectDetector.detect(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  objects = results;
}
