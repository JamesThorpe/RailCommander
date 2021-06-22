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
    trackBlocks: []
});

var tb1 = new trackBlock("reserved");
layout.trackBlocks.push(tb1);
tb1.addTrackSection(new trackStraight(1, 1, 0));
tb1.addTrackSection(new trackStraight(2, 1, 0));
tb1.addTrackSection(new trackStraight(3, 1, 0));
tb1.addTrackSection(new trackTurnoutLeft(4, 1, 0, "normal"));

var tb2 = new trackBlock("unreserved");
tb2.addTrackSection(new trackCurveLeft(5, 0, 180));
var tb3 = new trackBlock("occupied");
tb3.addTrackSection(new trackStraight(5, 1, 0));
layout.trackBlocks.push(tb2);
layout.trackBlocks.push(tb3);




window.setInterval(function() {
    if (layout.trackSections[1].state === "occupied") {
        layout.trackSections[1].state = "reserved";
    } else {
        layout.trackSections[1].state = "occupied";
    }
},
1000);


export default layout;