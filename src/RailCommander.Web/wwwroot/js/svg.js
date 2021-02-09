const consts = {
    grid: 96,
    section: {
        width: 32
    },
    colours: {
        rail: '#000'
    }
};


const fn = {
    gridMove: function(ox, oy) {
        return function(x, y) {
            return this.move(
                ((x - 1) * consts.grid) + ox,
                ((y - 1) * consts.grid) + oy
            );
        }
    }
}

var svg = SVG().addTo('#svg').size(800, 500);
var gridPattern = svg.pattern(consts.grid * 2, consts.grid * 2, function (a) {
    a.rect(consts.grid, consts.grid).fill('#050');
    a.rect(consts.grid, consts.grid).fill('#060').move(0, consts.grid);
    a.rect(consts.grid, consts.grid).fill('#050').move(consts.grid, consts.grid);
    a.rect(consts.grid, consts.grid).fill('#060').move(consts.grid, 0);
});

svg.rect("100%", "100%").fill(gridPattern);


function createStraight(length, vertical) {
    const group = svg.group();

    function polygon(width) {
        if (vertical) {
            const p = group.polygon(`
                0 0
                0 ${length * consts.grid}
                ${width} ${length * consts.grid}
                ${width} 0
            `);
            p.move((consts.grid - width) / 2, 0);
            return p;
        } else {
            const p = group.polygon(`
                0 0
                ${length * consts.grid} 0
                ${length * consts.grid} ${width}
                0 ${width}
            `);
            p.move(0, (consts.grid - width) / 2);
            return p;
        }
    }

    const rail = polygon(consts.section.width).fill(consts.colours.rail);
    if (vertical) {
        group.gridMove = fn.gridMove((consts.grid - consts.section.width) / 2, 0);
    } else {
        group.gridMove = fn.gridMove(0, (consts.grid - consts.section.width) / 2);
    }
    return group;
}

function createStraightLeft(length) {
    const group = svg.group();

    function polygon(width) {
        let y = ((consts.grid - width) / 2);

        let diff = (width / 2) * Math.cos(Math.PI / 4);

        let x1 = consts.grid - (y + diff*2);

        let x2 = consts.grid - diff;
        let y2 = -diff;
        let x3 = consts.grid + diff;
        let y3 = diff;
        let x4 = consts.grid + diff - (y + width - diff);

        return group.polygon(`
            0 ${y}
            ${x1} ${y}
            ${x2} ${y2}
            ${x3} ${y3}
            ${x4} ${consts.grid - y}
            0 ${y+width}
        `);
    }

    var rail = polygon(consts.section.width).fill(consts.colours.rail);

    var offset = (consts.section.width / 2) * Math.cos(Math.PI / 4);
    group.gridMove = fn.gridMove(0, -offset);
    return group;
}


let s1 = createStraight(2).gridMove(2, 2);
let s2 = createStraightLeft(2).gridMove(4, 2);
let s3 = createStraight(2, true).gridMove(5, 1);