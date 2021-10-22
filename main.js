song = "";
objects = [];
status = "";

function preload() {
    img = loadImage('dog_cat.jpg');
    song = loadSound("monster_mash.mp3");
}


function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (var i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";

            fill(255, 0, 0);
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 30, objects[i].y + 30);
            noFill();
            stroke(255, 0, 0);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if (objects[i].label == "person") {
                document.getElementById("number_of_objects").innerHTML = "Baby Found";
                console.log("stop");
                song.stop();
            } else {
                document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
                console.log("play");
                song.play();
            }
        }
        if (objects.length == 0) {
            document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
            console.log("play");
            song.play();



        }
    }
}