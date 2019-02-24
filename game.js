var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var click = null;
//site mech vars
//gay stright mechanics, drop the soap mechanics

var numurinal = 11;
var urinalimg = new Image(); 
urinalimg.src = 'resources/urinal.jpg';
var taken = new Image();
taken.src = 'resources/stickfig.png';
//resource vars

var playing = false;
var button = createButton(0,200,80,200); //main menu button
button.x = canvas.width/2 - button.width/2;
var turn = true;
var reset = createButton(694, 69, 80, 200);

var next =Math.floor(Math.random()*6+1);
//game vars


var bathroom = {
    times:[],
    urinals:[],
    draw:function(){
        for(let i=0; i<this.urinals.length; i++){
            this.urinals[i].draw();
        }

    }

}
//create urinals

for(let num = 0; num<numurinal; num++){
    bathroom.urinals.push(createUrinal((num*70+20), 200, num));
    bathroom.times.push(0);

}
function isGay(){
    var gay; //made this var wayy back, but i kinda dont wanna delete it lol
    for(let k=0;k<bathroom.urinals.length-1;k++){
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

function createUrinal(dx,dy, num){
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
                    //this.occupied=!this.occupied;\
                    if(!this.occupied){ //prevents passing turns by clicking on occupied urinal
                        turn = !turn;
                        passTurn();
                        bathroom.times[num] = next;   
                        next = Math.floor((Math.random() * 5) +2);
                    }
                    this.occupied = true;

                    click = null;
                }
            }
        }
        ctx.drawImage(urinalimg,236,0,408,750,dx,dy,68,125);
        ctx.font = "30px Trebuchet-MS";
        ctx.fillText(bathroom.times[num], dx+34-5, dy+200);
        if(this.occupied){
            ctx.drawImage(taken, dx, dy, 68,136);
        }

    }
}
}

function resetGame() {
    console.log('Resetting!');
    turn = true;
    for(let num = 0; num<numurinal; num++){
        bathroom.urinals[num] = createUrinal((num*70+20), 200, num);
        bathroom.times[num]=0;
    }
    playing = false;
}


canvas.addEventListener("click", function(event){
    console.log(event);
    click = event;
});

function passTurn(){
    console.log("turn passed!");
    console.log(bathroom.times.join(" "));
    console.log(bathroom.urinals.join);
    for(let x = 0; x<bathroom.urinals.length; x++){
        if(!bathroom.times[x]>0){
            bathroom.times[x]=0;
            bathroom.urinals[x].occupied = false;
            
        } else {
            bathroom.times[x]--;
            if(bathroom.times[x]==0)
                bathroom.urinals[x].occupied = false;
        }
    }
}


function endgame() {
    ctx.font = '20px Sans-Serif'
    ctx.fillText('hold up buddy, thats gay', 195,500);
    
    for(let u = 0; u<bathroom.urinals.length; u++){
        bathroom.urinals[u].clickable = false;
    }
    if(turn){
        ctx.fillText('Game over! P1 wins!', 195, 540);

    } else {
        ctx.fillText('Game over! P2 wins!', 195, 540);
    }
    reset.draw();
    if(click!=null)
        if(reset.intersects(click))
            resetGame();
    

    }

    function game() {
        bathroom.draw();
        ctx.textAlign = 'start';
        ctx.font = '15px Trebuchet-MS';
        ctx.fillText('The next person will stay for '+next+' rounds', 700, 500);
        ctx.font = '30px Trebuchet-MS';

        if(turn){
            ctx.fillText('p1 <- p2', 300, 20);
        } else {
            ctx.fillText('p1 -> p2', 300 ,20);
        }
        if(isGay()){
            endgame();
            
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