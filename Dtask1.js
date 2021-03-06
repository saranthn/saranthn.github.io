'use strict';

var board;
var bow;
var arrow;
var obstacle;
var myBackground;
var noarrows = 0;
var prevnoarrows = 0;
var points = 0;
var pausedGame = 0;
var arrowsLeft = 10-noarrows;
var mySound;
var obsSound;
var myMusic;



function startGame() {

  myMusic = new sound1("Blastwave_FX_ArrowImpactWood_BW.54267.mp3");
  mySound = new sound("POL-cooking-mania-short.wav");
  obsSound = new sound1("industrial_hand_cart_bounce_down_single_concrete_step_with_boxes_on_002.mp3");
  mySound.play();
  obstacle = new drawObs(800,330);
  myBackground = new backgroundimage("http://orig07.deviantart.net/93af/f/2012/224/8/7/game_background_by_garbo_x-d5asm0x.png");
  board = new drawComponent(70);
  bow = new drawBow(250);
  arrow = new drawArrow(60,248);
  myGameArea.start();

}

function drawObs(x,y) {
  this.y = y;
  this.x = x;
  this.speedY = 0;
  this.speedX = 0;
  this.image = new Image();
  this.image.src = "https://vignette3.wikia.nocookie.net/mysingingmonsters/images/3/35/Air_Island_Medium_Rock.png/revision/latest?cb=20121204215537";
  this.update = function () {
    var ctx = myGameArea.context;
    ctx.drawImage(this.image,this.x,this.y,130,130);
  }
  this.newPos = function (){
      this.x += this.speedX;
     this.y += this.speedY;

}
}



function backgroundimage(source) {

  this.image = new Image();
  this.image.src = source;

   this.update = function () {
     var ctx = myGameArea.context;
     ctx.drawImage(this.image,0,0,1350,540);

   }

}

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.setAttribute("loop",true);
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function sound1(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");;
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function restart() {
  mySound.play();
  myMusic.play();
  points=0;
  noarrows =0 ;
  prevnoarrows =0 ;
  pausedGame = 0;
  arrowsLeft = 10;
  clearInterval(myGameArea.interval);
    myBackground = new backgroundimage("http://orig07.deviantart.net/93af/f/2012/224/8/7/game_background_by_garbo_x-d5asm0x.png");
    obstacle = new drawObs(800,330);
  board = new drawComponent(70);
  bow = new drawBow(250);
  arrow = new drawArrow(60,248);
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
           e.preventDefault();
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
            mySound.stop();
            clearInterval(this.interval);
            document.getElementById("pauseBut").innerText = "RESUME";
            pausedGame= 1;
            }
            else if (pausedGame) {
              mySound.play();
              this.interval = setInterval(updateGameArea, 20);
              document.getElementById("pauseBut").innerText = "PAUSE";
            pausedGame = 0;
            }
    }
}

function drawArrow(x,y) {
  this.y = y;
  this.x = x;
  this.speedY = 0;
  this.speedX = 0;
  this.image = new Image();
  this.image.src = "https://www.spreadshirt.co.uk/image-server/v1/designs/14056350,width=178,height=178/medieval-archery-arrow-broadhead-by-patjila.png";
  this.update = function () {
    var ctx = myGameArea.context;
    ctx.drawImage(this.image,this.x,this.y,130,130);
  }
  this.newPos = function (){
      this.x += this.speedX;
     this.y += this.speedY;
     //console.log(this.x);


      if(this.x == 1350){
        this.x = 60;
        noarrows++;
      }

  }


  this.crashWith = function(board) {
        var arrowRight =this.x + 130;
        var arrowHeight = this.y + 65;
        var boardCenter = board.cenheight;
        var crash = false;
        //console.log(arrowRight);
        //console.log(board.cenheight);
       if(arrowRight == 1105)
        {console.log("hello");
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

      this.hitWith = function(obstacle) {

            var arrowRight =this.x + 130;
            var arrowHeight = this.y + 65;
            var crash = false;
            console.log(arrowRight);
           if(arrowRight == 805)
            {console.log("hello");
              if (arrowHeight<obstacle.y+110&&arrowHeight>obstacle.y+10) {
                 crash = true;
              }
            }


            return crash;
        }



}

function drawBow(lineStart) {
  this.lineStart = lineStart;
  this.speedY = 0;
  this.image = new Image();
  this.image.src = "https://www.shareicon.net/download/2016/09/05/825222_miscellaneous_512x512.png";

   this.update = function () {
     var ctx = myGameArea.context;
     ctx.drawImage(this.image,70,this.lineStart,130,130);

   }

  this.newPos = function() {
      this.lineStart += this.speedY;
  }

}

function drawComponent(y) {
  this.cenheight = y;
  this.speedY = Math.random()*10;
  //console.log(this.speedY);
  this.update = function () {
    this.cenheight += this.speedY;
    if((this.cenheight+60) > myGameArea.canvas.height){
      this.speedY = -Math.random()*10;
    }
    else if(this.cenheight-60<0){
      this.speedY = Math.random()*10;
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
document.getElementById("score").innerText ="POINTS : "+points+" "+" ARROWS LEFT : "+arrowsLeft;
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
      if(arrow.x==60){
        arrowsLeft--;
      }
   }
   if(noarrows!=prevnoarrows){
     arrow.speedX = 0;
     prevnoarrows++;
   }

   if(arrowsLeft == -1 && arrow.x == 60){
     document.getElementById("score").innerText ="POINTS : "+points+" "+" GAME OVER";
     mySound.pause();
     myGameArea.stop();

   }

   if(arrow.crashWith(board)){
     myMusic.play();
     arrowsLeft+=2;
     arrow.speedX =0;
     arrow.x = 60;
     myGameArea.clear();
     myBackground.update();
     board.update();
     obstacle.newPos();
     obstacle.update();
     arrow.newPos();
     arrow.update();
     bow.newPos();
     bow.update();


   }
   else if (arrow.hitWith(obstacle)) {
     obsSound.play();
     arrow.speedX =0;
     arrow.x = 60;
     myGameArea.clear();
     myBackground.update();
     board.update();
     obstacle.newPos();
     obstacle.update();
     arrow.newPos();
     arrow.update();
     bow.newPos();
     bow.update();


   }
   else{

          myBackground.update();
          obstacle.newPos();
          obstacle.update();
          board.update();
          arrow.newPos();
          arrow.update();
          bow.newPos();
          bow.update();


  }

}
