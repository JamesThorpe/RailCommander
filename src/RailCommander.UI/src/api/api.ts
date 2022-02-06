import { Layout, LocoFunctionType, Locomotive } from './types'

function LoadLayoutData(): Layout {
    return {
        Locomotives: [
            new Locomotive(5),
            new Locomotive(3, [
                {
                    Index: 0,
                    Type: LocoFunctionType.Toggle,
                    Name: "Lights"
                }, {
                    Index: 1,
                    Type: LocoFunctionType.Toggle,
                    Name: "Sounds"
                }, {
                    Index: 27,
                    Type: LocoFunctionType.Momentary,
                    Name: "Volume Down"
                }, {
                    Index: 28,
                    Type: LocoFunctionType.Momentary,
                    Name: "Volume Up"
                }, {
                    Index: 9,
                    Type: LocoFunctionType.Momentary,
                    Name: "Guard's whistle"
                }, {
                    Index: 2,
                    Type: LocoFunctionType.Toggle,
                    Name: "Active Brake"
                }, {
                    Index: 3,
                    Type: LocoFunctionType.Momentary,
                    Name: "Horn 4"
                }, {
                    Index: 4,
                    Type: LocoFunctionType.Momentary,
                    Name: "Horn 2"
                }, {
                    Index: 5,
                    Type: LocoFunctionType.Toggle,
                    Name: "Engine Type"
                }, {
                    Index: 6,
                    Type: LocoFunctionType.Toggle,
                    Name: "Light (FA1)"
                }, {
                    Index: 12,
                    Type: LocoFunctionType.Toggle,
                    Name: "Light (FA2)"
                }, {
                    Index: 7,
                    Type: LocoFunctionType.Toggle,
                    Name: "Notch Up"
                }, {
                    Index: 8,
                    Type: LocoFunctionType.Momentary,
                    Name: "Comms"
                }, {
                    Index: 10,
                    Type: LocoFunctionType.Momentary,
                    Name: "Doors"
                }, {
                    Index: 11,
                    Type: LocoFunctionType.Momentary,
                    Name: "Brake Release"
                }, {
                    Index: 13,
                    Type: LocoFunctionType.Momentary,
                    Name: "Announcement"
                }, {
                    Index: 14,
                    Type: LocoFunctionType.Momentary,
                    Name: "Wheel Flange"
                }, {
                    Index: 15,
                    Type: LocoFunctionType.Momentary,
                    Name: "Coupling Up"
                }, {
                    Index: 16,
                    Type: LocoFunctionType.Momentary,
                    Name: "Compressor"
                }, {
                    Index: 17,
                    Type: LocoFunctionType.Momentary,
                    Name: "Rail Echo"
                }, {
                    Index: 18,
                    Type: LocoFunctionType.Momentary,
                    Name: "Horn 3"
                }, {
                    Index: 19,
                    Type: LocoFunctionType.Toggle,
                    Name: "Mute"
                }, {
                    Index: 20,
                    Type: LocoFunctionType.Toggle,
                    Name: "Shunt / Half-speed"
                }, {
                    Index: 21,
                    Type: LocoFunctionType.Momentary,
                    Name: "Horn"
                }, {
                    Index: 22,
                    Type: LocoFunctionType.Toggle,
                    Name: "Coast"
                }, {
                    Index: 23,
                    Type: LocoFunctionType.Momentary,
                    Name: "Doors 2"
                }, {
                    Index: 24,
                    Type: LocoFunctionType.Momentary,
                    Name: "Announcement 2"
                }, {
                    Index: 25,
                    Type: LocoFunctionType.Momentary,
                    Name: "Announcement 3"
                }
            ])
        ]
    }
}

export default {
    LoadLayoutData
}