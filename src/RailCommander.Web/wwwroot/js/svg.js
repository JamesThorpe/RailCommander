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
    gridMove: function (x, y) {
        return this.move((x-1) * consts.grid, ((y-1) * consts.grid) + ((consts.grid - consts.section.width) / 2));
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


function createStraight(length) {
    const group = svg.group();

    function polygon(width) {
        const p = group.polygon(`
            0 0
            ${length * consts.grid} 0
            ${length * consts.grid} ${width}
            0 ${width}
        `);
        p.move(0, (consts.grid - width) / 2);
        return p;
    }

    var rail = polygon(consts.section.width).fill(consts.colours.rail);
    group.gridMove = fn.gridMove;
    return group;
}

function createStraightLeft(length) {
    const group = svg.group();

    function polygon(width) {
        let x1 = ((length - 1) * consts.grid) - ((width / 2) * Math.tan(Math.PI / 8));
        let x2 = ((consts.grid - width) / 2) + x1;
        let y = ((consts.grid - width) / 2);
        return group.polygon(`
            0 ${y}
            ${x1} ${y}
            ${x2} 0
            ${x2 + width} 0
            ${x2 + width} ${consts.grid - y}
            0 ${width}
        `).transform({
            origin: { x: 0, y: y }
        });
    }

    var rail = polygon(consts.section.width).fill(consts.colours.rail);

    group.gridMove = fn.gridMove;
    return group;
}



let s1 = createStraight(2).gridMove(1, 1);
let s2 = createStraightLeft(2).gridMove(1, 2);