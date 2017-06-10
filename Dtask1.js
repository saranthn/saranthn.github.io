'use strict';

var board;
var bow;


function startGame() {
  board = new drawComponent(70);
  bow = new drawBow(250);
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
    myGameArea.clear();
    board.cenheight+=2;
    if(board.cenheight==600)
    board.cenheight = 0;

    bow.speedY = 0;
    if (myGameArea.key && myGameArea.key == 38) {bow.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {bow.speedY = 1; }
    board.update();
    bow.newPos();
    bow.update();
}
