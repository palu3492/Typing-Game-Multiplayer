
var text = "Hello my name is alex and I like cake and otter skin.";
var textArray;
var word;
var input;
var progress = 0;
var progressChange = 0;
var highlightStart = 0;

function actorJoined(actor){
    progressList();
    if(photon.myRoomActorCount() <= 1){
        addNotification('Waiting for players');
    } else {
        addNotification('Game is starting');
        start();
    }
}

// document.addEventListener("DOMContentLoaded", function(){
//     start();
// });

function progressList(){
    var actorDiv = "<div id=\"player\">\n" +
        "                    <p class='name'></p>\n" +
        "                    <div class='progress'></div>\n" +
        "                </div>";
    var playersDiv = document.getElementById("players");
    //remove all actors for list
    while (playersDiv.firstChild) {
        playersDiv.removeChild(playersDiv.firstChild);
    }
    var actors = photon.myRoomActors();
    const keys = Object.keys(actors);
    for(var i=0; i<keys.length; i++){
        var actor = actors[keys[i]];
        var actorHtml = createElementFromHTML(actorDiv);
        actorHtml.childNodes[1].innerHTML = actor.name + ":";
        actorHtml.childNodes[3].setAttribute("id", actor.actorNr);
        playersDiv.appendChild(actorHtml);
    }
}
function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}

function start(){
    document.getElementById('text').innerHTML = text;
    input = document.getElementById('input');
    input.addEventListener("keyup", keyUp);
    textArray = text.split(' ');
    word = textArray[0];
    highlightNext();
    setProgressChange();
}

function keyUp(event){
    var keyCode = event.keyCode;
    // letter is typed or backspace
    if ((keyCode >= 65 && keyCode <= 90) || keyCode === 8) {
        if(checkLetterInput()){
            input.style.backgroundColor = 'initial';
        } else {
            input.style.backgroundColor = 'pink';
        }
    } else if (keyCode === 32) {
        if(checkWordInput()) {
            nextWord();
            highlightNext();
        } else {
            input.style.backgroundColor = 'pink';
        }
    }
}

function checkLetterInput(){
    var inputValue = input.value;
    var wordSub = word.substr(0, inputValue.length);
    return inputValue === wordSub;
}
function checkWordInput(){
    var inputValue = input.value;
    inputValue = inputValue.substr(0, inputValue.length-1);
    return inputValue === word;
}

function nextWord(){
    advanceProgress(photon.myActor().actorNr.toString());
    photon.raiseEvent(1);
    input.value = "";
    input.style.backgroundColor = 'initial';
    // set new word
    textArray.shift();
    if(textArray.length > 0) {
        word = textArray[0];
    } else {
        gameOver();
    }
}

function advanceProgress(id){
    progress += progressChange;
    var myProgressDiv = document.getElementById(id);
    myProgressDiv.style.backgroundSize = progress.toString() + '% auto';
}

function setProgressChange(){
    progressChange = 100 / textArray.length;
}

function highlightNext(){
    var textStart = text.substr(0, highlightStart);
    var textHighlight = text.substr(highlightStart, word.length).bold();
    var textEnd = text.substr(highlightStart + word.length, text.length);
    var newText = textStart + textHighlight + textEnd;
    document.getElementById('text').innerHTML = newText;
    highlightStart += word.length + 1;
}

function gameOver(){
    document.getElementById('text').innerHTML = text;
    input.disabled = true;
    input.style.display = 'none';
    var msg = photon.myActor().name + " won the game";
    addNotification(msg);
    photon.raiseEvent(2, msg);
}

function addNotification(text){
    var p = document.createElement("p");
    p.classList.add("notification");
    p.style.color = 'orange';
    p.innerHTML = text;
    var notifications = document.getElementById("notifications");
    notifications.appendChild(p);
}

// var chatInput = document.getElementById("chat-input");
// var msg = chatInput.value;
// if (msg) {
//     chatInput.value = "";
//     msg = photon.myActor().name + ": " + msg;
//     addMsg(msg, true, false);
//     if(!guessWord(msg)) {
//         photon.raiseEvent(10, msg);
//     }
// }