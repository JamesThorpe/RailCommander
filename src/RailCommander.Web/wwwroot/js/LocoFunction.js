"use strict";

import ApiFuncs from "./ApiFunctions.js";

class LocoFunction {
    constructor(address, index, type, name) {
        this._address = address;
        this.Index = index;
        this.Type = type;
        this.Name = name;

        this._on = false;
    }

    get On() {
        return this._on;
    }
    set On(val) {
        this._on = val;
        ApiFuncs.sendApiPost("/api/engine/function", { Address: this._address, Index: this.Index, On: this._on });
    }

    Activate() {
        this.On = true;
    }

    Deactivate() {
        this.On = false;
    }
}


export default LocoFunction;