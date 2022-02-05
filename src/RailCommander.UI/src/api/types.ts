export class Layout {
    Locomotives: Locomotive[]
}

export class Locomotive {
    constructor(address: number, functions?: LocoFunction[]) {
        this.Address = address;
        if (functions === undefined) {
            this.Functions = [];
        } else {
            this.Functions = functions.map(f => new LocoFunction(this.Address, f))
        }
    }
    readonly Address: number;
    Speed: number = 0;
    Forwards: boolean = false;
    readonly Functions: LocoFunction[]
    Stop(): void {
        
    }
    EmergencyStop(): void {

    }
}

export class LocoFunction {
    readonly LocoAddress: number,
    readonly Index: number,
    readonly Type: LocoFunctionType,
    On: boolean,
    Activate: void,
    Deactivate: void
}

export enum LocoFunctionType {
    Toggle,
    Momentary
}