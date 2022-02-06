import { SendApiPost } from './apiFuncs'

export class Layout {
    Locomotives: Locomotive[] = [];
}

export interface LocoFunctionDefinition {
    Index: number,
    Type: LocoFunctionType,
    Name: string
}

export class Locomotive {
    constructor(address: number, functions?: LocoFunctionDefinition[]) {
        this.Address = address;
        if (functions === undefined) {
            this.Functions = [];
        } else {
            this.Functions = functions.map(f => new LocoFunction(this.Address, f))
        }
    }
    readonly Address: number;
    private _Speed: number = 0;
    public get Speed(): number {
        return this._Speed;
    }
    public set Speed(value: number) {
        this._Speed = value;
        SendApiPost("/api/engine/speed", { Address: this.Address, Speed: this.Speed, Forwards: this.Forwards });
    }
    private _Forwards: boolean = false;
    public get Forwards(): boolean {
        return this._Forwards;
    }
    public set Forwards(value: boolean) {
        this._Forwards = value;
        SendApiPost("/api/engine/speed", { Address: this.Address, Speed: this.Speed, Forwards: this.Forwards });
    }
    readonly Functions: LocoFunction[]
    Stop(): void {
        this.Speed = 0;
    }
    EmergencyStop(): void {
        this.Speed = 1;
    }
}

export class LocoFunction {
    constructor(address: number, def: LocoFunctionDefinition) {
        this.LocoAddress = address;
        this.Index = def.Index;
        this.Type = def.Type;
        this.Name = def.Name;
    }
    readonly LocoAddress: number;
    readonly Index: number;
    readonly Type: LocoFunctionType;
    readonly Name: string;
    private _On: boolean = false;
    public get On(): boolean {
        return this._On;
    }
    public set On(value: boolean) {
        this._On = value;
        SendApiPost("/api/engine/function", { Address: this.LocoAddress, Index: this.Index, On: this.On });
    }
    Activate(): void {
        this.On = true;
    }
    Deactivate(): void {
        this.On = false;
    }
}

export enum LocoFunctionType {
    Toggle,
    Momentary
}