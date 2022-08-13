video = "";
status1 = "";
object = [];
function preload(){
    video = createVideo("video.mp4");
    video.hide();
}
function setup(){
    canvas = createCanvas(500,300)
    canvas.position();

}
function draw(){
    image(video, 0, 0, 500, 300);
    if(status1 != ""){
        objectDetector.detect(video ,gotResults);
        for(i = 0;i < object.length;i++){
            document.getElementById("btn-3").innerHTML = "Status: Object Detected!";
            document.getElementById("btn-2").innerHTML = "Number Of Object:" + object.length;

            fill("#FF0000");
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15,object[i].y + 15);
            nofill();
            stroke("#FF0000");
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modeloaded)
    document.getElementById("btn-3").innerHTML = "Status: Detecting Object"
}
function modeloaded(){
    console.log('Modeloaded!!!')
    status1 = true
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResults(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        object = results;
    }
}