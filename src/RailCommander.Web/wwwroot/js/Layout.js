"use strict";

function trackPiece(type, x, y, angle, state) {
    this.type = type;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.state = state;
}

const layout = Vue.reactive({
    trackSections: [],
    addTrackSection(type, x, y, angle, state) {
        var section = { type: type, x: x, y: y, angle: angle, state: state };
        this.trackSections.push(section);
        return section;
    }
});

layout.addTrackSection("straight", 1, 1, 0, "unreserved");
layout.addTrackSection("straight", 2, 1, 0, "reserved");
layout.addTrackSection("straight", 3, 1, 0, "occupied");
layout.addTrackSection("curve-left", 5, 0, 180, "unreserved");
var ts = layout.addTrackSection("turnout-left", 4, 1, 0, "unreserved");
ts.position = "reverse";

ts.clicked = function() {
    if (this.position === "normal") {
        this.position = "reverse";
    } else {
        this.position = "normal";
    }
}


layout.addTrackSection("straight", 5, 1, 0, "unreserved");

window.setInterval(function() {
    if (layout.trackSections[1].state === "occupied") {
        layout.trackSections[1].state = "reserved";
    } else {
        layout.trackSections[1].state = "occupied";
    }
},
1000);


export default layout;