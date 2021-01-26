"use strict";

import socket from "/js/SocketHandler.js"
import "/js/socket-console-logger.js"
socket.open();


const options = {

    moduleCache: {
        vue: Vue
    },

    async getFile(url) {

        const res = await fetch(url);
        if (!res.ok)
            throw Object.assign(new Error(url + ' ' + res.statusText), { res });
        return await res.text();
    },

    addStyle(textContent) {

        const style = Object.assign(document.createElement('style'), { textContent });
        const ref = document.head.getElementsByTagName('style')[0] || null;
        document.head.insertBefore(style, ref);
    },
}
const { loadModule } = window['vue3-sfc-loader'];
Vue.createApp({
    data() {
        return {
            test: 3
        }
    },
    components: {
        'my-app': Vue.defineAsyncComponent(() => loadModule('/vues/Test.vue', options))
    }
}).mount('#app');

const opt = {
    section: {
        width: 8,
        margin: 4,
        padding: 2
    },
    gridSize: 24

}
opt.section.overallWidth = opt.section.width + (opt.section.margin * 2) + (opt.section.padding * 2);

const fn = {
    gridMove: function (x, y) {
        return this.move(x * opt.gridSize, (y * opt.gridSize) + ((opt.gridSize - opt.section.overallWidth) / 2));
    }
}

var svg = SVG().addTo('#svg').size(500, 500);
var gridPattern = svg.pattern(opt.gridSize*2, opt.gridSize*2, function(a) {
    a.rect(opt.gridSize, opt.gridSize).fill('#050');
    a.rect(opt.gridSize, opt.gridSize).fill('#060').move(0, opt.gridSize);
    a.rect(opt.gridSize, opt.gridSize).fill('#050').move(opt.gridSize, opt.gridSize);
    a.rect(opt.gridSize, opt.gridSize).fill('#060').move(opt.gridSize, 0);
});

svg.rect("100%", "100%").fill(gridPattern);

function createSection(length) {
    const group = svg.group();
    const bg = group.polygon(`0 0, ${length * opt.gridSize} 0, ${length * opt.gridSize} ${opt.section.overallWidth}, 0 ${opt.section.overallWidth}`).fill('#aaa');
    bg.move(0, (opt.gridSize - opt.section.overallWidth) / 2);
    const pd = group.polygon(`0 0, ${length * opt.gridSize} 0, ${length * opt.gridSize} ${opt.section.width + (opt.section.padding*2)}, 0 ${opt.section.width + (opt.section.padding*2)}`).fill('#000');
    pd.move(0, (opt.gridSize - (opt.section.width + (opt.section.padding*2))) / 2);
    const rail = group.polygon(`0 0, ${length * opt.gridSize} 0, ${length * opt.gridSize} ${opt.section.width}, 0 ${opt.section.width}`).fill('#fff');
    rail.move(0, (opt.gridSize - opt.section.width) / 2);
    group.gridMove = fn.gridMove;
    group.transform({ origin: { x: opt.gridSize / 2, y: opt.gridSize / 2 } });
    return group;
}

function createCorner() {
    const group = svg.group();
    
    function polygon(offset, width) {
        let x = ((width / 2) + (opt.gridSize / 2)) * Math.tan(Math.PI / 8);
        return group.polygon(`
            0 ${offset},
            ${x} ${offset},
            ${opt.gridSize - offset} ${opt.gridSize - x},
            ${opt.gridSize - offset} ${opt.gridSize},
            ${offset} ${opt.gridSize},
            0 ${opt.gridSize - offset}`);
    }

    const bg = polygon((opt.gridSize - opt.section.overallWidth) / 2, opt.section.overallWidth).fill('#aaa');

    const pd = polygon((opt.gridSize - (opt.section.width + opt.section.padding * 2)) / 2, opt.section.width + (opt.section.padding * 2)).fill('#000');

    const rail = polygon((opt.gridSize - opt.section.width) / 2, opt.section.width).fill('#fff');
    
    group.gridMove = fn.gridMove;
    return group;
}

var s1 = createSection(2);
var s2 = createSection(1);
s1.gridMove(1, 1);

s2.gridMove(3, 2);
s2.rotate(90);
var c1 = createCorner();
c1.gridMove(3, 1);


/*

function createSection(length) {
    var group = draw.group();
    var sectionBackground = group.rect(length, opt.section.overallWidth).fill('#aaa');
    var sectionOuter = group.rect(length, opt.section.width + (opt.section.padding * 2)).fill('#000').move(0, opt.section.margin);
    var section = group.rect(length, opt.section.width).fill('#fff').move(0, opt.section.margin + opt.section.padding);
    return group; //.transform({origin: 'center'});
}



function createSectionAngle() {
    var group = draw.group();
    var sectionBackground = group.polygon(`0 0, ${opt.section.overallWidth * Math.tan(Math.PI/8)} 0, ${opt.section.overallWidth * Math.cos(Math.PI/4)}, ${20-(opt.section.overallWidth * Math.sin(Math.PI/4))} 0 ${opt.section.overallWidth}`).fill('#aaa');
    sectionBackground.move(20, 20);
    return group;
}



var s1 = createSection(100);
var s2 = createSection(100);
var sa = createSectionAngle();
s1.move(100, 40);//({ px: 150, py: 50 });
s2.transform({ origin: 'center' });
s2.transform({ px: 150 + (50 + (Math.cos(Math.PI / 4) * (50))) + (Math.sin(Math.PI / 4) * (opt.section.overallWidth / 2)), py: 50 + ((opt.section.overallWidth / 2) + (Math.sin(Math.PI / 4) * (50))) - (Math.sin(Math.PI / 4) * (opt.section.overallWidth / 2))}).rotate(45);
sa.move(200, 40);

*/

/*
group.click(function() {
    alert('x');
})*/