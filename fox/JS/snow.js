/*!
// Snow.js - v0.0.3
// kurisubrooks.com
*/

// Amount of Snowflakes
var snowMax = 300;

// Snowflake Colours
//var snowColor = ["#DDD", "#EEE"];
var snowColor = ["#FFF", "#000"];

// Snow Entity
var snowEntity = "&#x2022;";
//var snowEntity = "&#11801";

// Falling Velocity
var snowSpeed = 0.7;

// Minimum Flake Size
var snowMinSize = 8;

// Maximum Flake Size
var snowMaxSize = 24;

// Refresh Rate (in milliseconds)
var snowRefresh = 20; //20

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

var plusWidth = 6000;

var currentSnowOpacity = [];
var currentSnowFlag = [];
var minusMargin = 1500;
/*
// End of Configuration
// ----------------------------------------
// Do not modify the code below this line
*/

var snow = [], tempSnow = [[]];
var snowStack = [], tempSnowStack = [[]];

var	pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;


function randomise(range) {
	rand = Math.floor(range * Math.random());
	return rand;
}

function initSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth + plusWidth;

	for (i = 0; i <= snowMax; i++) {
		currentSnowFlag[i] = false;
		currentSnowOpacity[i] = null;
		coords[i] = 0;
		lefr[i] = Math.random() * 15; //왼쪽 오른쪽 간격
		pos[i] = 0.03 + Math.random() / 10; //흔들림 속도
		snow[i] = document.getElementById("flake" + i);

		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + "px";
		snow[i].style.color = snowColor[randomise(snowColor.length)];
		snow[i].style.zIndex = snow[i].size;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginRight - snow[i].size);
		snow[i].posY = randomise(2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px"; 
		snow[i].style.textShadow = "0px 0px 10px " + snow[i].style.color;

		snowStack[i] = document.getElementById("stack" + i);
		snowStack[i].style.fontFamily = "inherit";
		snowStack[i].size = randomise(snowSize) + snowMinSize;
		snowStack[i].style.fontSize = snow[i].size + "px";
		snowStack[i].style.color = snow[i].style.color;
		snowStack[i].style.zIndex = snow[i].size;
		snowStack[i].sink = snowSpeed * snow[i].size / 5;
		snowStack[i].style.left = "-100px";
		snowStack[i].style.top = "-100px";
		snowStack[i].style.textShadow = "0px 0px 10px " + snow[i].style.color;
	}
	

	console.log(tempSnow.length)
	moveSnow();
}

function resize() {
	marginBottom = document.body.scrollHeight - 5;
	marginRight = document.body.clientWidth + plusWidth;
	console.log(marginRight);
}

function setSnowOpacity(getSnow, idx) {
	getSnow.style.opacity = 1;
	$(getSnow).animate({
		opacity: '0'
	}, 1000);
}


function moveSnow() {

	inter = setInterval(() => {
		for (i = 0; i <= snowMax; i++) {
			coords[i] += pos[i];
			snow[i].posY += snow[i].sink;
			snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
			snow[i].style.top = snow[i].posY + "px";
			//marginBottom - 2 * snow[i].size
			if (snow[i].posY >= marginBottom - ((2 * snow[i].size) - (snow[i].size / 2)) || parseInt(snow[i].style.left) > (marginRight - 3 * lefr[i])) {
				//console.log(snow[i].size + ", "  + ( marginBottom - (2 * snow[i].size)));
				//바닥에 닿았을 때
				snowStack[i].style.left = snow[i].style.left;
				snowStack[i].style.top = snow[i].style.top;
				setSnowOpacity(snowStack[i], i);
	
				snow[i].posX = randomise(marginRight - snow[i].size);
				snow[i].posY = 0;
			}
		}
	}, snowRefresh);

}

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
	document.write("<span id='stack" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
}

window.addEventListener('resize', resize);
window.addEventListener('load', initSnow);
