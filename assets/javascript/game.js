$(document).ready(function(){
    // create game variables
    var win = 0;
    var loss = 0;
    var total = 0;
    var random;
    var gem1;
    var gem2;
    var gem3;
    var gem4;
    // inital game html reset win/loss
    $("#win").text("0");
    $("#loss").text("0");
   
    // function to generate a random number with min/max
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    function resetValues() {
        // set image ids with unique random number function
        var uniqueRandoms = [];
        var numRandoms;
        function makeUniqueRandom(num) {
            numRandoms = num;
            // refill the array if needed
            if (!uniqueRandoms.length) {
                for (var i = 0; i < numRandoms; i++) {
                    uniqueRandoms.push(i);
                }
            }
            var index = Math.floor(Math.random() * uniqueRandoms.length);
            var val = uniqueRandoms[index];
            // now remove that value from the array
            uniqueRandoms.splice(index, 1);
            return val;
        }
        var imgID = 0;
        $("img").each(function(){  
            imgID++;        
            var randomID = makeUniqueRandom(4);              
            $("#gem-" + imgID).attr("src", "assets/images/gem" + randomID + ".png");
        });
        // reset total to 0 and print to html
        total = 0;
        $("#total").text(total);
        // generate random score to beat and print to html
        random = getRandom(19,120);
        $("#random").text(random);
        // generate crystal values
        gem1 = getRandom(1,12);
        gem2 = getRandom(1,12);
        gem3 = getRandom(1,12);
        gem4 = getRandom(1,12);  
    
    }
    // start initial game
    resetValues();
    // onclick events for crystals --> add gem vars to total --> check if game has won/lost
    $("#gem-1").on("click", function(){
        total = total + gem1;
        $("#total").text(total);  
        checkWin();      
    });
    $("#gem-2").on("click", function(){
        total = total + gem2;
        $("#total").text(total);    
        checkWin();        
    });
    $("#gem-3").on("click", function(){
        total = total + gem3;
        $("#total").text(total);  
        checkWin();          
    });
    $("#gem-4").on("click", function(){
        total = total + gem4;
        $("#total").text(total);  
        checkWin();          
    });
    // function to check if game has been won
    function checkWin() {
        if(total == random) {
            win++;
            $("#win").text(win);
            alert("You Win!");
            resetValues();
        } 
        else if(total > random) {
            loss++;
            $("#loss").text(loss);
            alert("You lose");
            resetValues();
        }
    }
});