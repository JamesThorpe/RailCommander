"use strict";

import { trackStraight, trackCurveLeft, trackTurnoutLeft } from "./LayoutItems/TrackSections.js"
import trackSignal from "./LayoutItems/Signal.js"

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
    Signals: [],
    createTrackBlock: function(state) {
        const tb = Vue.reactive(new trackBlock(state));
        this.TrackBlocks.push(tb);
        return tb;
    }
});

var tb1 = layout.createTrackBlock("unreserved");
tb1.addTrackSection(new trackStraight(1, 1, 0));
tb1.addTrackSection(new trackStraight(2, 1, 0));
tb1.addTrackSection(new trackStraight(3, 1, 0));
tb1.addTrackSection(new trackTurnoutLeft(4, 1, 0, "normal"));

var tb2 = layout.createTrackBlock("unreserved");
tb2.addTrackSection(new trackCurveLeft(5, 0, 180));

var tb3 = layout.createTrackBlock("occupied");
tb3.addTrackSection(new trackStraight(5, 1, 0));

layout.Signals.push(new trackSignal(5, 1, 0, "danger"));
layout.Signals.push(new trackSignal(1, 1, 180, "caution"));


window.setInterval(function () {
    if (tb1.state === "occupied") {
        tb1.state = "reserved";
    } else {
        tb1.state = "occupied";
    }
},
1000);


export default layout;