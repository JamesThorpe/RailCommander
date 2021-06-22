"use strict";

class trackSection {
    constructor(type, x, y, angle, state) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.state = state;
    }
}

class trackStraight extends trackSection {
    constructor(x, y, angle, state) {
        super("straight", x, y, angle, state);
    }
}

class trackCurveLeft extends trackSection {
    constructor(x, y, angle, state) {
        super("curve-left", x, y, angle, state);
    }
}

class trackTurnoutLeft extends trackSection {
    constructor(x, y, angle, state, position) {
        super("turnout-left", x, y, angle, state);
        this.position = position;
    }

    clicked() {
        this.position = this.position === "normal" ? "reverse" : "normal";
    }
}

class trackBlock {
    constructor() {
        this.trackSections = [];
    }
    addTrackSection(section) {
        this.trackSections.push(section);
    }
}

const layout = Vue.reactive({
    trackSections: []
});

layout.trackSections.push(new trackStraight(1, 1, 0, "unreserved"));
layout.trackSections.push(new trackStraight(2, 1, 0, "reserved"));
layout.trackSections.push(new trackStraight(3, 1, 0, "occupied"));
layout.trackSections.push(new trackCurveLeft(5, 0, 180, "unreserved"));
layout.trackSections.push(new trackStraight(5, 1, 0, "unreserved"));
layout.trackSections.push(new trackTurnoutLeft(4, 1, 0, "unreserved", "normal"));



window.setInterval(function() {
    if (layout.trackSections[1].state === "occupied") {
        layout.trackSections[1].state = "reserved";
    } else {
        layout.trackSections[1].state = "occupied";
    }
},
1000);


export default layout;