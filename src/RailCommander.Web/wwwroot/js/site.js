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
    }
}
opt.section.overallWidth = opt.section.width + (opt.section.margin * 2) + (opt.section.padding * 2);

var draw = SVG().addTo('#svg').size(500, 500);
draw.rect("100%", "100%").attr({ fill: '#060' });

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



/*
group.click(function() {
    alert('x');
})*/