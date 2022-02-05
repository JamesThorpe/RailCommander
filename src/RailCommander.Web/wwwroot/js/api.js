"use strict";

import { sendApiPost } from "./ApiFunctions.js";
import Locomotive from "./Locomotive.js";

async function loadLayoutAsync () {

    var data = await fetch("/api/layout");
    var layout = await data.json();

    function handleSectionClick() {
        if (this.type == 'turnout-left' || this.type == 'turnout-right') {
            sendApiPost("/api/layout/turnout", { Id: this.id });
            this.position = this.position == 'normal' ? 'reverse' : 'normal';
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
                Type: 'toggle',
                Name: 'Lights'
            }, {
                Index: 1,
                Type: 'toggle',
                Name: "Sounds"
            }, {
                Index: 27,
                Type: 'toggle',
                Name: "Volume Down"
            }, {
                Index: 28,
                Type: 'toggle',
                Name: "Volume Up"
            }
        ])
    ];

    return layout;
}


export default {
    loadLayoutAsync: loadLayoutAsync
}