﻿"use strict";

import { TrackStraight, TrackCurveLeft, TrackTurnoutLeft } from "./LayoutItems/TrackSections.js"
import TrackSignal from "./LayoutItems/Signal.js"

class TrackBlock {
    constructor(state) {
        this.trackSections = [];
        this.state = state;
    }
    addTrackSection(section) {
        this.trackSections.push(section);
    }
}

const layout = Vue.reactive({
    trackBlocks: [],
    signals: [],
    createTrackBlock: function(state) {
        const tb = Vue.reactive(new TrackBlock(state));
        this.trackBlocks.push(tb);
        return tb;
    }
});

var tb1 = layout.createTrackBlock("unreserved");
tb1.addTrackSection(new TrackStraight(1, 1, 0));
tb1.addTrackSection(new TrackStraight(2, 1, 0));
tb1.addTrackSection(new TrackStraight(3, 1, 0));
tb1.addTrackSection(new TrackTurnoutLeft(4, 1, 0, "normal"));

var tb2 = layout.createTrackBlock("unreserved");
tb2.addTrackSection(new TrackCurveLeft(5, 0, 180));

var tb3 = layout.createTrackBlock("occupied");
tb3.addTrackSection(new TrackStraight(5, 1, 0));

layout.signals.push(new TrackSignal(5, 1, 0, "danger"));
layout.signals.push(new TrackSignal(1, 1, 180, "caution"));


window.setInterval(function () {
    if (tb1.state === "occupied") {
        tb1.state = "reserved";
    } else {
        tb1.state = "occupied";
    }
},
1000);


export default layout;