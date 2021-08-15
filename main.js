NoseX = 0;
NoseY = 0;
LW_X = 0;
RW_X = 0;
Difference = 0;
function preload(){}
function setup(){
    Canvas = createCanvas(700, 600);
    Canvas.position(720, 160);
    Video = createCapture(VIDEO);
    poseNet = ml5.poseNet(Video, modelLoaded);
    poseNet.on('pose', gotResults);
}
function modelLoaded(){
    console.log("Model Loaded!");
}
function draw(){
    R = random(255);
    G = random(255);
    B = random(255);
    background("crimson");
    square(NoseX, NoseY, Difference);
    fill(R, G, B);
    stroke(G, R, B);
}
function gotResults(results){
    if(results.length > 0){
        console.log(results);
        console.log("Nose X: " + NoseX + "Nose Y: " + NoseY);
        NoseX = results[0].pose.nose.x;
        NoseY = results[0].pose.nose.y;
        console.log("Left Wrist: " + LW_X + "Right Wrist: " + RW_X);
        LW_X = results[0].pose.leftWrist.x;
        RW_X = results[0].pose.rightWrist.x;
        Difference = floor(LW_X - RW_X);
        document.getElementById("Scapegoat").innerHTML = "Side of square is - " + Difference + ".px";
    }
}