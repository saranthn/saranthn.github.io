'use strict';

var board;
var bow;


function startGame() {
  board = new drawComponent(70);
  bow = new drawBow();
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
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
    board.update();
}
