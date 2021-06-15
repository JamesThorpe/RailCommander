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


function createStraight(includeFiller) {
    const group = svg.group();


    function polygon(width) {
        let offset;
        if (!includeFiller) {
            offset = 0;
        } else {
            offset = consts.grid / 5 ;
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

    polygon(consts.section.section).fill(consts.colours.border);
    polygon(consts.section.section - (2 * consts.section.border)).fill(consts.colours.section);
    polygon(consts.section.rail).fill(consts.colours.rail);
    
    group.gridMove = fn.gridMove;
    return group;
}

function createLeft() {
    const group = svg.group();
    function polygon(width) {
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

    polygon(consts.section.section).fill(consts.colours.border);
    polygon(consts.section.section - (2 * consts.section.border)).fill(consts.colours.section);
    polygon(consts.section.rail).fill(consts.colours.rail);
    group.gridMove = fn.gridMove;
    return group;
}

function createRight() {
    const group = svg.group();
    function polygon(width) {
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

    polygon(consts.section.section).fill(consts.colours.border);
    polygon(consts.section.section - (2 * consts.section.border)).fill(consts.colours.section);
    polygon(consts.section.rail).fill(consts.colours.rail);
    group.gridMove = fn.gridMove;
    return group;
}

let s1 = createStraight(true).gridMove(4, 5, 135);
let s2 = createStraight().gridMove(2, 1);
let s3 = createLeft().gridMove(3, 3, 90);
let s4 = createLeft().gridMove(4, 4, 270);
let s5 = createRight().gridMove(6, 4);
let s6 = createLeft().gridMove(5, 4, 180);
let s7 = createLeft().gridMove(7, 5, 270);
createRight().gridMove(3,6,270);
createStraight().gridMove(1, 10);
createStraight().gridMove(2, 10);
createStraight().gridMove(3, 10);
createStraight().gridMove(4, 10);
createStraight().gridMove(5, 10);
createStraight().gridMove(1, 11);
createStraight().gridMove(2, 11);
createStraight().gridMove(3, 11);
createStraight().gridMove(4, 11);
createStraight().gridMove(5, 11);