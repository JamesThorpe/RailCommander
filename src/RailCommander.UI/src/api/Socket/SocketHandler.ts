import consoleLog from "./console-log"
import updateMonitor from "./update-monitor"

const socketHandlers:any = {
    log: consoleLog,
    layoutupdate: updateMonitor
};


function openSocket() {
    var ws = new WebSocket("ws://" + window.location.host + "/socket");
    ws.onopen = function () {

        ws.send(JSON.stringify({
            type: "echo",
            message: "Client opened at " + new Date()
        }));

    }
    ws.onmessage = function (m:any) {
        const msg = JSON.parse(m.data);
        if (socketHandlers[msg.type]) {
            socketHandlers[msg.type].handler(msg);
        } else {
            console.warn("No message handler for message type " + msg.type);
        }
    }
}


export default {
    open: openSocket,
    bindLayout: updateMonitor.bindLayout
};