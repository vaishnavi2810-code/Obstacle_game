var gamePiece;
var obstacle;
var obstacles=[];
var score;

function startGame() {
    myGameArea.start();
    gamePiece = new component(60,60, "red", 20, 240);
    score=new component("60px","consolas","white",460,80,"text");
    obstacle = new component(20,400,"green",600,240);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameno=0;
        this.interval = setInterval(updateGameArea, 2);
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    }, 
    clear : function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function(){
        clearInterval(this.interval);
    }
}
function everyinterval(n){
    if((myGameArea.frameno/n)%1==0){
        return true;
    }
    return false;
}

function component(width, height, color, x, y,type) {
    this.type=type;
    this.gamearea = myGameArea;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if(this.type=="text"){
            ctx.font=this.width+" "+this.height;
            ctx.fillStyle=color;
            ctx.fillText(this.text,this.x,this.y);
        }
        else{
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;        
    }
    this.crashWith=function(otherobj){
        var myleft=this.x;
        var myright=this.x+ (this.width);
        var mytop=this.y;
        var mybottom=this.y+(this.height);
        var otherleft=otherobj.x;
        var otherright=otherobj.x+(otherobj.width);
        var othertop=otherobj.y;
        var otherbottom=otherobj.y+(otherobj.height);
        var crash=true;
        if((myright<otherleft)||(mybottom<othertop)||(myleft>otherright)||(mytop>otherbottom))
        {
            crash=false;
        }
        return crash;
        
}
}

function updateGameArea() {
    gamePiece.speedX = 0;
    gamePiece.speedY = 0;    
    if (myGameArea.key && myGameArea.key == 37) {gamePiece.speedX = -1; }
    if (myGameArea.key && myGameArea.key == 39) {gamePiece.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) {gamePiece.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) {gamePiece.speedY = 1; }
    var x,height,gap,minHeight,maxHeight,minGap,maGap;
    for(i=0;i<obstacles.length;i++){
    if(gamePiece.crashWith(obstacles[i])){
        myGameArea.stop();
    }
}
    myGameArea.clear();
    myGameArea.frameno+=1;
    if(myGameArea.framno==1||everyinterval(150)){
        x=myGameArea.canvas.width;
       minHeight=40;
       maxHeight=400;
       height=Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
       minGap=100;
       maxGap=400;
       gap=Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        obstacles.push(new component(20,height,"green",x,0));
        obstacles.push(new component(20,x-height-gap,"green",x,height+gap));

    }
    for(i=0;i<obstacles.length;i++){
        obstacles[i].x+=-1;
        obstacles[i].update();

    }
    score.text="SCORE: "+myGameArea.frameno;
    score.update();
    gamePiece.newPos();
    gamePiece.update();
    }