song="";
scoreLeftWrist=0;
leftWristX=""
leftWristY="";
rightWristX="";
rightWristY="";
function preload(){
    song=loadSound("Music2.mp3");
}
function setup(){
    canvas=createCanvas(500, 500);
    canvas.center();
video=createCapture(VIDEO);
video.hide();
poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log('PoseNet Is Initialized');
}

function draw(){
    image(video, 0, 0, 500, 500);
    fill("#FF0000");
    stroke("#FF0000");
    circle(rightWristX, rightWristY, 25);
    if(rightWristY > 0 && rightWristY <= 100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML="speed=1.5x";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){
        document.getElementById("speed").innerHTML="speed=2x";
        song.rate(2);
    }
    else if(rightWristY > 400 && rightWristY <= 500){
        document.getElementById("speed").innerHTML="speed=2.5x";
        song.rate(2.5)
    }
    else{
        document.getElementById("speed").innerHTML="speed=1x";
        song.rate(1);
    }
    if(scoreLeftWrist > 0.2 ){

  
    circle(leftWristX, leftWristY, 25);
    leftWristYInNumber=Number(leftWristY);
    leftWristYnodecimals=floor(leftWristYInNumber);
    volume=leftWristYnodecimals/500;
    document.getElementById("volume").innerHTML="Volume="+volume;
}
}
function play(){
    song.play();
    song.setVolume(volume);
    song.rate(1);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist=results[0].pose.keypoints[9].score;
        console.log("score left wrist="+scoreLeftWrist);
       
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        console.log("left wrist x =" +leftWristX +"left wrist y = " +leftWristY);
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        console.log("right wrist x =" +rightWristX +"right wrist y = " +rightWristY);
        

    }
}