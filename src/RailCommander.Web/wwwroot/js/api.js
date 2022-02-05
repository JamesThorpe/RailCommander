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

    layout.locos = [
        {
            Address: 5,
            _speed: 0,
            get Speed() {
                return this._speed;
            },
            set Speed(value) {
                this._speed = value;
                sendApiPost("/api/engine/speed", {Address: this.Address, Speed: value })
            },
            Stop: function () { this.Speed = 0; },
            EmergencyStop: function () { this.Speed = 1; }
        }
    ];

    return layout;
}


export default {
    loadLayoutAsync: loadLayoutAsync
}