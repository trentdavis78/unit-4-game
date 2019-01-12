$(document).ready(function(){
    // create game variables
    var win = 0;
    var loss = 0;
    var total = 0;
    var random;
    var gems = {};
    var uniqueRanImg = [];
    var uniqueRanGem = [];
    var collected;
    var newArr;
    // inital game html reset win/loss
    $("#win").text("0");
    $("#loss").text("0");
   
    // function to generate a random number with min/max
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }
    // function to reset all values except wins/losses
    function resetValues() {
        // reset gem values so it's possible to get back to back games with the same value
        uniqueRanGem = [];
        // function to generate unique random numbers; takes params: quantity of random nums & empty array var
        function makeUniqueRandom(num, arr) {            
            // refill the array if needed
            if (!arr.length) {
                for (var i = 0; i < num; i++) {
                    arr.push(i);
                }
            }
            var index = Math.floor(Math.random() * arr.length);
            var val = arr[index];
            // now remove that value from the array
            arr.splice(index, 1);
            return val;
        }
        // function for generating random crystals   
        var imgID = 0;
        $(".gems img").each(function(){  
            // increment the imgID on each iteration
            imgID++;
            // retrieve a random and unique number between 0 and 4       
            var randomID = makeUniqueRandom(4,uniqueRanImg);
            // retrieve a random number between 0 and 360
            var randomHue = getRandom(0,360);  
            // create the css for hue-rotate and add the random 0-360 to it; increase saturation
            var hueRotateSaturate = "hue-rotate(" + randomHue + "deg) saturate(2)";  
            // loop thru IMG tags and set image ids/src attr with unique random number from makeUniqueRandom function                
            $("#gem-" + imgID).attr("src", "assets/images/gem" + randomID + ".png");
            // loop thru each IMG tag and put inline CSS for hue-rotate and saturate
            $("#gem-" + imgID).css({
                'filter': hueRotateSaturate,
                '-webkit-filter':  hueRotateSaturate            
            }); 
            $("#gem-" + imgID).attr("data-clicked", "0")         
        });   

        // reset total to 0 and print to html
        total = 0;
        $("#total").text(total);
        // generate random score to beat and print to html
        random = getRandom(19,120);
        $("#random").text(random);
        // generate crystal values
        
        // loop thru gems obj and set key value pairs with unique random number from makeUniqueRandom function
        for(var j = 1; j < 5; j++){
            gems['index_' + j] = makeUniqueRandom(12,uniqueRanGem) + 1;     
                          
        }   
    }
    // start initial game
    resetValues();
    // onclick events for crystals --> add gem vars to total --> check if game has won/lost
    $("#gem-1").on("click", function(){
        total = total + gems.index_1;
        $("#total").text(total);  
        $("#gem-1").attr("data-clicked", "1");
        checkWin();      
    });
    $("#gem-2").on("click", function(){
        total = total + gems.index_2;
        $("#total").text(total);    
        $("#gem-2").attr("data-clicked", "1");
        checkWin();        
    });
    $("#gem-3").on("click", function(){
        total = total + gems.index_3;
        $("#total").text(total);  
        $("#gem-3").attr("data-clicked", "1");
        checkWin();          
    });
    $("#gem-4").on("click", function(){
        total = total + gems.index_4;
        $("#total").text(total);  
        $("#gem-4").attr("data-clicked", "1");
        checkWin();          
    });
    // function to check if game has been won
    function checkWin() {
        if(total == random) {
            win++;
            $("#win").text(win);
            alert("You Win!");
            collectCrystals();
            resetValues();
        } 
        else if(total > random) {
            loss++;
            $("#loss").text(loss);
            alert("You lose");  
            resetValues();
        }
    } 
    // function to collect crystals   
    function collectCrystals() {
        collected = [];
        newArr = [];
     for(k=1; k<5; k++){ 
        var gemIter = $("#gem-" + k);
         if(gemIter.attr("data-clicked") == 1) {
            var src = gemIter.attr("src");
            var style = gemIter.attr("style");
            newArr.push([src,style]); 
         }              
     }
        collected.push(newArr);
        printCollected(collected);
    }
    // function to print collected crystals to HTML
    function printCollected(collected) {
        for(l=0; l < collected.length; l++){
            for(m=0; m < collected[l].length; m++){
                var newImg = $('<img class="collected">');
                newImg.attr('src', collected[l][m][0])
                newImg.attr('style', collected[l][m][1])               
                newImg.appendTo("#collection");                          
            }
        }
    }
});
