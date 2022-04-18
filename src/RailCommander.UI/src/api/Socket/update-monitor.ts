let layout:any = null;
const bindLayout = function (l:any) {
    layout = l;
}

const handler = function (m:any) {
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

    if (m.TurnoutId !== undefined) {
        for (let i = 0; i < layout.blocks.length; i++) {
            let b = layout.blocks[i];
            for (let j = 0; j < b.sections.length; j++) {
                let s = b.sections[j];
                if (s.id === m.TurnoutId) {
                    s.position = m.TurnoutState;
                }
            }
        }
    }


}

export default { handler, bindLayout };