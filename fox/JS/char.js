//스피드
var speed = 3.5; 

//기본셋팅
var py = 0, px = 0, keypress = {}, inputTrigger = false, stopTrigger = false; 
var endPoint = 20000, rightEndPointTemp = 0;

//동작 순서
var wakeAnimated = [0, 1, 2, 3, 4, 5, 4, 3], stopAnimated = [6];

var soldier = document.getElementsByClassName("soldier")[0];
//캐릭터 zindex
var charZIndex = 18;

var marginLeft = 3000;

px = marginLeft;
endPoint = endPoint +  marginLeft;

var snowLength = 0;
var leftPress = false, rightPress = false;

function loaded() {
    snowLength = snow.length;
    currentDirection = false;  //true 오른쪽, false 왼쪽
    soldier = document.getElementsByClassName("soldier")[0];

    soldier.style.zIndex = charZIndex;
    soldier.src = "Img/fox_cut.png";
    soldier.style.left = marginLeft + 10 + "px";
    soldier.style.filter = "drop-shadow(0px 0px 20px #DDD)";
    
    resize();
    AnimatedImg(stopAnimated);
    keyArrowInputCheck();
    
}

function keyArrowInputCheck() {
    setInterval(function(){ // 주기적으로 검사
        inputTrigger = false;

        if(keypress['38']) {py -= speed;} // up - w
		if(keypress['40']) {py += speed;} // down - s
		if(keypress['37']) {px -= speed; inputTrigger = true; LeftClick(px);} // left - a
		else if(keypress['39']) {px += speed; inputTrigger = true; RightClick(px);} // right - d
        
        if(!inputTrigger) { //놓음
            if(stopTrigger) {
                clearInterval(animatedInterval);
                AnimatedImg(stopAnimated);
                stopTrigger = false;
                
            }
        } else {
            if(!stopTrigger) {
                clearInterval(animatedInterval);
                AnimatedImg(wakeAnimated);
                stopTrigger = true;
            }
        }
	}, 10); // 매 0.01 초마다 실행


    
    window.onkeydown = function(e) {
        keypress[e.which.toString()] = true;
    };

    window.onkeyup = function(e) {
        keypress[e.which.toString()] = false;
    };
}


function AnimatedImg(wakeAnimated) {
    var height = 117;
    var index = 0;
    setSoldier();

    nowHeight = wakeAnimated[index] * height * -1;
    soldier.style.background = "url('Img/fox_cut.png') 0px " + nowHeight + "px";
    //이미지 움직이는 속도 조절
    animatedInterval = setInterval(function() {
        nowHeight = wakeAnimated[index] * height * -1;
        soldier.style.background = "url('Img/fox_cut.png') 0px " + nowHeight + "px";
        
        index += 1;
        index = index % wakeAnimated.length;
    }, 80);
}

function StopImg() {

}

function setSoldier() {
    //console.log(soldier);
    soldier.style.width = "302px";
    soldier.style.height = "117px";
}

function LeftClick(getPx) {
    //px = parseInt((soldier.style.left).split("px")[0]);
    //$(".soldier").animate({left: px}, 80);

    
    if(getPx <= 0) {px = 0; getPx = 0;}
    if(getPx >= (marginRight2 / 2) - 151 + marginLeft && getPx <= endPoint) {
        getPx = (marginRight2 / 2) - 151 + marginLeft;

        for(var idx = 0; idx < snowLength; idx ++) { //눈 이동 효과
            var snowStackPx =  parseFloat((snowStack[idx].style.left).split("px")[0]) + 4;
            snow[idx].posX += 4;
            snowStack[idx].style.left = snowStackPx + "px";
        }
    } else if(getPx >= endPoint) {
        rightEndPointTemp -= speed;
        getPx = rightEndPointTemp;
        console.log(getPx + ", " + px);
    }
    if(currentDirection) getPx += 150;

    soldier.style.left = getPx + "px";
    soldier.style.transform = "rotateY(30deg)";

   // console.log('left');
}
function RightClick(getPx) {

    //px = parseInt((soldier.style.left).split("px")[0]);
    //$(".soldier").animate({left: px}, 80);
    
    if(getPx <= -200 + marginLeft) {px = -190 + marginLeft; getPx = -190 + marginLeft;} //캐릭터가 왼쪽 끝에 있을때 회전
    if(getPx >= (marginRight2 / 2) - 151 + marginLeft && getPx <= endPoint) {  //캐릭터가 화면 중간에서 오른쪽으로 갈 때
        rightEndPointTemp = ((marginRight2 / 2) - 151 + marginLeft);
        getPx = (marginRight2 / 2) - 151 + marginLeft;

        for(var idx = 0; idx < snowLength; idx ++) { //눈 이동 효과
            var snowStackPx =  parseFloat((snowStack[idx].style.left).split("px")[0]) - 4;
            snow[idx].posX -= 4;
            snowStack[idx].style.left = snowStackPx + "px";
        }
    } else if(getPx >= endPoint) { //끝 지점 도달
        if(getPx >= endPoint + marginRight2 / 2) { //완전 끝에 도달
            getPx = rightEndPointTemp;
            px = endPoint + marginRight2 / 2 - 1;
        } else {  //끝 지점이나 완전 끝음 아님
            rightEndPointTemp += speed;
            getPx = rightEndPointTemp;
        }
    }

    if(!currentDirection) getPx -= 150; //방향키 변경시 캐릭터 이동

    console.log(getPx + ", " + px);
    soldier.style.left = getPx + "px";
    soldier.style.transform = "rotateY(180deg)";

   // console.log('right');
}
function UpClick() {
    console.log('up');
}
function DownClick() {
    console.log('down');
}

function resize() {
    marginBottom2 = document.body.scrollHeight - 130;
    marginRight2 = document.body.clientWidth;
    rightEndPointTemp = ((marginRight2 / 2) - 151);

    soldier.style.top = marginBottom2 + "px";
}

document.write("<div class='soldier' style='background-color: transparent; position:absolute;'></div>");

window.addEventListener('resize', resize);
window.addEventListener('load', loaded);