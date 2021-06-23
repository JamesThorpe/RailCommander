"use strict";

import LayoutItem from "./LayoutItem.js"

class TrackStraight extends LayoutItem {
    constructor(x, y, angle) {
        super("straight", x, y, angle);
    }
}

class TrackCurveLeft extends LayoutItem {
    constructor(x, y, angle) {
        super("curve-left", x, y, angle);
    }
}

class TrackTurnoutLeft extends LayoutItem {
    constructor(x, y, angle, position) {
        super("turnout-left", x, y, angle);
        this.position = position;
    }

    clicked() {
        this.position = this.position === "normal" ? "reverse" : "normal";
    }
}

export {TrackStraight, TrackCurveLeft, TrackTurnoutLeft};