"use strict";

import layoutItem from "./LayoutItem.js"


class trackSignal extends layoutItem {
    constructor(x, y, angle, aspect) {
        super("signal", x, y, angle);

        this.aspect = aspect;
    }
}

export default trackSignal;