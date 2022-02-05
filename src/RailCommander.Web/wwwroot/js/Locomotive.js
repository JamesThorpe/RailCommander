"use strict";

import ApiFuncs from "./ApiFunctions.js";
import LocoFunction from "./LocoFunction.js";

class Locomotive {
    constructor(address, functions) {
        functions = functions !== undefined ? functions : [];
        this.Address = address;
        this._speed = 0;
        this._forwards = true;

        this.Functions = functions.map(f => new LocoFunction(this.Address, f.Index, f.Type, f.Name));
    }

    get Speed() {
        return this._speed;
    }
    set Speed(value) {
        this._speed = value;
        ApiFuncs.sendApiPost("/api/engine/speed", { Address: this.Address, Speed: this._speed, Forwards: this._forwards });
    }
    get Forwards() {
        return this._forwards;
    }
    set Forwards(value) {
        this._forwards = value;
        ApiFuncs.sendApiPost("/api/engine/speed", { Address: this.Address, Speed: this._speed, Forwards: this._forwards });
    }
    Stop() {
        this.Speed = 0;
    }
    EmergencyStop() {
        this.Speed = 1;
    }
}

export default Locomotive;