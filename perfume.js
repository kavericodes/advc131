function back(){
    window.location() = "index.html";
}

img = "";
status = "";
object = [];

function preload(){
    img = loadImage("perfume.jpeg");
}

function setup(){
    canvas = createCanvas(650,415); 
    canvas.center();

    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status = Detecting Objects";
}

function modelLoaded(){
    console.log("Cocossd is Initialized!");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error,results){
    if (error){
        console.error(error);
    }

    if (results){
        console.log(results);
        object = results;
    }
}

function draw(){
    image(img,0,0,650,415);
    if(status != ""){
        for (i=0;i<object.length;i++){
            document.getElementById("status").innerHTML = "Status = Object Detected";
            fill("blue");
            percent = floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x+15, object[i].y+15);
            noFill();
            stroke("blue");
            rect(object[i].x,object[i].y,object[i].width, object[i].height);
        }
    }
}