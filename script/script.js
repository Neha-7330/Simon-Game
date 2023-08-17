let gamePattern = []
let userClickedPattern = []
let buttonColours = ["green-box", "red-box", "yellow-box", "blue-box"]
let count = 0
let speed = 200

function nextSequence(){
    let randomNumber = Math.round(Math.random() * 3)
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
}

function pattern(){
    gamePattern.forEach((name, i) => {
        setTimeout(() => {
            $("#"+name).animate({opacity: 1}).delay(speed).animate({opacity: 0.5})
            const rollSound = new Audio("./sounds/"+name+".mp3")
            rollSound.play()
        }, i * 800);
    });
}

function repeateCall(level){
    for(let i = 0; i <= level; i++){
        nextSequence()
    }
    setTimeout(pattern, 3000)
}
repeateCall(count)


$(".box").on("click", function (){

    $(this).animate({opacity: 1}).delay(200).animate({opacity: 0.5})
    const rollSound = new Audio("./sounds/"+$(this).attr("id")+".mp3")
    rollSound.play()
    let userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour)

    for (let j = 0; j < userClickedPattern.length; j++){
        if (userClickedPattern[j] == gamePattern[j]){
            console.log(userClickedPattern, "user")
            console.log(userClickedPattern.length)
            console.log(gamePattern, "game")
            console.log(gamePattern.length)
            if(userClickedPattern.length == gamePattern.length){
                userClickedPattern = []
                gamePattern = []
                count = count + 1
                $("#score").text(count)
                setInterval(repeateCall(count), 100)
                console.log("same")
                console.log(userClickedPattern.length)
                console.log(gamePattern, "game")
                console.log(gamePattern.length)
            }else{
                continue
            }
        }else{
            const wrongSound = new Audio("./sounds/wrong.mp3")
            wrongSound.play()
            $("#update span").text("Refresh the page to play again.")
            break
        }
    }
})

function startGame(){
    pattern()
}


$("#middle").fadeOut()
function addMiddleClass () {
    $("#middle").fadeIn("slow", "linear")
    $("#middle").addClass("middle-box")
    setTimeout(startGame, 1500)
}

$("#play").on("click", function(){
    $("#start-game").fadeOut("slow", "swing")
    setTimeout(addMiddleClass, 550)
})

$(".speedBtn").on("click", function(){
    $("button").removeClass("active_speed")
    $(this).addClass("active_speed")
    let active = document.querySelector(".active_speed").textContent()
    switch(active){
        case Slow:
            speed = 200
            break;
        case Normal:
            speed = 150
            break;
        case Fast:
            speed = 80
            break;
        default:
            speed = 150
            break;
    }

})











