"use strict";

class trackSection {
    constructor(type, x, y, angle) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.angle = angle;
    }
}

class trackStraight extends trackSection {
    constructor(x, y, angle) {
        super("straight", x, y, angle);
    }
}

class trackCurveLeft extends trackSection {
    constructor(x, y, angle) {
        super("curve-left", x, y, angle);
    }
}

class trackTurnoutLeft extends trackSection {
    constructor(x, y, angle, position) {
        super("turnout-left", x, y, angle);
        this.position = position;
    }

    clicked() {
        this.position = this.position === "normal" ? "reverse" : "normal";
    }
}
class trackSignal extends trackSection {
    constructor(x, y, angle, aspect) {
        super("signal", x, y, angle);

        this.aspect = aspect;
    }
}
class trackBlock {
    constructor(state) {
        this.trackSections = [];
        this.state = state;
    }
    addTrackSection(section) {
        this.trackSections.push(section);
    }
}

const layout = Vue.reactive({
    TrackBlocks: [],
    Signals: []
});

var tb1 = new trackBlock("reserved");
layout.TrackBlocks.push(tb1);
tb1.addTrackSection(new trackStraight(1, 1, 0));
tb1.addTrackSection(new trackStraight(2, 1, 0));
tb1.addTrackSection(new trackStraight(3, 1, 0));
tb1.addTrackSection(new trackTurnoutLeft(4, 1, 0, "normal"));

var tb2 = new trackBlock("unreserved");
tb2.addTrackSection(new trackCurveLeft(5, 0, 180));
var tb3 = new trackBlock("occupied");
tb3.addTrackSection(new trackStraight(5, 1, 0));
layout.TrackBlocks.push(tb2);
layout.TrackBlocks.push(tb3);

layout.Signals.push(new trackSignal(5, 1, 0, "danger"));
layout.Signals.push(new trackSignal(1, 1, 180, "caution"));


window.setInterval(function () {
    var b = layout.TrackBlocks[0];
    if (b.trackSections[1].state === "occupied") {
        b.trackSections[1].state = "reserved";
    } else {
        b.trackSections[1].state = "occupied";
    }
},
1000);


export default layout;