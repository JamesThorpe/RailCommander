import { Engine, IEngine } from "./EngineControl/Engine";
import { EngineFunction, FunctionTypes } from "./EngineControl/EngineFunction";
import { Layout } from "./TrackPlan/Layout"
import Api from "./ApiFunctions"
import Socket from "./Socket/SocketHandler"

export interface IRailCommander {
    get Engines(): ReadonlyArray<IEngine>
    get Layout(): Layout
}


class RailCommander implements IRailCommander {
    private _engines: IEngine[];
    private _layout: Layout
    constructor() {
        this._engines = [];
        this._layout = new Layout();

        let eng = new Engine(5, "Class 220 Virgin Voyager");
        this._engines.push(eng);

        eng = new Engine(3, "Class 800 GWR IET");
        this._engines.push(eng);

        let funcs = [
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
        ];

        funcs.forEach((f) => {
            eng.AddFunction(new EngineFunction(eng.Address, f.Index, f.Type === "toggle" ? FunctionTypes.Latched : FunctionTypes.Momentary, f.Name));
        });

    }
    get Engines(): ReadonlyArray<IEngine> {
        return this._engines;
    }

    get Layout(): Layout {
        return this._layout;
    }

    async loadLayoutAsync() {

        var data = await fetch("/api/layout");
        var layout = await data.json();
        
        function handleSectionClick(this:any) {
            if (this.type == "turnout-left" || this.type == "turnout-right") {
                Api.TurnoutControl.ToggleTurnout(this.id);
                this.position = this.position == "normal" ? "reverse" : "normal";
            }
        }

        layout.blocks.forEach((b:any) => {
            b.sections.forEach((s:any) => {
                s.clicked = handleSectionClick;
            })
        });

        this._layout = layout;

        Socket.open();
        Socket.bindLayout(this._layout);
    }
}

export default new RailCommander();