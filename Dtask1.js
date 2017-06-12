'use strict';

var board;
var bow;
var arrow;
var noarrows = 0;
var prevnoarrows = 0;
var points = 0;
var pausedGame = 0;


function startGame() {

  board = new drawComponent(70);
  bow = new drawBow(250);
  arrow = new drawArrow(60,250);
  myGameArea.start();

}


var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1350;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
          myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
    },
    pause : function () {
            if (!pausedGame) {
            clearInterval(this.interval);
            pausedGame= 1;
            }
            else if (pausedGame) {
              this.interval = setInterval(updateGameArea, 20);
            pausedGame = 0;
            }
    }
}

function drawArrow(x,y) {
  this.y = y;
  this.x = x;
  this.speedY = 0;
  this.speedX = 0;
  this.update = function () {
    var ctx = myGameArea.context;
    ctx.moveTo(this.x,this.y+50);
    ctx.lineTo(this.x+50,this.y+50);
    ctx.stroke();
  }
  this.newPos = function (){
      this.x += this.speedX;
     this.y += this.speedY;


      if(this.x == 1350){
        this.x = 60;
        noarrows++;
      }

  }


  this.crashWith = function(board) {
        var arrowRight = this.x + 50;
        var arrowHeight = this.y + 50;
        var boardCenter = board.cenheight;
        var crash = false;
        if(arrowRight == 1100){
          if (arrowHeight<board.cenheight+10&&arrowHeight>board.cenheight-10) {
             crash = true;
             points +=100;
          }
          else if (arrowHeight<board.cenheight+20&&arrowHeight>board.cenheight-20) {
             crash = true;
             points +=50;
          }
          else if (arrowHeight<board.cenheight+30&&arrowHeight>board.cenheight-30) {
             crash = true;
             points+=40;
          }
          else if (arrowHeight<board.cenheight+40&&arrowHeight>board.cenheight-40) {
             crash = true;
             points +=30;
          }
          else if (arrowHeight<board.cenheight+50&&arrowHeight>board.cenheight-50) {
             crash = true;
             points +=20;
          }
          else if (arrowHeight<board.cenheight+60&&arrowHeight>board.cenheight-60) {
             crash = true;
             points +=10;
          }
        }


        return crash;
    }

}

function drawBow(lineStart) {
  this.lineStart = lineStart;
  this.speedY = 0;
  this.update = function () {
    var ctx = myGameArea.context;
    ctx.moveTo(70,this.lineStart);
    ctx.lineTo(70,this.lineStart+100);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(20,this.lineStart+50,70,7*Math.PI/4,Math.PI/4);
    ctx.stroke();
    ctx.moveTo(60,this.lineStart+50);
    ctx.lineTo(110,this.lineStart+50);
    ctx.stroke();

  }
  this.newPos = function() {
      this.lineStart += this.speedY;
  }

}

function drawComponent(y) {
  this.cenheight = y;
  this.speedY = 5;
  this.update = function () {
    this.cenheight += this.speedY;
    if((this.cenheight+60) == myGameArea.canvas.height ||(this.cenheight-50)==0){
      this.speedY = -this.speedY;
    }
    drawCircle(this.cenheight,60,"#000000");
    drawCircle(this.cenheight,50,"#00A2FF");
    drawCircle(this.cenheight,40,"#E5C900");
    drawCircle(this.cenheight,30,"#FF6800");
    drawCircle(this.cenheight,20,"#FF0000");
    drawCircle(this.cenheight,10,"#B41010");

  }
}

function drawCircle(c,r,color) {
  var ctx = myGameArea.context;
  ctx.beginPath();
  ctx.arc(1100,c,r,0,2*Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.stroke();
}


function updateGameArea() {
  myGameArea.clear();
document.getElementById("score").innerText ="POINTS : "+points;
    arrow.speedY = 0;
    bow.speedY = 0;
    if (myGameArea.key && myGameArea.key == 38 ) {
      if(arrow.x == 60){
        bow.speedY = -7;
        arrow.speedY = -7;
      }
   }
    if (myGameArea.key && myGameArea.key == 40) {
      if(arrow.x == 60){
        bow.speedY = 7;
        arrow.speedY = 7;
      }
   }
    if (myGameArea.key && myGameArea.key == 32) {
      arrow.speedX = 15;
   }
   if(noarrows!=prevnoarrows){
     arrow.speedX = 0;
     prevnoarrows++;
   }

   if(arrow.crashWith(board)){
     arrow.x = 60;
   }
   else{

          board.update();
          arrow.newPos();
          bow.newPos();
          bow.update();
          arrow.update();
  }

}
