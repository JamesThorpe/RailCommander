const consts = {
    grid: 25,
    section: {
        section: 15,
        rail: 6,
        border: 2
    },
    colours: {
        rail: '#000',
        section: '#fff',
        border: '#00f'
    }
};


const fn = {
    gridMove: function (x, y, rotate) {
        if (!rotate) rotate = 0;
        return this.transform({
                origin: [consts.grid / 2, consts.grid / 2],
                rotate: rotate,
                translate: [
                    ((x - 1) * consts.grid),
                    ((y - 1) * consts.grid)
                ]
            }
        );
    }
}

var svg = SVG().addTo('#svg').size(800, 500);
var gridPattern = svg.pattern(consts.grid * 2, consts.grid * 2, function (a) {
    a.rect(consts.grid, consts.grid).fill('#050');
    a.rect(consts.grid, consts.grid).fill('#060').move(0, consts.grid);
    a.rect(consts.grid, consts.grid).fill('#050').move(consts.grid, consts.grid);
    a.rect(consts.grid, consts.grid).fill('#060').move(consts.grid, 0);
});

//svg.rect("100%", "100%").fill(gridPattern);


function createStraight(includeFiller, width, colour) {
    const group = svg.group();

    function polygon() {
        let offset;
        if (!includeFiller) {
            offset = 0;
        } else {
            offset = consts.grid / 4.5 ;
        }
        let p = group.polygon(`
            -${offset} 0
            ${consts.grid + offset} 0
            ${consts.grid + offset} ${width}
            ${-offset} ${width}
        `);

        p.move(-offset, (consts.grid - width) / 2);
        return p;
    }
    polygon().fill(colour);
    return group;
}

function createLeft(width, colour) {
    const group = svg.group();
    function polygon() {
        let y = ((consts.grid - width) / 2);

        let diff = (width / 2) * Math.cos(Math.PI / 4);

        let x1 = consts.grid - (y + diff * 2);

        let x2 = consts.grid - diff;
        let y2 = -diff;
        let x3 = consts.grid + diff;
        let y3 = diff;
        let x4 = consts.grid + diff - (y + width - diff);

        return group.path(`
            M0 ${y}
            C${x1} ${y} ${x1} ${y} ${x2} ${y2}
            L${x3} ${y3}
            C${x4} ${consts.grid - y} ${x4} ${consts.grid - y} 0 ${y + width}
            z
        `);
    }

    polygon().fill(colour);
    return group;
}

function createRight(width, colour) {
    const group = svg.group();
    function polygon() {
        let y = ((consts.grid - width) / 2);

        let diff = (width / 2) * Math.cos(Math.PI / 4);

        let x1 = consts.grid + diff - (y + width - diff);

        let x2 = consts.grid + diff;
        let y2 = consts.grid - diff;
        let x3 = consts.grid - diff;
        let y3 = consts.grid + diff;

        let x4 = consts.grid - (y + diff * 2);

        return group.path(`
            M0 ${y}
            C${x1} ${y} ${x1} ${y} ${x2} ${y2}
            L${x3} ${y3}
            C${x4} ${consts.grid - y} ${x4} ${consts.grid - y} 0 ${y + width}
            z
        `);
    }

    polygon(width).fill(colour);
    return group;
}

function createLeftTurnout(includeFiller, width, colour) {
    const group = svg.group();
    function straight() {
        let offset;
        if (!includeFiller) {
            offset = 0;
        } else {
            offset = consts.grid / 4.5;
        }
        let p = group.polygon(`
            -${offset} 0
            ${consts.grid + offset} 0
            ${consts.grid + offset} ${width}
            ${-offset} ${width}
        `);

        p.move(-offset, (consts.grid - width) / 2);
        return p;
    }

    function curve() {
        let y = ((consts.grid - width) / 2);

        let diff = (width / 2) * Math.cos(Math.PI / 4);

        let x1 = consts.grid - (y + diff * 2);

        let x2 = consts.grid - diff;
        let y2 = -diff;
        let x3 = consts.grid + diff;
        let y3 = diff;
        let x4 = consts.grid + diff - (y + width - diff);

        return group.path(`
            M0 ${y}
            C${x1} ${y} ${x1} ${y} ${x2} ${y2}
            L${x3} ${y3}
            C${x4} ${consts.grid - y} ${x4} ${consts.grid - y} 0 ${y + width}
            z
        `);
    }

    

    curve(width).fill(colour);
    straight(width).fill(colour);

    return group;
}





let pieces = [];
function trackPiece(type, x, y, angle) {
    if (!Number.isInteger(angle)) angle = 0;
    pieces.push({
        type: type,
        x: x,
        y: y,
        angle: angle
    });
}

trackPiece("straight", 3, 2, 135);
trackPiece("straight", 4, 3);
trackPiece("leftTurnout", 3, 3);
trackPiece("leftTurnout", 2, 3);
trackPiece("left", 4, 2, 180);
trackPiece("left", 4, 1, 180);

console.time("render");
renderTrack();
console.timeEnd("render");
/*
createStraight(true).gridMove(3, 2, 135);
createStraight().gridMove(4, 3);
createLeftTurnout().gridMove(3, 3);
createLeftTurnout().gridMove(2, 3);
createLeft().gridMove(4, 2, 180);
createLeft().gridMove(4, 1, 180);
*/
function renderTrack() {

    /*
    polygon(consts.section.section).fill(consts.colours.border);
    polygon(consts.section.section - (2 * consts.section.border)).fill(consts.colours.section);
    polygon(consts.section.rail).fill(consts.colours.rail);
    */
    for (var x = 0; x < 3; x++) {
        let width;
        let colour;
        switch(x) {
            case 0:
                width = consts.section.section;
                colour = consts.colours.border;
                break;
            case 1:
                width = consts.section.section - (2 * consts.section.border);
                colour = consts.colours.section;
                break;
            case 2:
                width = consts.section.rail;
                colour = consts.colours.rail;
                break;
        }
        for (var p in pieces) {
            let piece = pieces[p];
            let s;
            switch (piece.type) {
                case "straight":
                    s = createStraight(piece.angle % 90 === 45, width, colour);
                    break;
                case "left":
                    s = createLeft(width, colour);
                    break;
                case "right":
                    s = createRight(width, colour);
                    break;
                case "leftTurnout":
                    s = createLeftTurnout(piece.angle % 90 === 45, width, colour);
                    break;
            }
            s.transform({
                    origin: [consts.grid / 2, consts.grid / 2],
                    rotate: piece.angle,
                    translate: [
                        ((piece.x - 1) * consts.grid),
                        ((piece.y - 1) * consts.grid)
                    ]
                }
            );
        }
    }
}