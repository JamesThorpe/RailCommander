"use strict";

import { TrackStraight, TrackCurveLeft, TrackCurveRight, TrackTurnoutLeft, TrackTurnoutRight } from "./LayoutItems/TrackSections.js"
import TrackSignal from "./LayoutItems/Signal.js"
import GridHighlight from "./LayoutItems/GridHighlight.js"


class TrackBlock {
    constructor(state) {
        this.trackSections = [];
        this.state = state;
    }
    addTrackSection(section) {
        this.trackSections.push(section);
    }
}

const gridHighlight = Vue.reactive(new GridHighlight(0, 0));

const layout = Vue.reactive({
    trackBlocks: [],
    signals: [],
    meta: [],
    highlightActive: false,
    createTrackBlock: function(state) {
        const tb = Vue.reactive(new TrackBlock(state));
        this.trackBlocks.push(tb);
        return tb;
    },
    mousemove: function (e) {
        if (this.highlightActive) {
            let x = parseInt(e.offsetX / 32);
            let y = parseInt(e.offsetY / 32);

            gridHighlight.x = x;
            gridHighlight.y = y;
        }
    },
    mouseleave: function(e) {
        gridHighlight.x = 0;
        gridHighlight.y = 0;
    }
});

layout.meta.push(gridHighlight);

var tb1 = layout.createTrackBlock("unreserved");
tb1.addTrackSection(new TrackStraight(1, 1, 0));
tb1.addTrackSection(new TrackStraight(2, 1, 0));
tb1.addTrackSection(new TrackTurnoutRight(3, 1, 0, "reverse"));
tb1.addTrackSection(new TrackTurnoutLeft(4, 1, 0, "normal"));
tb1.addTrackSection(new TrackStraight(4, 2, 45));
tb1.addTrackSection(new TrackCurveRight(5, 3, 180));

var tb2 = layout.createTrackBlock("unreserved");
tb2.addTrackSection(new TrackCurveLeft(5, 0, 180));

var tb3 = layout.createTrackBlock("occupied");
tb3.addTrackSection(new TrackStraight(5, 1, 0));
tb3.addTrackSection(new TrackCurveRight(6, 1, 0));
tb3.addTrackSection(new TrackCurveRight(7, 2, 180));

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