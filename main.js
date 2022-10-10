state = "";
objects = [];

function preload(){
    song =  loadSound("siren.mp3");
}

function setup(){
    canvas = createCanvas(400, 390);
    canvas.center();
 
    video = createCapture(VIDEO);
    video.size(400,390);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status = detecting objects";

}
function draw(){
    image(video, 0, 0, 400, 390) ;

    if(state == true){
        for(i = 0; i<objects.length ; i++){
            if(objects[i].label == "person"){
               document.getElementById("status").innerHTML = "Status : Object Detected";
               document.getElementById("confirm").innerHTML = "Baby detected";
               stroke('red');
               noFill();
              rect(objects[i].x , objects[i].y, objects[i].width - 250, objects[i].height - 100);
               song.stop();
            }else{
                document.getElementById("status").innerHTML = "Status : Object Detected";
               document.getElementById("confirm").innerHTML = "Baby not detected";
               song.play();
            }
        }
        if(objects.length == 0){
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("confirm").innerHTML = "Baby not detected";
            song.play();
        }
    }
}

function modelLoaded(){
    console.log("ModelLoaded");
    state = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error , results){
    if(error){
        console.error(error);
        document.getElementById("status").innerHTML = "Some error has occured";
    }else{
        console.log(results);
        objects = results;
    }
}
