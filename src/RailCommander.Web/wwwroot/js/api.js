"use strict";

import ApiFuncs from "./ApiFunctions.js";
import Locomotive from "./Locomotive.js";

async function loadLayoutAsync () {

    var data = await fetch("/api/layout");
    var layout = await data.json();

    function handleSectionClick() {
        if (this.type == "turnout-left" || this.type == "turnout-right") {
            ApiFuncs.sendApiPost("/api/layout/turnout", { Id: this.id });
            this.position = this.position == "normal" ? "reverse" : "normal";
        }
    }

    layout.blocks.forEach(b => {
        b.sections.forEach(s => {
            s.clicked = handleSectionClick;
        })
    });


    //TODO: load from server data
    layout.locos = [
        new Locomotive(5),
        new Locomotive(3, [
            {
                Index: 0,
                Type: "toggle",
                Name: "Lights"
            }, {
                Index: 1,
                Type: "toggle",
                Name: "Sounds"
            }, {
                Index: 27,
                Type: "momentary",
                Name: "Volume Down"
            }, {
                Index: 28,
                Type: "momentary",
                Name: "Volume Up"
            }, {
                Index: 9,
                Type: "momentary",
                Name: "Guard's whistle"
            }, {
                Index: 2,
                Type: "toggle",
                Name: "Active Brake"
            }, {
                Index: 3,
                Type: "momentary",
                Name: "Horn 4"
            }, {
                Index: 4,
                Type: "momentary",
                Name: "Horn 2"
            }, {
                Index: 5,
                Type: "toggle",
                Name: "Engine Type"
            }, {
                Index: 6,
                Type: "toggle",
                Name: "Light (FA1)"
            }, {
                Index: 12,
                Type: "toggle",
                Name: "Light (FA2)"
            }, {
                Index: 7,
                Type: "toggle",
                Name: "Notch Up"
            }, {
                Index: 8,
                Type: "momentary",
                Name: "Comms"
            }, {
                Index: 10,
                Type: "momentary",
                Name: "Doors"
            }, {
                Index: 11,
                Type: "momentary",
                Name: "Brake Release"
            }, {
                Index: 13,
                Type: "momentary",
                Name: "Announcement"
            }, {
                Index: 14,
                Type: "momentary",
                Name: "Wheel Flange"
            }, {
                Index: 15,
                Type: "momentary",
                Name: "Coupling Up"
            }, {
                Index: 16,
                Type: "momentary",
                Name: "Compressor"
            }, {
                Index: 17,
                Type: "momentary",
                Name: "Rail Echo"
            }, {
                Index: 18,
                Type: "momentary",
                Name: "Horn 3"
            }, {
                Index: 19,
                Type: "toggle",
                Name: "Mute"
            }, {
                Index: 20,
                Type: "toggle",
                Name: "Shunt / Half-speed"
            }, {
                Index: 21,
                Type: "momentary",
                Name: "Horn"
            }, {
                Index: 22,
                Type: "toggle",
                Name: "Coast"
            }, {
                Index: 23,
                Type: "momentary",
                Name: "Doors 2"
            }, {
                Index: 24,
                Type: "momentary",
                Name: "Announcement 2"
            }, {
                Index: 25,
                Type: "momentary",
                Name: "Announcement 3"
            }
        ])
    ];

    return layout;
}


export default {
    loadLayoutAsync: loadLayoutAsync
}