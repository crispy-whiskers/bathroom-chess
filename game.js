var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var click = null;
//site mech vars


var urinalimg = new Image(); 
urinalimg.src = 'resources/urinal.jpg';
var taken = new Image();
taken.src = 'resources/stickfig.png';
//resource vars

var playing = false;
var button = createButton(0,200,80,200); //main menu button
button.x = canvas.width/2 - button.width/2;
var turn = true;
//game vars

var num;
var bathroom = {
    urinals:[],
    draw:function(){
        var i;
        for(i=0; i<this.urinals.length; i++){
            this.urinals[i].draw();
        }
    }
}

for(num = 0; num<12; num++){
    bathroom.urinals.push(createUrinal((num*70+20), 200));

}
function isGay(){
    var k;
    for(k=0;k<bathroom.urinals.length-1;k++){
        if(bathroom.urinals[k].occupied==true && bathroom.urinals[k+1].occupied==true)
            return true;
    }
    return false;
}

function createButton(x, y, height, width){
    return {
        height:height, 
        width:width, 
        x:x,
        y:y, 
        intersects:function(eventclick){
            return (eventclick.layerX > this.x && eventclick.layerX < this.x+this.width && eventclick.layerY < this.y+this.height && eventclick.layerY > this.y);
        },
        draw: function(){
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    };
}

function createUrinal(dx,dy){
    return {
        clickable: true,
        occupied:false,
        x:dx,
        y:dy,
        height: 125,
        width: 68,
        button:createButton(dx,dy,125,68),
        draw: function(){
            if(this.clickable){
                if(click!=null){
                    if(this.button.intersects(click)){
                    //this.occupied=!this.occupied;
                    this.occupied = true;
                    turn = !turn;
                    click = null;
                }
            }
        }
        ctx.drawImage(urinalimg,236,0,408,750,dx,dy,68,125);
        if(this.occupied){
            ctx.drawImage(taken, dx, dy, 68,136);
        }

    }
}
}



canvas.addEventListener("click", function(event){
    console.log(event);
    click = event;
});



function game() {
    bathroom.draw();
    ctx.textAlign = 'start';
    ctx.font = '30px Trebuchet-MS';
    if(turn){
        ctx.fillText('p1 <- p2', 20, 20);
    } else {
        ctx.fillText('p1 -> p2', 20 ,20);
    }
    if(isGay()){

        ctx.font = '20px Sans-Serif'
        ctx.fillText('hold up buddy, thats gay', 195,500);
        var u;
        for(u = 0; u<bathroom.urinals.length; u++){
            bathroom.urinals[u].clickable = false;
        }
        if(turn){
        ctx.fillText('Game over! P1 wins!', 195, 540);

    } else {
        ctx.fillText('Game over! P2 wins!', 195, 540);
    }
    }
}

function main_menu() {

    ctx.fillStyle = "#000000";
    ctx.font = "50px Impact";
    ctx.textAlign = "center";
    ctx.fillText("Bathroom Chess", 500,100);
    ctx.fillStyle = "#FF0000";

    if(click != null){
        if(button.intersects(click)) {
            playing = true;
            ctx.fillStyle = "#FFFFFF";
            click=null;
        }
    }

    button.draw();
    ctx.fillStyle = "#000000";
    ctx.fillText('PLAY', 500,button.y+60);

}


function process(){
    if(playing){
        game();
    } else {
        main_menu();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    process();


}

setInterval(draw, 10);