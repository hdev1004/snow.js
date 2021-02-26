/*!
// Snow.js - v0.0.3
// kurisubrooks.com
*/

// Amount of Snowflakes
var snowMax = 10;

// Snowflake Colours
//var snowColor = ["#DDD", "#EEE"];
var snowColor = ["#FFF"];

// Snow Entity
var snowEntity = "&#x2022;";
//var snowEntity = "&#11801";

// Falling Velocity
var snowSpeed = 0.7;

// Minimum Flake Size
var snowMinSize = 8;

// Maximum Flake Size
var snowMaxSize = 24;

var soleLength = 32;

// Refresh Rate (in milliseconds)
var snowRefresh = 20; //20

// Additional Styles
var snowStyles = "cursor: default; -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; -o-user-select: none; user-select: none;";

var plusWidth = 3000;

var snowDrowHeight = 30; //눈 떨어지는 위치 조정
var bodyWidth;
var currentSnowOpacity = [];
var currentSnowFlag = [];
var minusMargin = 1500;
/*
// End of Configuration
// ----------------------------------------
// Do not modify the code below this line
*/

var snow = [], sole = [];
var snowStack = [], tempSnowStack = [[]];

var pos = [],
	coords = [],
	lefr = [],
	marginBottom,
	marginRight;


function randomise(min, max) {
	rand = Math.floor((Math.random() * (max - min)) + min);
	return rand;
}

function initSnow() {
	var snowSize = snowMaxSize - snowMinSize;
	marginBottom = document.body.clientHeight - snowDrowHeight;
	marginRight = document.body.clientWidth + plusWidth;
	bodyWidth = document.body.clientWidth;
	for (i = 0; i <= soleLength; i++) {
		sole[i] = document.getElementById("sole" + i);
	}

	for (i = 0; i <= snowMax; i++) {
		//발바닥


		currentSnowFlag[i] = false;
		currentSnowOpacity[i] = null;
		coords[i] = 0;
		lefr[i] = Math.random() * 15; //왼쪽 오른쪽 간격
		pos[i] = 0.03 + Math.random() / 10; //흔들림 속도
		snow[i] = document.getElementById("flake" + i);

		snow[i].style.fontFamily = "inherit";
		snow[i].size = randomise(1, snowSize) + snowMinSize;
		snow[i].style.fontSize = snow[i].size + 5 + "px";
		snow[i].style.color = snowColor[randomise(0, snowColor.length)];
		snow[i].style.zIndex = snow[i].size;
		snow[i].sink = snowSpeed * snow[i].size / 5;
		snow[i].posX = randomise(marginLeft, marginRight - snow[i].size);
		snow[i].posY = randomise(0, 2 * marginBottom - marginBottom - 2 * snow[i].size);
		snow[i].style.left = snow[i].posX + "px";
		snow[i].style.top = snow[i].posY + "px";
		snow[i].style.textShadow = "0px 0px 10px " + snow[i].style.color;

		snowStack[i] = document.getElementById("stack" + i);
		snowStack[i].style.fontFamily = "inherit";
		snowStack[i].size = snow[i].size;
		snowStack[i].style.fontSize = snow[i].size + 5 + "px";
		snowStack[i].style.color = snow[i].style.color;
		snowStack[i].style.zIndex = snow[i].size;
		snowStack[i].sink = snowSpeed * snow[i].size / 5;
		snowStack[i].style.left = "-100px";
		snowStack[i].style.top = "-100px";
		snowStack[i].style.textShadow = "0px 0px 10px " + snow[i].style.color;
	}

	moveSnow();
}

function resize() {
	marginBottom = document.body.clientHeight - snowDrowHeight;
	marginRight = document.body.clientWidth + plusWidth;
	bodyWidth = document.body.clientWidth;
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


			var snowLeftPx = (snow[i].style.left).split("px")[0];

			if (snowLeftPx - marginLeft < 0 && currentDirection) {
				console.log("Refresh 1");
				snow[i].posX = bodyWidth + marginLeft - 1;
				snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
				snow[i].style.top = snow[i].posY + "px";

				snow[i].style.color = "#FFF";
				//console.log(i + ", " + snowLeftPx + ", " + (bodyWidth + marginLeft) + " : Refresh 1");
			} else if (snowLeftPx - marginLeft > bodyWidth && !currentDirection) {
				console.log("Refresh 2");
				snow[i].posX = marginLeft;
				snow[i].style.left = snow[i].posX + lefr[i] * Math.sin(coords[i]) + "px";
				snow[i].style.top = snow[i].posY + "px";

				snow[i].style.color = "#FFF";
				//console.log(i + ", " + snowLeftPx +  " : Refresh 2");
			}

			//marginBottom - 2 * snow[i].size
			if (snow[i].posY >= marginBottom - ((2 * snow[i].size) - (snow[i].size / 2))) {
				//console.log(snow[i].size + ", "  + ( marginBottom - (2 * snow[i].size)));
				//바닥에 닿았을 때
				snowStack[i].style.left = snow[i].style.left;
				snowStack[i].style.top = snow[i].style.top;
				setSnowOpacity(snowStack[i], i);

				snow[i].posX = randomise(marginLeft, marginRight - snow[i].size);
				snow[i].posY = 0;
			}

		}
	}, snowRefresh);

}

for (i = 0; i <= snowMax; i++) {
	document.write("<span id='flake" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");
	document.write("<span id='stack" + i + "' style='" + snowStyles + "position:absolute;top:-" + snowMaxSize + "'>" + snowEntity + "</span>");

}

for (i = 0; i <= soleLength; i++) {
	document.write("<img id='sole" + i + "' style='z-Index:4; transform:scale(0.3);" + snowStyles + "position:absolute;top:-" + snowMaxSize + "' src='Img/foxSole.png' ></img>");
}

window.addEventListener('resize', resize);
window.addEventListener('load', initSnow);
