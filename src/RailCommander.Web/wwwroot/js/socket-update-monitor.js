"use strict";

let layout = null;
const bindLayout = function (l) {
    layout = l;
}

const handler = function (m) {
    if (layout === null) {
        return;
    }

    if (m.BlockId !== undefined) {
        
        for (let i = 0; i < layout.blocks.length; i++) {
            let b = layout.blocks[i];
            if (b.id === m.BlockId) {
                b.state = m.State;
            }
        }
    }
}

export default { handler, bindLayout };