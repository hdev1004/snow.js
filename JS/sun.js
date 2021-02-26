
var radius = 200;
var stageWidth = 0;
var stageHeight = 0;
var x, y;
var canvas, ctx;
var marginBottom, marginRight;

function sun_resize(getStageWidth, getStageHeight) 
{
    stageWidth = getStageWidth;

    stageHeight = getStageHeight;

    x = stageWidth - radius - 140;
    y = radius + 100;

    console.log("sun Resize : " + stageWidth + " x " + stageHeight);
};

function sun_draw() 
{
    ctx.fillStyle = '#ffb200';

    var circle = new Path2D();
    circle.arc(150, 70, 60, 0, 2 * Math.PI);

    ctx.fill(circle);
};

function sun_loaded() {
    canvas = document.getElementById("sun");
    ctx = canvas.getContext('2d');
    //sun_resize(document.body.clientWidth, document.body.clientHeight - 5);
    sun_draw();
}


window.addEventListener("load", sun_loaded);