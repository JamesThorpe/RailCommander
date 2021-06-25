"use strict";

import consoleLog from "./socket-console-logger.js";

const socketHandlers = {
    log: consoleLog
};

function openSocket() {
    var ws = new WebSocket("ws://" + window.location.host + "/ws");
    ws.onopen = function () {
        /*
        ws.send(JSON.stringify({
            type: "echo",
            message: "Client opened at " + new Date()
        }));
        */
    }
    ws.onmessage = function(m) {
        const msg = JSON.parse(m.data);
        if (socketHandlers[msg.type]) {
            socketHandlers[msg.type].handler(msg);
        } else {
            console.warn("No message handler for message type " + msg.type);
        }
    }
}


export default { 
    open: openSocket
};