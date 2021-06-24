"use strict";

import LayoutItem from "./LayoutItem.js"


class GridHighlight extends LayoutItem {
    constructor(x, y, clickcb) {
        super("grid-highlight", x, y, 0);
        this.clickcb = clickcb;
    }

    clicked() {
        this.clickcb(this.x, this.y);
    }
}

export default GridHighlight;