import socket from "/js/SocketHandler.js"
socket.handlers.log = {
    handler: function (m) {
        switch (m.level) {
            case "Debug":
                console.debug(m.message);
                break;
            case "Information":
                console.log(m.message);
                break;
            case "Warning":
                console.warn(m.message);
                break;
            case "Error":
                console.error(m.message);
                break;
            default:
                console.log(`${m.level}: ${m.message}`);
        }
    }
}