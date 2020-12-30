import socket from "/js/SocketHandler.js"
socket.handlers.log = {
	handler: function(m) {
        console.log(m.message);
    }
}