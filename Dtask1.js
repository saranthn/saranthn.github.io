'use strict';

var board;
var bow;
var arrow;
var noarrows = 0;
var prevnoarrows = 0;


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
        this.canvas.height = 600;
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
        this.x = 70;
        noarrows++;
      }

  }
  this.crashWith = function(otherobj) {
        var arrowRight = this.x + 50;
        var arrowHeight = this.y + 50;
        var boardCenter = otherobj.cenheight;
        var crash = false;
        if ((arrowRight<1150)&&(arrowRight>1050)&&(arrowHeight<boardCenter+50)&&(arrowHeight>boardCenter-50)) {
           crash = true;
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
  this.update = function () {
    var ctx = myGameArea.context;
    ctx.beginPath();
    ctx.arc(1100,this.cenheight,60,0,2*Math.PI);
    ctx.fillStyle = "#00A2FF";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(1100,this.cenheight,50,0,2*Math.PI);
    ctx.fillStyle = "#E5C900";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(1100,this.cenheight,40,0,2*Math.PI);
    ctx.fillStyle = "#FF6800";
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(1100,this.cenheight,30,0,2*Math.PI);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.stroke();

  }


}


function updateGameArea() {

    board.cenheight+=2;
    if(board.cenheight==600)
    board.cenheight = 0;
    arrow.speedY = 0;
    bow.speedY = 0;
    if (myGameArea.key && myGameArea.key == 38) {
      bow.speedY = -1;
      arrow.speedY = -1;
   }
    if (myGameArea.key && myGameArea.key == 40) {
      bow.speedY = 1;
      arrow.speedY = 1;
   }
    if (myGameArea.key && myGameArea.key == 32) {
      arrow.speedX = 10;
   }
   if(noarrows!=prevnoarrows){
     arrow.speedX = 0;
     prevnoarrows++;
   }

   if(arrow.crashWith(board)){
     myGameArea.stop();
   }
   else{
          myGameArea.clear();
          board.update();
          arrow.newPos();
          bow.newPos();
          bow.update();
          arrow.update();
   }

}
