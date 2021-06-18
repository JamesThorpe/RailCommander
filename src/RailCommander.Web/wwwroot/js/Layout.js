"use strict";

const layout = Vue.reactive({
    trackSections: [],
    addTrackSection(id, type, x, y, angle, state) {
        this.trackSections.push({ id: id, type: type, x: x, y: y, angle: angle, state: state });
    }
});

layout.addTrackSection(1, "straight", 1, 1, 0, "unreserved");
layout.addTrackSection(2, "straight", 2, 1, 0, "reserved");
layout.addTrackSection(3, "straight", 3, 1, 0, "occupied");
layout.addTrackSection(4, "curve-left", 4, 1, 90, "unreserved");
layout.addTrackSection(5, "curve-left", 5, 2, 270, "unreserved");
layout.addTrackSection(1, "straight", 5, 3, 90, "unreserved");

window.setInterval(function() {
    if (layout.trackSections[1].state === "occupied") {
        layout.trackSections[1].state = "reserved";
    } else {
        layout.trackSections[1].state = "occupied";
    }
},
1000);


export default layout;