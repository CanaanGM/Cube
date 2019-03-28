$(document).ready(function() {
    const ourCanvus = $("#ourCanvus")[0] // array 0 is the initial view of the canvus
    const ctx = ourCanvus.getContext("2d") ; // will create/transform ourCanvus into 2D view
    const wed = $("#ourCanvus").width(); // the width of the canvus, taken from the canvus html tag
    const high = $("#ourCanvus").height();// the height of the canvus, height taken from the html tag 
    

    const playerBorder = 5;
    // the food's name
    var victim = {};
    // the player's name
    var predetor = {};
    // directions storage
    var directions = ' ';

    var counter = 0 ;

    // the player name goes here!!
    var playerName = prompt("Enter thy name") ;
    $("#player1").append("<source id='playerSrc'  type='audio/mpeg'  src='/sounds/boulders,boulderdash.mp3'>")
    var playerScore ;
    
    // high score array contains all the high scores up to a number we'll define latooor!
    var highScore = 48 ;

    // var justArray = [] ;

    
    
    var loop = setInterval( movement, 100);

    function movement(){
        if (directions == "RIGHT"){
            predetor.x = predetor.x + 1
        }else if (directions == "LEFT"){
            predetor.x = predetor.x - 1
        }else if (directions == "UP"){
            predetor.y  =  predetor.y - 1
        }else if( directions == "DOWN"){
            predetor.y =  predetor.y + 1
        }
        
        edgeOfMap();
        paintBlank();
        victimaizble();
        shapes(predetor.x , predetor.y , "#830303");
        shapes(victim.x , victim.y , '#00ff00');

        
    }

// spawn the victim 
function spawnVictim (){
    victim = {
        x : Math.floor(Math.random() * (wed - playerBorder)/playerBorder) ,
        y : Math.floor(Math.random() * (high - playerBorder)/playerBorder)
    }
}

// spawn predetor
function spawnPredetor (){
    predetor = {
        x : Math.floor(Math.random()* (wed - playerBorder)/playerBorder),
        y : Math.floor(Math.random()* (high - playerBorder)/playerBorder)
    }
}

// Paint the Canvas

function paintBlank () {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0,wed,high);
    ctx.strokeStyle = "black"
    ctx.strokeRect(0,0,wed, high);
    var max = 0
}
// Game Over function
function gameOver (){
    var result  = parseInt($('#over').text())
    $("#finalDestination").text(result)
    $("#gOver").fadeIn();
    $("#player1").last().remove()
    $("#player2").append("<source id='playerSrcc'  type='audio/mpeg'  src='/sounds/woah.mp3'>")
    
   setTimeout(function(){$("#player2").last().remove()},700) // 

}


// will check if the predetor is In any of the egdes of the map we define
function edgeOfMap () {
    if (predetor.x < 0 || predetor.x > (wed-playerBorder)/playerBorder || predetor.y < 0 || predetor.y > (high-playerBorder) / playerBorder){
        clearInterval(loop);
        gameOver();
    }
}

// paints the predetor dependin and the victim on what the player enters
function shapes (x,y, color){
    ctx.fillStyle = color;
    ctx.fillRect(x*playerBorder, y*playerBorder , playerBorder , playerBorder);
    ctx.strokeStyle = color;//this is the border of either the predetor and the victim 
    ctx.strokeRect(x*playerBorder , y*playerBorder , playerBorder , playerBorder);
}


// check if the victim is victimiazable 
function victimaizble (){
    if(victim.x == predetor.x && victim.y == predetor.y){
        var current  = parseInt($('#over').text())
        
         current++
         $('#over').text(current)
         counter++
        spawnVictim()
     }
}



spawnVictim();
shapes(predetor.x , predetor.y , "#830303");
spawnPredetor();
shapes(victim.x , victim.y , '#00ff00');



// keyboard controller
 $(document).keydown(function(){
    var key = event.which;
    if(key == "37" || key == "65"){
        predetor.x = predetor.x - 1 ;
        directions = "LEFT";
    } else if(key == "38" || key == "87"){
        predetor.y = predetor.y - 1 ;
        directions = "UP";
    } else if(key == "39" || key == "68"){
        predetor.x = predetor.x + 1 ;
        directions = "RIGHT";
    }else if(key == "40" || key == "83"){
        predetor.y = predetor.y + 1 ;
        directions = "DOWN";
    };

victimaizble();
paintBlank();
color = "red";
shapes(victim.x , victim.y)
color = "green"
shapes(predetor.x , predetor.y)


 });
// $("#restartTheGame").on("click",function(){window.location.reload()})

});

