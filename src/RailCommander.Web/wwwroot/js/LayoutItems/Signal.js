"use strict";

import LayoutItem from "./LayoutItem.js"


class TrackSignal extends LayoutItem {
    constructor(x, y, angle, aspect) {
        super("signal", x, y, angle);

        this.aspect = aspect;
    }
}

export default TrackSignal;