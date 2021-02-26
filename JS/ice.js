
var marginLeft = 3000;
var ice_marginBottom, ice_marginRight;
var iceHeight = 250;
var makeWidth;

function ice_loaded() {
    ice_resize();
    makeWidth = endPoint + ice_marginRight;

    ice = document.getElementsByClassName("ice")[0];
    ice.style.filter = "drop-shadow(0px 0px 20px #DDD)";
    ice.style.zIndex = 3;
    ice.style.background = "url('Img/ice.png')";
    ice.style.left = marginLeft + "px";
    ice.style.top = (ice_marginBottom - iceHeight / 2 + 5) + "px";
    ice.style.width = makeWidth + "px";
    ice.style.height = iceHeight + "px";
    console.log("ice : " + marginLeft);
}
function ice_resize() {
    ice = document.getElementsByClassName("ice")[0];
    console.log("Resizing_ice");
    ice_marginBottom = document.body.clientHeight - 130;
    ice_marginRight = document.body.clientWidth;

    //ice.style.left = marginLeft + "px";
    ice.style.top = (ice_marginBottom - iceHeight / 2 + 5) + "px";
}

document.write("<div class='ice' style='background-color: transparent; position:absolute;'></div>");

window.addEventListener("resize", ice_resize);
window.addEventListener("load", ice_loaded);