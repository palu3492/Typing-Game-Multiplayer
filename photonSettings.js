var appId = "bdcbb0d0-e86c-471d-8079-1bb3d01794ad";
var appVersion = "1.0";
var connectOnStart = true;
var connectRegion = "us";
var protocol = ("https:" === document.location.protocol) ? Photon.ConnectionProtocol.Wss : Photon.ConnectionProtocol.Ws;
var photon = new GameLoadBalancing();
photon.start();
document.addEventListener("DOMContentLoaded", function(){
    photon.setupUI();
});