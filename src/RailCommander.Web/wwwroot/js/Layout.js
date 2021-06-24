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
    },
    load: function(layoutData) {
        for(let b of layoutData.blocks) {
            const block = new TrackBlock("unreserved");
            for (let s of b.sections) {
                switch(s.type) {
                    case 'straight':
                        block.addTrackSection(new TrackStraight(s.x, s.y, s.angle !== undefined ? s.angle : 0));
                        break;
                    case 'curve-left':
                        block.addTrackSection(new TrackCurveLeft(s.x, s.y, s.angle !== undefined ? s.angle : 0));
                        break;
                    case 'curve-right':
                        block.addTrackSection(new TrackCurveRight(s.x, s.y, s.angle !== undefined ? s.angle : 0));
                        break;
                    case 'turnout-left':
                        block.addTrackSection(new TrackTurnoutLeft(s.x, s.y, s.angle !== undefined ? s.angle : 0, "normal"));
                        break;
                    case 'turnout-right':
                        block.addTrackSection(new TrackTurnoutRight(s.x, s.y, s.angle !== undefined ? s.angle : 0, "normal"));
                        break;
                }
            }
            layout.trackBlocks.push(block);
        }
    }
});

layout.meta.push(gridHighlight);

layout.load({
    blocks: [
        {
            id: 1,
            sections: [
                {
                    type: 'straight',
                    x: 1,
                    y: 1
                }, {
                    type: 'straight',
                    x: 2,
                    y: 1
                }, {
                    type: 'curve-right',
                    x: 3,
                    y: 1
                }, {
                    type: 'curve-left',
                    x: 4,
                    y: 2,
                    angle: 270
                }, {
                    type: 'turnout-left',
                    x: 4,
                    y: 3,
                    angle: 270
                }, {
                    type: 'turnout-right',
                    x: 4,
                    y: 4,
                    angle: 90
                }, {
                    type: 'straight',
                    x: 3,
                    y: 5,
                    angle: 135
                }
            ]
        }
    ]
});

export default layout;