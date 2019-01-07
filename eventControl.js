var otherPos ={ x: 0, y: 0 };
photon.onEvent = function(code, content, actorNr){

    if(code === 1){
        advanceProgress(actorNr);
    } else if (code === 2){
        addNotification(content);
    }
};