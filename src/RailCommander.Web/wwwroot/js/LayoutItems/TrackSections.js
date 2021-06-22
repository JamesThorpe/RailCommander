"use strict";

import layoutItem from "./LayoutItem.js"

class trackStraight extends layoutItem {
    constructor(x, y, angle) {
        super("straight", x, y, angle);
    }
}

class trackCurveLeft extends layoutItem {
    constructor(x, y, angle) {
        super("curve-left", x, y, angle);
    }
}

class trackTurnoutLeft extends layoutItem {
    constructor(x, y, angle, position) {
        super("turnout-left", x, y, angle);
        this.position = position;
    }

    clicked() {
        this.position = this.position === "normal" ? "reverse" : "normal";
    }
}

export {trackStraight, trackCurveLeft, trackTurnoutLeft};