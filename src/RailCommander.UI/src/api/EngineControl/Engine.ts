import { EngineFunction } from "./EngineFunction"
import Api from "../ApiFunctions"

export enum EngineDirection {
    Backwards = 0,
    Forwards = 1
}

export interface IEngine {
    Speed: number;
    Direction: EngineDirection;
    Forwards: boolean;
    get Address(): number;
    get Name(): string;

    get Functions(): ReadonlyArray<EngineFunction>;

    SetSpeed(speed: number): Promise<void>;
    SetDirection(direction: EngineDirection): Promise<void>;
    Stop(): Promise<void>;
    EmergencyStop(): Promise<void>;
    AddFunction(fn: EngineFunction): void;
}

export class Engine implements IEngine {
    private _speed: number = 0;
    private _direction: EngineDirection = EngineDirection.Forwards;
    private _address: number;
    private _name: string;
    private _functions: EngineFunction[] = [];

    constructor(address: number, name: string) {
        this._address = address;
        this._name = name;
    }

    get Address(): number {
        return this._address;
    }
    get Name(): string {
        return this._name;
    }
    get Speed(): number {
        return this._speed;
    }
    set Speed(speed: number) {
        this.SetSpeed(speed);
    }
    get Direction(): EngineDirection {
        return this._direction;
    }
    set Direction(direction: EngineDirection) {
        this.SetDirection(direction);
    }
    get Forwards(): boolean {
        return this.Direction === EngineDirection.Forwards;
    }
    set Forwards(forwards: boolean) {
        this.SetDirection(forwards ? EngineDirection.Forwards : EngineDirection.Backwards);
    }
    get Functions(): ReadonlyArray<EngineFunction> {
        return this._functions;
    }


    async SetSpeed(speed: number): Promise<void> {
        this._speed = speed;
        await Api.EngineControl.SetSpeed(this._address, this._speed, this._direction === EngineDirection.Forwards);
    }
    async SetDirection(direction: EngineDirection): Promise<void> {
        this._direction = direction;
        await Api.EngineControl.SetSpeed(this._address, this._speed, this._direction === EngineDirection.Forwards);
    }
    async Stop(): Promise<void> {
        await this.SetSpeed(0);
    }
    async EmergencyStop(): Promise<void> {
        await this.SetSpeed(1);
    }

    AddFunction(fn: EngineFunction): void {
        this._functions.push(fn);
    }
}