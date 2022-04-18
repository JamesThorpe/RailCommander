import Api from "../ApiFunctions"

export enum FunctionTypes {
    Momentary = 0,
    Latched = 1
}

export class EngineFunction {
    private _address: number;
    private _index: number;
    private _type: FunctionTypes;
    private _name: string;
    private _on: boolean;
    
    constructor(address: number, index: number, type: FunctionTypes, name:string) {
        this._address = address;
        this._index = index;
        this._type = type;
        this._name = name;

        this._on = false;
    }

    get Index(): number {
        return this._index;
    }
    get Type(): FunctionTypes {
        return this._type;
    }
    get Name(): string {
        return this._name;
    }
    get On(): boolean {
        return this._on;
    }
    set On(on: boolean) {
        this.SetOn(on);
    }

    async SetOn(isOn: boolean): Promise<void> {
        this._on = isOn;
        await Api.EngineControl.SetFunction(this._address, this._index, this._on);
    }
    async Activate(): Promise<void> {
        await this.SetOn(true);
    }
    async Deactivate(): Promise<void> {
        await this.SetOn(false);
    }
    
}