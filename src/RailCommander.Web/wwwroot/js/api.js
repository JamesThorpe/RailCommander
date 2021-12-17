"use strict";

async function sendApiPost(url, data) {
    await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}

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

    return layout;
}


export default {
    loadLayoutAsync: loadLayoutAsync
}