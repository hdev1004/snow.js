
var marginLeft = 3000;
var background_marginBottom, background_marginRight;
var backgroundHeight = 250;
var endPoint = 2000000;
var makeWidth;

function background_loaded() {
    background_resize();
    console.log("makeWidth : " + makeWidth);
    makeWidth = endPoint + ice_marginRight;

    background = document.getElementsByClassName("background")[0];
    background.style.zIndex = 2;
    background.style.background = "url('Img/mountain3_resize.png')";
    background.style.left = "300px";
    background.style.width = makeWidth + "px";
    background.style.height = 1024 + "px";
}
function background_resize() {
    background = document.getElementsByClassName("background")[0];
    console.log("Resizing_background");
    background_marginBottom = document.body.clientHeight - 130;
    background_marginRight = document.body.clientWidth;

    //ice.style.left = marginLeft + "px";
}

document.write("<div class='background' style='background-color: transparent; position:absolute;' ></div>");
window.addEventListener("resize", background_resize);
window.addEventListener("load", background_loaded);