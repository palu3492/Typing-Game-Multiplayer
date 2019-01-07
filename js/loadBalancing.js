class GameLoadBalancing extends Photon.LoadBalancing.LoadBalancingClient {
    constructor() {
        super(protocol, appId, appVersion);
    }

    start() {
        if (connectOnStart) {
            this.connectToRegionMaster(connectRegion);
        }
    }

    onError (errorCode, errorMsg) {
        console.log("Error " + errorCode + ": " + errorMsg);
    };

    setupUI() {

        var _this = this;

        var playButton = document.getElementById("play");
        playButton.onclick = function () {
            var name = document.getElementById('nameInput').value;
            if (name && name.length < 10 && _this.isInLobby()) {
                _this.myActor().setName(name);
                if (_this.availableRooms().length > 0) {
                    _this.joinRandomRoom();
                } else {
                    _this.createRoom();
                }
                document.getElementById("lobby").style.display = "none";
                document.getElementById("game").style.display = "initial";
            }
        };
    }

    onActorJoin(actor){
        actorJoined(actor);
    }

    // onActorLeave(actor){
    //     actorLeft(actor);
    // }
}