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

class TrackCurveRight extends LayoutItem {
    constructor(x, y, angle) {
        super('curve-right', x, y, angle);
    }
}

class TrackTurnout extends LayoutItem {
    constructor(type, x, y, angle, position) {
        super(type, x, y, angle);
        this.position = position;
    }

    clicked() {
        this.position = this.position === "normal" ? "reverse" : "normal";
    }
}

class TrackTurnoutLeft extends TrackTurnout {
    constructor(x, y, angle, position) {
        super("turnout-left", x, y, angle, position);
    }
}

class TrackTurnoutRight extends TrackTurnout {
    constructor(x, y, angle, position) {
        super("turnout-right", x, y, angle, position);
    }
}

export {
    TrackStraight,
    TrackCurveLeft,
    TrackCurveRight,
    TrackTurnoutLeft,
    TrackTurnoutRight
};